// rollup.config.js
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const isProduction = process.env.NODE_ENV === 'production'
const name = 'MyUtils'

// 创建不同格式的配置
function createConfig(format, outputFile, plugins = []) {
  return {
    input: 'src/index.js',
    output: {
      file: outputFile,
      format,
      name: format === 'iife' ? name : undefined,
      exports: 'named',
    },
    plugins: [
      nodeResolve(),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        preventAssignment: true,
      }),
      ...plugins,
    ],
  }
}

export default [
  // 1. IIFE 格式 (浏览器直接使用)
  createConfig(
    'iife',
    `dist/${name.toLowerCase()}.global${isProduction ? '.prod' : ''}.js`,
    isProduction ? [terser()] : []
  ),

  // 2. ESM 格式 (浏览器)
  createConfig(
    'esm',
    `dist/${name.toLowerCase()}.esm-browser${isProduction ? '.prod' : ''}.js`,
    isProduction ? [terser()] : []
  ),

  // 3. ESM 格式 (打包工具)
  createConfig('esm', `dist/${name.toLowerCase()}.esm-bundler.js`),

  // 4. CommonJS 格式 (Node.js)
  createConfig('cjs', `dist/${name.toLowerCase()}.cjs.js`),
]
