/**
 * Authentication controller
 * Handles login, logout, and password reset endpoints
 */
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserLoginDto, PasswordResetRequestDto, PasswordResetDto } from '../models/user.model';
import { logger } from '../../core/utils/logger';
import { UserService } from '../services/user.service';

export class AuthController {
  private static userService = new UserService();

  /**
   * Login endpoint
   * @param req Request with login credentials
   * @param res Response
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body as UserLoginDto;

      if (!email || !password) {
        return res.status(400).json({
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Email and password are required'
          }]
        });
      }

      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        return res.status(401).json({
          errors: [{
            status: '401',
            title: 'Unauthorized',
            detail: 'Invalid email or password'
          }]
        });
      }

      const isPasswordValid = await AuthService.comparePassword(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({
          errors: [{
            status: '401',
            title: 'Unauthorized',
            detail: 'Invalid email or password'
          }]
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          errors: [{
            status: '403',
            title: 'Forbidden',
            detail: 'Account is inactive'
          }]
        });
      }

      const token = AuthService.generateToken(user as any);

      return res.status(200).json({
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            tenantId: user.tenantId
          }
        }
      });
    } catch (error) {
      logger.error(`Login error: ${error}`);
      return res.status(500).json({
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: 'An error occurred during login'
        }]
      });
    }
  }

  /**
   * Logout endpoint
   * In a stateless JWT implementation, this is optional
   * For a more secure implementation, token blacklisting would be implemented
   * @param req Request
   * @param res Response
   */
  static async logout(req: Request, res: Response) {
    try {
      
      return res.status(200).json({
        data: {
          message: 'Logout successful'
        }
      });
    } catch (error) {
      logger.error(`Logout error: ${error}`);
      return res.status(500).json({
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: 'An error occurred during logout'
        }]
      });
    }
  }

  /**
   * Password reset request endpoint
   * @param req Request with email
   * @param res Response
   */
  static async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body as PasswordResetRequestDto;

      if (!email) {
        return res.status(400).json({
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Email is required'
          }]
        });
      }

      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        return res.status(200).json({
          data: {
            message: 'If your email is registered, you will receive a password reset link'
          }
        });
      }

      const token = AuthService.generatePasswordResetToken(user.id as any);

      await this.userService.storeResetToken(email, token);

      logger.info(`Password reset requested for ${email}. Token: ${token}`);

      return res.status(200).json({
        data: {
          message: 'If your email is registered, you will receive a password reset link'
        }
      });
    } catch (error) {
      logger.error(`Password reset request error: ${error}`);
      return res.status(500).json({
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: 'An error occurred during password reset request'
        }]
      });
    }
  }

  /**
   * Password reset endpoint
   * @param req Request with token and new password
   * @param res Response
   */
  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body as PasswordResetDto;

      if (!token || !newPassword) {
        return res.status(400).json({
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Token and new password are required'
          }]
        });
      }

      const userId = AuthService.verifyPasswordResetToken(token);

      if (!userId) {
        return res.status(400).json({
          errors: [{
            status: '400',
            title: 'Bad Request',
            detail: 'Invalid or expired token'
          }]
        });
      }

      const passwordHash = await AuthService.hashPassword(newPassword);

      await this.userService.updateUserPassword(userId, passwordHash);

      return res.status(200).json({
        data: {
          message: 'Password reset successful'
        }
      });
    } catch (error) {
      logger.error(`Password reset error: ${error}`);
      return res.status(500).json({
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: 'An error occurred during password reset'
        }]
      });
    }
  }
}
