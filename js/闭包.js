// 经典闭包
function createCounter() {
  let count = 0

  return () => {
    count++
    return count
  }
}

const returnFn = createCounter()

console.log(returnFn())
console.log(returnFn())
console.log(returnFn())

// 数据私有化
function createUser() {
  let password = '123456'

  return {
    getPassword: () => password,
    checkPassword: (inputPassword) => inputPassword === password,
  }
}

const user = createUser()

console.log(user.getPassword())
console.log(user.checkPassword('1'))

// 闭包工厂
function multiply(a) {
  return (b) => {
    return a * b
  }
}

const multiplyFn1 = multiply(2)
const multiplyFn2 = multiply(3)

console.log(multiplyFn1(2))
console.log(multiplyFn2(3))
