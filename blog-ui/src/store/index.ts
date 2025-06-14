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
