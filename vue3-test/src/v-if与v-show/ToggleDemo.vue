<template>
  <div class="toggle-demo">
    <div class="controls">
      <button @click="isVisible = !isVisible">
        切换显示/隐藏 (当前状态: {{ isVisible ? '显示' : '隐藏' }})
      </button>
    </div>

    <div class="demo-boxes">
      <div class="demo-box">
        <h4>v-if 示例</h4>
        <div class="content-box">
          <div v-if="isVisible" class="demo-content">
            <p>这是使用 v-if 控制的内容</p>
            <small>当 isVisible 为 false 时，这段内容会从 DOM 中移除</small>
          </div>
        </div>
        <div class="dom-info">
          <strong>DOM 状态：</strong>
          {{ isVisible ? '元素存在于 DOM 中' : '元素已从 DOM 中移除' }}
        </div>
      </div>

      <div class="demo-box">
        <h4>v-show 示例</h4>
        <div class="content-box">
          <div v-show="isVisible" class="demo-content">
            <p>这是使用 v-show 控制的内容</p>
            <small>当 isVisible 为 false 时，这段内容只是被隐藏 (display: none)</small>
          </div>
        </div>
        <div class="dom-info">
          <strong>DOM 状态：</strong>
          元素始终存在于 DOM 中，仅通过 CSS display 属性控制显示
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)
</script>

<style scoped>
.toggle-demo {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
  text-align: center;
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}

.demo-boxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.demo-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

h4 {
  margin-top: 0;
  color: #42b883;
  text-align: center;
}

.content-box {
  min-height: 120px;
  border: 1px dashed #ccc;
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
}

.demo-content {
  text-align: center;
}

.demo-content p {
  margin: 5px 0;
}

.demo-content small {
  color: #666;
  font-size: 0.8em;
}

.dom-info {
  font-size: 0.9em;
  color: #666;
  margin-top: 10px;
  text-align: center;
}
</style>
