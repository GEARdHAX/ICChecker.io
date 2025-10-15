import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

// --- CRITICAL: CSS IMPORT ORDER ---
// 1. PrimeReact Core & Theme CSS
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// 2. Your custom theme link (managed by the useTheme hook)
// This will be added to the <head> of your document dynamically

// 3. Your Tailwind CSS file (must come after PrimeReact styles)
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
);