import { defineStore } from 'pinia'
import api from '../api'

/**
 * 暗黑模式相关
 */
export const useTimeStore = defineStore('time', {
  state: () => {
    return {
      isDark: false,
      componentKey: 0
    }
  },
  actions: {
    changeTime() {
      this.isDark = !this.isDark
    },
  },
})

/**
 * 用户相关
 */
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('lo_token') ? JSON.parse(localStorage.getItem('lo_token')) : {
        type: 1,// 0登录用户，1游客
        imgurl: Math.trunc(Math.random() * 14)
      } as any
    }
  },
  actions: {
    setToken(token: any) {
      this.token = JSON.parse(token)
      localStorage.setItem('lo_token', token)
    },
    clearToken() {
      localStorage.removeItem('lo_token')
      this.token = {
        type: 1,// 0登录用户，1游客
        imgurl: Math.trunc(Math.random() * 14)
      }
    }
  },
})

/**
 * 文章相关
 */
export const useArticleStore = defineStore('article', {
  state: () => {
    return {
      article: []
    }
  },
  actions: {
    async getArticle() {
      const userStore = useUserStore(); // 获取用户Store实例
      // 获取文章参数
      const articlePageParams = {
        page: 1,
        pagesize: 100,
        // 从userStore中获取token
        user_id: userStore.token.type === 1 ? userStore.token.username : userStore.token.id,
        user_type: userStore.token.type
      };
      // 获取文章方法
      const result = await api.selectArticlePage(articlePageParams)
      this.article = result.data.message
    },
  },
})

/**
 * 右下角的工具相关
 */
export const useToolStore = defineStore('tool', {
  state: () => {
    return {
      isShowCatalog: false,
      isShowCreateMessage: false
    }
  },
  actions: {

  },
})

/**
 * 网站信息相关
 */
export const useInfoStore = defineStore('info', {
  state: () => {
    return {
      info: {},
    }
  },
  actions: {
    async selectInfo() {
      // 获取文章方法
      const result = await api.selectInfo()
      this.info = result.data.message[0]
    }
  },
})