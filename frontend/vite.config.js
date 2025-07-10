import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: {
      proxy: isDev
        ? {
            '/api': {
              target: 'http://localhost:5000',
              changeOrigin: true,
            },
          }
        : undefined,
    },
  };
});
