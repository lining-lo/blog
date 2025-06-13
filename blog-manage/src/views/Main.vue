<template>
    <div class="blog-manage">
        <!-- 侧边导航栏 -->
        <sider-bar />
        <!-- 主体内容 -->
        <router-view />
    </div>
</template>

<script setup lang='ts'>
import SiderBar from '../components/SideBar.vue';
</script>

<style lang='less' scoped>
.blog-manage {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>