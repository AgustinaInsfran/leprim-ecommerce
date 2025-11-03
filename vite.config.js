import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path' 

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