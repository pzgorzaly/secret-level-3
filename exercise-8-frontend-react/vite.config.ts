// Ćwiczenie 8: Konfiguracja Vite

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    port: 3000,
    host: true, // Pozwala na dostęp z innych urządzeń w sieci
    open: true, // Automatycznie otwiera browser
    cors: true, // Włącza CORS
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true, // Source maps dla debugowania
    minify: 'esbuild', // Szybka minifikacja
  },

  // Preview server (production build preview)
  preview: {
    port: 3000,
    host: true,
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
  },
});