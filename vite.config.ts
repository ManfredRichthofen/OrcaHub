import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Frontend runs on port 3000
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Proxy requests to the backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
