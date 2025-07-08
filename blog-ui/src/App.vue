<template>
    <div class="app" :style="{ backgroundColor: isDark ? '#26282a' : '#fff' }">
        <div class="app-welcome animate__animated animate__fadeInRight" v-if="isShowWelcome">
            <p class="title">
                <span>LO' BLOG</span>
                <span @click="isShowWelcome = false" style=" font-size: 14px;color: #909399;cursor: pointer;">×</span>
            </p>
            <p class="msg" style="color: #1c2b43;">欢迎来到我的博客~</p>
        </div>
        <router-view />
    </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { useInfoStore, useTimeStore } from './store'
import { storeToRefs } from 'pinia'

// 实例化 Store
const timeStore = useTimeStore()
const infoStore = useInfoStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { info } = storeToRefs(infoStore)

// 欢迎提示开关
const isShowWelcome = ref(true)
// 欢迎提示5s自动关闭
const closeWelcome = ()=>{
    setTimeout(()=>{
        isShowWelcome.value = false
    },5000)
}

onMounted(() => {
    infoStore.selectInfo()
    closeWelcome()
})

</script>
<style lang='less'>
.app {
    background-color: #fff;

    .app-welcome {
        width: 240px;
        position: fixed;
        right: 10px;
        top: 80px;
        z-index: 1;
        padding: 12px 24px;
        border-radius: 8px;
        border: 1px solid #ebeef5;
        background: linear-gradient(329deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
        opacity: 0.8;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        cursor: default;

        .title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            color: #303133;
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
            align-items: center;
        }
    }
}
</style>