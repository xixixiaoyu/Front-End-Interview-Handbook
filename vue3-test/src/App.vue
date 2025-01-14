<script setup lang="ts">
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="app">
    <Navigation />
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
