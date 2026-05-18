import { defineConfig } from 'vite'
import { resolve } from 'path'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import netlify from '@netlify/vite-plugin-tanstack-start'
import { VitePWA } from 'vite-plugin-pwa'

const config = defineConfig({
  resolve: {
    alias: [
      { find: /^@\/(.*)/, replacement: resolve(__dirname, 'src/$1') },
      { find: /^~\/(.*)/, replacement: resolve(__dirname, 'src/$1') },
    ],
  },
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    netlify(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'manifest.webmanifest', 'netwho-icon.svg', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'],
      manifest: {
        name: 'NetWho',
        short_name: 'NetWho',
        description: 'NetWho is an IP intelligence platform with privacy tools, VPN checks, DNS leak tests, and speed testing.',
        theme_color: '#070b14',
        background_color: '#070b14',
        display: 'standalone',
        start_url: '/?v=2',
        scope: '/',
        icons: [
          { src: '/netwho-icon.svg?v=2', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: '/icon-192.png?v=2', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /\/(?:manifest\.webmanifest|icon-192\.png|icon-512\.png|netwho-icon\.svg|apple-touch-icon\.png)(?:\?.*)?$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pwa-manifest-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /^https?:.*\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /^https?:.*\.(js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
            },
          },
          {
            urlPattern: /\/.*$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
