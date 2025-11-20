import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';
import itemsRouter from './routes/items.js';
import { healthRoute } from './middleware/health.js';
import { errorHandler } from './middleware/error.js';
import { initSentry } from './monitoring/sentry.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Monitoring (Sentry)
const Sentry = initSentry(process.env.SENTRY_DSN);
if (Sentry) {
  app.use(Sentry.Handlers.requestHandler());
}

// Security, CORS, logging
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

// Health and API routes
app.get('/health', healthRoute);
app.use('/api/items', itemsRouter);

// Sentry error handler (before our error handler)
if (Sentry) {
  app.use(Sentry.Handlers.errorHandler());
}

// Error handler
app.use(errorHandler);

// Start server
(async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn('MONGO_URI is not set. Exiting.');
      process.exit(1);
    }
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start:', err);
    process.exit(1);
  }
})();
