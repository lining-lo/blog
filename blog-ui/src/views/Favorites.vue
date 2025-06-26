<template>
    <div class="container-timeline">
        <ol class="timeline-line">
            <li class="line-item">
                <div class="item-content left">
                    <div class="content-avator"></div>
                    <div class="content-main">

                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
                </div>
            </li>
            <li class="line-item">
                <div class="item-content right">
                    <div class="content-avator"></div>
                    <div class="content-main">

                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
                </div>
            </li>
            <li class="line-item">
                <div class="item-content left">
                    <div class="content-avator"></div>
                    <div class="content-main">

                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
                </div>
            </li>
            <li class="line-item">
                <div class="item-content right">
                    <div class="content-avator"></div>
                    <div class="content-main">

                        <div class="main-duihua" style="color: skyblue;"></div>
                    </div>
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
            height: 150px;

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
                    width: 360px;
                    height: 100%;
                    background-color: skyblue;

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