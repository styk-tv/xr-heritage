import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Set base to /xr-heritage/ for GitHub Pages, root (/) for development
  base: process.env.NODE_ENV === 'production' ? '/xr-heritage/' : '/',
  build: {
    outDir: './dist',
    sourcemap: true,
    assetsDir: 'assets',
    emptyOutDir: true
  },
  root: './src',
  publicDir: '../public',
  server: {
    port: 5173,
    fs: {
      allow: ['..']
    }
  }
})
