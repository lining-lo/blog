<template>
    <div class="home-container">
        <div class="home-left">
            <div class="left-baseInfo">
                <div class="baseInfo-avator"></div>
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

            <div class="left-consulting">
                <div class="consulting-title">
                    <el-icon color="purple">
                        <Notebook />
                    </el-icon><span>网站资讯</span>
                </div>
                <div class="consulting-content">
                    <p><span>今日访问：</span><span>26</span></p>
                    <p><span>运行时间：</span><span>235</span></p>
                    <p><span>用户数量：</span><span>26</span></p>
                </div>
            </div>


            <div class="left-label">
                <div class="label-title">
                    <el-icon color="skyblue">
                        <DocumentAdd />
                    </el-icon><span>标签</span>
                </div>
                <div class="label-content">
                    <span v-for="(item, index) in 12" :key="index" :style="{ color: labelColors[index] }">我的博客</span>
                </div>
            </div>

            <div class="left-message">
                <div class="message-title">
                    <el-icon color="chocolate">
                        <Postcard />
                    </el-icon>
                    <div class="title">最新树洞</div>
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
                        <div class="msg">不错哦不错哦</div>
                    </div>
                    <div class="content-item">
                        <div class="avator"></div>
                        <div class="msg">不错哦不错哦</div>
                    </div>
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
                <router-link to="article" class="article-item" v-for="(item, index) in 6" :key="index">
                    <div class="item-img"></div>
                    <div class="item-content">
                        <div class="content-time">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            <span style="margin-left: 4px;">2025-4-10&nbsp;20:22:36</span>
                        </div>
                        <div class="content-title">我的个人博客</div>
                        <div class="content-info">
                            <el-icon color="red">
                                <Loading />
                            </el-icon><span style="margin-left: 4px;">4799热度</span>&nbsp;
                            <el-icon color="orange">
                                <ChatDotSquare />
                            </el-icon><span style="margin-left: 4px;">7评论</span>
                        </div>
                        <div class="content-label">
                            <p>
                                <el-icon color="purple" style="margin-right: 4px;">
                                    <FolderOpened />
                                </el-icon>BLOG
                            </p>
                            <p>
                                <el-icon color="green" style="margin-right: 4px;">
                                    <HelpFilled />
                                </el-icon>使用指南
                            </p>
                        </div>
                    </div>
                </router-link>
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
                <router-link to="article" class="article-item" v-for="(item, index) in 6" :key="index">
                    <div class="item-img"></div>
                    <div class="item-content">
                        <div class="content-time">
                            <el-icon>
                                <Calendar />
                            </el-icon>
                            <span style="margin-left: 4px;">2025-4-10&nbsp;20:22:36</span>
                        </div>
                        <div class="content-title">我的个人博客</div>
                        <div class="content-info">
                            <el-icon color="red">
                                <Loading />
                            </el-icon><span style="margin-left: 4px;">4799热度</span>&nbsp;
                            <el-icon color="orange">
                                <ChatDotSquare />
                            </el-icon><span style="margin-left: 4px;">7评论</span>
                        </div>
                        <div class="content-label">
                            <p>
                                <el-icon color="purple" style="margin-right: 4px;">
                                    <FolderOpened />
                                </el-icon>BLOG
                            </p>
                            <p>
                                <el-icon color="green" style="margin-right: 4px;">
                                    <HelpFilled />
                                </el-icon>使用指南
                            </p>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="right-pager">
                <el-pagination background="#53e5b9" layout="prev, pager, next" :total="1000" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { bannerImg, labelColors } from '../utils/data';
import { useTimeStore } from '../store'
import { storeToRefs } from 'pinia'

//实例化 Store
const timeStore = useTimeStore()
//解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)

</script>
<style lang='less' scoped>
.home-container {
    width: 100%;
    height: 100%;
    display: flex;

    .home-left {
        padding: 0px 0 0 50px;
        width: calc(30% - 30px);

        .left-baseInfo {
            margin-top: 40px;
            width: 100%;
            height: 340px;
            margin-bottom: 30px;
            background: linear-gradient(20deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
            background-size: 400% 400%;
            box-shadow: 0 1px 10px -6px gray;
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
                transition: all 0.5;

                &:hover {
                    background-color: #ff4362;
                }
            }
        }

        .left-consulting {
            width: 100%;
            height: 160px;
            box-shadow: 0 1px 10px -6px gray;
            margin: 10px 0;
            border-radius: 10px;
            padding: 14px 25px;

            .consulting-title {
                display: flex;
                font-size: 20px;
                align-items: center;
                margin-top: 14px;
                color: gray;
            }

            .consulting-content {
                padding: 12px;

                p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 5px;
                    color: #373434;
                }
            }
        }

        .left-label {
            width: 100%;
            max-width: 300px;
            box-shadow: 0 1px 10px -6px gray;
            margin: 10px 0;
            border-radius: 10px;
            padding: 14px 30px;

            .label-title {
                display: flex;
                font-size: 20px;
                align-items: center;
                margin-top: 14px;
                color: gray;
            }

            .label-content {
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                font-size: 13px;
                font-family: none;
                font-weight: 800;

                span {
                    margin: 1px 4px;
                    cursor: pointer;
                }
            }
        }

        .left-message {
            width: 100%;
            height: 456px;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
            box-shadow: 0 1px 10px -6px gray;

            .message-title {
                display: flex;
                font-size: 20px;
                align-items: center;
                margin-bottom: 20px;

                .title {
                    margin-left: 5px;
                    font-size: 20px;
                    color: gray;
                }
            }

            .message-content {
                width: 100%;
                height: 46px;

                .content-item {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin: 5px 0;

                    .avator {
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        margin-right: 5px;
                        background-color: #53e5b9;
                    }

                    .msg {
                        font-size: 16px;
                        font-weight: 500;
                        color: #373434;
                    }
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
            box-shadow: 0 1px 10px -6px gray;

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
            border: 1px dashed #dddddd;
            color: #868686;
            border-radius: 10px;
            display: flex;
            margin-top: 40px;
            align-items: center;
            justify-content: space-between;

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
            justify-content: space-between;

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
                cursor: pointer;
                box-shadow: 0 1px 10px -6px gray;

                .item-img {
                    width: 100%;
                    height: 170px;
                    background-color: #ad6e4c;
                    border-radius: 10px 10px 0 0;
                }

                .item-content {
                    width: 100%;
                    height: 130px;
                    background-color: #fff;
                    border-radius: 0 0 10px 10px;
                    padding: 10px 15px;

                    .content-time {
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        color: gray;
                    }

                    .content-title {
                        margin: 10px 0;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .content-info {
                        display: flex;
                        align-items: center;
                        font-size: 13px;
                        color: gray;
                    }

                    .content-label {
                        display: flex;
                        align-items: center;

                        p {
                            margin-top: 12px;
                            margin-right: 14px;
                            padding: 2px 4px;
                            background-color: #eeeeee;
                            border-radius: 3px;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
        }
        .right-article {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

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
                cursor: pointer;
                box-shadow: 0 1px 10px -6px gray;

                .item-img {
                    width: 100%;
                    height: 170px;
                    background-color: #ad6e4c;
                    border-radius: 10px 10px 0 0;
                }

                .item-content {
                    width: 100%;
                    height: 130px;
                    background-color: #fff;
                    border-radius: 0 0 10px 10px;
                    padding: 10px 15px;

                    .content-time {
                        display: flex;
                        align-items: center;
                        font-size: 12px;
                        color: gray;
                    }

                    .content-title {
                        margin: 10px 0;
                        font-size: 18px;
                        font-weight: 600;
                    }

                    .content-info {
                        display: flex;
                        align-items: center;
                        font-size: 13px;
                        color: gray;
                    }

                    .content-label {
                        display: flex;
                        align-items: center;

                        p {
                            margin-top: 12px;
                            margin-right: 14px;
                            padding: 2px 4px;
                            background-color: #eeeeee;
                            border-radius: 3px;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
        }

        .right-pager {
            display: flex;
            width: 100%;
            height: 50px;
            padding-left: 20px;
        }
    }
}
</style>