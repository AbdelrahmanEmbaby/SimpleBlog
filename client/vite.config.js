import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Use BACKEND_URL if set, otherwise default to localhost (dev)
  const apiUrl = env.BACKEND_URL || 'http://localhost:5000';

  return {
    plugins: [react(), tailwindcss()],
    // Expose the API URL to the frontend
    define: {
      'process.env.BACKEND_URL': JSON.stringify(apiUrl),
    },
    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});