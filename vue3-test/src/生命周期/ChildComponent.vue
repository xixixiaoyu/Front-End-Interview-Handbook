<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onBeforeUnmount, onUnmounted } from 'vue'

// 定义 props
const props = defineProps<{
  onLog: (message: string) => void
}>()

const count = ref(0)
const timer = ref<number | null>(null)

// 模拟 API 调用
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('数据获取成功')
    }, 1000)
  })
}

onBeforeMount(() => {
  props.onLog('子组件 - beforeMount')
})

onMounted(async () => {
  props.onLog('子组件 - mounted')
  // 在 mounted 中进行 API 调用
  const result = await fetchData()
  props.onLog(`子组件 - ${result}`)

  // 设置定时器
  timer.value = window.setInterval(() => {
    count.value++
  }, 1000)
})

onBeforeUnmount(() => {
  props.onLog('子组件 - beforeUnmount')
  // 清理定时器
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})

onUnmounted(() => {
  props.onLog('子组件 - unmounted')
})
</script>

<template>
  <div class="child-component">
    <h2>子组件</h2>
    <p>计数器：{{ count }}</p>
  </div>
</template>

<style scoped>
.child-component {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  border-radius: 4px;
}
</style>
