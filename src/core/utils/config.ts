/**
 * config.ts
 * Central app config values (port, env, tokens)
 */

import { Environment, getEnvironment, loadEnvVars, EnvVarConfig } from './env';
import { logger } from './logger';

export interface AppConfig {
  server: {
    port: number;
    host: string;
    apiPrefix: string;
    corsOrigins: string[];
    trustProxy: boolean;
  };
  
  environment: Environment;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  
  auth: {
    jwtSecret: string;
    jwtExpiration: string;
    refreshTokenExpiration: string;
    passwordResetExpiration: string;
  };
  
  database: {
    url: string;
    maxConnections: number;
    idleTimeoutMillis: number;
  };
  
  redis?: {
    url: string;
    prefix: string;
  };
  
  logging: {
    level: string;
    enableColors: boolean;
    includeTimestamp: boolean;
  };
  
  rateLimit: {
    windowMs: number;
    maxRequests: number;
    message: string;
  };
}

const defaultConfig: AppConfig = {
  server: {
    port: 3000,
    host: '0.0.0.0',
    apiPrefix: '/api',
    corsOrigins: ['http://localhost:3000'],
    trustProxy: false,
  },
  environment: Environment.DEVELOPMENT,
  isDevelopment: true,
  isProduction: false,
  isTest: false,
  auth: {
    jwtSecret: 'development-secret-key-do-not-use-in-production',
    jwtExpiration: '1h',
    refreshTokenExpiration: '7d',
    passwordResetExpiration: '15m',
  },
  database: {
    url: 'postgresql://postgres:postgres@localhost:5432/nu_data_ui',
    maxConnections: 10,
    idleTimeoutMillis: 30000,
  },
  logging: {
    level: 'info',
    enableColors: true,
    includeTimestamp: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    message: 'Too many requests, please try again later.',
  },
};

const configEnvVars: EnvVarConfig[] = [
  { name: 'PORT', required: false, default: '3000' },
  { name: 'HOST', required: false, default: '0.0.0.0' },
  { name: 'API_PREFIX', required: false, default: '/api' },
  { name: 'CORS_ORIGINS', required: false, default: 'http://localhost:3000' },
  { name: 'TRUST_PROXY', required: false, default: 'false' },
  
  { name: 'JWT_SECRET', required: true },
  { name: 'JWT_EXPIRATION', required: false, default: '1h' },
  { name: 'REFRESH_TOKEN_EXPIRATION', required: false, default: '7d' },
  { name: 'PASSWORD_RESET_EXPIRATION', required: false, default: '15m' },
  
  { name: 'DATABASE_URL', required: true },
  { name: 'DB_MAX_CONNECTIONS', required: false, default: '10' },
  { name: 'DB_IDLE_TIMEOUT', required: false, default: '30000' },
  
  { name: 'REDIS_URL', required: false },
  { name: 'REDIS_PREFIX', required: false, default: 'nu_data_ui:' },
  
  { name: 'LOG_LEVEL', required: false, default: 'info' },
  { name: 'LOG_COLORS', required: false, default: 'true' },
  { name: 'LOG_TIMESTAMP', required: false, default: 'true' },
  
  { name: 'RATE_LIMIT_WINDOW_MS', required: false, default: '900000' },
  { name: 'RATE_LIMIT_MAX_REQUESTS', required: false, default: '100' },
];

/**
 * Load configuration from environment variables
 * @returns Application configuration
 */
export function loadConfig(): AppConfig {
  try {
    const env = loadEnvVars(configEnvVars);
    
    const environment = getEnvironment();
    const isDevelopment = environment === Environment.DEVELOPMENT;
    const isProduction = environment === Environment.PRODUCTION;
    const isTest = environment === Environment.TEST;
    
    const corsOriginsStr = env.CORS_ORIGINS || defaultConfig.server.corsOrigins.join(',');
    const corsOrigins = corsOriginsStr.split(',').map(origin => origin.trim());
    
    const config: AppConfig = {
      server: {
        port: parseInt(env.PORT || defaultConfig.server.port.toString(), 10),
        host: env.HOST || defaultConfig.server.host,
        apiPrefix: env.API_PREFIX || defaultConfig.server.apiPrefix,
        corsOrigins,
        trustProxy: env.TRUST_PROXY === 'true',
      },
      environment,
      isDevelopment,
      isProduction,
      isTest,
      auth: {
        jwtSecret: env.JWT_SECRET || defaultConfig.auth.jwtSecret,
        jwtExpiration: env.JWT_EXPIRATION || defaultConfig.auth.jwtExpiration,
        refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION || defaultConfig.auth.refreshTokenExpiration,
        passwordResetExpiration: env.PASSWORD_RESET_EXPIRATION || defaultConfig.auth.passwordResetExpiration,
      },
      database: {
        url: env.DATABASE_URL || defaultConfig.database.url,
        maxConnections: parseInt(env.DB_MAX_CONNECTIONS || defaultConfig.database.maxConnections.toString(), 10),
        idleTimeoutMillis: parseInt(env.DB_IDLE_TIMEOUT || defaultConfig.database.idleTimeoutMillis.toString(), 10),
      },
      logging: {
        level: env.LOG_LEVEL || defaultConfig.logging.level,
        enableColors: env.LOG_COLORS === 'true',
        includeTimestamp: env.LOG_TIMESTAMP === 'true',
      },
      rateLimit: {
        windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS || defaultConfig.rateLimit.windowMs.toString(), 10),
        maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS || defaultConfig.rateLimit.maxRequests.toString(), 10),
        message: defaultConfig.rateLimit.message,
      },
    };
    
    if (env.REDIS_URL) {
      config.redis = {
        url: env.REDIS_URL,
        prefix: env.REDIS_PREFIX || defaultConfig.redis?.prefix || 'nu_data_ui:',
      };
    }
    
    if (isDevelopment) {
      const sanitizedConfig = { ...config };
      if (sanitizedConfig.auth) {
        sanitizedConfig.auth = { ...sanitizedConfig.auth, jwtSecret: '***' };
      }
      if (sanitizedConfig.database) {
        sanitizedConfig.database = { ...sanitizedConfig.database, url: '***' };
      }
      if (sanitizedConfig.redis) {
        sanitizedConfig.redis = { ...sanitizedConfig.redis, url: '***' };
      }
      
      logger.debug('Loaded configuration:', sanitizedConfig);
    }
    
    return config;
  } catch (error) {
    logger.error('Failed to load configuration:', error);
    throw error;
  }
}

export const config = loadConfig();
