import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: []
      }
    })
  ],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2015'
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})
