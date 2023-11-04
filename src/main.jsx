import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { DarkModeProvider } from './context/DarkModeContext.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace('/')}>
      <DarkModeProvider>
        <App />
      </DarkModeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
