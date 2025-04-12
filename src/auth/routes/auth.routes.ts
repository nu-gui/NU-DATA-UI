/**
 * Authentication routes
 * Defines API endpoints for authentication
 */
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware, roleGuard } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', AuthController.login);
router.post('/password/reset', AuthController.requestPasswordReset);
router.post('/password/reset/:token', AuthController.resetPassword);

router.post('/logout', authMiddleware, AuthController.logout);

router.get('/users', authMiddleware, roleGuard(['admin']), (req, res) => {
  res.status(200).json({
    data: {
      message: 'Admin-only route'
    }
  });
});

export default router;
