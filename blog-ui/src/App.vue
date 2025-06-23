<template>
 <div class="app" :style="{backgroundColor: isDark?'#26282a':'#fff' }">
    <router-view />
 </div>
</template>

<script setup lang='ts'>
import { useTimeStore } from './store'
import { storeToRefs } from 'pinia'

//实例化 Store
const timeStore = useTimeStore()
//解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
</script>
<style lang='less'>
.app{
    background-color: #fff;
}
</style>