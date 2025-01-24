<template>
  <div class="build-tools-container">
    <h2>构建工具对比：Vite vs Webpack</h2>

    <div class="comparison-section">
      <h3>开发服务器启动速度</h3>
      <div class="tool-comparison">
        <div class="tool-card vite">
          <h4>Vite</h4>
          <p>⚡️ 冷启动秒级</p>
          <div class="details">
            <ul>
              <li>基于原生 ESM</li>
              <li>按需编译</li>
              <li>无需打包</li>
            </ul>
          </div>
        </div>

        <div class="tool-card webpack">
          <h4>Webpack</h4>
          <p>🐢 冷启动可能需要分钟级</p>
          <div class="details">
            <ul>
              <li>需要先打包</li>
              <li>全量编译</li>
              <li>模块依赖预构建</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h3>HMR 热更新速度</h3>
      <div class="tool-comparison">
        <div class="tool-card vite">
          <h4>Vite</h4>
          <p>⚡️ 毫秒级响应</p>
          <div class="details">
            <ul>
              <li>精确的模块热更新</li>
              <li>只需重新请求变更模块</li>
              <li>无需重新打包</li>
            </ul>
          </div>
        </div>

        <div class="tool-card webpack">
          <h4>Webpack</h4>
          <p>🐢 需要重新打包模块</p>
          <div class="details">
            <ul>
              <li>模块关系重新构建</li>
              <li>变更模块需重新打包</li>
              <li>热更新需要时间</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section">
      <h3>配置文件对比</h3>
      <div class="tool-comparison">
        <div class="tool-card vite">
          <h4>Vite 配置示例</h4>
          <pre class="code-block">
            <code>{{ viteConfig }}</code>
          </pre>
        </div>

        <div class="tool-card webpack">
          <h4>Webpack 配置示例</h4>
          <pre class="code-block">
            <code>{{ webpackConfig }}</code>
          </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const viteConfig = ref(`
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  
  // 构建配置
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser'
  },
  
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})`)

const webpackConfig = ref(`
module.exports = {
  // 入口文件
  entry: './src/main.ts',
  
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  
  // 模块规则
  module: {
    rules: [
      {
        test: /\\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\\.vue$/]
        }
      }
    ]
  },
  
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new VueLoaderPlugin()
  ],
  
  // 开发服务器配置
  devServer: {
    port: 8080,
    hot: true,
    open: true
  }
}`)
</script>

<style scoped>
.build-tools-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.comparison-section {
  margin-bottom: 40px;
}

.comparison-section h3 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.tool-comparison {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.tool-card {
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.tool-card h4 {
  margin-top: 0;
  color: #2c3e50;
}

.tool-card.vite {
  background-color: #f8f9fa;
  border: 2px solid #646cff;
}

.tool-card.webpack {
  background-color: #f8f9fa;
  border: 2px solid #8ed6fb;
}

.details ul {
  padding-left: 20px;
  margin: 10px 0;
}

.details li {
  margin: 8px 0;
  color: #666;
}

.code-block {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 10px 0;
}

.code-block code {
  white-space: pre-wrap;
}
</style>
