
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Substitui process.env.API_KEY pelo valor configurado no ambiente de build (Vercel)
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    // Define um objeto process básico para evitar erros de "process is not defined" em libs externas
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      API_KEY: JSON.stringify(process.env.API_KEY)
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'lucide-react', '@google/genai']
        }
      }
    }
  }
});
