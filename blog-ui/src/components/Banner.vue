<template>
    <div class="banner" :style="{ backgroundImage: imgurl, opacity: isDark && route.name === 'article' ? 0.3 : 1 }">
        <div class="title-container">
            <!-- 路由标题 -->
            <div class="title-route" v-if="route.name !== 'article' && route.name !== 'photos'">
                <p class="route-name">{{ route.meta.name }}</p>
                <p class="route-msg">{{ route.meta.msg }}</p>
            </div>
            <!-- 文章标题 -->
            <div class="title-article" v-if="route.name === 'article'">
                <p class="article-name" v-if="currentArticle">{{ currentArticle.name }}</p>
                <p class="article-msg">
                    🦸🏻<span style="margin-left: 4px;">lining-lo</span> |
                    📅<span style="margin-left: 4px;" v-if="currentArticle">{{ currentArticle.createdate }}</span> |
                    👁️<span style="margin-left: 4px;" v-if="currentArticle">{{ currentArticle.count }}</span> |
                    ❤️<span style="margin-left: 4px;" v-if="currentArticle">{{ currentArticle.praiseCount[0].count
                    }}</span> |
                    📑<span style="margin-left: 4px;" v-if="currentArticle">{{ currentArticle.commentCount[0].count
                    }}</span>
                </p>
                <div class="labels">
                    <p class="labels-item"><el-icon color="green" style="margin-right: 4px;">
                            <HelpFilled />
                        </el-icon><span>博客文章</span></p>
                    <p class="labels-item"><el-icon color="purple" style="margin-right: 4px;">
                            <FolderOpened />
                        </el-icon><span>BLOG</span></p>
                </div>
            </div>
        </div>
        <div class="water-container">
            <div class="wave wave1" :style="{ backgroundImage: wave1Bg }"></div>
            <div class="wave wave2" :style="{ backgroundImage: wave2Bg }"></div>
        </div>
        <div class="bottom-container" v-if="route.name === 'home'" @click="scollToContent">
            <el-icon :size="40" color="skyblue">
                <ArrowDownBold />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRoute } from 'vue-router';
import { useArticleStore, useTimeStore, useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue';

//实例化route
const route = useRoute()

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
const articleStore = useArticleStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)
const { article } = storeToRefs(articleStore)
// 当前文章
const currentArticle = computed(() => {
    // 1. 处理 route.query.id 为 undefined 的情况
    if (!route.query.id) {
        console.warn('未提供文章ID');
        return null;
    }
    // 2. 确保 id 为字符串类型
    const articleId = String(route.query.id);
    // 3. 处理文章列表为空的情况
    if (!article.value || article.value.length === 0) {
        console.log('文章列表为空，等待数据加载...');
        return null;
    }
    // 4. 查找匹配的文章
    const index = article.value.findIndex(article => article.id === articleId);
    // 5. 处理未找到的情况
    if (index === -1) {
        console.warn(`未找到ID为 ${articleId} 的文章`);
        return null;
    }
    //   console.log(currentArticle.value);
    // 6. 返回找到的文章
    return article.value[index];
});

// 挂载
onMounted(() => {
    articleStore.getArticle()
})

//获取背景图片
const imgurl = computed(() => {
    let url = null
    if (route.name === 'article') {
        url = currentArticle.value
            ? `url(http://localhost:3000${currentArticle.value.cover})`
            : `url(/src/assets/images/default-article-cover.png)`; // 默认封面图路径
    } else if (route.name === 'photos') {
        url = `url(/src/assets/images/light-treehole.png)`;
    } else {
        url = `url(/src/assets/images/${isDark.value ? 'dark' : 'light'}-${String(route.name)}.png)`;
    }
    return url;
})

//获取水流背景颜色
const wave1Bg = computed(() => {
    const params = isDark.value ? 40 : 255
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(${params},${params},${params},0.7)' fill-opacity='1' d='M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`;
})
const wave2Bg = computed(() => {
    const params = isDark.value ? 40 : 255
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(${params},${params},${params})' fill-opacity='1' d='M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E")`;
})

// 滚动到主要内容部分
const scollToContent = () => {
    const bannerElement = document.querySelector('.banner');
    if (!bannerElement) return;
    // 目标滚动高度 =  banner底部位置 + 30px偏移
    const targetScrollHeight = bannerElement.offsetHeight + 30;
    const duration = 500; // 动画持续时间（毫秒）
    const startTime = performance.now();
    const startScroll = document.body.scrollTop || document.documentElement.scrollTop;

    const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // 使用缓动函数（减速效果）
        const easeOutProgress = progress * (2 - progress);

        // 计算当前滚动位置（从当前位置平滑过渡到目标位置）
        const currentScroll = startScroll + (targetScrollHeight - startScroll) * easeOutProgress;

        // 执行滚动
        document.body.scrollTop = currentScroll;
        document.documentElement.scrollTop = currentScroll;

        // 继续动画直到完成
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };

    requestAnimationFrame(animateScroll);
}

</script>

<style lang='less' scoped>
@keyframes wave {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}


.banner {
    width: 100%;
    height: 50vh;
    background-image: url(../assets/images/light-home.png);
    background-color: #26282a;
    background-size: cover;
    background-position: center;
    position: relative;
    transition: all 0.5;

    .title-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        .title-route {
            .route-name {
                color: #42b983;
                font-size: 40px;
                font-weight: 600;
                margin-bottom: 18px;
            }

            .route-msg {
                background: rgba(5, 12, 14, 0.5);
                padding: 12px 20px;
                color: #fff;
                font-size: 18px;
                font-weight: 600;
            }
        }

        .title-article {
            .article-name {
                color: #fff;
                font-size: 33px;
                font-weight: 600;
                margin-bottom: 10px;
            }

            .article-msg {
                color: #fff;
            }

            .labels {
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 13px;

                .labels-item {
                    display: flex;
                    align-items: center;
                    margin-top: 12px;
                    margin-right: 14px;
                    padding: 2px 4px;
                    background-color: #eeeeee;
                    border-radius: 3px;
                }
            }
        }

        .title-photos {
            color: #fff;
            font-size: 40px;
            font-weight: 600;
        }
    }

    .water-container {
        width: 100%;
        height: 100px;
        position: relative;
        top: calc(50vh - 99px);
        overflow: hidden;

        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100px;
            background-repeat: repeat-x;
        }

        .wave1 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(255,255,255,0.7)' fill-opacity='1' d='M0,50 C240,20 480,80 720,50 C960,20 1200,80 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E");
            animation: wave 10s linear infinite;
        }

        .wave2 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 100'%3E%3Cpath fill='rgba(255,255,255,0.8)' fill-opacity='1' d='M0,50 C240,80 480,20 720,50 C960,80 1200,20 1440,50 L1440,100 L0,100 Z'%3E%3C/path%3E%3C/svg%3E");
            animation: wave 12s linear infinite reverse;
            top: 15px;
        }
    }

    .bottom-container {
        position: absolute;
        bottom: 0;
        left: 50%;
        cursor: pointer;
    }
}
</style>