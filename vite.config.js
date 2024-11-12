import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/',
  build: {
    outDir: './dist',  // This will create dist in root
    sourcemap: true,
    assetsDir: 'assets',
    emptyOutDir: true
  },
  root: './src',
  server: {
    port: 5173,
    fs: {
      // Allow serving files from the project root
      allow: ['..']
    }
  }
})
