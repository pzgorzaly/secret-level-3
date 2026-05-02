// Ćwiczenie 9: Vite config for Turborepo Web App

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server
  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
  },

  // Build configuration
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },

  // Preview server
  preview: {
    port: 3000,
    host: true,
  },

  // Environment variables
  envPrefix: 'VITE_',

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    __TURBOREPO__: JSON.stringify(true),
  },
});