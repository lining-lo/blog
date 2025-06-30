<template>
    <div class="card-detail" :style="{ background: isDark ? `#26282a` : `#fff` }">
        <!-- 头部按钮 -->
        <div class="detail-head">
            <div class="title">
                <p class="revoke" @click="ElMessage.success('已通知墙住,请耐心等待结果')">联系墙主撕掉该便签</p>
                <p class="report" @click="ElMessage.success('举报成功')">举报</p>
            </div>
            <el-icon @click="emit('closePopup')" class="icon" size="22">
                <CloseBold />
            </el-icon>
        </div>
        <div class="detail-content">
            <!-- 留言卡片 -->
            <message-card :card="card" />
            <!-- 评论表单 -->
            <div class="detail-form">
                <textarea v-model="commentParams.content" class="text" style="outline: none;" placeholder="请输入..." />
                <div class="bottom">
                    <input readonly v-model="commentParams.user_name" class="signature" placeholder="签名" type="text">
                    <button class="submit" @click="submit">发送</button>
                </div>
            </div>
            <!-- 评论区 -->
            <div class="detail-comment">
                <p class="comment-title">评论{{ props.card.commentCount[0].count }}</p>
                <div class="comment-item" v-for="(item, index) in comment" :key="index">
                    <div class="avatar"
                        :style="{ backgroundImage: item.user_type === 0 ? `url(http://localhost:3000${item.user_imgurl})` : `${portrait[item.user_imgurl]}` }">
                    </div>
                    <div class="content">
                        <div class="userInfo">
                            <p class="name">{{ item.user_name }}</p>
                            <p class="time">{{ item.createdate }}</p>
                            <p class="recall"
                                v-if="token.type === 0 ? item.user_id !== token.id : item.user_id !== token.username"
                                @click="item.isShow = !item.isShow">回复</p>
                        </div>
                        <p class="comment">
                        <div v-if="item.replier_id !== '' && item.replier_id !== null" style="display: inline-block;">
                            <span>回复 </span><span style="color: #0f91c8;">@{{ item.replier_name }}</span>：
                        </div>
                        {{ item.content }}
                        </p>
                        <div class="bottom" v-if="item.isShow">
                            <input v-model="recallContent" :placeholder="`回复 @${item.user_name}`" type="text">
                            <button @click="send(item)">发布</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { nanoid } from 'nanoid';
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import MessageCard from './MessageCard.vue';
import { formattime } from '../utils/customize';
import { portrait } from '../utils/data';
import { ElMessage } from 'element-plus';
import { useTimeStore, useUserStore } from '../store';
import { storeToRefs } from 'pinia';

const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)

// 获取父组件的参数
const props = defineProps(['isShow', 'card', 'comment'])
// 获取父组件方法
const emit = defineEmits(['closePopup', 'getComment', 'getWall'])

// 新增评论参数
const commentParams = reactive({
    id: '',
    type: 2,
    type_id: '',
    user_id: token.value.type === 1 ? token.value.username : token.value.id,
    user_name: token.value.type === 1 ? `游客${token.value.username}` : token.value.username,
    user_type: token.value.type,
    user_imgurl: token.value.imgurl,
    createdate: '',
    content: '',
    replier_id: '',
    replier_name: ''
})
// 初始化评论参数
const initCommentParams = () => {
    commentParams.id = ''
    commentParams.type = 2
    commentParams.type_id = ''
    commentParams.createdate = ''
    commentParams.content = ''
    commentParams.replier_id = ''
    commentParams.replier_name = ''
    recallContent.value = ''
}
// 新增评论
const submit = async () => {
    commentParams.id = nanoid(10)
    commentParams.type_id = props.card.id
    commentParams.createdate = formattime(Date.now())
    // 校验
    if (commentParams.content.trim() === '') {
        ElMessage.warning('内容输入不能为空')
        return
    }
    // 发送请求
    const result = await proxy.$api.insertComment(commentParams)
    // 重新获取数据
    emit('getComment')
    emit('getWall')
    // 清空数据
    initCommentParams()
    //提示用户
    ElMessage.success('发送成功')
}

// 回复的内容
const recallContent = ref('')
// 回复评论
const send = async (item: any) => {
    // 拼接参数
    commentParams.id = nanoid(10)
    commentParams.type_id = props.card.id
    commentParams.user_id = token.value.type === 1 ? token.value.username : token.value.id
    commentParams.user_name = token.value.type === 1 ? `游客${token.value.username}` : token.value.username
    commentParams.createdate = formattime(Date.now())
    commentParams.content = recallContent.value
    commentParams.replier_id = item.user_id
    commentParams.replier_name = item.user_name
    // 校验
    if (commentParams.content.trim() === '') {
        ElMessage.warning('内容输入不能为空')
        return
    }
    // 发送请求
    const result = await proxy.$api.insertComment(commentParams)
    // 重新获取数据
    emit('getComment')
    // 清空数据
    initCommentParams()
    //提示用户
    ElMessage.success('发送成功')
}

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

    .detail-content {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 40px;

        &::-webkit-scrollbar {
            display: none;
        }

        .detail-form {
            .text {
                background: none;
                height: 56px;
                border: 1px solid rgba(148, 148, 148, 1);
                resize: none;
                padding: 8px;
                color: #7c4c82;
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
                    color: #7c4c82;
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
            color: #7c4c82;

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
                    background-color: skyblue;
                    background-size: cover;
                    background-position: center;
                }

                .content {
                    padding-left: 8px;
                    font-family: auto;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #e3e5e7;
                    width: 270px;

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

                        .recall {
                            margin-left: 5px;
                            color: #abafb4;
                            font-size: 12px;
                            cursor: pointer;

                            &:hover {
                                color: #1694ca;
                            }
                        }
                    }

                    .comment {
                        padding-top: 8px;
                        font-size: 14px;
                    }

                    .bottom {
                        margin-top: 10px;
                        height: 28px;
                        width: 250px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        input {
                            width: 200px;
                            height: 26px;
                            outline: none;
                            border: 1px solid #abafb4;
                            padding: 2px 5px;
                            font-size: 12px;
                        }

                        button {
                            padding: 4px 10px;
                            background-color: #7fd6f5;
                            color: #ffffff;
                            font-size: 12px;
                            border-radius: 3px;
                        }
                    }
                }
            }
        }
    }
}
</style>