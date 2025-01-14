<template>
  <div class="receiver-component">
    <div class="message-display">最新接收的消息：{{ lastMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '@/utils/eventBus'

const lastMessage = ref<string>('暂无消息')

// 监听消息
const handleMessage = (message: string) => {
  lastMessage.value = message
}

onMounted(() => {
  emitter.on('update-message', handleMessage)
})

onUnmounted(() => {
  emitter.off('update-message', handleMessage)
})
</script>

<style scoped>
.receiver-component {
  margin-top: 15px;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  border: 1px dashed #42b883;
}

.message-display {
  color: #666;
}
</style>
