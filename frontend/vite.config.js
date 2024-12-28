import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://e-commerce-1-6q5w.onrender.com",  // Your Render backend URL
        changeOrigin: true,  // Ensures the host header is changed to the target URL
      }
    }
  }
})
