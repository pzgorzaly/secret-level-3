// Ćwiczenie 9: Entry point dla Turborepo React App

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('🚀 Uruchamianie Turborepo React App...');
console.log('📦 Monorepo Architecture with Turborepo');
console.log('📡 API Base URL:', import.meta.env.VITE_API_URL || 'http://localhost:4000');
console.log('🎉 DELETE functionality zaimplementowana!');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);