import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import ParentComponent from '../生命周期/ParentComponent.vue'

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
