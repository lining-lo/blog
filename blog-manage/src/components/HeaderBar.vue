<template>
    <div class="headerbar">
        <div class="header-left">
            <img src="../assets/vue.svg" class="left-logo" alt="">
            <p class="left-title">lo'博客后台</p>
        </div>
        <div class="header-right">
            <div class="right-message">
                <el-icon :size="20">
                    <ChatDotRound />
                </el-icon>
            </div>
            <div class="right-avator"><el-avatar
                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></div>
            <div class="right-background">
                <el-icon :size="20">
                    <Sunny />
                </el-icon>
            </div>
            <div class="right-logout">
                <button>退出</button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>

<style lang='less' scoped>
.headerbar {
    width: 100%;
    height: 64px;
    background: #FFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;

    .header-left {
        display: flex;
        align-items: center;

        .left-logo {
            width: 24px;
            height: 24px;
        }

        .left-title {
            color: #000000;
            font-family: "PingFang SC";
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            line-height: 31.2px;
            margin-left: 12px;
        }
    }

    .header-right {
        width: 200px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>