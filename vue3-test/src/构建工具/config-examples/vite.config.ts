import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

// Vite 配置示例
export default defineConfig({
  plugins: [vue()],

  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  // 构建配置
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
  },

  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  // CSS 相关配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
})
