import * as math from './math'
import * as string from './string'

// 版本信息
const VERSION = '1.0.0'

// 始终导出 debug 函数，但其实现会根据环境不同而不同
let debug
if (process.env.NODE_ENV !== 'production') {
  debug = function (...args) {
    console.log('[MyUtils Debug]:', ...args)
  }
} else {
  debug = function () {} // 生产环境中的空函数
}

// 导出所有工具函数
export { math, string, VERSION, debug }
