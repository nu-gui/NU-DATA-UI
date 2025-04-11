/**
 * logger.ts
 * Color-coded timestamped logging for frontend and backend
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const LOG_COLORS = {
  [LogLevel.DEBUG]: '\x1b[36m', // Cyan
  [LogLevel.INFO]: '\x1b[32m',  // Green
  [LogLevel.WARN]: '\x1b[33m',  // Yellow
  [LogLevel.ERROR]: '\x1b[31m', // Red
  RESET: '\x1b[0m',             // Reset
};

export interface LoggerConfig {
  minLevel: LogLevel;
  enableColors: boolean;
  includeTimestamp: boolean;
  serviceName?: string;
}

const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: LogLevel.INFO,
  enableColors: true,
  includeTimestamp: true,
};

/**
 * Logger class for consistent logging across frontend and backend
 */
export class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Format a log message with timestamp and service name if configured
   */
  private formatMessage(level: LogLevel, message: string): string {
    const parts: string[] = [];
    
    if (this.config.includeTimestamp) {
      const timestamp = new Date().toISOString();
      parts.push(`[${timestamp}]`);
    }
    
    parts.push(`[${level}]`);
    
    if (this.config.serviceName) {
      parts.push(`[${this.config.serviceName}]`);
    }
    
    parts.push(message);
    
    return parts.join(' ');
  }

  /**
   * Log a message with the specified level
   */
  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (this.shouldSkip(level)) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message);
    
    const coloredMessage = this.config.enableColors 
      ? `${LOG_COLORS[level]}${formattedMessage}${LOG_COLORS.RESET}`
      : formattedMessage;
    
    switch (level) {
      case LogLevel.ERROR:
        console.error(coloredMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(coloredMessage, ...args);
        break;
      case LogLevel.INFO:
        console.info(coloredMessage, ...args);
        break;
      case LogLevel.DEBUG:
        console.debug(coloredMessage, ...args);
        break;
      default:
        console.log(coloredMessage, ...args);
    }
  }

  /**
   * Check if a log level should be skipped based on minimum level
   */
  private shouldSkip(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const minLevelIndex = levels.indexOf(this.config.minLevel);
    const currentLevelIndex = levels.indexOf(level);
    
    return currentLevelIndex < minLevelIndex;
  }

  /**
   * Log a debug message
   */
  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  /**
   * Log an info message
   */
  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  /**
   * Log a warning message
   */
  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  /**
   * Log an error message
   */
  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  /**
   * Create a child logger with a specific context
   */
  createChildLogger(context: string): Logger {
    const childConfig = { ...this.config };
    childConfig.serviceName = this.config.serviceName 
      ? `${this.config.serviceName}:${context}`
      : context;
    
    return new Logger(childConfig);
  }
}

export const logger = new Logger();

export const debug = (message: string, ...args: any[]): void => logger.debug(message, ...args);
export const info = (message: string, ...args: any[]): void => logger.info(message, ...args);
export const warn = (message: string, ...args: any[]): void => logger.warn(message, ...args);
export const error = (message: string, ...args: any[]): void => logger.error(message, ...args);
