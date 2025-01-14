<template>
  <div class="demo-container">
    <h3>5. Pinia 状态管理示例</h3>
    <div class="demo-box">
      <div class="counter-display">
        <div>计数：{{ counter.count }}</div>
        <div>双倍值：{{ counter.doubleCount }}</div>
      </div>
      <div class="counter-controls">
        <button @click="counter.decrement" class="counter-btn">-</button>
        <button @click="counter.increment" class="counter-btn">+</button>
      </div>
      <SharedCounter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import SharedCounter from './SharedCounter.vue'

const counter = useCounterStore()
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

.counter-display {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #666;
}

.counter-controls {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.counter-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background 0.3s;
}

.counter-btn:hover {
  background: #3aa876;
}
</style>
