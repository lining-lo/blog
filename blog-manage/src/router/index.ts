import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Overview from '../views/OverView.vue'

// 定义路由表
const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/overview',
        name: '/overview',
        component: Overview
      }
    ]
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 浏览器历史模式
  routes
})

export default router
