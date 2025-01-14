import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0)
  const doubleCount = ref(0)

  // 操作
  function increment() {
    count.value++
    updateDoubleCount()
  }

  function decrement() {
    count.value--
    updateDoubleCount()
  }

  // 计算属性
  function updateDoubleCount() {
    doubleCount.value = count.value * 2
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
  }
})
