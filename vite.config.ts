/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="./vite-env-override.d.ts" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgLoader from 'vite-svg-loader';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: './app',
  plugins: [react(), viteTsconfigPaths(), svgLoader(), svgr()],
  server: {
    port: 5173,
  },
  preview: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testing/setup-tests.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    coverage: {
      include: ['src/**'],
    },
  },
  optimizeDeps: { exclude: ['fsevents'] },
});
