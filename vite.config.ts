import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escuchar en todas las interfaces
    port: 5173, // Puerto (puedes cambiarlo si es necesario)
    watch: {
      usePolling: true, // Necesario para que funcione correctamente en algunos entornos Docker
    },
  },
})
