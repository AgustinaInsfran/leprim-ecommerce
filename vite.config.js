import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url' 


const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {

        main: resolve(__dirname, 'index.html'),
        palas: resolve(__dirname, 'palas.html'),
        ropa: resolve(__dirname, 'ropa.html'),
        accesorios: resolve(__dirname, 'accesorios.html'),
        zapatillas: resolve(__dirname, 'zapatillas.html')

      }
    }
  }
})