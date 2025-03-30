// 浅拷贝示例
// 方法一：Object.assign()
const originalObject1 = { name: '小明', hobbies: ['跑步', '游泳'] }
const shallowCopy1 = Object.assign({}, originalObject1)

// 方法二：展开运算符
const shallowCopy2 = { ...originalObject1 }

// 测试浅拷贝
console.log(shallowCopy1 === originalObject1) // false
originalObject1.name = '小红'
originalObject1.hobbies.push('篮球')

console.log(shallowCopy1.name) // '小明'，没变，因为是基本类型
console.log(shallowCopy1.hobbies) // ['跑步', '游泳', '篮球']，变了！因为是引用类型

// 方法三：数组的浅拷贝
const originalArray = [1, 2, { a: 3 }]
const shallowArrayCopy1 = [...originalArray]
const shallowArrayCopy2 = originalArray.slice()
// 测试浅拷贝
originalArray[2].a = 4
console.log(shallowArrayCopy1[2].a) // 4，变了！因为是引用类型

// 深拷贝示例
// 方法一：JSON 转换（有局限性）
const originalObject2 = { name: '小明', hobbies: ['跑步', '游泳'] }
const deepCopy1 = JSON.parse(JSON.stringify(originalObject2))

// 方法二：手写递归函数
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  const result = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }

  return result
}

const deepCopy2 = deepClone(originalObject2)

// 测试深拷贝
originalObject2.name = '小红'
originalObject2.hobbies.push('篮球')

console.log(deepCopy1.name) // '小明'，没变
console.log(deepCopy1.hobbies) // ['跑步', '游泳']，也没变！
