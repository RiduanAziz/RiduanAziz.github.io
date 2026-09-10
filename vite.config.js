import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // If deploying to https://riduanaziz.github.io/, base should be '/'
  base: '/', 
})