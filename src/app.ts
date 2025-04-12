/**
 * Main application file
 * Sets up Express server with middleware and routes
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './auth';
import { logger } from './core/utils/logger';
import { loadCommonEnvVars } from './core/utils/env';

const env = loadCommonEnvVars();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use('/api/v1/auth', authRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error: ${err.message}`);
  
  res.status(err.status || 500).json({
    errors: [{
      status: (err.status || 500).toString(),
      title: err.name || 'Internal Server Error',
      detail: err.message || 'An unexpected error occurred'
    }]
  });
});

export default app;
