import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',    // Para testear React
    globals: true,           // describe, test, expect
    setupFiles: './src/test/setup.ts',
    css: true
  }
})
