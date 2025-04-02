// 1. 使用对象映射（最简单直接）
// 优化前
function getDiscountRateBefore(memberType) {
  if (memberType === 'vip') {
    return 0.8
  } else if (memberType === 'regular') {
    return 0.9
  } else if (memberType === 'new') {
    return 0.95
  } else {
    return 1
  }
}
console.log('getDiscountRateBefore', getDiscountRateBefore('vip')) // 0.8

// 优化后
function getDiscountRateAfter(memberType) {
  const discountMap = {
    vip: 0.8,
    regular: 0.9,
    new: 0.95,
  }

  return discountMap[memberType] || 1
}
console.log('getDiscountRateAfter', getDiscountRateAfter('vip')) // 0.8

// 2. 策略模式（适合复杂逻辑）
// 优化前
function calculatePriceBefore(product, user, campaign) {
  if (campaign === 'blackFriday') {
    // 复杂的黑五价格计算逻辑...
  } else if (campaign === 'memberDay' && user.isMember) {
    // 会员日价格计算...
  } else if (user.isFirstPurchase) {
    // 首次购买逻辑...
  } else {
    // 默认价格计算...
  }
}
// 优化后
const pricingStrategies = {
  blackFriday(product, user) {
    // 黑五逻辑
    return product.price * 0.7
  },

  memberDay(product, user) {
    if (!user.isMember) return null // 不适用此策略
    return product.price * 0.8
  },

  firstPurchase(product, user) {
    if (!user.isFirstPurchase) return null
    return product.price * 0.9
  },

  default(product, user) {
    return product.price
  },
}

function calculatePriceAfter(product, user, campaign) {
  // 尝试使用对应策略，如果返回 null 则尝试下一个策略
  const price = pricingStrategies[campaign]?.(product, user)
  if (price !== null) return price

  if (user.isFirstPurchase) {
    return pricingStrategies.firstPurchase(product, user)
  }

  return pricingStrategies.default(product, user)
}

// 3. 工厂模式（适合创建不同对象）
// 假设存在这些类
class WechatPayment {}
class AlipayPayment {}
class CreditCardPayment {}

// 优化前
function createPaymentBefore(type) {
  if (type === 'wechat') {
    return new WechatPayment()
  } else if (type === 'alipay') {
    return new AlipayPayment()
  } else if (type === 'creditCard') {
    return new CreditCardPayment()
  } else {
    throw new Error('不支持的支付方式')
  }
}

// 优化后
const paymentFactory = {
  wechat: () => new WechatPayment(),
  alipay: () => new AlipayPayment(),
  creditCard: () => new CreditCardPayment(),
}

function createPaymentAfter(type) {
  const factory = paymentFactory[type]
  if (!factory) {
    throw new Error('不支持的支付方式')
  }
  return factory()
}

// 4. 使用多态（面向对象方法）
// 基类
class Shape {
  calculateArea() {
    throw new Error('子类必须实现此方法')
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }

  calculateArea() {
    return Math.PI * this.radius * this.radius
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super()
    this.width = width
    this.height = height
  }

  calculateArea() {
    return this.width * this.height
  }
}

// 使用时不需要 if-else 判断形状类型
function printArea(shape) {
  console.log(`面积是: ${shape.calculateArea()}`)
}

// 5. 责任链模式（适合多步骤处理）
// 假设存在这些类
class InventoryCheckHandler {
  process(order) {
    // 库存检查逻辑
    return 'completed'
  }
}
class PaymentValidationHandler {
  process(order) {
    // 支付验证逻辑
    return 'completed'
  }
}
class FraudDetectionHandler {
  process(order) {
    // 欺诈检测逻辑
    return 'completed'
  }
}

class OrderProcessor {
  constructor() {
    this.handlers = []
  }

  addHandler(handler) {
    this.handlers.push(handler)
    return this
  }

  process(order) {
    for (const handler of this.handlers) {
      const result = handler.process(order)
      if (result === 'completed' || result === 'rejected') {
        return result
      }
    }
    return 'default'
  }
}

// 使用
const order = {}
const processor = new OrderProcessor()
  .addHandler(new InventoryCheckHandler())
  .addHandler(new PaymentValidationHandler())
  .addHandler(new FraudDetectionHandler())

const result = processor.process(order)

// 小技巧
// 1. 早期返回：避免深层嵌套
// 不好的写法
function processUserBefore(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // 处理逻辑
      } else {
        return '无权限'
      }
    } else {
      return '账号未激活'
    }
  } else {
    return '用户不存在'
  }
}

// 好的写法
function processUserAfter(user) {
  if (!user) return '用户不存在'
  if (!user.isActive) return '账号未激活'
  if (!user.hasPermission) return '无权限'

  // 处理逻辑
}

// 2. 三元运算符：用于简单条件
// 长
const value = 15
let resultLong
if (value > 10) {
  resultLong = 'greater'
} else {
  resultLong = 'less'
}

// 短
const resultShort = value > 10 ? 'greater' : 'less'
