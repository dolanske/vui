import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'
// import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // dts({
    // rollupTypes: true,
    // tsconfigPath: 'tsconfig.json',
    // entryRoot: './src',
    // }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src', 'index.ts'),
      name: 'vui',
      fileName: 'vui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'sass', '@iconify/vue', '@vueuse/core'],
      output: {
        dir: 'dist',
      },
    },
  },
})
