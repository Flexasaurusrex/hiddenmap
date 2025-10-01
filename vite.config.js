import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      fastRefresh: false  // Disable Fast Refresh to avoid CSP issues
    })
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false
  }
})
