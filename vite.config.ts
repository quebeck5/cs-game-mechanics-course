import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@course': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    port: 4000,
    open: false,
  },
});
