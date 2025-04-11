/**
 * error-handler.ts
 * JSON:API formatted errors for all routes
 */

export interface ApiError {
  status: string;
  code: string;
  title: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  meta?: Record<string, any>;
}

export interface ApiErrorResponse {
  errors: ApiError[];
}

export enum ErrorCode {
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  CONFLICT = 'CONFLICT',
  
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR = 'DATABASE_ERROR',
  
  TENANT_NOT_FOUND = 'TENANT_NOT_FOUND',
  TENANT_DISABLED = 'TENANT_DISABLED',
  
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
}

export const HTTP_STATUS_CODES: Record<ErrorCode, number> = {
  [ErrorCode.UNAUTHORIZED]: 401,
  [ErrorCode.FORBIDDEN]: 403,
  [ErrorCode.INVALID_TOKEN]: 401,
  [ErrorCode.TOKEN_EXPIRED]: 401,
  [ErrorCode.VALIDATION_ERROR]: 400,
  [ErrorCode.INVALID_INPUT]: 400,
  [ErrorCode.MISSING_REQUIRED_FIELD]: 400,
  [ErrorCode.NOT_FOUND]: 404,
  [ErrorCode.ALREADY_EXISTS]: 409,
  [ErrorCode.CONFLICT]: 409,
  [ErrorCode.INTERNAL_ERROR]: 500,
  [ErrorCode.SERVICE_UNAVAILABLE]: 503,
  [ErrorCode.DATABASE_ERROR]: 500,
  [ErrorCode.TENANT_NOT_FOUND]: 404,
  [ErrorCode.TENANT_DISABLED]: 403,
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 429,
};

export const ERROR_TITLES: Record<ErrorCode, string> = {
  [ErrorCode.UNAUTHORIZED]: 'Authentication required',
  [ErrorCode.FORBIDDEN]: 'Permission denied',
  [ErrorCode.INVALID_TOKEN]: 'Invalid authentication token',
  [ErrorCode.TOKEN_EXPIRED]: 'Authentication token expired',
  [ErrorCode.VALIDATION_ERROR]: 'Validation error',
  [ErrorCode.INVALID_INPUT]: 'Invalid input',
  [ErrorCode.MISSING_REQUIRED_FIELD]: 'Missing required field',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.ALREADY_EXISTS]: 'Resource already exists',
  [ErrorCode.CONFLICT]: 'Resource conflict',
  [ErrorCode.INTERNAL_ERROR]: 'Internal server error',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'Service unavailable',
  [ErrorCode.DATABASE_ERROR]: 'Database error',
  [ErrorCode.TENANT_NOT_FOUND]: 'Tenant not found',
  [ErrorCode.TENANT_DISABLED]: 'Tenant is disabled',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded',
};

/**
 * Create a standardized API error object
 */
export function createApiError(
  code: ErrorCode,
  detail?: string,
  source?: ApiError['source'],
  meta?: ApiError['meta']
): ApiError {
  const status = HTTP_STATUS_CODES[code].toString();
  const title = ERROR_TITLES[code];
  
  return {
    status,
    code,
    title,
    ...(detail && { detail }),
    ...(source && { source }),
    ...(meta && { meta }),
  };
}

/**
 * Create a standardized API error response with one or more errors
 */
export function createErrorResponse(errors: ApiError | ApiError[]): ApiErrorResponse {
  const errorArray = Array.isArray(errors) ? errors : [errors];
  return { errors: errorArray };
}

/**
 * Helper function to create a validation error for a specific field
 */
export function createValidationError(
  field: string,
  message: string,
  isQueryParam = false
): ApiError {
  return createApiError(
    ErrorCode.VALIDATION_ERROR,
    message,
    {
      [isQueryParam ? 'parameter' : 'pointer']: isQueryParam ? field : `/data/attributes/${field}`,
    }
  );
}

/**
 * Helper function to create a not found error for a specific resource
 */
export function createNotFoundError(resourceType: string, id?: string): ApiError {
  const detail = id 
    ? `${resourceType} with ID '${id}' was not found`
    : `The requested ${resourceType} was not found`;
  
  return createApiError(
    ErrorCode.NOT_FOUND,
    detail,
    { pointer: '/data' }
  );
}

/**
 * Helper function to create an unauthorized error
 */
export function createUnauthorizedError(detail?: string): ApiError {
  return createApiError(
    ErrorCode.UNAUTHORIZED,
    detail || 'Authentication is required to access this resource'
  );
}

/**
 * Helper function to create a forbidden error
 */
export function createForbiddenError(detail?: string): ApiError {
  return createApiError(
    ErrorCode.FORBIDDEN,
    detail || 'You do not have permission to access this resource'
  );
}

/**
 * Helper function to create an internal server error
 */
export function createInternalError(detail?: string, meta?: Record<string, any>): ApiError {
  return createApiError(
    ErrorCode.INTERNAL_ERROR,
    detail || 'An unexpected error occurred',
    undefined,
    meta
  );
}

/**
 * Helper function to create a tenant not found error
 */
export function createTenantNotFoundError(tenantId: string): ApiError {
  return createApiError(
    ErrorCode.TENANT_NOT_FOUND,
    `Tenant with ID '${tenantId}' was not found`
  );
}

/**
 * Helper function to create a tenant disabled error
 */
export function createTenantDisabledError(tenantId: string): ApiError {
  return createApiError(
    ErrorCode.TENANT_DISABLED,
    `Tenant with ID '${tenantId}' is currently disabled`
  );
}

/**
 * Helper function to create a rate limit exceeded error
 */
export function createRateLimitError(retryAfterSeconds?: number): ApiError {
  const meta = retryAfterSeconds ? { retryAfter: retryAfterSeconds } : undefined;
  
  return createApiError(
    ErrorCode.RATE_LIMIT_EXCEEDED,
    'Rate limit exceeded. Please try again later.',
    undefined,
    meta
  );
}
