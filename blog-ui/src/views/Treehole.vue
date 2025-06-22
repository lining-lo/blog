<template>
    <div class="treehole-container" :style="{ backgroundImage: imgurl }">
        <div class="treehole-send">
            <input class="send-input" type="text" placeholder="留下点想说的话吧~">
            <button class="send-btn">发送</button>
        </div>
        <div class="treehole-item" @animationend="resetDanmu(index)"
            :style="{ 'top': item.top + 'px', 'animationDelay': `${0.2 * item.id}s`, animationDuration: `${item.animationDuration}s` }"
            v-for="(item, index) in danmus" :key="index">
            <div class="item-img" :style="{ backgroundColor: labelColors[item.imgurl] }"></div>
            <div class="item-msg">{{ item.message }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { treeholeMock } from '../../mock/mock';
import { labelColors } from '../utils/data';
import { useRoute } from 'vue-router';
import { useTimeStore } from '../store'
import { storeToRefs } from 'pinia'
import { computed, nextTick, reactive } from 'vue';

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

//弹幕
const danmus = reactive(treeholeMock.data)
const temp = JSON.parse(JSON.stringify(treeholeMock.data))

//弹幕循环
const resetDanmu = (index: number) => {
    danmus.splice(index, 1)
    // 使用nextTick确保DOM更新完成后再重置位置

    nextTick(() => {
        console.log(danmus.length);

        if (danmus.length === 0) {
            for (let i = 0; i < temp.length; i++) {
                danmus.push(temp[i])
            }
        }
    });
};

</script>
<style lang='less' scoped>
@keyframes scrollDanmu {
    to {
        right: 100%;
    }
}

.treehole-container {
    width: 100%;
    height: 100vh;
    background-image: url(../assets/images/light-treehole.png);
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;

    .treehole-send {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        z-index: 10;

        .send-input {
            border-radius: 20px 0 0 20px;
            border: 1px solid #fff;
            color: #fff;
            background: transparent;
            height: 40px;
            width: 252px;
            padding: 10px;
            outline: none;
        }

        .send-btn {
            width: 60px;
            height: 40px;
            border: 1px solid #fff;
            border-left: none;
            color: #fff;
        }
    }

    .treehole-item {
        height: 40px;
        width: auto;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 100px;
        padding: 10px;
        color: #FFF;
        position: absolute;
        top: 100px;
        display: flex;
        align-items: center;
        animation: scrollDanmu linear forwards;
        right: -30%;
        cursor: default;

        .item-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #53e5b9;
        }

        .item-msg {
            line-height: 30px;
            padding-left: 8px;
            white-space: nowrap;
        }
    }
}
</style>