<template>
  <div class="shared-counter">
    <div class="counter-info">
      这是另一个组件，共享同一个状态：
      <span class="counter-value">{{ counter.count }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
</script>

<style scoped>
.shared-counter {
  margin-top: 15px;
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  border: 1px dashed #42b883;
}

.counter-info {
  color: #666;
}

.counter-value {
  font-weight: bold;
  color: #42b883;
}
</style>
