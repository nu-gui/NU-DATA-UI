import express, { Request, Response } from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../auth/services/user.service';
import { User } from '../../../auth/models/user.model';

const router = express.Router();
const userService = new UserService();

/**
 * @route POST /v1/auth/login
 * @desc Authenticate user and return JWT token
 * @access Public
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        code: 400, 
        message: 'Email and password are required' 
      });
    }
    
    const user = await userService.findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ 
        code: 401, 
        message: 'Invalid credentials' 
      });
    }
    
    const isPasswordValid = await AuthService.comparePassword(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        code: 401, 
        message: 'Invalid credentials' 
      });
    }
    
    const authUser: User = {
      id: user.id,
      email: user.email,
      role: user.role as any, // Type casting to resolve UserRole mismatch
      tenantId: user.tenantId,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      passwordHash: user.passwordHash
    };
    
    const token = AuthService.generateToken(authUser);
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      code: 500, 
      message: 'Internal server error' 
    });
  }
});

/**
 * @route POST /v1/auth/logout
 * @desc Logout user session
 * @access Private
 */
router.post('/logout', authenticateJWT, (req: Request, res: Response) => {
  return res.status(204).send();
});

/**
 * @route POST /v1/auth/password/reset
 * @desc Request password reset
 * @access Public
 */
router.post('/password/reset', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ code: 400, message: 'Email is required' });
    }
    
    const user = await userService.findUserByEmail(email);
    
    if (!user) {
      return res.status(200).json({ message: 'If your email is registered, you will receive a password reset link' });
    }
    
    const token = AuthService.generatePasswordResetToken(user.id);
    
    await userService.storeResetToken(email, token);
    
    return res.status(200).json({ 
      message: 'Password reset link sent',
      debug: { token } 
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

/**
 * @route POST /v1/auth/password/reset/:token
 * @desc Reset password using token
 * @access Public
 */
router.post('/password/reset/:token', async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ code: 400, message: 'Token and new password are required' });
    }
    
    const userId = await userService.verifyResetToken(token);
    
    if (!userId) {
      return res.status(400).json({ code: 400, message: 'Invalid or expired token' });
    }
    
    const passwordHash = await AuthService.hashPassword(newPassword);
    
    await userService.updateUserPassword(userId, passwordHash);
    
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
});

export default router;
