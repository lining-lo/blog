<template>
    <div class="classification">
        <div class="classification-list">
            <div class="list-item" :class="index % 2 === 0 ? 'left' : 'right'" v-for="(item, index) in currentData"
                :key="item.id">
                <div class="item-img">
                    <img v-if="hotArticle" :src="`http://localhost:3000${item.cover}`" alt="">
                </div>
                <div class="item-content">
                    <div class="content-txt">
                        <div class="txt-title" @click="toArticle(item)" v-if="hotArticle">
                            {{ item.name }}
                        </div>
                        <div class="txt-msg" @click="toArticle(item)">
                            {{ item.content }}
                        </div>
                        <div class="txt-info">
                            <span>⏲️</span><span style="margin-left: 4px;" v-if="hotArticle">{{ item.createdate
                            }}</span>&nbsp;
                            <span>👁️</span><span style="margin-left: 4px;">{{ item.count }}</span>&nbsp;
                            <span>📑</span><span style="margin-left: 4px;">{{ item.commentCount[0].count
                            }}</span>&nbsp;
                            <span class="isLike" :class="{ addlike: item.isPraise[0].count !== 0 }"
                                @click="addPraise($event, item)">❤</span><span style="margin-left: 4px;">{{
                                    item.praiseCount[0].count }}</span>&nbsp;
                            <span>🏷️</span><span style="margin-left: 4px;">{{ route.query.name }}</span>&nbsp;
                        </div>
                    </div>
                </div>
                <div class="item-bg" v-if="hotArticle"
                    :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"></div>
            </div>
        </div>
        <div class="classification-pager" v-if="hotArticle && hotArticle.length >= 5">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" background
                layout=" prev, pager, next" :total="hotArticle.length" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, computed, getCurrentInstance } from 'vue'
import { useArticleStore, useUserStore } from '../store';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';
import { ElMessage } from 'element-plus';

const { proxy } = getCurrentInstance()

// 实例化 Store
const userStore = useUserStore()
const articleStore = useArticleStore()
// 解构 State（自动转为响应式 ref）
const { token } = storeToRefs(userStore)
const { article } = storeToRefs(articleStore)

// 挂载
onMounted(() => {
    articleStore.getArticle()
})
const route = useRoute()
const labelId = computed(() => route.query.id)
// 获取根据观看次数排序的文章
const hotArticle = computed(() => {
    return article.value
        .filter(item => item.label === parseInt(labelId.value))
        .sort((a, b) => {
            // 确保观看次数存在，默认为0
            const countA = a.count || 0;
            const countB = b.count || 0;
            return countB - countA; // 降序排列（从高到低）
        });
})
// 分页状态
const currentPage = ref(1);
const pageSize = ref(5);
// 计算当前页数据
const currentData = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value;
    const end = start + pageSize.value;
    return hotArticle.value.slice(start, end);
});
// 页码变化时的处理
const handleCurrentChange = (val: any) => {
    currentPage.value = val;
};

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

const router = useRouter()
// 查看文章
const toArticle = (item: any) => {
    router.push({
        name: 'article',
        query: { id: item.id }
    });
}
</script>
<style lang='less' scoped>
.classification {
    width: 69%;
    min-height: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
    position: relative;
    cursor: default;

    @media screen and (max-width: 1000px) {
        width: 100%;
    }

    .classification-list {
        width: 100%;
        height: 100%;

        .list-item {
            width: 100%;
            height: 240px;
            margin: 20px 0;
            background-color: #2c333e;
            overflow: hidden;
            position: relative;

            .item-img {
                width: 50%;
                height: 100%;
                position: absolute;
                z-index: 1;

                @media screen and (max-width: 700px) {
                    display: none;
                }

                img {
                    width: 90%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    transition: transform 0.8s ease;

                    &:hover {
                        transform: scale(1.2);
                    }
                }
            }

            .item-content {
                width: 50%;
                height: 100%;
                position: absolute;
                z-index: 1;
                cursor: pointer;

                @media screen and (max-width: 700px) {
                    width: 100%;
                }

                .content-txt {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    .txt-title {
                        font-size: 24px;
                        line-height: 32px;
                        color: #fff;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        transition: all 0.2s;

                        &:hover {
                            color: #539dfd;
                        }
                    }

                    .txt-msg {
                        width: 100%;
                        max-height: 92px;
                        color: #cecece;
                        line-height: 1.8;
                        text-indent: 2em;
                        letter-spacing: 0.5px;
                        overflow: hidden;
                    }

                    .txt-info {
                        color: #fff;
                        font-size: 12px;
                        transition: all 0.2s;

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
                }
            }

            .item-bg {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                filter: blur(40px) brightness(0.6);
                background-image: url(../assets/images/dark-treehole.webp);
                background-size: cover;
                background-position: center;
            }
        }

        &>.left {
            .item-img {
                left: 0;

                img {
                    clip-path: polygon(0px 0px, 100% 0px, 90% 100%, 0px 100%);
                }
            }

            .item-content {
                right: 0;
                padding: 20px 30px 20px 0;

                @media screen and (max-width: 700px) {
                    padding: 20px;
                }
            }
        }

        &>.right {
            .item-img {
                right: 0;

                img {
                    clip-path: polygon(10% 0px, 100% 0px, 100% 100%, 0px 100%);
                    float: right;
                }
            }

            .item-content {
                left: 0;
                padding: 20px 0 20px 30px;

                @media screen and (max-width: 700px) {
                    padding: 20px;
                }

                .txt-info {
                    text-align: end;

                    @media screen and (max-width: 700px) {
                        text-align: left;
                    }
                }
            }

            .item-bg {}
        }
    }

    .classification-pager {
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: center;
    }
}
</style>