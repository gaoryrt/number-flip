import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['number-flip.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    outDir: 'dist',
    outExtension: () => ({ js: '.mjs' }),
    target: 'es2015',
  },
  {
    entry: ['number-flip.ts'],
    format: ['cjs'],
    dts: false,
    outDir: 'dist',
    outExtension: () => ({ js: '.cjs' }),
    target: 'es2015',
  },
  {
    entry: { index: 'number-flip.ts' },
    format: ['iife'],
    globalName: 'NumberFlip',
    dts: false,
    outDir: 'dist',
    target: 'es2015',
  },
])
