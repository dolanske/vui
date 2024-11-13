import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      // insertTypesEntry: true,
      // include: ['src'],
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.app.json'),
    }),
    // dts({
    // rollupTypes: true,
    // tsconfigPath: 'tsconfig.json',
    // entryRoot: './src',
    // }),
  ],
  build: {
    // outDir: 'es',
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
