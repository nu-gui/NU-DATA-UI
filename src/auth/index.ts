/**
 * Authentication module index
 * Exports all authentication components
 */
import { authMiddleware, roleGuard, tenantGuard } from './middleware/auth.middleware';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { User, UserRole, TokenPayload } from './models/user.model';
import authRoutes from './routes/auth.routes';

export {
  authMiddleware,
  roleGuard,
  tenantGuard,
  AuthController,
  AuthService,
  authRoutes
};

export type { User, UserRole, TokenPayload };
