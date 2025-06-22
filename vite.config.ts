// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 3000,
  },
  plugins: [tsConfigPaths(), tanstackStart()],
  css: {
    postcss: './postcss.config.mjs',
  },
})
