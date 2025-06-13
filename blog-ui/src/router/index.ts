import { createRouter, createWebHistory } from 'vue-router'

// 定义路由表
const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    redirect: 'home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
    ]
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 浏览器历史模式
  routes
})

export default router
