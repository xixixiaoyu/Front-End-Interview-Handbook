// utils.js - 基础工具模块
let handleError = null

const utils = {
  // 执行回调函数的工具方法
  foo(fn) {
    callWithErrorHandling(fn)
  },

  bar(fn) {
    callWithErrorHandling(fn)
  },

  // 注册自定义错误处理器
  registerErrorHandler(fn) {
    handleError = fn
  },
}

// 统一的错误处理包装函数
function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    // 如果用户注册了错误处理器，则调用它
    handleError && handleError(e)
  }
}

// 使用示例
utils.registerErrorHandler((error) => {
  console.error('捕获到错误:', error)
  // 可以添加错误上报逻辑
  // errorMonitor.report(error)
})

// 测试错误处理
utils.foo(() => {
  throw new Error('测试错误')
})
