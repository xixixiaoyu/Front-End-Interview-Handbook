<template>
  <div class="demo-container">
    <h3>3. Refs 父组件调用子组件方法示例</h3>
    <div class="demo-box">
      <ChildComponent ref="childRef" />
      <div class="controls">
        <button @click="resetChild" class="control-btn">重置子组件</button>
        <button @click="validateChild" class="control-btn">验证子组件</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const childRef = ref<InstanceType<typeof ChildComponent> | null>(null)

const resetChild = () => {
  childRef.value?.reset()
}

const validateChild = () => {
  const isValid = childRef.value?.validate()
  if (isValid) {
    alert('验证通过！')
  } else {
    alert('验证失败！')
  }
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

.controls {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

.control-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.control-btn:hover {
  background: #3aa876;
}
</style>
