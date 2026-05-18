declare module '@vitejs/plugin-react' {
  import type { Plugin } from 'vite'

  interface ReactPluginOptions {
    jsxRuntime?: 'automatic' | 'classic'
    jsxImportSource?: string
    babel?: any
    fastRefresh?: boolean
    include?: RegExp | RegExp[] | string | string[]
    exclude?: RegExp | RegExp[] | string | string[]
  }

  export default function react(options?: ReactPluginOptions): Plugin
}
