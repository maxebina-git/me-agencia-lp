import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {},
  },
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/objects/Water.js', 'three/examples/jsm/objects/Sky.js'],
  },
})
