/**
 * env.ts
 * Loads .env, validates required fields
 */

import { logger } from './logger';

export enum Environment {
  DEVELOPMENT = 'development',
  TEST = 'test',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export interface EnvVarConfig {
  name: string;
  required: boolean;
  default?: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

export class EnvVarError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EnvVarError';
  }
}

/**
 * Load and validate environment variables
 * @param configs Array of environment variable configurations
 * @returns Object with validated environment variables
 */
export function loadEnvVars(configs: EnvVarConfig[]): Record<string, string> {
  const result: Record<string, string> = {};
  const errors: string[] = [];

  for (const config of configs) {
    const { name, required, default: defaultValue, validator, errorMessage } = config;
    
    let value = process.env[name] || defaultValue;
    
    if (required && value === undefined) {
      errors.push(`Required environment variable ${name} is missing`);
      continue;
    }
    
    if (!required && value === undefined) {
      continue;
    }
    
    if (value !== undefined && validator && !validator(value)) {
      errors.push(errorMessage || `Environment variable ${name} failed validation`);
      continue;
    }
    
    if (value !== undefined) {
      result[name] = value;
    }
  }
  
  if (errors.length > 0) {
    const errorMessage = `Environment validation failed:\n${errors.join('\n')}`;
    logger.error(errorMessage);
    throw new EnvVarError(errorMessage);
  }
  
  return result;
}

/**
 * Get current environment
 * @returns Current environment (development, test, staging, or production)
 */
export function getEnvironment(): Environment {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env.toLowerCase()) {
    case 'production':
      return Environment.PRODUCTION;
    case 'staging':
      return Environment.STAGING;
    case 'test':
      return Environment.TEST;
    default:
      return Environment.DEVELOPMENT;
  }
}

/**
 * Check if current environment is production
 * @returns True if production environment
 */
export function isProduction(): boolean {
  return getEnvironment() === Environment.PRODUCTION;
}

/**
 * Check if current environment is development
 * @returns True if development environment
 */
export function isDevelopment(): boolean {
  return getEnvironment() === Environment.DEVELOPMENT;
}

/**
 * Check if current environment is test
 * @returns True if test environment
 */
export function isTest(): boolean {
  return getEnvironment() === Environment.TEST;
}

/**
 * Common environment variable configurations
 */
export const commonEnvVars: EnvVarConfig[] = [
  {
    name: 'NODE_ENV',
    required: true,
    default: 'development',
    validator: (value) => ['development', 'test', 'staging', 'production'].includes(value.toLowerCase()),
    errorMessage: 'NODE_ENV must be one of: development, test, staging, production',
  },
  {
    name: 'PORT',
    required: false,
    default: '3000',
    validator: (value) => /^\d+$/.test(value) && parseInt(value, 10) > 0,
    errorMessage: 'PORT must be a positive number',
  },
  {
    name: 'JWT_SECRET',
    required: true,
    validator: (value) => value.length >= 32,
    errorMessage: 'JWT_SECRET must be at least 32 characters long',
  },
  {
    name: 'JWT_EXPIRATION',
    required: false,
    default: '1h',
    validator: (value) => /^\d+[smhd]$/.test(value),
    errorMessage: 'JWT_EXPIRATION must be in format: <number><unit> where unit is s, m, h, or d',
  },
  {
    name: 'DATABASE_URL',
    required: true,
    validator: (value) => value.startsWith('postgresql://'),
    errorMessage: 'DATABASE_URL must be a valid PostgreSQL connection string',
  },
  {
    name: 'REDIS_URL',
    required: false,
    validator: (value) => value.startsWith('redis://'),
    errorMessage: 'REDIS_URL must be a valid Redis connection string',
  },
  {
    name: 'LOG_LEVEL',
    required: false,
    default: 'info',
    validator: (value) => ['debug', 'info', 'warn', 'error'].includes(value.toLowerCase()),
    errorMessage: 'LOG_LEVEL must be one of: debug, info, warn, error',
  },
];

/**
 * Load common environment variables
 * @returns Object with validated common environment variables
 */
export function loadCommonEnvVars(): Record<string, string> {
  return loadEnvVars(commonEnvVars);
}
