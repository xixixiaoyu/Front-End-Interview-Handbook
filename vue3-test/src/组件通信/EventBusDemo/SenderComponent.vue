<template>
  <div class="sender-component">
    <button @click="sendMessage" class="send-btn">发送消息到接收组件</button>
  </div>
</template>

<script setup lang="ts">
import emitter from '@/utils/eventBus'

let messageCount = 0

const sendMessage = () => {
  messageCount++
  emitter.emit('update-message', `这是来自发送组件的第 ${messageCount} 条消息`)
}
</script>

<style scoped>
.sender-component {
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
}

.send-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.send-btn:hover {
  background: #3aa876;
}
</style>
