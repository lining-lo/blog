<template>
    <div class="album-container">
        <div class="album-top"></div>
        <div class="album-list">
            <div @click="getTypePage(index)" class="list-item" v-for="(item, index) in photoType" :key="index">
                <img class="item-img" :src="item.cover" alt="">
                <div class="item-content">
                    <p class="title">{{ item.title }}</p>
                    <p class="msg">{{ item.msg }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="photos-container">
        <div class="photos-list">
            <div class="list-item" v-for="(item, index) in album" :key="index">
                <el-image style="width: 100%; height: 100%;border-radius: 5px;" :src="item.imgurl" fit="cover"
                    :preview-src-list="imgurlList" :initial-index="index" />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { photoType } from '../utils/data';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';

const { proxy } = getCurrentInstance()

// 图库数据
const albumInit = []
const album = ref()
// 图片列表
const imgurlList = ref([])
// 分页获取图库参数
const albumPageParams = reactive({
    page: 1,
    pagesize: 100,
})
// 分页获取图库方法
const getAlbum = async () => {
    const result = await proxy.$api.selectAlbumPage(albumPageParams)
    album.value = result.data.message
    for (let i = 0; i < album.value.length; i++) {
        album.value[i].imgurl = `http://localhost:3000${album.value[i].imgurl}`
        albumInit.push(album.value[i])
        imgurlList.value.push(album.value[i].imgurl)
    }
}
// 挂载
onMounted(() => {
    getAlbum()
})

// 根据类别获取图片
const getTypePage = (type: any) => {
    album.value = albumInit.filter(item => item.type === type);
    imgurlList.value = []
    for (let i = 0; i < album.value.length; i++) {
        imgurlList.value.push(album.value[i].imgurl)
    }
}
</script>
<style lang='less' scoped>
.album-container {
    width: 67%;
    margin: 60px auto;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 10px;
    font-family: auto;
    position: relative;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: default;

    .album-top {
        width: 170px;
        height: 100px;
        position: absolute;
        top: -82px;
        left: 50%;
        transform: translateX(-50%);
        background-size: cover;
        background-position: center;
        background-image: url(/src/assets/images/zhuangshi.png);
    }

    .album-list {
        display: flex;
        align-items: center;
        color: #fff;

        .list-item {
            width: 201px;
            height: 98px;
            background-color: pink;
            margin: 7.5px 5px;
            box-shadow: 0 1px 10px -6px black;
            border-radius: 10px;
            position: relative;
            background-size: cover;
            background-position: center;
            background-image: url(../assets/images/loading.gif);
            transition: all .3s ease-in-out;

            &:hover {
                filter: saturate(2) drop-shadow(0 0 5px rgba(0, 0, 0, .66));
                transform: translateY(-5px);
            }

            .item-img {
                position: absolute;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                border-radius: 10px;
            }

            .item-content {
                position: absolute;
                width: 90%;
                height: 72px;
                border-radius: 8px;
                background: rgba(0, 0, 0, 0.2);
                padding: 5px;
                margin: 14px 10px;

                .title {
                    font-size: 20px;
                    font-weight: 700;
                }

                .msg {
                    font-size: 14px;
                    font-weight: 700;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

            }
        }
    }
}

.photos-container {
    width: 67%;
    margin: 0 auto;
    margin-bottom: 40px;
    padding: 10px;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 5px;
    font-family: auto;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: default;

    .photos-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        .list-item {
            width: calc(25% - 10px);
            height: 140px;
            margin: 7.5px 5px;
            box-shadow: 0 1px 10px -6px black;
            border-radius: 5px;
            background-size: cover;
            background-position: center;
            background-image: url(../assets/images/loading.gif);
        }
    }
}

::v-deep .el-image {
    &:hover>img {
        filter: saturate(2) drop-shadow(0 0 5px rgba(0, 0, 0, .66));
        transition: transform 0.8s ease;

        &:hover {
            transform: scale(1.2);
        }
    }
}
</style>
