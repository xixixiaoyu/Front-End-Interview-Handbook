<template>
  <div class="demo-container">
    <h3>4. Provide / Inject 示例</h3>
    <div class="demo-box">
      <div class="theme-controls">
        <button
          @click="toggleTheme"
          :class="['theme-btn', theme === 'dark' ? 'dark' : 'light']"
        >
          切换主题：{{ theme }}
        </button>
      </div>
      <ChildComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import ChildComponent from './ChildComponent.vue'

const theme = ref<'light' | 'dark'>('light')

provide('theme', theme)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
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

.theme-controls {
  margin-bottom: 15px;
}

.theme-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.theme-btn.light {
  background: #42b883;
  color: white;
}

.theme-btn.dark {
  background: #34495e;
  color: white;
}
</style>
