import { defineConfig } from 'vite'
// vite.config.js/ts
// rollup.config.js
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import typescript from 'rollup-plugin-typescript2';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // entry: 'src/components/MyElement/my-element.ts',
      entry: 'src/components/double-extended-element/double-extended-element.ts',
      formats: ['es']
    },
    rollupOptions: {
      external: /^lit-element/,
    }
  },
  plugins: [
    postcss({
      inject: false,
    }),
    postcssLit(),
    typescript(),
  ],
})
