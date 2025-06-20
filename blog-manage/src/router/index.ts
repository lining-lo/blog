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
        path: '/label',
        name: 'label',
        component: () => import('../views/Label.vue')
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
        path: '/wall',
        name: 'wall',
        component: () => import('../views/Wall.vue')
      },
      {
        path: '/message',
        name: 'message',
        component: () => import('../views/Message.vue')
      },
      {
        path: '/friend',
        name: 'friend',
        component: () => import('../views/Friend.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/User.vue')
      },
      {
        path: '/install',
        name: 'install',
        component: () => import('../views/Install.vue')
      },
      {
        path: '/createArticle',
        name: 'createArticle',
        component: () => import('../views/CreateArticle.vue')
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
