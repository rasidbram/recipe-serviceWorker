// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/dummyjson\.com\/recipes\/.*/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'recipe-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
});
