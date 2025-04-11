/**
 * Server entry point
 * Starts the Express server
 */
import app from './app';
import { logger } from './core/utils/logger';
import { loadCommonEnvVars } from './core/utils/env';

const env = loadCommonEnvVars();
const PORT = env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${env.NODE_ENV || 'development'}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
  logger.info(`API base URL: http://localhost:${PORT}/api/v1`);
});

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`);
  logger.error(error.stack || 'No stack trace available');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Promise Rejection');
  logger.error(`Reason: ${reason}`);
  process.exit(1);
});
