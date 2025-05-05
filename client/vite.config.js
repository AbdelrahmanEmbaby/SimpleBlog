import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  const apiUrl = env.BACKEND_URL || 'http://localhost:5000';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': {
        BACKEND_URL: JSON.stringify(apiUrl),
        NODE_ENV: JSON.stringify(mode)
      }
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});