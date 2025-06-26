import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
   proxy: {
      '/api': 'https://agharnkc.onrender.com',  // Remove the extra /api here
    },
  },
})

