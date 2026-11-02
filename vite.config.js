import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The 3D hero (three.js) is loaded lazily as its own chunk, so its size does not slow the first paint.
export default defineConfig({ plugins: [react(), tailwindcss()], build: { chunkSizeWarningLimit: 700 } })
