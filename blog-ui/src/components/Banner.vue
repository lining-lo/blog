<template>
    <div class="banner" :style="{ backgroundImage: imgurl }">
        <div class="title-container">
            <p class="name">{{ route.meta.name }}</p>
            <p class="msg">{{ route.meta.msg }}</p>
        </div>
        <div class="water-container">
            <div class="wave wave1" :style="{ backgroundImage: wave1Bg }"></div>
            <div class="wave wave2" :style="{ backgroundImage: wave2Bg }"></div>
        </div>
        <div class="bottom-container">
            <el-icon :size="40" color="skyblue"><ArrowDownBold /></el-icon>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { useTimeStore } from '../store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue';

//实例化route
const route = useRoute()

//实例化 Store
const timeStore = useTimeStore()
//解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)

//获取背景图片
const imgurl = computed(() => {
    const url = `url(/src/assets/images/${isDark.value ? 'dark' : 'light'}-${String(route.name)}.png)`;
    return url;
})

//获取水流背景颜色
const wave1Bg = computed(() => {
    const params = isDark.value ? 40 : 255
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(${params},${params},${params},0.7)' fill-opacity='1' d='M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`;
})
const wave2Bg = computed(() => {
    const params = isDark.value ? 40 : 255
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(${params},${params},${params},0.8)' fill-opacity='1' d='M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`;
})

</script>

<style lang='less' scoped>
@keyframes wave {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}


.banner {
    width: 100%;
    height: 50vh;
    background-image: url(../assets/images/light-home.png);
    background-size: cover;
    background-position: center;
    position: relative;

    .title-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        .name {
            color: #42b983;
            font-size: 40px;
            font-weight: 600;
            margin-bottom: 18px;
        }

        .msg {
            background: rgba(5, 12, 14, 0.5);
            padding: 12px 20px;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
        }
    }

    .water-container {
        width: 100%;
        height: 100px;
        position: relative;
        top: calc(50vh - 100px);
        overflow: hidden;

        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100px;
            background-repeat: repeat-x;
        }

        .wave1 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(255,255,255,0.7)' fill-opacity='1' d='M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E");
            animation: wave 10s linear infinite;
        }

        .wave2 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(255,255,255,0.8)' fill-opacity='1' d='M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E");
            animation: wave 12s linear infinite reverse;
            top: 15px;
        }
    }

    .bottom-container{
        position: absolute;
        bottom: 0;
        left: 50%;
    }
}
</style>