<template>
    <div class="home-container">
        <div class="home-left">
            <div class="left-baseInfo">
                <div class="baseInfo-avator">
                    <img style="width: 120px;height: 120px;border-radius: 50%;" src="../assets/images/avator.jpg"
                        alt="">
                </div>
                <p class="baseInfo-name">LO'S BLOG</p>
                <div class="baseInfo-content">
                    <p>
                        <span>文章</span>
                        <span class="count">102</span>
                    </p>
                    <p>
                        <span>分类</span>
                        <span class="count">6</span>
                    </p>
                    <p>
                        <span>访问量</span>
                        <span class="count">158465</span>
                    </p>
                </div>
                <a class="baseInfo-note" href="https://lining-lo.github.io/">⭐我的笔记</a>
            </div>

            <div class="left-welcome">
                <div class="welcome-title">
                    🎉欢迎 &nbsp;<span style="color: #ff4d4f;" v-if="weather">{{ weather.location }}</span> &nbsp;的小伙伴！
                </div>
                <div class="welcome-content" @click="aa">
                    <p><span>温度：</span><span style="color: #ff4d4f;font-weight: 500;" v-if="weather">{{
                        weather.temperature }}</span><span style="margin-left: 20px;">天气：</span><span
                            style="color: #ff4d4f;font-weight: 500;" v-if="weather">{{ weather.tq }}</span>
                    </p>
                    <p><span>日期：</span><span style="color: #ff4d4f;font-weight: 500;" v-if="weather">{{
                        weather.time.substring(0, 10) }}</span><span
                            style="color: #ff4d4f;margin-left: 10px;font-weight: 500;" v-if="weather">{{ weather.week
                            }}</span></p>
                    <p><span>风力：</span><span style="color: #ff4d4f;font-weight: 500;" v-if="weather">东风{{ weather.fl
                            }}</span></p>
                </div>
            </div>

            <div class="left-news">
                <div class="news-title">
                    <div class="title-left">🎯热点</div>
                    <div class="title-right">{{ newsUpdateTime === 0 ? "不久前更新" : `${newsUpdateTime}分钟前更新` }}</div>
                </div>
                <div class="news-item" v-for="(item, index) in news" :key="index">
                    <div class="item-num">{{ index + 1 }}</div>
                    <a :href="item.url" class="item-txt">{{ item.title }}</a>
                </div>
            </div>

            <div class="left-message">
                <div class="message-title">
                    🚙最新树洞
                </div>
                <div class="message-content">
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦不错哦不错哦不错哦不错哦不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦不错哦</div>
                    </div>
                </div>
            </div>

            <div class="left-search">
                <div class="search-title">🔍搜索</div>
                <div class="search-input">
                    <input type="text">
                    <button>搜索</button>
                </div>
            </div>

            <div class="left-label">
                <div class="label-title">
                    🤖标签
                </div>
                <div class="label-content">
                    <span v-for="(item, index) in 12" :key="index" :style="{ color: labelColors[index] }">我的博客</span>
                </div>
            </div>

            <div class="left-video">
                <div class="video-title">
                    📺视频
                </div>
                <div class="video-content">
                    <button class="content-look" v-show="!isShowVideo" @click="updateVideoShow">点我看美女~</button>
                    <div class="content-meinv" v-show="isShowVideo">
                        <video :src="videoUrl" autoplay muted controls @ended="autoPlay"></video>
                        <div class="meinv-btn">
                            <button @click="isAutoplay = !isAutoplay">AUTO：{{ isAutoplay ? 'ON' : 'OFF' }}</button>
                            <button @click="getVideo">NEXT</button>
                        </div>
                        <button class="meinv-close" @click="updateVideoShow">CLOSE</button>
                    </div>
                </div>
            </div>

            <div class="left-consulting">
                <div class="consulting-title">🌐资讯</div>
                <div class="consulting-content">
                    <p><span>文章数量：</span><span>99</span></p>
                    <p><span>标签总数：</span><span>6</span></p>
                    <p><span>图片数目：</span><span>22</span></p>
                    <p><span>获赞数量：</span><span>45</span></p>
                    <p><span>评论总数：</span><span>19</span></p>
                    <p><span>用户数目：</span><span>20</span></p>
                    <p><span>访问次数：</span><span>212</span></p>
                    <p><span>运行天数：</span><span>22</span></p>
                </div>
            </div>
        </div>
        <div class="home-right">
            <div class="right-banner">
                <el-carousel trigger="click" height="340px" arrow="never">
                    <el-carousel-item v-for="item in bannerImg[isDark ? 1 : 0]" :key="item">
                        <div class="bannerimg" :style="{ backgroundImage: item }">
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="right-header">
                <div class="header-notice">
                    <el-icon size="18" color="red">
                        <BellFilled />
                    </el-icon>
                    <p class="notice">NOTICE&nbsp;-&nbsp;本站已开启随缘更新模式(更新较慢)，原因：网站需要优化、维护。期待给您带来更好的体验。</p>
                </div>
            </div>
            <div class="right-recommend">
                <div class="recommend-header">
                    <div class="header-left">
                        <el-icon color="#ff623e" size="24">
                            <Menu />
                        </el-icon>
                        <span style="margin-left: 4px;">站长推荐</span>
                    </div>
                    <div class="header-right">
                        <el-icon color="#53e5b9" size="24">
                            <HomeFilled />
                        </el-icon>
                        <span style="margin-left: 4px;">首页</span>
                    </div>
                </div>
                <div class="article-item" @click="toArticle(item)" v-for="(item, index) in topArticle" :key="index">
                    <div class="item-img">
                        <img style="width: 100%;height: 100%;" :src="`http://localhost:3000${item.cover}`" alt="">
                    </div>
                    <div class="item-content">
                        <div class="content-time">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            <span style="margin-left: 4px;">{{ item.createdate }}</span>
                        </div>
                        <div class="content-title">{{ item.name }}</div>
                        <div class="right-tip">{{ item.name }}</div>
                        <div class="content-info">
                            <span>👁️</span><span style="margin-left: 4px;">{{ item.count }}</span>&nbsp;
                            <span>📑</span><span style="margin-left: 4px;">{{ item.commentCount[0].count
                                }}</span>&nbsp;
                            <span class="isLike" :class="{ addlike: item.isPraise[0].count !== 0 }"
                                @click="addPraise($event, item)">❤</span><span style="margin-left: 4px;">{{
                                    item.praiseCount[0].count }}</span>
                        </div>
                        <div class="content-label">
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
                </div>
            </div>
            <div class="right-article">
                <div class="article-header">
                    <div class="header-left">
                        <el-icon color="#ff623e" size="24">
                            <Menu />
                        </el-icon>
                        <span style="margin-left: 4px;">文章列表</span>
                    </div>
                    <div class="header-right">
                        <el-icon color="#53e5b9" size="24">
                            <HomeFilled />
                        </el-icon>
                        <span style="margin-left: 4px;">首页</span>
                    </div>
                </div>
                <div class="article-item" @click="toArticle(item)" v-for="(item, index) in currentData" :key="index">
                    <div class="item-img">
                        <img style="width: 100%;height: 100%;" :src="`http://localhost:3000${item.cover}`" alt="">
                    </div>
                    <div class="item-content">
                        <div class="content-time">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            <span style="margin-left: 4px;">{{ item.createdate }}</span>
                        </div>
                        <div class="content-title">{{ item.name }}</div>
                        <div class="right-tip">{{ item.name }}</div>
                        <div class="content-info">
                            <span>👁️</span><span style="margin-left: 4px;">{{ item.count }}</span>&nbsp;
                            <span>📑</span><span style="margin-left: 4px;">{{ item.commentCount[0].count
                            }}</span>&nbsp;
                            <span class="isLike" :class="{ addlike: item.isPraise[0].count !== 0 }"
                                @click="addPraise($event, item)">❤</span><span style="margin-left: 4px;">{{
                                    item.praiseCount[0].count }}</span>
                        </div>
                        <div class="content-label">
                            <p>
                                <el-icon color="green" style="margin-right: 4px;">
                                    <HelpFilled />
                                </el-icon>使用指南
                            </p>
                            <p>
                                <el-icon color="purple" style="margin-right: 4px;">
                                    <FolderOpened />
                                </el-icon>BLOG
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-pager">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" background
                    layout=" prev, pager, next" :total="hotArticle.length" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { bannerImg, labelColors } from '../utils/data';
import { useArticleStore, useTimeStore, useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';
import { ElMessage } from 'element-plus';

const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
const articleStore = useArticleStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)
const { article } = storeToRefs(articleStore)

// 视频
const videoUrl = ref('')
const isAutoplay = ref(true)
const isShowVideo = ref(false)
const updateVideoShow = () => {
    isShowVideo.value = !isShowVideo.value
}
const getVideo = () => {
    axios.get('https://v2.xxapi.cn/api/meinv').then((data) => {
        videoUrl.value = data.data.data
    })
}
const autoPlay = () => {
    if (isAutoplay.value) {
        getVideo()
    }
}
// 新闻
const news = ref()
const newsUpdateTime = ref()
const getNews = () => {
    axios.get('https://hot-api.2leo.top/douyin?cache=true').then((data) => {
        news.value = data.data.data.splice(0, 10)
        const targetTime = new Date(data.data.updateTime);
        const targetTimestamp = targetTime.getTime(); // 毫秒时间戳
        const now = new Date();
        const nowTimestamp = now.getTime(); // 毫秒时间戳
        const timeDiff = Math.round((nowTimestamp - targetTimestamp) / (1000 * 60));// 时间差(分钟)
        newsUpdateTime.value = timeDiff
    })
}
// 天气
const weather = ref()
const getWeather = () => {
    axios.get('https://info.2leo.top/api/visitor.info').then((data) => {
        weather.value = data.data
        // console.log(weather.value);
    })
}
// 挂载
onMounted(() => {
    getNews()
    getVideo()
    getWeather()
    articleStore.getArticle()
    console.log(nanoid(10), formattime(Date.now()));

})

// 获取置顶文章
const topArticle = computed(() => {
    // 先过滤非置顶文章，再按观看次数排序
    return article.value
        .filter(item => item.top === 0) // 过滤非置顶文章
        .sort((a, b) => {
            // 确保观看次数存在，默认为0
            const countA = a.count || 0;
            const countB = b.count || 0;
            return countB - countA; // 降序排列（从高到低）
        }).splice(0, 6);
})
// 获取根据观看次数排序的文章
const hotArticle = computed(() => {
    return article.value
        .sort((a, b) => {
            // 确保观看次数存在，默认为0
            const countA = a.count || 0;
            const countB = b.count || 0;
            return countB - countA; // 降序排列（从高到低）
        });
})
// 分页状态
const currentPage = ref(1);
const pageSize = ref(6);
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
.home-container {
    width: 100%;
    height: 100%;
    display: flex;
    margin-left: -20px;

    .home-left {
        padding: 0px 0 0 50px;
        width: calc(30% - 30px);

        .left-baseInfo {
            margin: 40px 0;
            width: 100%;
            height: 340px;
            background: linear-gradient(45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
            background-size: 400% 400%;
            box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;

            .baseInfo-avator {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background-color: #53e5b9;
                background-size: cover;
                background-position: center;
            }

            .baseInfo-name {
                font-size: 25px;
                font-family: fantasy;
                word-break: break-word;
                margin-top: 16px;
            }

            .baseInfo-content {
                height: 52px;
                width: 80%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 20px;

                p {
                    padding: 0 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .count {
                        margin-top: 10px;
                    }
                }
            }

            .baseInfo-note {
                display: block;
                width: 60%;
                height: 35px;
                background-color: #53e5b9;
                border-radius: 20px;
                color: #fff;
                display: flex;
                justify-content: center;
                cursor: pointer;
                align-items: center;
                margin-top: 16px;
                transition: all 0.5s;

                &:hover {
                    background-color: #ff4362;
                }
            }
        }

        .left-welcome {
            width: 100%;
            margin: 10px 0;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);
            background: rgba(252, 175, 162, 0.30);

            .welcome-title {
                display: flex;
                font-size: 17px;
                align-items: center;
                margin-top: 14px;
            }

            .welcome-content {
                padding: 4px 12px;
                font-size: 14px;

                p {
                    display: flex;
                    align-items: center;
                    margin: 5px;
                }
            }
        }

        .left-news {
            width: 100%;
            background-color: rgba(142, 86, 137, 0.3);
            margin-top: 12px;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            &>:nth-child(2) {
                .item-num {
                    background-color: #ff4d4f !important;
                    color: #fff;
                }
            }

            &>:nth-child(3) {
                .item-num {
                    background-color: orange !important;
                    color: #fff;
                }
            }

            &>:nth-child(4) {
                .item-num {
                    background-color: rgb(207, 174, 114) !important;
                    color: #fff;
                }
            }

            .news-title {
                margin-top: 14px;
                margin-bottom: 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .title-left {
                    font-size: 17px;
                }

                .title-right {
                    font-size: 12px;
                    color: #4f4f4f;
                }
            }

            .news-item {
                display: flex;
                align-items: center;
                padding: 4px 12px;
                font-size: 14px;

                .item-num {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background-color: #d9d9d9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 8px;
                    font-weight: 700;
                }

                .item-txt {
                    cursor: pointer;

                    &:hover {
                        color: #1dd98d;
                    }
                }
            }

        }

        .left-message {
            width: 100%;
            background-color: rgba(168, 230, 138, 0.30);
            margin-top: 12px;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            .message-title {
                font-size: 17x;
                margin-top: 14px;
                margin-bottom: 5px;
            }

            .message-content {
                width: 100%;

                .content-item {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 4px 12px;
                    font-size: 14px;

                    .avator {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                        background-color: #53e5b9;
                    }

                    .msg {
                        width: 220px;
                        white-space: nowrap;
                        /* 强制文本不换行 */
                        overflow: hidden;
                        /* 隐藏超出容器宽度的内容 */
                        text-overflow: ellipsis;
                        /* 为溢出的文本显示省略号 */
                    }
                }
            }
        }

        .left-search {
            width: 100%;
            background-color: rgb(172 209 209 / 30%);
            margin-top: 12px;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            .search-title {
                font-size: 17x;
                margin-top: 14px;
                margin-bottom: 5px;
            }

            .search-input {
                padding: 4px 12px;
                font-size: 14px;
                display: flex;
                align-items: center;

                input {
                    height: 28px;
                    font-size: 14px;
                    padding: 6px 12px;
                    border-radius: 10px 0 0 10px;
                    background-color: transparent;
                    border: 2px solid #53e5b9;
                    outline: none;
                }

                button {
                    height: 28px;
                    font-size: 12px;
                    padding: 4px 10px;
                    border-radius: 0 10px 10px 0;
                    background-color: #53e5b9;
                }
            }
        }

        .left-label {
            width: 100%;
            background-color: rgb(234 226 100 / 30%);
            margin-top: 12px;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            .label-title {
                font-size: 17x;
                margin-top: 14px;
                margin-bottom: 5px;
            }

            .label-content {
                width: 100%;
                height: 100%;
                padding: 4px 12px;
                font-size: 12px;

                span {
                    margin: 4px 12px 4px 0;
                    cursor: pointer;
                }
            }
        }

        .left-video {
            width: 100%;
            background-color: rgb(85 247 246 / 30%);
            margin-top: 12px;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            .video-title {
                font-size: 17x;
                margin-top: 14px;
                margin-bottom: 5px;
            }

            .video-content {
                width: 100%;
                height: 100%;
                padding: 4px 12px;
                font-size: 14px;

                .content-look {
                    width: 100%;
                    height: 36px;
                    background-color: #66e4f7;
                    border-radius: 5px;
                }

                .content-meinv {
                    video {
                        width: 100%;
                        max-height: 282px;
                        background: #050606;
                    }

                    .meinv-btn {
                        width: 100%;
                        height: 25px;
                        display: flex;
                        justify-content: space-between;

                        button {
                            padding: 4px 10px;
                            background-color: skyblue;
                        }
                    }

                    .meinv-close {
                        width: 100%;
                        height: 36px;
                        background-color: #66e4f7;
                        margin-top: 5px;
                    }
                }
            }
        }

        .left-consulting {
            width: 100%;
            background-color: rgba(190, 163, 192, 0.3);
            margin-top: 12px;
            border-radius: 5px;
            padding: 4px 12px 10px 12px;
            font-family: auto;
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            .consulting-title {
                font-size: 17x;
                margin-top: 14px;
                margin-bottom: 5px;
            }

            .consulting-content {
                width: 100%;
                height: 100%;
                padding: 4px 12px;
                font-size: 14px;

                p {
                    margin-bottom: 7px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }

    }

    .home-right {
        width: 70%;
        margin-left: 30px;

        .right-banner {
            width: 100%;
            height: 340px;
            margin-top: 40px;
            border-radius: 10px;
            box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);

            .bannerimg {
                width: 100%;
                height: 100%;
                border-radius: 10px;
                background-size: cover;
                background-position: center;

            }
        }

        .right-header {
            padding: 22px;
            color: #868686;
            border-radius: 5px;
            display: flex;
            margin-top: 40px;
            align-items: center;
            justify-content: space-between;
            background-color: rgba(146, 230, 245, 0.30);
            box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);

            .header-notice {
                display: flex;

                .notice {
                    margin-left: 5px;
                }
            }

            .header-search {
                width: 270px;
                height: 30px;
                border: 2px solid #53e5b9;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;


                input {
                    width: 100%;
                    height: 100%;
                    border-radius: 40px 0 0 40px;
                    border-right: 0;
                    border: none;
                    outline: none;
                    padding-left: 10px;
                }

                .serch {
                    width: 50px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #53e5b9;
                    border-radius: 0 40px 40px 0;
                    cursor: pointer;
                }
            }
        }

        .right-recommend {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;

            .recommend-header {
                width: 100%;
                height: 30px;
                margin-top: 30px;
                padding: 25px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 18px;
                font-family: auto;
                color: #797979;
                border-bottom: 1px dashed #dddddd;

                .header-left {
                    display: flex;
                    align-items: center;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }

            }

            .article-item {
                height: 300px;
                width: calc(33.33333% - 15px);
                border-radius: 10px;
                overflow: hidden;
                margin: 10px 10px 10px 0;
                flex-shrink: 0;
                box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);
                cursor: default;
                transition: all 0.5s;

                &:hover {
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
                }

                .item-img {
                    width: 100%;
                    height: 170px;
                    border-radius: 10px 10px 0 0;
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
                        transition: transform 0.5s ease;

                        &:hover {
                            transform: scale(1.2);
                        }
                    }
                }

                .item-content {
                    position: relative;
                    width: 100%;
                    height: 130px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 0 0 10px 10px;
                    padding: 10px 15px;

                    .content-time {
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        color: gray;
                    }

                    .content-title {
                        margin: 12px 0;
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

                    .content-info {
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

                    .content-label {
                        display: flex;
                        align-items: center;
                        display: flex;
                        align-items: center;

                        p {
                            margin-top: 12px;
                            margin-right: 14px;
                            font-size: 13px;
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
            }
        }

        .right-article {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-between;

            .article-header {
                width: 100%;
                height: 30px;
                margin-top: 30px;
                padding: 25px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 18px;
                font-family: auto;
                color: #797979;
                border-bottom: 1px dashed #dddddd;

                .header-left {
                    display: flex;
                    align-items: center;
                }

                .header-right {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }

            }

            .article-item {
                height: 300px;
                width: calc(33.33333% - 15px);
                border-radius: 10px;
                overflow: hidden;
                margin: 10px 10px 10px 0;
                flex-shrink: 0;
                cursor: default;
                box-shadow: 0 1px 16px -10px rgba(0, 0, 0, 0.5);
                transition: all 0.5s;

                &:hover {
                    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
                }

                .item-img {
                    width: 100%;
                    height: 170px;
                    border-radius: 10px 10px 0 0;
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
                        transition: transform 0.5s ease;

                        &:hover {
                            transform: scale(1.2);
                        }
                    }
                }

                .item-content {
                    position: relative;
                    width: 100%;
                    height: 130px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 0 0 10px 10px;
                    padding: 10px 15px;

                    .content-time {
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        color: gray;
                    }

                    .content-title {
                        margin: 12px 0;
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

                    .content-info {
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

                    .content-label {
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
            }
        }

        .right-pager {
            display: flex;
            width: 100%;
            height: 50px;
            justify-content: center;
        }
    }
}
</style>