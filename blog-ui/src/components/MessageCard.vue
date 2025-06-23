<template>
    <div class="message-card" :style="{ backgroundColor: messageCardColors[card.imgurl]}">
        <div class="top">
            <p class="time">{{ formattime(card.moment) }}</p>
            <p class="label">{{ messageLabels[card.label] }}</p>
        </div>
        <p class="message" :style="{ color:isDark?'black':'#585858' }">{{ card.message }}</p>
        <div class="bottom">
            <div class="feedback">
                <div class="like">
                    <span class="icon">❤</span>
                    <span class="value">{{ card.like }}</span>
                </div>
                <div class="comment">
                    <el-icon color="#949494"><ChatDotRound /></el-icon>
                    <span class="value">{{ card.comment }}</span>
                </div>
            </div>
            <p class="name">{{ card.name }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {formattime} from '../utils/customize'
import { messageLabels,messageCardColors } from '../utils/data';
import { useTimeStore } from '../store'
import { storeToRefs } from 'pinia'

//获取父组件传递的参数
const props = defineProps(['card'])

//实例化 Store
const timeStore = useTimeStore()
//解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)

</script>

<style lang='less' scoped>
.message-card {
    width: 308px;
    height: 240px;
    background-color: #f5d8d7;
    padding: 10px 20px 60px;
    box-sizing: border-box;
    position: relative;

    .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;

        p {
            font-size: 12px;
            color: #949494;
        }
    }

    .message {
        height: 140px;
        
        font-size: 15px;
        color: #585858;
        cursor: pointer;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left: 0;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;

        .feedback {
            display: flex;
            align-items: center;

            .like {
                padding-right: 8px;

                .icon {
                    cursor: pointer;
                    transition: all 0.3s;
                    font-size: 16px;
                    color: #949494;

                    &.addlike {
                        color: red;
                    }

                    &:hover {
                        color: red;

                    }
                }

                .value {
                    font-size: 12px;
                    color: #949494;
                    line-height: 16px;
                    padding-left: 4px;
                }
            }

            .comment {
                .icon {
                    font-size: 16px;
                    color: #949494;

                }

                .value {
                    font-size: 12px;
                    color: #949494;
                    line-height: 16px;
                    padding-left: 4px;
                }
            }
        }

        .name {
            font-size: 16px;
            color: #202020;
        }
    }
}
</style>