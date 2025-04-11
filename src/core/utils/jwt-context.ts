/**
 * jwt-context.ts
 * Extracts user_id, tenant_id, role from token
 */

import { createUnauthorizedError } from './error-handler';
import { logger } from './logger';

export interface JwtPayload {
  sub: string;            // Subject (user ID)
  tenant_id: string;      // Tenant identifier
  role: string;           // User role
  permissions?: string[]; // Optional permissions array
  iat: number;            // Issued at timestamp
  exp: number;            // Expiration timestamp
  iss?: string;           // Issuer
  aud?: string;           // Audience
}

export interface UserContext {
  userId: string;
  tenantId: string;
  role: string;
  permissions: string[];
  isAuthenticated: boolean;
  tokenExpiration: Date;
}

export const ANONYMOUS_CONTEXT: UserContext = {
  userId: '',
  tenantId: '',
  role: 'anonymous',
  permissions: [],
  isAuthenticated: false,
  tokenExpiration: new Date(0),
};

/**
 * Parse and validate a JWT token
 * @param token JWT token string
 * @returns Decoded JWT payload or null if invalid
 */
export function parseJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      logger.warn('Invalid JWT format: token does not have three parts');
      return null;
    }

    const payload = parts[1];
    const decodedPayload = Buffer.from(payload, 'base64').toString('utf-8');
    const parsedPayload = JSON.parse(decodedPayload) as JwtPayload;

    if (!parsedPayload.sub || !parsedPayload.tenant_id || !parsedPayload.role) {
      logger.warn('Invalid JWT payload: missing required fields');
      return null;
    }

    const now = Math.floor(Date.now() / 1000);
    if (parsedPayload.exp && parsedPayload.exp < now) {
      logger.warn('JWT token has expired');
      return null;
    }

    return parsedPayload;
  } catch (error) {
    logger.error('Error parsing JWT token:', error);
    return null;
  }
}

/**
 * Extract user context from JWT token
 * @param token JWT token string
 * @returns User context object
 */
export function extractUserContext(token?: string): UserContext {
  if (!token) {
    return ANONYMOUS_CONTEXT;
  }

  const cleanToken = token.startsWith('Bearer ') ? token.substring(7) : token;
  
  const payload = parseJwt(cleanToken);
  if (!payload) {
    return ANONYMOUS_CONTEXT;
  }

  return {
    userId: payload.sub,
    tenantId: payload.tenant_id,
    role: payload.role,
    permissions: payload.permissions || [],
    isAuthenticated: true,
    tokenExpiration: new Date(payload.exp * 1000),
  };
}

/**
 * Check if a token is about to expire
 * @param context User context
 * @param thresholdMinutes Minutes before expiration to consider token as expiring
 * @returns True if token will expire within the threshold
 */
export function isTokenExpiring(context: UserContext, thresholdMinutes = 5): boolean {
  if (!context.isAuthenticated) {
    return false;
  }

  const thresholdMs = thresholdMinutes * 60 * 1000;
  const expirationTime = context.tokenExpiration.getTime();
  const currentTime = Date.now();
  
  return expirationTime - currentTime < thresholdMs;
}

/**
 * Verify that a user context has a valid tenant ID
 * @param context User context
 * @throws ApiError if tenant ID is missing
 */
export function verifyTenantContext(context: UserContext): void {
  if (!context.isAuthenticated || !context.tenantId) {
    throw createUnauthorizedError('Valid tenant context is required');
  }
}

/**
 * Create a middleware function for Express that extracts user context from JWT
 * This is a higher-order function that returns the actual middleware
 */
export function createJwtContextMiddleware() {
  return (req: any, res: any, next: any) => {
    try {
      const authHeader = req.headers.authorization;
      const context = extractUserContext(authHeader);
      
      req.userContext = context;
      
      next();
    } catch (error) {
      logger.error('Error in JWT context middleware:', error);
      next(error);
    }
  };
}

/**
 * Helper to get user context from request
 * @param req Express request object
 * @returns User context or anonymous context if not available
 */
export function getUserContext(req: any): UserContext {
  return req.userContext || ANONYMOUS_CONTEXT;
}
