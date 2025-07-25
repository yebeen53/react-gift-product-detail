import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import p from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': p.resolve(__dirname, 'src'),
      '@utils': p.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },
});
