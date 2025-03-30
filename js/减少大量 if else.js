// 1. 提前返回 (Guard Clauses)
// 之前的写法 👎
function processItem(item) {
  if (item) {
    if (item.isValid) {
      // ... 主要逻辑一大堆 ...
      console.log('处理 item:', item.name)
      return true
    } else {
      console.log('Item 无效')
      return false
    }
  } else {
    console.log('Item 不存在')
    return false
  }
}

// 使用提前返回 👍
function processItemImproved(item) {
  if (!item) {
    console.log('Item 不存在')
    return false // 不符合条件？直接走人
  }

  if (!item.isValid) {
    console.log('Item 无效')
    return false // 又一个不符合条件？也直接走人
  }

  // 能走到这里的，都是符合条件的，直接执行主要逻辑
  console.log('处理 item:', item.name)
  // ... 主要逻辑 ...
  return true
}

// 2. 使用查找表 (Lookup Table) / 映射 (Map/Object)
// 之前的写法 👎
function getStatusText(status) {
  if (status === 0) {
    return '待处理'
  } else if (status === 1) {
    return '进行中'
  } else if (status === 2) {
    return '已完成'
  } else if (status === 3) {
    return '已取消'
  } else {
    return '未知状态'
  }
}

// 使用查找表 👍
function getStatusTextImproved(status) {
  const statusMap = {
    0: '待处理',
    1: '进行中',
    2: '已完成',
    3: '已取消',
  }
  // 直接查找，找不到就用默认值
  return statusMap[status] || '未知状态'
}

// 如果要执行不同的函数呢？也可以！
function handleAction(actionType, payload) {
  const actionHandlers = {
    ADD_USER: (data) => console.log('添加用户:', data),
    DELETE_USER: (data) => console.log('删除用户:', data.userId),
    UPDATE_SETTINGS: (data) => console.log('更新设置:', data),
  }

  const handler = actionHandlers[actionType]
  if (handler) {
    handler(payload)
  } else {
    console.log('未知操作:', actionType)
  }
}

// 3. 策略模式 (Strategy Pattern) / 多态
// 之前的写法 👎
function getWelcomeMessage(user) {
  if (user.type === 'admin') {
    return `欢迎回来，管理员 ${user.name}！`
  } else if (user.type === 'vip') {
    return `尊贵的 VIP ${user.name}，您好！`
  } else {
    return `你好，${user.name}！`
  }
}

// 使用策略模式 (这里用简单的对象模拟) 👍
// 这里将 TypeScript 接口去掉，改为 JavaScript 对象结构
function getWelcomeMessageImproved(user) {
  // 定义不同的策略
  const welcomeStrategies = {
    admin: (user) => `欢迎回来，管理员 ${user.name}！`,
    vip: (user) => `尊贵的 VIP ${user.name}，您好！`,
    default: (user) => `你好，${user.name}！`,
  }
  // 根据用户类型选择策略，找不到就用默认的
  const strategy = welcomeStrategies[user.type] || welcomeStrategies.default
  return strategy(user)
}

const adminUser = { type: 'admin', name: '张三' }
const vipUser = { type: 'vip', name: '李四' }
const normalUser = { type: 'guest', name: '王五' } // type 不在策略里

console.log(getWelcomeMessageImproved(adminUser)) // 输出: 欢迎回来，管理员 张三！
console.log(getWelcomeMessageImproved(vipUser)) // 输出: 尊贵的 VIP 李四，您好！
console.log(getWelcomeMessageImproved(normalUser)) // 输出: 你好，王五！

// 4. 其他小技巧
// switch 语句
function getStatusTextSwitch(status) {
  switch (status) {
    case 0:
      return '待处理'
    case 1:
      return '进行中'
    case 2:
      return '已完成'
    case 3:
      return '已取消'
    default:
      return '未知状态'
  }
}

// 三元运算符
const isAdmin = true
const message = isAdmin ? '你是管理员' : '你不是管理员'

// 数组的 includes 或 find
// 之前的写法 👎
function checkRoleOld(role) {
  if (role === 'admin' || role === 'editor' || role === 'viewer') {
    return true
  }
  return false
}

// 使用 includes 👍
function checkRoleNew(role) {
  const allowedRoles = ['admin', 'editor', 'viewer']
  return allowedRoles.includes(role)
}

// 空值合并运算符 (??) 和可选链 (?.)
// 之前的写法 👎
function getUserNameOld(user) {
  let userName
  if (user && user.profile && user.profile.name) {
    userName = user.profile.name
  } else {
    userName = '游客'
  }
  return userName
}

// 使用 ?. 和 ?? 👍
function getUserNameNew(user) {
  return user?.profile?.name ?? '游客'
}
