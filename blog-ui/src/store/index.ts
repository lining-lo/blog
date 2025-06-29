import { defineStore } from 'pinia'

export const useTimeStore = defineStore('time', {
  state: () => {
    return { isDark: false }
  },
  actions: {
    changeTime() {
      this.isDark = !this.isDark
    },
  },
})

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
