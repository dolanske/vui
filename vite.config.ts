import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({
    rollupTypes: true,
  })],
  build: {
    lib: { // tell the build process to treat this project as library
      // entry: resolve(__dirname, 'src/index.ts'),
      entry: '/src/index.ts',
      name: 'vui',
      fileName: 'vui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'sass'],
      output: {
        dir: 'dist',
      },
    },
  },
})
