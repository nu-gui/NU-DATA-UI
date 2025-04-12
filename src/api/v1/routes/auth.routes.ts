import express from 'express';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route POST /v1/auth/login
 * @desc Authenticate user and return JWT token
 * @access Public
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    const token = 'mock-jwt-token';
    return res.status(200).json({ token });
  }
  
  return res.status(401).json({ code: 401, message: 'Invalid credentials' });
});

/**
 * @route POST /v1/auth/logout
 * @desc Logout user session
 * @access Private
 */
router.post('/logout', authenticateJWT, (req, res) => {
  return res.status(204).send();
});

/**
 * @route POST /v1/auth/password/reset
 * @desc Request password reset
 * @access Public
 */
router.post('/password/reset', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ code: 400, message: 'Email is required' });
  }
  
  return res.status(200).json({ message: 'Password reset link sent' });
});

/**
 * @route POST /v1/auth/password/reset/:token
 * @desc Reset password using token
 * @access Public
 */
router.post('/password/reset/:token', (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  
  if (!token || !newPassword) {
    return res.status(400).json({ code: 400, message: 'Token and new password are required' });
  }
  
  return res.status(200).json({ message: 'Password reset successful' });
});

export default router;
