<template>
  <div class="performance-demo">
    <div class="controls">
      <button @click="startTest" :disabled="isRunning">开始性能测试</button>
      <div class="test-status" v-if="isRunning">测试进行中...</div>
    </div>

    <div class="demo-boxes">
      <div class="demo-box">
        <h4>v-if 性能测试</h4>
        <div class="content-box">
          <div v-if="showVIf" class="heavy-content">
            <div v-for="n in 100" :key="n" class="item">
              {{ n }}
            </div>
          </div>
        </div>
        <div class="performance-info">
          <p>切换耗时: {{ vIfSwitchTime }}ms</p>
          <small>适合不经常切换的场景</small>
        </div>
      </div>

      <div class="demo-box">
        <h4>v-show 性能测试</h4>
        <div class="content-box">
          <div v-show="showVShow" class="heavy-content">
            <div v-for="n in 100" :key="n" class="item">
              {{ n }}
            </div>
          </div>
        </div>
        <div class="performance-info">
          <p>切换耗时: {{ vShowSwitchTime }}ms</p>
          <small>适合频繁切换的场景</small>
        </div>
      </div>
    </div>

    <div class="explanation">
      <h4>性能对比说明：</h4>
      <ul>
        <li>v-if：初始渲染成本低，切换成本高（需要销毁/重建 DOM）</li>
        <li>v-show：初始渲染成本高，切换成本低（只改 CSS display）</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showVIf = ref(true)
const showVShow = ref(true)
const vIfSwitchTime = ref(0)
const vShowSwitchTime = ref(0)
const isRunning = ref(false)

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const measureSwitchTime = async (toggleFn: () => void) => {
  const start = performance.now()
  toggleFn()
  await sleep(0) // 等待下一个渲染周期
  const end = performance.now()
  return Math.round(end - start)
}

const startTest = async () => {
  isRunning.value = true

  // 测试 v-if
  vIfSwitchTime.value = await measureSwitchTime(() => {
    showVIf.value = false
  })
  await sleep(1000)
  await measureSwitchTime(() => {
    showVIf.value = true
  })

  // 测试 v-show
  vShowSwitchTime.value = await measureSwitchTime(() => {
    showVShow.value = false
  })
  await sleep(1000)
  await measureSwitchTime(() => {
    showVShow.value = true
  })

  isRunning.value = false
}
</script>

<style scoped>
.performance-demo {
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

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.test-status {
  margin-top: 10px;
  color: #666;
}

.demo-boxes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.demo-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

.content-box {
  height: 200px;
  overflow-y: auto;
  border: 1px dashed #ccc;
  margin: 10px 0;
  padding: 10px;
  background-color: #f9f9f9;
}

.heavy-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
  gap: 5px;
}

.item {
  background-color: #e1e1e1;
  padding: 5px;
  text-align: center;
  border-radius: 4px;
}

.performance-info {
  text-align: center;
  margin-top: 10px;
}

.performance-info p {
  margin: 5px 0;
  font-weight: bold;
  color: #42b883;
}

.performance-info small {
  color: #666;
}

.explanation {
  margin-top: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.explanation h4 {
  margin-top: 0;
  color: #2c3e50;
}

.explanation ul {
  margin: 10px 0;
  padding-left: 20px;
}

.explanation li {
  margin: 5px 0;
  color: #666;
}
</style>
