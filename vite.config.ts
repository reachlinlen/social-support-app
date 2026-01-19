/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legacy({
      targets: ['chrome >= 64', 'safari >= 12'],
      modernPolyfills: true,
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      {
        find: '@ui',
        replacement: '/src/components/ui',
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/*'],
    setupFiles: ['./vitest-setup.ts'],
    include: ['src/*.spec.ts', 'src/*.spec.tsx', 'src/**/*.spec.ts', 'src/**/*.spec.tsx'],
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
    // browser: {
    //   enabled: false,
    //   provider: 'playwright',
    //   instances: [
    //     {
    //       browser: 'chromium',
    //       // setupFiles: './chromium-setup.js',
    //     },
    //   ],
    // },
  },
})
