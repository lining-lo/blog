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
            <!-- 用item.id作为key，确保唯一性（避免index重复导致的渲染问题） -->
            <div class="list-item" v-for="(item, index) in album" :key="item.id || index">
                <div class="item-like">
                    <span class="icon" :class="{ addlike: item.isPraise[0].count !== 0 }"
                        @click="addPraise(item)">❤</span>
                    <span class="count">{{ item.praiseCount[0].count }}</span>
                </div>
                <div class="item-tip">{{ item.name }}</div>
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
import { storeToRefs } from 'pinia';
import { useTimeStore, useUserStore } from '../store';
import { baseUrl } from '../utils/env';

const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)

// 图库数据（初始化为空数组，确保响应式正常）
const album = ref<any[]>([]) 
// 原始数据备份（用于分类筛选）
const albumInit = ref<any[]>([]) 
// 图片预览列表
const imgurlList = ref<string[]>([]) 

// 分页获取图库参数
const albumPageParams = reactive({
    user_id: token.value.type === 1 ? token.value.username : token.value.id,
    user_type: token.value.type,
    page: 1,
    pagesize: 100,
})

// 分页获取图库方法（初始化数据）
const getAlbum = async () => {  
    albumInit.value = [] // 清空原始数据
    const result = await proxy.$api.selectAlbumPage(albumPageParams)
    // 处理数据并拼接图片路径
    const processedData = result.data.message.map(item => ({
        ...item,
        imgurl: `${baseUrl}${item.imgurl}`
    }))
    album.value = processedData // 初始化展示数据（全部）
    albumInit.value = [...processedData] // 备份原始数据
    imgurlList.value = processedData.map(item => item.imgurl)
}

// 挂载时初始化
onMounted(() => {
    getAlbum()
})

// 根据类别筛选图片
const getTypePage = (type: any) => {
    // 从原始数据中筛选当前分类
    const filtered = albumInit.value.filter(item => item.type === type);
    album.value = filtered // 更新展示数据为当前分类
    imgurlList.value = filtered.map(item => item.imgurl)
}

// 点赞方法（局部更新，不重新请求全部数据）
const addPraise = async (item: any) => {
    // 已点赞则直接返回
    if (item.isPraise[0].count !== 0) return;
    praiseParams.id = nanoid(10)
    praiseParams.type_id = item.id
    try {
        const result = await proxy.$api.insertPraise(praiseParams)
        // 直接更新当前项的点赞数（局部更新，不影响整体数据）
        item.praiseCount[0].count++
        item.isPraise[0].count++
    } catch (err) {
        console.error('点赞失败:', err)
    }
}

// 点赞参数
const praiseParams = reactive({
    id: '',
    type_id: '',
    user_id: token.value.type === 1 ? token.value.username : token.value.id,
    user_type: token.value.type,
    createdate: formattime(Date.now())
})
</script>
<style lang='less' scoped>
.album-container {
    width: 800px;
    margin: 60px auto;
    margin-bottom: 20px;
    padding: 10px;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 10px;
    font-family: auto;
    position: relative;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: default;

    @media screen and (max-width: 900px) {
        width: 100%;
    }

    .album-top {
        width: 170px;
        height: 100px;
        position: absolute;
        top: -82px;
        left: 50%;
        transform: translateX(-50%);
        background-size: cover;
        background-position: center;
        background-image: url(/src/assets/images/zhuangshi.webp);
    }

    .album-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        color: #fff;

        .list-item {
            width: calc(25% - 10px);
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

            @media screen and (max-width: 800px) {
                width: calc(50% - 10px);
            }


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
    width: 800px;
    margin: 0 auto;
    margin-bottom: 40px;
    padding: 10px;
    box-shadow: 0 1px 10px -6px black;
    border-radius: 5px;
    font-family: auto;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: default;

    @media screen and (max-width: 900px) {
        width: 100%;
    }

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
            position: relative;
            @media screen and (max-width: 800px) {
                width: calc(50% - 10px);
            }

            &:hover .item-tip {
                opacity: 1 !important;
            }

            .item-like {
                position: absolute;
                left: 8px;
                top: 8px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 4px;
                padding: 0 6px;
                display: flex;
                align-items: center;
                backdrop-filter: blur(10px);
                /* opacity: 0; */
                transition: all 0.3s;
                cursor: pointer;
                z-index: 1;
                font-size: 12px;

                .icon {
                    color: gray;
                    padding-right: 4px;

                    &.addlike {
                        color: red;
                    }
                }

                .count {
                    color: #202020;
                }
            }

            .item-tip {
                position: absolute;
                top: -28px;
                right: 0;
                border-radius: 5px;
                color: #4090c9;
                padding: 5px 10px;
                letter-spacing: 1px;
                font-weight: 600;
                line-height: 1.5;
                font-size: 12px;
                opacity: 0;
                transition: all 0.5s;
                white-space: nowrap;
                z-index: 1;
                background: #d3d6df;
            }
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
