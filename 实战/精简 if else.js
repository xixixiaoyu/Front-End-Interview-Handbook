// 也许我们不用那么多的 if else？
// 1. 使用映射表（对象/Map）
// 优化前
function getDiscountRateBefore(userType) {
  if (userType === 'vip') {
    return 0.8
  } else if (userType === 'regular') {
    return 0.9
  } else if (userType === 'new') {
    return 0.95
  } else {
    return 1
  }
}

// 优化后
function getDiscountRateAfter(userType) {
  const discountMap = {
    vip: 0.8,
    regular: 0.9,
    new: 0.95,
  }
  return discountMap[userType] || 1
}
console.log(getDiscountRateBefore('vip'))
console.log(getDiscountRateAfter('vip'))

// 2. 策略模式
// 优化前
function calculatePriceBefore(product, paymentType) {
  let price = product.basePrice
  if (paymentType === 'credit') {
    price = price * 1.05
  } else if (paymentType === 'debit') {
    price = price * 1.02
  } else if (paymentType === 'cash') {
    price = price * 0.98
  }
  return price
}

// 优化后
const priceStrategies = {
  credit: (price) => price * 1.05,
  debit: (price) => price * 1.02,
  cash: (price) => price * 0.98,
  default: (price) => price,
}
function calculatePriceAfter(product, paymentType) {
  const strategy = priceStrategies[paymentType] || priceStrategies.default
  return strategy(product.basePrice)
}

console.log(calculatePriceBefore({ basePrice: 100 }, 'credit'))
console.log(calculatePriceAfter({ basePrice: 100 }, 'credit'))

// 3. 提前返回（Early Return）
// 假设 doSomething 函数
function doSomething(user) {
  return user.name
}

// 优化前
function processUserBefore(user) {
  let result = null
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        result = doSomething(user)
      } else {
        console.log('无权限')
      }
    } else {
      console.log('用户未激活')
    }
  } else {
    console.log('用户不存在')
  }
  return result
}

// 优化后
function processUserAfter(user) {
  if (!user) {
    console.log('用户不存在')
    return null
  }

  if (!user.isActive) {
    console.log('用户未激活')
    return null
  }

  if (!user.hasPermission) {
    console.log('无权限')
    return null
  }

  return doSomething(user)
}

console.log(processUserBefore({ name: 'Alice', isActive: true, hasPermission: true }))
console.log(processUserAfter({ name: 'Alice', isActive: true, hasPermission: true }))

// 4. 工厂函数
function createShape(type) {
  const shapeFactory = {
    circle: (radius) => ({
      type: 'circle',
      radius,
      area: () => Math.PI * radius * radius,
    }),
    rectangle: (width, height) => ({
      type: 'rectangle',
      width,
      height,
      area: () => width * height,
    }),
    triangle: (base, height) => ({
      type: 'triangle',
      base,
      height,
      area: () => (base * height) / 2,
    }),
  }

  return shapeFactory[type] || null
}
// 使用
const circleCreator = createShape('circle')
const myCircle = circleCreator(5)
console.log(myCircle.area())

// 5. 多态（面向对象方式）
// 这里使用 JavaScript 模拟抽象类
class PaymentProcessor {
  process(amount) {
    throw new Error('必须实现 process 方法')
  }
}

class CreditCardProcessor extends PaymentProcessor {
  process(amount) {
    return amount * 1.05 // 信用卡手续费 5%
  }
}

class DebitCardProcessor extends PaymentProcessor {
  process(amount) {
    return amount * 1.02 // 借记卡手续费 2%
  }
}

// 使用
function getProcessor(type) {
  const processors = {
    credit: new CreditCardProcessor(),
    debit: new DebitCardProcessor(),
  }
  return processors[type] || processors.debit
}
const processor = getProcessor('credit')
console.log(processor.process(100))

// 6. 考虑使用三元运算符替代简单的 if-else
// 优化前
function checkAgeBefore(age) {
  if (age >= 18) {
    return '成年人'
  } else {
    return '未成年人'
  }
}

// 优化后
function checkAgeAfter(age) {
  return age >= 18 ? '成年人' : '未成年人'
}

console.log(checkAgeBefore(20))
console.log(checkAgeAfter(20))

// 8. 使用现代语法如 ?. 和 ?? 操作符减少空值判断
// 优化前
function getUserInfoBefore(user) {
  if (user && user.address && user.address.city) {
    return user.address.city
  } else {
    return '未知城市'
  }
}

// 优化后
function getUserInfoAfter(user) {
  return user?.address?.city ?? '未知城市'
}

const user = { address: { city: '北京' } }
console.log(getUserInfoBefore(user))
console.log(getUserInfoAfter(user))
