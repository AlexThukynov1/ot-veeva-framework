import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import getSlidesEntries from './src/utils/getSlidesEntries';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getSlidesEntries(),
      output: {
        entryFileNames: '[name]/index.js',
        assetFileNames: '[name]/[name].[ext]'
      }
    }
  }
})
