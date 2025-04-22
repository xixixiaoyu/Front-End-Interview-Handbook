// 存储副作用函数的桶
const bucket = new WeakMap()
let activeEffect

// 注册副作用函数
function effect(fn) {
  activeEffect = fn
  fn()
}

// 追踪变化
function track(target, key) {
  if (!activeEffect) return

  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)
}

// 触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  effects && effects.forEach((fn) => fn())
}

// 创建响应式数据
function reactive(data) {
  return new Proxy(data, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, newVal) {
      target[key] = newVal
      trigger(target, key)
      return true
    },
  })
}

// 使用方法示例
const state = reactive({ count: 0 })

effect(() => {
  console.log('Count changed:', state.count)
})

// 修改数据，自动触发副作用函数
state.count++
