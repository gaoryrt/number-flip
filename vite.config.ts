import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => ({
  root: mode === 'test' ? 'test' : 'example',
  server: { open: true },
}))
