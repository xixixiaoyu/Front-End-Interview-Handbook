<template>
  <div class="communication-demo">
    <h2>Vue3 组件通信示例</h2>

    <div class="scope-section">
      <h3 class="scope-title">父子组件通信</h3>
      <!-- Props/Emit 示例 -->
      <PropsEmitParent />
      <!-- v-model 示例 -->
      <ModelParent />
      <!-- Refs 示例 -->
      <RefsParent />
    </div>

    <div class="scope-section">
      <h3 class="scope-title">跨层级/全局通信</h3>
      <!-- Provide/Inject 示例 -->
      <ProvideInjectParent />
      <!-- Pinia 示例 -->
      <CounterComponent />
      <!-- EventBus 示例 -->
      <EventBusDemo />
    </div>
  </div>
</template>

<script setup lang="ts">
import PropsEmitParent from './PropsEmitDemo/ParentComponent.vue'
import ModelParent from './ModelDemo/ParentComponent.vue'
import ProvideInjectParent from './ProvideInjectDemo/ParentComponent.vue'
import CounterComponent from './PiniaDemo/CounterComponent.vue'
import EventBusDemo from './EventBusDemo/EventBusDemo.vue'
import RefsParent from './RefsDemo/ParentComponent.vue'
</script>

<style scoped>
.communication-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.scope-section {
  margin-bottom: 40px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.scope-title {
  color: #42b883;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}
</style>
