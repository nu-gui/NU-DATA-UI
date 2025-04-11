/**
 * role-guard.ts
 * Protects handlers/routes based on role
 */

import { createForbiddenError } from './error-handler';
import { UserContext, ANONYMOUS_CONTEXT } from './jwt-context';
import { logger } from './logger';

export enum Role {
  ANONYMOUS = 'anonymous',
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

const ROLE_HIERARCHY: Record<Role, number> = {
  [Role.ANONYMOUS]: 0,
  [Role.USER]: 1,
  [Role.EDITOR]: 2,
  [Role.ADMIN]: 3,
  [Role.SUPER_ADMIN]: 4,
};

/**
 * Check if a role has sufficient privileges
 * @param userRole User's role
 * @param requiredRole Minimum required role
 * @returns True if user has sufficient privileges
 */
export function hasRole(userRole: string, requiredRole: Role): boolean {
  const userRoleValue = ROLE_HIERARCHY[userRole as Role] || 0;
  const requiredRoleValue = ROLE_HIERARCHY[requiredRole];
  
  return userRoleValue >= requiredRoleValue;
}

/**
 * Check if user has a specific permission
 * @param context User context
 * @param permission Required permission
 * @returns True if user has the permission
 */
export function hasPermission(context: UserContext, permission: string): boolean {
  if (context.role === Role.SUPER_ADMIN) {
    return true;
  }
  
  return context.permissions.includes(permission);
}

/**
 * Check if user has all specified permissions
 * @param context User context
 * @param permissions Array of required permissions
 * @returns True if user has all permissions
 */
export function hasAllPermissions(context: UserContext, permissions: string[]): boolean {
  if (context.role === Role.SUPER_ADMIN) {
    return true;
  }
  
  return permissions.every(permission => context.permissions.includes(permission));
}

/**
 * Check if user has any of the specified permissions
 * @param context User context
 * @param permissions Array of permissions (any one is sufficient)
 * @returns True if user has at least one permission
 */
export function hasAnyPermission(context: UserContext, permissions: string[]): boolean {
  if (context.role === Role.SUPER_ADMIN) {
    return true;
  }
  
  return permissions.some(permission => context.permissions.includes(permission));
}

/**
 * Create a middleware function that requires a specific role
 * @param requiredRole Minimum role required to access the route
 * @returns Express middleware function
 */
export function requireRole(requiredRole: Role) {
  return (req: any, res: any, next: any) => {
    try {
      const context: UserContext = req.userContext || ANONYMOUS_CONTEXT;
      
      if (!hasRole(context.role, requiredRole)) {
        logger.warn(`Access denied: User ${context.userId} with role ${context.role} attempted to access resource requiring ${requiredRole}`);
        
        const error = createForbiddenError(`This action requires ${requiredRole} role or higher`);
        
        return res.status(parseInt(error.status, 10)).json({ errors: [error] });
      }
      
      next();
    } catch (error) {
      logger.error('Error in role guard middleware:', error);
      next(error);
    }
  };
}

/**
 * Create a middleware function that requires specific permissions
 * @param requiredPermissions Permissions required to access the route
 * @param requireAll If true, all permissions are required; if false, any one is sufficient
 * @returns Express middleware function
 */
export function requirePermissions(requiredPermissions: string[], requireAll = true) {
  return (req: any, res: any, next: any) => {
    try {
      const context: UserContext = req.userContext || ANONYMOUS_CONTEXT;
      
      const hasPermissions = requireAll
        ? hasAllPermissions(context, requiredPermissions)
        : hasAnyPermission(context, requiredPermissions);
      
      if (!hasPermissions) {
        const permissionsStr = requiredPermissions.join(', ');
        const requireType = requireAll ? 'all of' : 'any of';
        
        logger.warn(`Access denied: User ${context.userId} attempted to access resource requiring ${requireType} permissions: ${permissionsStr}`);
        
        const error = createForbiddenError(`This action requires ${requireType} these permissions: ${permissionsStr}`);
        
        return res.status(parseInt(error.status, 10)).json({ errors: [error] });
      }
      
      next();
    } catch (error) {
      logger.error('Error in permission guard middleware:', error);
      next(error);
    }
  };
}

/**
 * Create a middleware function that requires tenant access
 * @param allowedTenantIds Array of tenant IDs that can access the route
 * @returns Express middleware function
 */
export function requireTenant(allowedTenantIds: string[]) {
  return (req: any, res: any, next: any) => {
    try {
      const context: UserContext = req.userContext || ANONYMOUS_CONTEXT;
      
      if (context.role === Role.SUPER_ADMIN) {
        return next();
      }
      
      if (!allowedTenantIds.includes(context.tenantId)) {
        logger.warn(`Tenant access denied: User ${context.userId} from tenant ${context.tenantId} attempted to access resource for tenants: ${allowedTenantIds.join(', ')}`);
        
        const error = createForbiddenError('You do not have access to this tenant');
        
        return res.status(parseInt(error.status, 10)).json({ errors: [error] });
      }
      
      next();
    } catch (error) {
      logger.error('Error in tenant guard middleware:', error);
      next(error);
    }
  };
}

/**
 * Create a middleware function that requires ownership of a resource
 * @param resourceIdExtractor Function to extract resource owner ID from request
 * @param allowAdmin If true, admins can access regardless of ownership
 * @returns Express middleware function
 */
export function requireOwnership(
  resourceIdExtractor: (req: any) => string,
  allowAdmin = true
) {
  return (req: any, res: any, next: any) => {
    try {
      const context: UserContext = req.userContext || ANONYMOUS_CONTEXT;
      
      if (allowAdmin && (context.role === Role.ADMIN || context.role === Role.SUPER_ADMIN)) {
        return next();
      }
      
      const resourceOwnerId = resourceIdExtractor(req);
      
      if (context.userId !== resourceOwnerId) {
        logger.warn(`Ownership access denied: User ${context.userId} attempted to access resource owned by ${resourceOwnerId}`);
        
        const error = createForbiddenError('You do not have ownership of this resource');
        
        return res.status(parseInt(error.status, 10)).json({ errors: [error] });
      }
      
      next();
    } catch (error) {
      logger.error('Error in ownership guard middleware:', error);
      next(error);
    }
  };
}
