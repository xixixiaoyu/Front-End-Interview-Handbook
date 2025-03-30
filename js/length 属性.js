// 1. 没有参数的函数
function sayHello() {
  console.log('Hello!')
}

console.log(sayHello.length) // 输出 0

// 2. 有固定参数的函数
function greet(name, message) {
  console.log(`${name}, ${message}`)
}

console.log(greet.length) // 输出 2

// 3. 遇到带默认值的参数
function calculate(a, b = 10, c) {
  return a + b + c
}

console.log(calculate.length) // 输出 1

// 4. 遇到剩余参数 (Rest Parameters)
function sum(a, ...numbers) {
  let total = a
  for (const num of numbers) {
    total += num
  }
  return total
}

console.log(sum.length) // 输出 1
