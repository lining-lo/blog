<template>
    <div class="header-bar">
        <p class="header-left">
            LO'S BELOG
        </p>
        <div class="header-right">
            <div class="right-routes">
                <router-link :to="item.path" class="route" v-for="item in headerbarRoutes" :key="item.path">
                    <component class="route-icon" :is="item.icon" :style={color:item.color}></component>
                    <span class="route-name">{{ item.name }}</span>
                </router-link>
            </div>
            <div class="right-avator"></div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { headerbarRoutes } from '../utils/data';
</script>
<style lang='less' scoped>
.header-bar {
    height: 60px;
    width: 100%;
    background: rgba(142, 142, 143,0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;

    .header-left {
        color: #fff;
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
                padding: 0 12px;

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
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #53e5b9;
            cursor: pointer;
        }
    }
}
</style>