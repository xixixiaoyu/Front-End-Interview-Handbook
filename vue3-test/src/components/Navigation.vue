<template>
  <nav class="navigation">
    <h2 class="nav-title">vue3 面试通关</h2>
    <ul class="nav-list">
      <li v-for="route in routes" :key="route.path">
        <router-link :to="route.path" class="nav-link">
          {{ route.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const routes = ref([
  { path: '/lifecycle', name: '生命周期' },
  { path: '/communication', name: '组件通信' },
  { path: '/v-if-v-show', name: 'v-if 与 v-show' },
  { path: '/build-tools', name: '构建工具' },
  // 后续可以在这里添加更多路由
])
</script>

<style scoped>
.navigation {
  width: 250px;
  height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
}

.nav-title {
  font-size: 1.2em;
  color: #333;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  display: block;
  padding: 10px 15px;
  color: #666;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 5px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background-color: #e0e0e0;
  color: #333;
}

.router-link-active {
  background-color: #42b883;
  color: white;
}
</style>
