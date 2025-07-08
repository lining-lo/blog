<template>
    <div class="treehole-container" :style="{ backgroundImage: imgurl }">
        <div class="treehole-send">
            <input class="send-input" v-model="commentParams.content" type="text" placeholder="留下点想说的话吧~">
            <button class="send-btn" @click="submit">发送</button>
        </div>
        <div class="treehole-item" @animationend="resetDanmu(item.id)" :style="{
            'top': item.top + 'px',
            'animationDelay': `${0.2 * item.initialIndex}s`,
            animationDuration: `${item.animationDuration}s`
        }" v-for="(item, index) in danmus" :key="item.id">
            <div class="item-img"
                :style="{ backgroundImage: item.user_type === 0 ? `url(${getImageUrl(item)})` : `${portrait[item.user_imgurl]}` }">
            </div>
            <div class="item-msg">{{ item.content }}</div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { portrait } from '../utils/data';
import { useRoute } from 'vue-router';
import { useTimeStore, useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';
import { ElMessage } from 'element-plus';

// 生成唯一ID的函数
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

//实例化route
const route = useRoute()
const { proxy } = getCurrentInstance() as any

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)

//获取背景图片
const imgurl = computed(() => {
    const url = `url(/src/assets/images/${isDark.value ? 'dark' : 'light'}-${String(route.name)}.webp)`;
    return url;
})

// 弹幕
const danmus = ref([]);
// 初始弹幕数量
const initialCount = ref(0);

// 查找弹幕参数
const findCommentParams = reactive({
    type_id: '',
    type: 3,
    page: 1,
    pagesize: 100,
})

// 头像URL处理函数
const getImageUrl = (item: any) => {
    // 用户类型为0使用用户头像，否则使用预设头像
    if (item.user_type === 0) {
        if (!item.user_imgurl) return 'http://localhost:3000/photo/1751212892031.png'; // 默认头像
        if (item.user_imgurl.startsWith('http')) return item.user_imgurl;
        return `http://localhost:3000${item.user_imgurl}`;
    } else {
        return portrait[item.user_imgurl] || 'http://localhost:3000/photo/1751212892031.png';
    }
};

// 分页查找弹幕
const getComment = async () => {
    findCommentParams.type_id = nanoid(10)
    const result = await proxy.$api.findCommentPage(findCommentParams)

    // 处理每条弹幕，添加唯一ID和初始索引
    for (let i = 0; i < result.data.message.length; i++) {
        result.data.message[i].id = generateId();
        result.data.message[i].initialIndex = i;
        result.data.message[i].isDelete = false;
        result.data.message[i].top = Math.trunc(Math.random() * 641) + 60;
        result.data.message[i].animationDuration = Math.trunc(Math.random() * 11) + 8;
    }

    danmus.value = result.data.message;
    initialCount.value = result.data.message.length;
}

// 挂载
onMounted(() => {
    getComment()
})

// 需要重置的ID数组
const resetIds = ref<string[]>([]);

// 弹幕循环（使用ID而非索引）
const resetDanmu = (id: string) => {
    resetIds.value.push(id);

    nextTick(() => {
        if (resetIds.value.length > 0) {
            resetIds.value.forEach(id => {
                // 查找弹幕在当前数组中的位置
                const index = danmus.value.findIndex(item => item.id === id);

                if (index !== -1) {
                    // 从当前位置移除并添加到末尾
                    const danmu = danmus.value.splice(index, 1)[0];

                    // 重置弹幕位置和动画属性
                    danmu.top = Math.trunc(Math.random() * 641) + 60;
                    danmu.animationDuration = Math.trunc(Math.random() * 11) + 8;

                    danmus.value.push(danmu);
                }
            });

            resetIds.value = [];
        }
    });
};

// 新增弹幕参数
const commentParams = reactive({
    id: '',
    type: 3,
    type_id: '',
    user_id: token.value.type === 1 ? token.value.username : token.value.id,
    user_name: token.value.type === 1 ? `游客${token.value.username}` : token.value.username,
    user_type: token.value.type,
    user_imgurl: token.value.imgurl,
    createdate: '',
    content: '',
    replier_id: '',
    replier_name: '',
})

// 新增弹幕
const submit = async () => {
    commentParams.id = nanoid(10)
    commentParams.type_id = nanoid(10)
    commentParams.createdate = formattime(Date.now())

    // 校验
    if (commentParams.content.trim() === '') {
        return ElMessage.warning('内容输入不能为空')
    }

    // 发送请求
    const result = await proxy.$api.insertComment(commentParams)

    if (result.data.code === 200) {
        const danmu = {
            id: generateId(),
            initialIndex: danmus.value.length,
            isDelete: false,
            top: Math.trunc(Math.random() * 641) + 60,
            animationDuration: Math.trunc(Math.random() * 11) + 8,
            user_type: token.value.type,
            user_imgurl: token.value.imgurl || '', // 确保有默认值
            content: commentParams.content,
        }

        console.log('New Danmu:', danmu); // 调试用
        danmus.value.push(danmu);
    }

    // 清空数据
    commentParams.content = ''

    //提示用户
    ElMessage.success('发送成功')
}
</script>
<style lang='less' scoped>
@keyframes scrollDanmu {
    to {
        right: 100%;
    }
}

.treehole-container {
    width: 100%;
    height: 100vh;
    background-image: url(../assets/images/light-treehole.png);
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;

    .treehole-send {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        z-index: 10;

        .send-input {
            border-radius: 20px 0 0 20px;
            border: 1px solid #fff;
            color: #fff;
            background: transparent;
            height: 40px;
            width: 252px;
            padding: 10px;
            outline: none;
        }

        .send-btn {
            width: 60px;
            height: 40px;
            border: 1px solid #fff;
            border-left: none;
            color: #fff;
        }
    }

    .treehole-item {
        height: 40px;
        width: auto;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 100px;
        padding: 10px;
        color: #FFF;
        position: absolute;
        top: 100px;
        display: flex;
        align-items: center;
        animation: scrollDanmu linear forwards;
        right: -30%;
        cursor: default;

        .item-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #53e5b9;
            background-size: cover;
            background-position: center;
        }

        .item-msg {
            line-height: 30px;
            padding-left: 8px;
            white-space: nowrap;
        }
    }
}
</style>