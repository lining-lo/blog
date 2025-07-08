<template>
    <header-bar/>
    <banner v-if="route.name !== 'treehole'" :key="componentKey" />
    <div class="main-container" v-if="route.name !== 'treehole'">
        <router-view />
    </div>
    <router-view v-else />
    <tool v-if="route.name !== 'treehole'" />
    <footer-bar v-if="route.name !== 'treehole'" />
</template>

<script setup lang='ts'>
import HeaderBar from '../components/HeaderBar.vue';
import FooterBar from '../components/FooterBar.vue';
import Banner from '../components/Banner.vue';
import Tool from '../components/Tool.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useTimeStore } from '../store';
import { storeToRefs } from 'pinia';
//实例化route
const route = useRoute()
//实例化 Store
const timeStore = useTimeStore()
//解构 State（自动转为响应式 ref）
const { componentKey } = storeToRefs(timeStore)

</script>
<style lang='less' scoped>
.main-container {
    width: 90%;
    height: 100%;
    // background-color: pink;
    margin: 0 auto;
    padding: 0 10px 0 10px;
}
</style>