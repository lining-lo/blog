<template>
    <div class="container-timeline">
        <ol class="timeline-line">
            <li class="line-item">
                <div class="item-content left">
                    <div class="content-avator"></div>
                    <div class="content-main">
                        <div class="main-left"></div>
                        <div class="main-right">
                            <div class="right-time">
                                <el-icon>
                                    <Calendar />
                                </el-icon>
                                <span style="margin-left: 4px;">2025-4-10&nbsp;20:22:36</span>
                            </div>
                            <div class="right-title">我的个人博客</div>
                            <div class="right-info">
                                <el-icon color="red">
                                    <Loading />
                                </el-icon><span style="margin-left: 4px;">4799热度</span>&nbsp;
                                <el-icon color="orange">
                                    <ChatDotSquare />
                                </el-icon><span style="margin-left: 4px;">7评论</span>
                            </div>
                            <div class="right-info">
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
                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
                </div>
            </li>
            <li class="line-item">
                <div class="item-content right">
                    <div class="content-avator"></div>
                        <div class="content-main">
                            <div class="main-left"></div>
                            <div class="main-right">
                                <div class="right-time">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon>
                                    <span style="margin-left: 4px;">2025-4-10&nbsp;20:22:36</span>
                                </div>
                                <div class="right-title">我的个人博客</div>
                                <div class="right-info">
                                    <el-icon color="red">
                                        <Loading />
                                    </el-icon><span style="margin-left: 4px;">4799热度</span>&nbsp;
                                    <el-icon color="orange">
                                        <ChatDotSquare />
                                    </el-icon><span style="margin-left: 4px;">7评论</span>
                                </div>
                                <div class="right-info">
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
                            <div class="main-duihua" style="color: skyblue;"></div>
                        </div>
                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
            </li>
            <li class="line-item">
                <div class="item-content left">
                    <div class="content-avator"></div>
                    <div class="content-main">
                            <div class="main-left"></div>
                            <div class="main-right">
                                <div class="right-time">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon>
                                    <span style="margin-left: 4px;">2025-4-10&nbsp;20:22:36</span>
                                </div>
                                <div class="right-title">我的个人博客</div>
                                <div class="right-info">
                                    <el-icon color="red">
                                        <Loading />
                                    </el-icon><span style="margin-left: 4px;">4799热度</span>&nbsp;
                                    <el-icon color="orange">
                                        <ChatDotSquare />
                                    </el-icon><span style="margin-left: 4px;">7评论</span>
                                </div>
                                <div class="right-info">
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
                            <div class="main-duihua" style="color: skyblue;"></div>
                        </div>
                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
            </li>
            <li class="line-item">
                <div class="item-content right">
                    <div class="content-avator"></div>
                    <div class="content-main">
                            <div class="main-left"></div>
                            <div class="main-right">
                                <div class="right-time">
                                    <el-icon>
                                        <Calendar />
                                    </el-icon>
                                    <span style="margin-left: 4px;">2025-4-10&nbsp;20:22:36</span>
                                </div>
                                <div class="right-title">我的个人博客</div>
                                <div class="right-info">
                                    <el-icon color="red">
                                        <Loading />
                                    </el-icon><span style="margin-left: 4px;">4799热度</span>&nbsp;
                                    <el-icon color="orange">
                                        <ChatDotSquare />
                                    </el-icon><span style="margin-left: 4px;">7评论</span>
                                </div>
                                <div class="right-info">
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
                            <div class="main-duihua" style="color: skyblue;"></div>
                        </div>
                        <div class="main-duihua" style="color: skyblue;"></div>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup lang='ts'>

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
            height: 140px;

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
                    background-image: url(https://blogs.2leo.top/512x512.png);
                    background-size: cover;
                    background-position: center;
                }

                .content-main {
                    width: 400px;
                    height: 100%;
                    background-color: skyblue;
                    padding: 10px;
                    display: flex;

                    .main-left {
                        width: 120px;
                        height: 120px;
                        background-image: url(https://steamuserimages-a.akamaihd.net//ugc//853856987593738364//6CE56053C524C0113985CF22323937E3D2C304CD//);
                        background-size: cover;
                        background-position: center;
                        margin-right: 10px;
                    }

                    .main-right {
                        width: 270px;
                        height: 120px;
                        background-color: rgba(255, 255, 255, 0.1);
                        border-radius: 0 0 10px 10px;
                        padding: 10px 15px;

                        .right-time {
                            display: flex;
                            align-items: center;
                            font-size: 12px;
                            color: gray;
                        }

                        .right-title {
                            margin: 10px 0;
                            font-size: 18px;
                            font-weight: 600;
                        }

                        .right-info {
                            display: flex;
                            align-items: center;
                            font-size: 13px;
                            color: gray;
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
                            border-left-color: skyblue;
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
                            border-right-color: skyblue;
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