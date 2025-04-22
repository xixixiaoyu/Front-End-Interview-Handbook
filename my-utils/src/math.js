export function add(a, b) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof a !== 'number' || typeof b !== 'number') {
      console.warn('add函数期望接收两个数字参数')
    }
  }
  return a + b
}

export function multiply(a, b) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof a !== 'number' || typeof b !== 'number') {
      console.warn('multiply函数期望接收两个数字参数')
    }
  }
  return a * b
}
