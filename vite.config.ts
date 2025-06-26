// vite.config.ts
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  server: {
    allowedHosts: ["127.0.0.1", "lastbeat.app"],
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [tsConfigPaths(), tanstackStart()],
  css: {
    postcss: './postcss.config.mjs',
  },
})
