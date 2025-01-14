import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { historyRouter } from './router'

const app = createApp(App)
app.use(createPinia())
app.use(historyRouter)
app.mount('#app')
