<template>
    <video style="width: 200px;" :src="videoUrl" autoplay muted controls @ended="autoPlay"></video>
    <button @click="isAutoplay = !isAutoplay">{{ isAutoplay ? '关闭自动播放' : '开启自动播放' }}</button><button
        @click="getVideo">NEXT</button>
</template>

<script setup lang='ts'>
import axios from 'axios'
import { onMounted, ref } from 'vue';

const videoUrl = ref('')
const isAutoplay = ref(true)

onMounted(() => {
    getVideo()
})

const getVideo = () => {
    axios.get('https://v2.xxapi.cn/api/meinv').then((data) => {
        videoUrl.value = data.data.data
    })
}

const autoPlay = ()=>{
    if (isAutoplay.value) {
        getVideo()
    }
}
</script>
<style lang='less' scoped></style>