<template>
    <div class="message-card" :style="{ backgroundColor: messageCardColors[card.color] }">
        <div class="top">
            <p class="time">{{ card.createdate }}</p>
            <p class="label">{{ messageLabels[card.label] }}</p>
        </div>
        <p @click="emit('selectCard', card.id)" class="message" :style="{ color: isDark ? 'black' : '#585858' }">{{
            card.content }}</p>
        <div class="bottom">
            <div class="feedback">
                <div class="like">
                    <span class="icon":class="{ addlike: card.isPraise[0].count !== 0 }" @click="addPraise">❤</span>
                    <span class="value">{{ card.praiseCount[0].count }}</span>
                </div>
                <div class="comment">
                    <el-icon color="#949494">
                        <ChatDotRound />
                    </el-icon>
                    <span class="value">{{ card.commentCount[0].count }}</span>
                </div>
            </div>
            <p class="name">{{ card.user_name }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { messageLabels, messageCardColors } from '../utils/data';
import { useTimeStore, useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, reactive } from 'vue';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';

const { proxy } = getCurrentInstance()

// 获取父组件传递的参数
const props = defineProps(['card'])
// 获取父组件方法
const emit = defineEmits(['selectCard'])

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)

// 点赞参数
const praiseParams = reactive({
    id: nanoid(10),
    type_id: props.card.id,
    user_id: token.value.type === 1 ? token.value.username : token.value.id,
    user_type: token.value.type,
    createdate: formattime(Date.now())
})
// 点赞方法
const addPraise = async () => {
    // 点过一次赞不允许再点赞
    if (props.card.isPraise[0].count === 0) {
        const result = await proxy.$api.insertPraise(praiseParams)
        props.card.praiseCount[0].count++
        props.card.isPraise[0].count++
    }
    // console.log(props.card);
}

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
        width: 100%;
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