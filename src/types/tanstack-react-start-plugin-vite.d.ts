declare module '@tanstack/react-start/plugin/vite' {
  import type { Plugin } from 'vite'

  interface TanStackStartViteOptions {
    // Vite plugin options may vary by version.
    [key: string]: unknown
  }

  export function tanstackStart(options?: TanStackStartViteOptions): Plugin
}
