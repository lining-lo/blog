<template>
    <div class="container-timeline">
        <ol class="timeline-line">
            <li class="line-item" v-for="(item, index) in article" :key="index">
                <div class="item-content" :class="(index + 1) % 2 === 0 ? 'right' : 'left'">
                    <div class="content-avator"></div>
                    <div class="content-main" @click="toArticle(item)"
                        :style="{ backgroundColor: createMessageCardColors[index % createMessageCardColors.length] }">
                        <div class="main-left">
                            <img :src="`http://localhost:3000${item.cover}`" alt="">
                        </div>
                        <div class="main-right">
                            <div class="right-time">
                                <el-icon>
                                    <Calendar />
                                </el-icon>
                                <span style="margin-left: 4px;">{{ item.createdate }}</span>
                            </div>
                            <div class="right-title">{{ item.name }}</div>
                            <div class="right-tip">{{ item.name }}</div>
                            <div class="right-info">
                                <span>👁️</span><span style="margin-left: 4px;">{{ item.count }}</span>&nbsp;
                                <span>📑</span><span style="margin-left: 4px;">{{ item.commentCount[0].count
                                    }}</span>&nbsp;
                                <span class="isLike" :class="{ addlike: item.isPraise[0].count !== 0 }"
                                    @click="addPraise($event, item)">❤</span><span style="margin-left: 4px;">{{
                                        item.praiseCount[0].count }}</span>
                            </div>
                            <div class="right-info">
                                <p>
                                    <el-icon color="green" style="margin-right: 4px;">
                                        <HelpFilled />
                                    </el-icon>博客文章
                                </p>
                                <p>
                                    <el-icon color="purple" style="margin-right: 4px;">
                                        <FolderOpened />
                                    </el-icon>BLOG
                                </p>
                            </div>
                        </div>
                        <div class="main-duihua"
                            :style="{ borderColor: createMessageCardColors[index % createMessageCardColors.length] }">
                        </div>
                    </div>
                </div>
            </li>

        </ol>
    </div>
</template>

<script setup lang='ts'>
import { nanoid } from 'nanoid'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { formattime } from '../utils/customize'
import { useArticleStore, useTimeStore, useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createMessageCardColors } from '../utils/data'

const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
const articleStore = useArticleStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)
const { article } = storeToRefs(articleStore)

// 挂载
onMounted(() => {
    articleStore.getArticle()
})

const router = useRouter()
// 查看文章
const toArticle = (item: any) => {
    router.push({
        name: 'article',
        query: { id: item.id }
    });
}

// 点赞参数
const praiseParams = reactive({
    id: nanoid(10),
    type_id: '',
    user_id: token.value.type === 1 ? token.value.username : token.value.id,
    user_type: token.value.type,
    createdate: formattime(Date.now())
})

// 点赞方法
const addPraise = async (event: any, item: any) => {
    event.stopPropagation();
    praiseParams.type_id = item.id
    praiseParams.id = nanoid(10)
    // 点过一次赞不允许再点赞
    if (item.isPraise[0].count === 0) {
        try {
            const result = await proxy.$api.insertPraise(praiseParams)
            item.praiseCount[0].count++
            item.isPraise[0].count++
        } catch (error) {
            console.error('点赞失败:', error)
            ElMessage.error('点赞失败')
        }
    }
}
</script>
<style lang='less' scoped>
.container-timeline {
    width: 100%;
    position: relative;
    padding: 100px 0;
    margin: 40px 0;

    &::before {
        content: "";
        width: 4px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: orange;
    }

    .timeline-line {
        width: 100%;
        height: 100%;

        .line-item {
            position: relative;
            margin: 5px 0;
            width: 100%;
            height: 128px;
            cursor: default;

            .item-content {
                position: absolute;
                width: 50%;
                height: 100%;
                display: flex;

                .content-avator {
                    position: absolute;
                    height: 36px;
                    width: 36px;
                    background-color: #53e5b9;
                    background-image: url(../assets/images/avator.jpg);
                    background-size: cover;
                    background-position: center;
                }

                .content-main {
                    width: 400px;
                    height: 100%;
                    background-color: skyblue;
                    padding: 4px;
                    display: flex;
                    border-radius: 3px;
                    transition: all 0.3s;

                    &:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);

                        &>.main-duihua {
                            display: none !important;
                        }
                    }

                    .main-left {
                        width: 156px;
                        height: 120px;
                        margin-right: 4px;
                        border-radius: 3px;
                        background-image: url(../assets/images/loading.gif);
                        background-size: cover;
                        background-position: center;
                        overflow: hidden;
                        z-index: 5;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center;
                            transition: transform 0.8s ease;

                            &:hover {
                                transform: scale(1.2);
                            }
                        }
                    }

                    .main-right {
                        width: 240px;
                        height: 120px;
                        background-color: rgba(255, 255, 255, 0.1);
                        border-radius: 3px;
                        padding: 10px;
                        z-index: 5;
                        position: relative;

                        .right-time {
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            color: gray;
                        }

                        .right-title {
                            margin: 10px 0;
                            font-size: 17px;
                            font-weight: 600;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            color: gray;

                            &:hover {
                                +.right-tip {
                                    opacity: 1 !important;
                                }
                            }
                        }

                        .right-tip {
                            position: absolute;
                            top: -20px;
                            border-radius: 5px;
                            color: #4090c9;
                            padding: 5px 10px;
                            letter-spacing: 1px;
                            font-weight: 600;
                            line-height: 1.5;
                            font-size: 14px;
                            opacity: 0;
                            transition: all 0.5s;
                            white-space: nowrap;
                            background: linear-gradient(24deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
                        }

                        .right-info {
                            display: flex;
                            align-items: center;
                            font-size: 13px;
                            color: gray;

                            .isLike {
                                cursor: pointer;
                                z-index: 999;

                                &.addlike {
                                    color: red;
                                }

                                &:hover {
                                    color: red;
                                }
                            }
                        }

                        .right-info {
                            display: flex;
                            align-items: center;

                            p {
                                margin-top: 12px;
                                margin-right: 14px;
                                font-size: 12px;
                                padding: 2px 4px;
                                background-color: #eeeeee;
                                border-radius: 3px;
                                display: flex;
                                align-items: center;
                                transition: all 0.5s;

                                &:hover {
                                    background-color: #ffa500;
                                    color: #fff;
                                }
                            }
                        }
                    }

                    .main-duihua {
                        content: "";
                        position: absolute;
                        border-style: solid;
                        top: 10px;
                        height: 0;
                        border: 8px solid transparent;
                    }
                }


                &.left {
                    left: 0;
                    justify-content: end;

                    .content-avator {
                        right: 25px;
                    }

                    .content-main {
                        margin-right: 92px;

                        .main-duihua {
                            right: 76px;
                            border-right-color: transparent !important;
                            border-top-color: transparent !important;
                            border-bottom-color: transparent !important;
                        }
                    }

                    &::before {
                        content: "";
                        width: 12px;
                        height: 12px;
                        border: 4px solid #03a9f4;
                        border-radius: 50%;
                        position: absolute;
                        top: 10px;
                        right: -10px;
                        background-color: #ffffff;
                    }
                }

                &.right {
                    right: 0;

                    .content-avator {
                        left: 25px;
                    }

                    .content-main {
                        margin-left: 92px;

                        .main-duihua {
                            left: 76px;
                            border-left-color: transparent !important;
                            border-top-color: transparent !important;
                            border-bottom-color: transparent !important;
                        }
                    }

                    &::before {
                        content: "";
                        width: 12px;
                        height: 12px;
                        border: 4px solid #03a9f4;
                        border-radius: 50%;
                        position: absolute;
                        top: 10px;
                        left: -10px;
                        background-color: #ffffff;
                    }
                }
            }
        }
    }
}
</style>