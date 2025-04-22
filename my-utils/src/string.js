export function capitalize(str) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof str !== 'string') {
      console.warn('capitalize函数期望接收一个字符串参数')
    }
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function reverse(str) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof str !== 'string') {
      console.warn('reverse函数期望接收一个字符串参数')
    }
  }
  return str.split('').reverse().join('')
}
