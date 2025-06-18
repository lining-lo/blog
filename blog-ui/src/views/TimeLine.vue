<template>
    <div class="timeline">
        <p class="timeline-maintime">2025</p>
        <el-timeline style="max-width: 600px" class="timeline-list">
            <el-timeline-item class="list-item" center="true" v-for="(item, index) in 5" :key="index" type="primary" color="#fff"
                size="large" hollow="true">
                <div class="item-content">
                    <div class="content-left"></div>
                    <div class="content-right">
                        <p class="right-title">搭建自己的个人专属歌单</p>
                        <p class="right-time">2025-11-11 12:26:44</p>
                    </div>
                </div>
            </el-timeline-item>
        </el-timeline>
        <div class="timeline-bottom">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>
<style lang='less' scoped>
.timeline {
    width: 70%;
    margin: 40px auto;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 10px;
    padding: 40px 50px;
    color: #4b4948;
    font-family: auto;

    .timeline-maintime {
        font-size: 25px;
        font-weight: 500;
        color: #49b1f5;
        margin-bottom: 14px;
    }

    .timeline-list {
        --el-timeline-node-size-large: 16px;
        --el-timeline-node-color: #a9d5f4;
        .list-item {
            .item-content {
                display: flex;
                align-items: center;
                margin-left: 20px;

                .content-left {
                    width: 100px;
                    height: 100px;
                    background-color: #53e5b9;
                }

                .content-right {
                    margin-left: 14px;

                    .right-title {
                        font-size: 16px;
                        padding: 5px;
                        font-weight: 700;

                    }

                    .right-time {
                        padding: 5px;
                        font-weight: 700;
                    }
                }
            }
        }
    }

    .timeline-bottom{
        max-width: 360px;
        margin: 0 auto;
    }
}

/* 增加选择器优先级 */
:deep(.el-timeline .el-timeline-item .el-timeline-item__tail) {
  border-left-width: 3px !important;
  border-left-color: var(--el-timeline-node-color, #c0c4cc) !important;
}

:deep(.el-timeline .el-timeline-item  .is-hollow) {
    border-width: 3px !important;
}


</style>