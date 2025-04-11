/**
 * Authentication middleware
 * Validates JWT token and injects user context into request
 */
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { TokenPayload } from '../models/user.model';
import { logger } from '../../core/utils/logger';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
      tenantId?: string;
    }
  }
}

/**
 * Authentication middleware
 * Extracts JWT token from Authorization header and validates it
 * Injects user context into request object
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        errors: [{
          status: '401',
          title: 'Unauthorized',
          detail: 'Missing or invalid authorization token'
        }]
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = AuthService.verifyToken(token);

    if (!payload) {
      return res.status(401).json({
        errors: [{
          status: '401',
          title: 'Unauthorized',
          detail: 'Invalid or expired token'
        }]
      });
    }

    req.user = payload;
    req.tenantId = payload.tenantId;

    next();
  } catch (error) {
    logger.error(`Authentication middleware error: ${error}`);
    return res.status(500).json({
      errors: [{
        status: '500',
        title: 'Internal Server Error',
        detail: 'An error occurred during authentication'
      }]
    });
  }
};

/**
 * Role-based access control middleware
 * Checks if user has required role
 * @param roles Array of allowed roles
 */
export const roleGuard = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          errors: [{
            status: '401',
            title: 'Unauthorized',
            detail: 'Authentication required'
          }]
        });
      }

      const userRole = req.user.role;
      
      if (userRole === 'admin') {
        return next();
      }

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          errors: [{
            status: '403',
            title: 'Forbidden',
            detail: 'Insufficient permissions'
          }]
        });
      }

      next();
    } catch (error) {
      logger.error(`Role guard middleware error: ${error}`);
      return res.status(500).json({
        errors: [{
          status: '500',
          title: 'Internal Server Error',
          detail: 'An error occurred during role verification'
        }]
      });
    }
  };
};

/**
 * Tenant isolation middleware
 * Ensures user can only access resources from their tenant
 */
export const tenantGuard = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.tenantId) {
      return res.status(401).json({
        errors: [{
          status: '401',
          title: 'Unauthorized',
          detail: 'Authentication required'
        }]
      });
    }

    const requestedTenantId = req.params.tenantId || req.query.tenantId as string;
    
    if (requestedTenantId && requestedTenantId !== req.tenantId && req.user.role !== 'admin') {
      return res.status(403).json({
        errors: [{
          status: '403',
          title: 'Forbidden',
          detail: 'Access to requested tenant is not allowed'
        }]
      });
    }

    next();
  } catch (error) {
    logger.error(`Tenant guard middleware error: ${error}`);
    return res.status(500).json({
      errors: [{
        status: '500',
        title: 'Internal Server Error',
        detail: 'An error occurred during tenant verification'
      }]
    });
  }
};
