import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes';
import businessRoutes from './routes/businessRoutes';
import enquiryRoutes from './routes/enquiryRoutes';
import { errorHandler } from './middleware/errorHandler';

export function createExpressApp() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Community Business Discovery API',
      timestamp: new Date().toISOString(),
    });
  });

  // API routes
  app.use('/api/categories', categoryRoutes);
  app.use('/api/businesses', businessRoutes);
  app.use('/api/enquiries', enquiryRoutes);

  // Error handling middleware for /api
  app.use('/api', errorHandler);

  return app;
}
