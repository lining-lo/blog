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
        meta: { name: '首页', msg: '初遇是故事序章，重逢是常看常新' },
        component: () => import('../views/Home.vue')
      },
      {
        path: '/timeline',
        name: 'timeline',
        meta: { name: '时间轴', msg: '岁月痕迹值得标记，成长足迹值得回望' },
        component: () => import('../views/TimeLine.vue')
      },
      {
        path: '/favorites',
        name: 'favorites',
        meta: { name: '收藏', msg: '世界万物皆可归档，每个维度都是认知的罗盘' },
        component: () => import('../views/Favorites.vue')
      },
      {
        path: '/album',
        name: 'album',
        meta: { name: '相册', msg: '片刻光影值得定格，每份回忆值得翻阅' },
        component: () => import('../views/Album.vue')
      },
      {
        path: '/diary',
        name: 'diary',
        meta: { name: '说说', msg: '零碎心情值得分享，真实情绪值得共鸣' },
        component: () => import('../views/Diary.vue')
      },
      {
        path: '/treehole',
        name: 'treehole',
        meta: { name: '树洞', msg: '字里行间藏着心事，无声倾诉也能泛起回声' },
        component: () => import('../views/Treehole.vue')
      },
      {
        path: '/friend',
        name: 'friend',
        meta: { name: '友链', msg: '他人故事值得连接，同频灵魂值得相遇' },
        component: () => import('../views/Friend.vue')
      },
      {
        path: '/message',
        name: 'message',
        meta: { name: '留言墙', msg: '很多事情值得记录，当然也值得回味。' },
        component: () => import('../views/Message.vue')
      },
      {
        path: '/article',
        name: 'article',
        meta: { name: '', msg: '' },
        component: () => import('../views/Article.vue')
      },
      {
        path: '/classification',
        name: 'classification',
        meta: { name: '分类', msg: '' },
        component: () => import('../views/Classification.vue')
      },
    ]
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 浏览器历史模式
  routes,
})

// 后置路由守卫
router.afterEach(() => {
  // 获取当前滚动位置
  const startScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const duration = 500; // 动画持续时间（毫秒）
  const startTime = performance.now();
  // 动画函数
  const animateScroll = (currentTime: any) => {
    const elapsedTime = currentTime - startTime;
    // 计算动画进度（0-1）
    const progress = Math.min(elapsedTime / duration, 1);
    // 使用缓动函数使动画更平滑（减速效果）
    const easeOutProgress = progress * (2 - progress);
    // 计算当前应该滚动到的位置
    const currentScroll = startScroll - (startScroll * easeOutProgress);
    // 执行滚动
    document.body.scrollTop = currentScroll;
    document.documentElement.scrollTop = currentScroll;
    // 如果动画未完成，继续下一帧
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };
  // 开始动画
  requestAnimationFrame(animateScroll);
});

export default router
