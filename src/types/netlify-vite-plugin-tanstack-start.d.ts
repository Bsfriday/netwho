declare module '@netlify/vite-plugin-tanstack-start' {
  import type { Plugin } from 'vite'

  interface NetlifyVitePluginTanstackStartOptions {
    // Plugin options may vary; this is a generic fallback.
    [key: string]: unknown
  }

  export default function netlifyTanstackStart(
    options?: NetlifyVitePluginTanstackStartOptions,
  ): Plugin
}
