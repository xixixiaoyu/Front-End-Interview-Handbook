<template>
  <div class="grand-child-component" :class="theme">
    这是孙组件内容，当前主题：{{ theme }}
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const theme = inject<'light' | 'dark'>('theme', 'light')
</script>

<style scoped>
.grand-child-component {
  padding: 15px;
  border-radius: 4px;
  transition: all 0.3s;
}

.grand-child-component.light {
  background: #f5f5f5;
  color: #333;
}

.grand-child-component.dark {
  background: #2c3e50;
  color: white;
}
</style>
