<template>
  <div class="child-component" :class="theme">
    <div class="content">这是子组件内容，当前主题：{{ theme }}</div>
    <GrandChildComponent />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import GrandChildComponent from './GrandChildComponent.vue'

const theme = inject<'light' | 'dark'>('theme', 'light')
</script>

<style scoped>
.child-component {
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s;
}

.child-component.light {
  background: white;
  color: #333;
  border: 1px solid #e0e0e0;
}

.child-component.dark {
  background: #34495e;
  color: white;
  border: 1px solid #2c3e50;
}

.content {
  margin-bottom: 15px;
}
</style>
