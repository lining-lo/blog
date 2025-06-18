<template>
    <div class="photos-container">
        <div class="photos-list">
            <div to="photos" class="list-item" v-for="(item, index) in 23" :key="index">
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>

</script>
<style lang='less' scoped>
.photos-container {
    width: 67%;
    margin: 40px auto;
    padding: 10px;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 10px;
    font-family: auto;

    .photos-list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .list-item {
            width: 200px;
            height: 140px;
            background-color: pink;
            margin: 7.5px 3.75px;
            box-shadow: 0 1px 10px -6px black;
            border-radius: 10px;
        }
    }
}
</style>