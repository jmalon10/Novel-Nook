// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true, // Ensures Vite binds to all hosts, necessary for deployment environments like Render
    port: Number(process.env.PORT) || 3001 // Use Render's PORT environment variable or default to 3000
  },
  base: process.env.NODE_ENV === 'production' ? '/your-app-name/' : '/'
});
