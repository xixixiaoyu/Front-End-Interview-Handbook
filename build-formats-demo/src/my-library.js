// src/my-library.js

// 一个简单的函数，用于演示
function greet(name) {
  const message = `Hello, ${name}! This is from my-library.`
  console.log(message)
  return message
}

// 另一个函数，可能只在特定环境使用
function advancedFeature() {
  // 模拟开发环境警告
  if (process.env.NODE_ENV !== 'production') {
    console.warn('Advanced feature is running in development mode.')
  }
  console.log('Executing advanced feature...')
  return 'Advanced feature result'
}

// 导出函数，以便不同的构建格式可以使用
export { greet, advancedFeature }

// 也可以有默认导出
// export default { greet, advancedFeature };
// 注意：选择 named exports 或 default export 会影响 CJS 的输出方式 (exports: 'named' vs 'default')
