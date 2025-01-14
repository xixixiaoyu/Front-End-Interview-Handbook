<template>
  <div class="demo-container">
    <h3>6. EventBus 示例</h3>
    <div class="demo-box">
      <div class="components-container">
        <div class="component-section">
          <h4>发送组件</h4>
          <SenderComponent />
        </div>
        <div class="component-section">
          <h4>接收组件</h4>
          <ReceiverComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SenderComponent from './SenderComponent.vue'
import ReceiverComponent from './ReceiverComponent.vue'
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

.components-container {
  display: flex;
  gap: 20px;
}

.component-section {
  flex: 1;
}

h4 {
  margin: 0 0 10px;
  color: #666;
  font-size: 1em;
}
</style>
