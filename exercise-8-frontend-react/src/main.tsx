// Ćwiczenie 8: Entry point dla React aplikacji

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log('🚀 Uruchamianie React Todo App...');
console.log('📡 API Base URL:', 'http://localhost:4000');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);