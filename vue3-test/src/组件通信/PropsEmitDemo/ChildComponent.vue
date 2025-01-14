<template>
  <div class="child-component">
    <div class="message-display">收到的消息：{{ message }}</div>
    <button @click="handleClick" class="update-btn">更新消息</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  message: string
}>()

const emit = defineEmits<{
  'update-message': [value: string]
}>()

const handleClick = () => {
  emit('update-message', '来自子组件的新消息！')
}
</script>

<style scoped>
.child-component {
  padding: 15px;
  border: 1px dashed #42b883;
  border-radius: 4px;
}

.message-display {
  margin-bottom: 10px;
  color: #666;
}

.update-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.update-btn:hover {
  background: #3aa876;
}
</style>
