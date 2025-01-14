import { createApp } from 'vue'
import App from './App.vue'
import { hashRouter } from './router' // 默认使用 hash 模式，你也可以导入 historyRouter 使用 history 模式

const app = createApp(App)
app.use(hashRouter) // 或者使用 historyRouter
app.mount('#app')
