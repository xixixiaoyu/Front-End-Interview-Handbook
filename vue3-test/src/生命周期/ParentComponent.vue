<template>
  <div class="parent-component">
    <h1>生命周期演示</h1>
    <button @click="toggleChild">
      {{ showChild ? '销毁子组件' : '创建子组件' }}
    </button>

    <ChildComponent v-if="showChild" :onLog="addLog" />

    <div class="logs">
      <h3>生命周期日志：</h3>
      <ul>
        <li v-for="(log, index) in logs" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, onBeforeUnmount, onUnmounted } from 'vue'
import ChildComponent from './ChildComponent.vue'

const showChild = ref(true)
const logs = ref<string[]>([])

const addLog = (message: string) => {
  logs.value.push(`${new Date().toLocaleTimeString()} - ${message}`)
}

onBeforeMount(() => {
  addLog('父组件 - beforeMount')
})

onMounted(() => {
  addLog('父组件 - mounted')
})

onBeforeUnmount(() => {
  addLog('父组件 - beforeUnmount')
})

onUnmounted(() => {
  addLog('父组件 - unmounted')
})

const toggleChild = () => {
  showChild.value = !showChild.value
}
</script>

<style scoped>
.parent-component {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

button {
  padding: 8px 16px;
  margin: 10px 0;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.logs {
  margin-top: 20px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.logs ul {
  list-style-type: none;
  padding: 0;
}

.logs li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}
</style>
