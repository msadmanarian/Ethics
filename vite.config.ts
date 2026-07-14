import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/your-repository-name/', // <-- Replace with your exact repository name
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
});
