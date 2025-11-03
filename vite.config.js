import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  root: '.', 
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        palas: resolve(__dirname, 'palas.html'),
        ropa: resolve(__dirname, 'ropa.html'),
        accesorios: resolve(__dirname, 'accesorios.html'),
        zapatillas: resolve(__dirname, 'zapatillas.html'),
      },
    },
  },
})
