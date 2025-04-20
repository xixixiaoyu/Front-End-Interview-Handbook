import { terser } from 'rollup-plugin-terser' // 用于压缩代码，可选
import replace from '@rollup/plugin-replace'

const input = 'src/my-library.js'
const name = 'MyLibrary' // IIFE 格式暴露的全局变量名

export default [
  // 1. IIFE for direct browser usage
  {
    input: input,
    output: {
      file: 'dist/my-library.iife.js',
      format: 'iife',
      name: name,
      globals: {},
      sourcemap: true,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'), // Or 'production' for prod builds
        preventAssignment: true, // Recommended setting
      }),
    ],
  },
  // Production version of IIFE
  {
    input: input,
    output: {
      file: 'dist/my-library.iife.prod.js',
      format: 'iife',
      name: name,
      globals: {},
      sourcemap: false,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      terser(), // 压缩生产版本
    ],
  },

  // 2. ESM for modern browsers (<script type="module">)
  {
    input: input,
    output: {
      file: 'dist/my-library.esm-browser.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true,
      }),
    ],
  },
  // Production version of ESM for browsers
  {
    input: input,
    output: {
      file: 'dist/my-library.esm-browser.prod.js',
      format: 'esm',
      sourcemap: false,
    },
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true,
      }),
      terser(),
    ],
  },

  // 3. ESM for bundlers (Webpack, Rollup, Vite)
  {
    input: input,
    output: {
      file: 'dist/my-library.esm-bundler.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [], // Bundler 版本通常不包含 process.env 替换，留给打包工具处理
  },

  // 4. CommonJS for Node.js (SSR)
  {
    input: input,
    output: {
      file: 'dist/my-library.cjs.js',
      format: 'cjs',
      exports: 'named', // 或者 'default'，取决于你的库如何导出
      sourcemap: true,
    },
    plugins: [],
  },
]
