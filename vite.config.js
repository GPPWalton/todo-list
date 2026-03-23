import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/todo-list/",
  plugins: [react()],
  test: {
    globals: true, // Enables `test`, `describe`, `expect` globally
    environment: 'jsdom', // Emulates browser DOM
    setupFiles: './test-setup.js', // Global setup file for RTL
    include: [
      'src/components/**/*.test.jsx',
      'src/containers/**/*.test.jsx',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: ['node_modules/', '**/*.d.js'],
    },
  },
})
