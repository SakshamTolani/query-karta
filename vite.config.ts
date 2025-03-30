import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['@chakra-ui/babel-plugin'],
      },
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|html)$/i,
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chakra-vendor': ['@chakra-ui/react'],
          'monaco-vendor': ['@monaco-editor/react']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
});