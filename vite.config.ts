/// <reference types="vitest" />
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: './tsconfig.app.json',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: 'vui',
      fileName: 'vui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'sass'],
      input: ['./src/index.ts'],
      output: {
        dir: 'dist',
        exports: 'named',
      },
    },
  },
})
