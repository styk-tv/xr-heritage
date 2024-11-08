import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',  // For custom domain
  build: {
    outDir: '../dist',
    sourcemap: true,  // Enable source maps
    assetsDir: 'assets'
  },
  root: './src',
  server: {
    port: 5173
  }
})