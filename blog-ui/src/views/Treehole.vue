<template>
    <div class="treehole-container" :style="{ backgroundImage: imgurl }">

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
</script>
<style lang='less' scoped>
.treehole-container {
    width: 100%;
    height: 100vh;
    background-image: url(../assets/images/light-treehole.png);
    background-size: cover;
    background-position: center;
}
</style>