// server.js

// 使用 require 导入 CommonJS 格式的构建产物
// package.json 中的 "main": "dist/my-library.cjs.js" 使得我们可以直接 require('build-formats-demo')
// 但为了清晰起见，这里直接指定路径
const { greet, advancedFeature } = require('./dist/my-library.cjs.js')

console.log('--- CJS Build Format Demo (Node.js) ---')

// 检查导入是否成功
if (greet && advancedFeature) {
  console.log('my-library (CJS) loaded successfully.')

  // 使用导入的函数
  const message = greet('Node Server')
  console.log(`Message from library: ${message}`)

  // 调用另一个函数
  // 注意：CJS 版本默认也会看到开发环境警告，除非 Rollup 配置中特别处理 process.env
  advancedFeature()
} else {
  console.error('my-library (CJS) failed to load.')
}

console.log('--- End CJS Demo ---')
