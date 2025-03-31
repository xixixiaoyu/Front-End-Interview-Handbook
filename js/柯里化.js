// 柯里化示例代码

// 普通函数
const add = (a, b, c) => a + b + c
console.log(add(1, 2, 3)) // 6

// 柯里化后的函数
const curriedAdd = (a) => (b) => (c) => a + b + c
console.log(curriedAdd(1)(2)(3)) // 6

// 表单验证示例
// 未柯里化版本
const validate = (validator, value) => validator(value)

// 柯里化版本
const validateCurried = (validator) => (value) => validator(value)

// 使用柯里化创建特定验证器
const isEmail = (value) => /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value)
const validateEmail = validateCurried(isEmail)

// 验证邮箱
console.log(validateEmail('user@example.com')) // true
console.log(validateEmail('invalid-email')) // false

// 通用的柯里化函数
const curry = (fn) => {
  // 获取原始函数的参数数量
  const arity = fn.length

  return function curried(...args) {
    // 如果传入的参数数量达到或超过原始函数的参数数量
    if (args.length >= arity) {
      // 直接调用原始函数并传入所有参数
      return fn(...args)
    }
    // 如果参数数量不足，返回一个新函数继续接收剩余参数
    return (...moreArgs) => curried(...args, ...moreArgs)
  }
}

// 使用示例
const sum = (a, b, c) => a + b + c
const curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3)) // 6
console.log(curriedSum(1, 2)(3)) // 6
console.log(curriedSum(1)(2, 3)) // 6
console.log(curriedSum(1, 2, 3)) // 6
