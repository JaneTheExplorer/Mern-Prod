import * as Sentry from '@sentry/node';

export function initSentry(dsn) {
  if (!dsn) return null;
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV || 'development'
  });
  return Sentry;
}
