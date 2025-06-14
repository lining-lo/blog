<template>
    <div class="header-bar">
        <p class="header-left">
            LO'S BELOG
        </p>
        <div class="header-right">
            <div class="right-routes">
                <router-link :to="item.path" class="route" v-for="item in headerbarRoutes" :key="item.path">
                    <component class="route-icon" :is="item.icon" :style="{ color: item.color }"></component>
                    <span class="route-name">{{ item.name }}</span>
                </router-link>
            </div>
            <el-switch v-model="isDark" :active-action-icon="MoonNight" :inactive-action-icon="Sunny"
                style="--el-switch-on-color: #6f5ac3; --el-switch-off-color: #f4c97a" />
            <div class="right-avator"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { headerbarRoutes } from '../utils/data'
import { Sunny, MoonNight } from '@element-plus/icons-vue'
import { useTimeStore } from '../store'
import { storeToRefs } from 'pinia'

// 实例化 Store
const timeStore = useTimeStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)

</script>
<style lang='less' scoped>
.header-bar {
    position: fixed;
    z-index: 999;
    height: 60px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    transition: all 0.5s;

    &:hover{
        background: rgba(5, 12, 14, 0.8);
    }

    .header-left {
        color: #1861a6;
        font-size: 17px;
        font-family: fantasy;
        word-break: break-word;
    }

    .header-right {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right-routes {
            display: flex;

            .route {
                height: 40px;
                display: flex;
                align-items: center;
                cursor: pointer;
                padding: 0 6px;
                margin: 0 6px;

                &:hover {
                    border-bottom: 2px solid #42b983;

                    &>.route-name {
                        color: #42b983;
                    }
                }

                &.router-link-active {
                    border-bottom: 2px solid #42b983;

                    &>.route-name {
                        color: #42b983;
                    }
                }

                .route-icon {
                    height: 20px;
                    width: 20px;
                }

                .route-name {
                    padding-left: 2px;
                    font-size: 17px;
                    font-weight: 300;
                    color: #fff;
                    font-family: cursive;
                }
            }
        }

        .right-avator {
            margin-left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #53e5b9;
            cursor: pointer;
        }
    }
}
</style>