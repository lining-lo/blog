<template>
    <div class="album-container">
        <div class="album-list">
            <router-link to="photos" class="list-item" v-for="(item,index) in 11" :key="index">
                <div class="item-content">
                    <p class="title">风景</p>
                    <p class="msg">记录沿途的风景</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>
<style lang='less' scoped>
.album-container {
    width: 67%;
    margin: 40px auto;
    padding: 10px;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 10px;
    font-family: auto;

    .album-list {
        display: flex;
        align-items: center;
        color: #fff;
        flex-wrap: wrap;

        .list-item {
            width: calc(25% - 10px);
            height: 140px;
            background-color: pink;
            margin: 7.5px 5px;
            box-shadow: 0 1px 10px -6px black;
            border-radius: 10px;

            .item-content {
                width: 90%;
                height: 72px;
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.2);
                padding: 5px;
                margin: 14px auto;
                .title {
                    font-size: 20px;
                    font-weight: 700;
                }

                .msg {
                    font-size: 14px;
                    font-weight: 700;
                }

            }
        }
    }
}
</style>