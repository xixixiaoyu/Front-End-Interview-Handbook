// 存储副作用函数的桶
const bucket = new WeakMap()
let activeEffect
// 用于存储嵌套的 effect
const effectStack = []

// 注册副作用函数
function effect(fn, options = {}) {
  const effectFn = () => {
    // 清除依赖关系
    cleanup(effectFn)
    activeEffect = effectFn
    // 入栈
    effectStack.push(effectFn)
    fn()
    // 出栈
    effectStack.pop()
    // 还原 activeEffect 为之前的值
    activeEffect = effectStack[effectStack.length - 1]
  }
  // 将 options 挂载到 effectFn 上
  effectFn.options = options
  // 用来存储所有与该副作用函数相关的依赖集合
  effectFn.deps = []
  effectFn()
}

// 清除依赖关系的函数
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
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
  // 将依赖集合添加到 activeEffect.deps 数组中
  activeEffect.deps.push(deps)
}

// 触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return

  const effects = depsMap.get(key)
  if (!effects) return

  // 创建新的 Set 避免无限循环
  const effectsToRun = new Set()
  effects.forEach((effectFn) => {
    // 如果 trigger 触发执行的副作用函数与当前正在执行的相同，则不触发执行
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })

  effectsToRun.forEach((effectFn) => {
    // 如果有调度器，则调用调度器，并将副作用函数作为参数传递
    if (effectFn.options.scheduler) {
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
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
