<script setup lang="ts">
import ParentComponent from './生命周期/ParentComponent.vue'
</script>

<template>
  <ParentComponent />
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  padding: 20px;
}

.toggle-parent {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-parent:hover {
  background-color: #ff6b81;
}
</style>
