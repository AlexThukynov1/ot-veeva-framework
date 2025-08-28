import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import getSlideEntries from './src/utils/getSlidesEntries'
import getCopyTargets from './src/utils/getCopyTargets'



export default defineConfig({
  plugins: [
    react(),
      viteStaticCopy({
      targets: getCopyTargets(),
      hook: 'writeBundle', // Запускаємо копіювання після збірки
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: getSlideEntries(),
      output: {
        entryFileNames: 'src/slides/[name]/index.js',
        assetFileNames: 'src/slides/[name]/[name].[ext]',
      },
    },
  },
});