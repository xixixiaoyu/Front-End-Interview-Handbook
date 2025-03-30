// 1. typeof 操作符
console.log(typeof 'hello world') // 'string'
console.log(typeof 42) // 'number'
console.log(typeof true) // 'boolean'
console.log(typeof undefined) // 'undefined'
console.log(typeof function () {}) // 'function'
console.log(typeof null) // 'object'，这是 JS 的一个历史遗留 bug
console.log(typeof []) // 'object'，无法区分数组和普通对象

// 2. instanceof 操作符
let arr = [1, 2, 3]
console.log(arr instanceof Array) // true

let date = new Date()
console.log(date instanceof Date) // true

console.log('hello' instanceof String) // false，字面量创建的字符串不是 String 对象的实例
console.log(new String('hello') instanceof String) // true

// 3. Object.prototype.toString.call()
console.log(Object.prototype.toString.call('hello')) // '[object String]'
console.log(Object.prototype.toString.call(42)) // '[object Number]'
console.log(Object.prototype.toString.call(true)) // '[object Boolean]'
console.log(Object.prototype.toString.call(undefined)) // '[object Undefined]'
console.log(Object.prototype.toString.call(null)) // '[object Null]'
console.log(Object.prototype.toString.call({})) // '[object Object]'
console.log(Object.prototype.toString.call([])) // '[object Array]'

const getType = (obj) => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

console.log(getType([])) // 'array'
console.log(getType({})) // 'object'
console.log(getType(null)) // 'null'

// 4. Array.isArray()
console.log(Array.isArray([])) // true
console.log(Array.isArray({})) // false

// 5. constructor 属性
let num = 123
console.log(num.constructor === Number) // true

let arr2 = []
console.log(arr2.constructor === Array) // true

function Person() {}
Person.prototype = new Array()
let person = new Person()
console.log(person.constructor === Array) // true，但 person 不是数组

// 6. 特定类型的检测函数
// 检测 NaN
console.log(isNaN(NaN)) // true，但会进行类型转换
console.log(Number.isNaN(NaN)) // true，更严格的检测

// 检测有限数
console.log(Number.isFinite(42)) // true
console.log(Number.isFinite(Infinity)) // false

// 实际应用建议
// 检测基本类型（string、number、boolean、undefined）：用 typeof
let str = 'test'
console.log(typeof str === 'string')

// 检测数组：用 Array.isArray()
let arr3 = [1, 2, 3]
console.log(Array.isArray(arr3))

// 检测 null：直接用 === null
let nullValue = null
console.log(nullValue === null)

// 需要精确区分所有类型：用 Object.prototype.toString.call()
let obj = {}
console.log(Object.prototype.toString.call(obj) === '[object Object]')
