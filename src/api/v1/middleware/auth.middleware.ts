import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: number;
  email: string;
  tenantId: number;
  role: string;
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

/**
 * Middleware to authenticate JWT tokens and extract tenant context
 * Sets req.user with decoded token information including tenantId
 */
export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ code: 401, message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ code: 401, message: 'Bearer token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nu-data-dev-secret') as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ code: 401, message: 'Invalid or expired token' });
  }
};

/**
 * Middleware to ensure the user belongs to the specified tenant
 * Must be used after authenticateJWT middleware
 */
export const validateTenant = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: 'Authentication required' });
  }

  const requestTenantId = parseInt(req.params.tenantId || req.query.tenantId as string);
  
  if (requestTenantId && req.user.tenantId !== requestTenantId) {
    return res.status(403).json({ code: 403, message: 'Access denied to requested tenant' });
  }

  next();
};

/**
 * Middleware to check if user has admin role
 * Must be used after authenticateJWT middleware
 */
export const requireAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ code: 401, message: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: 'Admin access required' });
  }

  next();
};
