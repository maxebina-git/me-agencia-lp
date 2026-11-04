import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@maxebina/max-ds': path.resolve(__dirname, 'node_modules/@maxebina/max-ds/dist/index.es.js'),
    },
  },
  build: {
    rolldownOptions: {
      // @maxebina/max-ds bundled internally via link
    },
  },
  optimizeDeps: {
    include: ['three', 'three/examples/jsm/objects/Water.js', 'three/examples/jsm/objects/Sky.js'],
  },
})
