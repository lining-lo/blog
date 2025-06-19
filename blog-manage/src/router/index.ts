import { createRouter, createWebHistory } from 'vue-router'

// 定义路由表
const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/Main.vue'),
    redirect: 'overview',
    children: [
      {
        path: '/overview',
        name: 'overview',
        component: () => import('../views/OverView.vue')
      },
      {
        path: '/localfile',
        name: 'localfile',
        component: () => import('../views/LocalFile.vue')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('../views/Article.vue')
      },
      {
        path: '/gallery',
        name: 'gallery',
        component: () => import('../views/Gallery.vue')
      },
      {
        path: '/diary',
        name: 'diary',
        component: () => import('../views/Diary.vue')
      },
      {
        path: '/sharing',
        name: 'sharing',
        component: () => import('../views/Sharing.vue')
      },
      {
        path: '/install',
        name: 'install',
        component: () => import('../views/Install.vue')
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
