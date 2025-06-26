<template>
    <div class="card-detail">
        <!-- 头部按钮 -->
        <div class="detail-head">
            <div class="title">
                <p class="revoke">联系墙主撕掉该便签</p>
                <p class="report">举报</p>
            </div>
            <el-icon  @click="emit('closePopup')" class="icon" size="22">
                <CloseBold />
            </el-icon>
        </div>
        <!-- 留言卡片 -->
        <message-card :card="card" />
        <!-- 评论表单 -->
        <div class="detail-form">
            <textarea class="text" style="outline: none;" placeholder="请输入..." />
            <div class="bottom">
                <input class="signature" placeholder="签名" readonly type="text">
                <button class="submit">发送</button>
            </div>
        </div>
        <!-- 评论区 -->
        <div class="detail-comment">
            <p class="comment-title">评论12</p>
            <div class="comment-item" v-for="(item, index) in 12">
                <div class="avatar">
                    <img src="https://blogs.2leo.top/512x512.png" alt="">
                </div>
                <div class="content">
                    <div class="userInfo">
                        <p class="name">小刘</p>
                        <p class="time">2025-12-8 12:11:48</p>
                    </div>
                    <p class="comment">吃葡萄不吐葡萄皮吃葡萄不吐葡萄皮吃葡萄不吐葡萄皮吃葡萄不吐葡萄皮吃葡萄不吐葡萄皮吃葡萄不吐葡萄皮</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import MessageCard from './MessageCard.vue';

//获取父组件的参数
const props = defineProps(['isShow','card'])

//获取父组件方法
const emit = defineEmits(['closePopup'])
</script>

<style lang='less' scoped>
.card-detail {
    padding: 0 20px 80px 20px;
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 60px;
    z-index: 1000;
    background: rgba(255, 255, 255);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(5px);
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    .detail-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        box-sizing: border-box;

        .title {
            font-size: 16px;
            color: #202020;
            display: flex;
            font-weight: 600;

            .revoke {
                color: #3873f0;
                cursor: pointer;
                padding-right: 30px;
                font-size: 16px;
            }

            .report {
                font-size: 16px;
                color: #f67770;
                cursor: pointer;
            }
        }

        .icon {
            color: #585858;
            cursor: pointer;
            padding-left: 8px;
        }
    }

    .detail-form {
        .text {
            background: none;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            padding: 8px;
            box-sizing: border-box;
            width: 100%;
            margin-top: 12px;
        }

        .bottom {
            display: flex;
            padding-top: 6px;
            justify-content: space-between;

            .signature {
                width: 200px;
                box-sizing: border-box;
                padding: 7px;
                background: none;
                border: 1px solid rgba(148, 148, 148, 1);
                line-height: 20px;
                outline: none;
            }

            .submit {
                cursor: pointer;
                padding: 5px 28px;
                background-color: #797979;
                border-radius: 5px;
                margin-right: 10px;

                &.disabled {
                    cursor: not-allowed;
                }
            }
        }
    }

    .detail-comment {
        margin-top: 30px;

        .comment-title {
            padding-bottom: 20px;
            font-size: 16px;
            font-weight: 500;
        }

        .comment-item {
            display: flex;
            padding-bottom: 20px;

            .avatar {
                flex: none;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                overflow: hidden;
                background-color: skyblue;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .content {
                padding-left: 8px;
                font-family: auto;

                .userInfo {
                    display: flex;
                    align-self: center;
                    align-items: center;


                    .name {
                        font-weight: 600;
                        font-size: 14px;
                    }

                    .time {
                        font-size: 12px;
                        padding-left: 4px;
                        color: #949494;
                    }
                }

                .comment {
                    padding-top: 8px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>