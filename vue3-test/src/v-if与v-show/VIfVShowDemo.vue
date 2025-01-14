<template>
  <div class="v-if-show-demo">
    <h2>v-if 与 v-show 的区别</h2>

    <div class="demo-section">
      <h3>1. 基础切换示例</h3>
      <ToggleDemo />
    </div>

    <div class="demo-section">
      <h3>2. 性能对比示例</h3>
      <PerformanceDemo />
    </div>

    <div class="explanation">
      <h3>3. 使用建议</h3>
      <ul>
        <li>频繁切换用 v-show（如：下拉菜单、模态框）</li>
        <li>运行时很少改变用 v-if（如：权限控制、环境区分）</li>
      </ul>

      <h3>4. 注意事项</h3>
      <ul>
        <li>v-if 可以和 v-else、v-else-if 配合使用</li>
        <li>v-if 会触发组件的生命周期，v-show 不会</li>
        <li>v-show 不支持 template 标签</li>
        <li>v-if 是惰性的，首次条件为假时不会渲染</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleDemo from './ToggleDemo.vue'
import PerformanceDemo from './PerformanceDemo.vue'
</script>

<style scoped>
.v-if-show-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-section {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.explanation {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
}

h3 {
  color: #42b883;
  margin-bottom: 15px;
}

ul {
  padding-left: 20px;
}

li {
  margin: 8px 0;
  color: #666;
}
</style>
