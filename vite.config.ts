import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const lpath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../me-agencia-ds')

export default defineConfig(({ command }) => {
  const local = command === 'serve' && fs.existsSync(path.join(lpath, 'dist/index.mjs'))
  const alias: Record<string, string> = local
    ? {
        '@maxebina/max-ds/styles.css': path.join(lpath, 'dist/max-ds.css'),
        '@maxebina/max-ds': path.join(lpath, 'dist/index.mjs'),
      }
    : {}

  return {
    plugins: [react()],
    resolve: { alias },
    build: {
      rolldownOptions: {},
    },
    optimizeDeps: {
      include: ['three', 'three/examples/jsm/objects/Water.js', 'three/examples/jsm/objects/Sky.js'],
      exclude: local ? ['@maxebina/max-ds'] : [],
    },
  }
})
