import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global backend URL configuration
// export const API_BASE_URL = 'https://gurukulbakery.com/api';
export const API_BASE_URL = 'http://localhost:3001';

console.log('Main.tsx loaded, API_BASE_URL:', API_BASE_URL);

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  console.log('Root element found, rendering App...');
  createRoot(rootElement).render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
}
