import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

// Add error boundary wrapper
const renderApp = () => {
  try {
    root.render(
      <StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to render app:', error);
    // Fallback render
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #fff; background: #0A1930; min-height: 100vh;">
        <h1>Loading...</h1>
        <p>If this message persists, please refresh the page.</p>
      </div>
    `;
  }
};

renderApp();

// Register Service Worker for PWA support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}