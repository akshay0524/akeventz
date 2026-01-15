import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/akeventz/', // 👈 IMPORTANT: Matches your GitHub repo name
  server: {
    port: 3000,
  },
});
