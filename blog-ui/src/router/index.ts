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
      {
        path: '/timeline',
        name: 'timeline',
        component: () => import('../views/TimeLine.vue')
      },
      {
        path: '/album',
        name: 'album',
        component: () => import('../views/Album.vue')
      },
      {
        path: '/diary',
        name: 'diary',
        component: () => import('../views/Diary.vue')
      },
      {
        path: '/friend',
        name: 'friend',
        component: () => import('../views/Friend.vue')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('../views/Message.vue')
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
