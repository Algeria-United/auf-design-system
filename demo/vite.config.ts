import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Demo of every component, built from dist/ (run `npm run build` first). Sample data only.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  server: { port: 5180 },
  build: { outDir: '../demo-dist', emptyOutDir: true },
});
