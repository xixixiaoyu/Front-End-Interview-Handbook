<template>
  <div class="child-component">
    <div class="input-group">
      <input
        v-model="inputValue"
        type="text"
        class="input-field"
        placeholder="请输入内容..."
      />
      <div class="error-message" v-if="showError">输入内容不能为空！</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const showError = ref(false)

// 暴露给父组件的方法
const reset = () => {
  inputValue.value = ''
  showError.value = false
}

const validate = () => {
  const isValid = inputValue.value.trim() !== ''
  showError.value = !isValid
  return isValid
}

// 暴露方法给父组件
defineExpose({
  reset,
  validate,
})
</script>

<style scoped>
.child-component {
  padding: 15px;
  border: 1px dashed #42b883;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #42b883;
}

.error-message {
  position: absolute;
  color: #ff4757;
  font-size: 12px;
  margin-top: 4px;
}
</style>
