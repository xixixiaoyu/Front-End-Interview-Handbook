<template>
  <div class="demo-container">
    <h3>1. Props / Emit 示例</h3>
    <div class="demo-box">
      <ChildComponent :message="message" @update-message="handleUpdate" />
      <div class="current-value">当前消息：{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const message = ref('Hello from parent')

const handleUpdate = (newValue: string) => {
  message.value = newValue
}
</script>

<style scoped>
.demo-container {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
}

.demo-box {
  margin-top: 15px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.current-value {
  margin-top: 15px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  color: #666;
}
</style>
