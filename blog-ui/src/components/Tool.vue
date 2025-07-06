<template>
    <div class="tool">
        <span v-if="route.name === 'message'" @click="showCreateMessage">📫</span>
        <span v-if="route.name === 'article'" @click="showCatalog">🕹️</span>
        <span @click="toTop">🚁</span>
        <span>🔍</span>
        <span @click="toListen">🎸</span>
        <span @click="toChat">📻</span>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router';
import { useToolStore } from '../store';
import { storeToRefs } from 'pinia';

//实例化route
const route = useRoute()

// 实例化 Store
const toolStore= useToolStore()
// 解构 State（自动转为响应式 ref）
const { isShowCatalog,isShowCreateMessage } = storeToRefs(toolStore)
const showCatalog = ()=>{
    isShowCatalog.value = !isShowCatalog.value
}
const showCreateMessage = ()=>{
    isShowCreateMessage.value = !isShowCreateMessage.value
}

// 滚动条回到顶部
const toTop = () => {
    // 获取当前滚动位置
    const startScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const duration = 500; // 动画持续时间（毫秒）
    const startTime = performance.now();
    // 动画函数
    const animateScroll = (currentTime) => {
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
};

const toListen = ()=>{
    ElMessage.warning('音乐播放器尚未开发，敬请期待！')
}

const toChat = ()=>{
    ElMessage.warning('在线聊天室尚未开发，敬请期待！')
}
</script>
<style lang='less' scoped>
.tool {
    font-size: 30px;
    width: 30px;
    position: fixed;
    bottom: 12vh;
    right: 3vh;
    z-index: 1000;

    span {
        width: 40x;
        height: 30px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        cursor: pointer;
    }
}
</style>