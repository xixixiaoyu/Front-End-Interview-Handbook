import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import ParentComponent from '../生命周期/ParentComponent.vue'
import CommunicationDemo from '../组件通信/CommunicationDemo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/lifecycle',
  },
  {
    path: '/lifecycle',
    name: '生命周期',
    component: ParentComponent,
  },
  {
    path: '/communication',
    name: '组件通信',
    component: CommunicationDemo,
  },
]

// Hash 模式路由
export const hashRouter = createRouter({
  history: createWebHashHistory(),
  routes,
})

// History 模式路由
export const historyRouter = createRouter({
  history: createWebHistory(),
  routes,
})
