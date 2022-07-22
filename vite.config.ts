import { defineConfig } from 'vite'
// vite.config.js/ts
// rollup.config.js
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/Menu/Menu.ts',
      formats: ['es']
    },
    // rollupOptions: {
    //   external: /^lit-element/,
    // }
  },
  plugins: [
    postcss({
      inject: false,
    }),
    postcssLit(),
  ],
})
