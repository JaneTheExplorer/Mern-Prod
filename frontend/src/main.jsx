import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import * as Sentry from '@sentry/react';

if (import.meta.env.VITE_SENTRY_DSN) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [new Sentry.BrowserTracing()],
    tracesSampleRate: 0.1,
    environment: import.meta.env.MODE
  });
}

createRoot(document.getElementById('root')).render(<App />);
