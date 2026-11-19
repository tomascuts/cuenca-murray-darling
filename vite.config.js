import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base relativa: la app funciona en GitHub Pages bajo /<repositorio>/ sin configurar el nombre.
export default defineConfig({
  plugins: [react()],
  base: './',
})
