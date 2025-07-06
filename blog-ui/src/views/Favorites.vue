<template>
    <div class="container-favorites">
        <div class="favorites-title" :style="{ color: isDark ? '#ff4d4f' : '#000000' }">前端</div>
        <div class="favorites-list">
            <a :href="item.url" target="_blank" class="list-item" v-for="item in favorites.frontend" :key="item.id">
                <div class="item-img">
                    <img :src="item.icon" alt="">
                </div>
                <div class="item-content">
                    <span class="content-title">
                        {{ item.name }}
                    </span>
                    <span class="content-introduction">
                        {{ item.introduction }}
                    </span>
                </div>
            </a>
        </div>
        <div class="favorites-title" :style="{ color: isDark ? '#ff4d4f' : '#000000' }">后端</div>
        <div class="favorites-list">
            <a :href="item.url" target="_blank" class="list-item" v-for="item in favorites.backend" :key="item.id">
                <div class="item-img">
                    <img :src="item.icon" alt="">
                </div>
                <div class="item-content">
                    <span class="content-title">
                        {{ item.name }}
                    </span>
                    <span class="content-introduction">
                        {{ item.introduction }}
                    </span>
                </div>
            </a>
        </div>
        <div class="favorites-title" :style="{ color: isDark ? '#ff4d4f' : '#000000' }">工具</div>
        <div class="favorites-list">
            <a :href="item.url" target="_blank" class="list-item" v-for="item in favorites.tool" :key="item.id">
                <div class="item-img">
                    <img :src="item.icon" alt="">
                </div>
                <div class="item-content">
                    <span class="content-title">
                        {{ item.name }}
                    </span>
                    <span class="content-introduction">
                        {{ item.introduction }}
                    </span>
                </div>
            </a>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useTimeStore } from '../store'
import { nanoid } from 'nanoid'
import { formattime } from '../utils/customize'

const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)

// 收藏数据
const favorites = reactive({
    frontend: [] as any,
    backend: [] as any,
    tool: [] as any,
})
// 获取收藏参数
const favoritesPageParams = reactive({
    page: 1,
    pagesize: 100,
})
// 获取收藏方法
const getFavorites = async () => {
    const result = await proxy.$api.selectFavoritesPage(favoritesPageParams)
    favorites.frontend = result.data.message.filter(f => f.label === 0)
    favorites.backend = result.data.message.filter(b => b.label === 1)
    favorites.tool = result.data.message.filter(t => t.label === 2)
}
// 挂载
onMounted(() => {
    getFavorites()
})
</script>
<style lang='less' scoped>
.container-favorites {
    width: 100%;
    margin: 40px 0;

    .favorites-title {
        width: 100%;
        margin: 20px 0;
        text-align: center;
        font-size: 30px;
        font-weight: 600;
    }

    .favorites-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40px;

        .list-item {
            width: calc(25% - 20px);
            max-width: 320px;
            height: 90px;
            border-radius: 12px;
            margin: 10px;
            padding: 15px;
            box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
            transition: all .5s;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            overflow: hidden;
            cursor: pointer;

            &:hover {
                background-color: orange;

                .item-img {
                    width: 0;
                    height: 0;
                    margin-right: 5px;
                }

                .item-content {
                    width: 100%;
                    color: #fff;
                }
            }

            .item-img {
                height: 60px;
                width: 60px;
                line-height: 60px;
                margin-right: 20px;
                transition: all .5s;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }
            }

            .item-content {
                width: calc(100% - 80px);

                .content-title {
                    font-size: 19px;
                    font-weight: 700;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                .content-introduction {
                    margin-top: 5px;
                    opacity: .7;
                    font-weight: 700;
                    letter-spacing: 1px;
                    font-size: 14px;
                    line-height: 1.2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>