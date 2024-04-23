import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    layouts: 'src/layouts/index.ts',
    types: 'src/types.ts',
  },
  format: ['esm'],
  clean: true,
  dts: true,
})
