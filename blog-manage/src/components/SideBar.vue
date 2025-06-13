<template>
    <div class="sidebar">
        <router-link class="sidebar-item" v-for="(item, index) in silderbarMenu" :key="index" :to="item.path">
            <component class="item-icon" :is="item.icon" style="width: 18px;height: 18px;"></component>
            <span class="item-name">{{ item.name }}</span>
        </router-link>
    </div>
</template>

<script setup lang='ts'>
import { silderbarMenu } from '../utils/data'; 
</script>

<style lang='less' scoped>
.sidebar {
    width: 192px;
    height: 100%;
    padding: 16px;

    .sidebar-item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        margin-bottom: 12px;
        padding-left: 12px;
        color: #1e2025;
        font-family: "PingFang SC";
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 21.84px;

        &.router-link-active {
            border-radius: 8px;
            background: #42b983;
            color: #ffffff;
            font-weight: 500;
        }

        .item-icon {
            padding-right: 5px;
        }

    }
}
</style>