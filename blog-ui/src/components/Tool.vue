<template>
    <div class="tool">
        <span v-if="route.name === 'message'" @click="showCreateMessage">📫</span>
        <span v-if="route.name === 'article'" @click="showCatalog">🕹️</span>
        <span @click="toTop">🚁</span>
        <span @click="searchVisible = true">🔍</span>
        <span @click="musicVisible = true">🎸</span>
        <span @click="toChat">📻</span>
        <el-dialog class="search-dialog" :show-close="false" v-model="searchVisible" width="600">
            <div class="search"
                :style="{ opacity: isDark ? 0.8 : 1, backgroundImage: `url(src/assets/images/${isDark ? 'dark' : 'light'}-search.webp)` }">
                <div class="search-title">🔍搜索</div>
                <div class="search-input">
                    <input type="text" v-model="searchKeyword" @keyup.enter="filteredArticles">
                    <button @click="filteredArticles">搜索</button>
                </div>
                <div class="search-content" v-if="!isShowRecomment">
                    <div class="search-item" v-for="item in searchResult" :key="item.id">
                        <p class="title" @click="toArticle(item)" v-html="item.name"></p>
                        <p class="text" style="margin: 5px 0;" v-html="item.content"></p>
                    </div>
                </div>
                <div class="search-recommend" v-else>
                    <div class="news-item"
                        :style="{ backgroundColor: isDark ? 'rgba(207, 185, 185, 0.4)' : 'rgba(40, 40, 40, 0.4)' }"
                        v-for="(item, index) in hotArticle" :key="index">
                        <div class="item-num">{{ index + 1 }}</div>
                        <div class="item-txt" @click="toArticle(item)">{{ item.name }}</div>
                    </div>
                </div>
                <div class="search-tip" style="margin-top: 16px;color: aliceblue;" v-if="!isShowRecomment">
                    一共找到 {{ searchResult.length }} 条结果
                </div>
            </div>
        </el-dialog>
        <el-dialog class="music-dialog" :show-close="false" v-model="musicVisible" width="600">
            <div class="music" v-if="currentLrc"
                :style="{ opacity: isDark ? 0.8 : 1, backgroundImage: `url(src/assets/images/${isDark ? 'dark' : 'light'}-music.webp)` }">
                <div class="music-captions"
                    v-if="currentMusic && currentLrc.length > 0 && currentLrcIndex !== -1 && currentLrc[currentLrcIndex] && isShowCaptions">
                    {{ currentLrc[currentLrcIndex].text }}
                </div>
                <div class="music-player"  :style="{ backgroundColor: isDark ? 'rgba(207, 185, 185, 0.4)' : 'rgba(40, 40, 40, 0.4)' }">
                    <div class="player-left rotate" :class="{ pause: !isPlay }">
                        <img v-if="currentMusic" :src="currentMusic.cover" alt="">
                    </div>
                    <div class="player-right">
                        <div class="name" v-if="currentMusic">{{ currentMusic.name }}</div>
                        <audio @ended="handleAudioEnded" @timeupdate="getCurrentTime" @loadedmetadata="handleLoadedMetadata" ref="audio"
                            style="display: none;" v-if="currentMusic" :src="currentMusic.url" controls></audio>
                        <input type="range" class="progress" v-model="progress" @input="updateProgress" min="0"
                            max="100"><span style="margin-left: 10px;color: #fff;font-size: 10px;">{{ currentTime }} /
                            {{ totalTime }}</span>
                        <div class="player">
                            <span @click="changMusic(0)">⏮️</span>
                            <span @click="changePlay">{{ isPlay ? '⏸️' : '▶️' }}</span>
                            <span @click="changMusic(1)">⏭️</span>
                            <span @click="changePlayType">{{ ['🔁', '🔀', '🔄️'][playType] }}</span>
                            <span @click="isShowCaptions=!isShowCaptions">🔤</span>
                        </div>
                    </div>
                </div>
                <div class="music-list">
                    <div class="list-item"
                        :style="{ backgroundColor: isDark ? 'rgba(207, 185, 185, 0.4)' : 'rgba(40, 40, 40, 0.4)' }"
                        @click="selectMusic(item, index)" v-for="(item, index) in music" :key="index">
                        <div class="item-num">{{ index + 1 }}</div>
                        <div class="item-txt" :class="{ 'selected': index === currentIndex }">{{ item.name }}</div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { ref, reactive, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useArticleStore, useTimeStore, useToolStore } from '../store';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { findLyricIndex, formatMusicTime, parseLyrics } from '../utils/customize';

//实例化route
const route = useRoute()

const searchVisible = ref(false)
const musicVisible = ref(false)

// 实例化 Store
const toolStore = useToolStore()
const timeStore = useTimeStore()
const articleStore = useArticleStore()
// 解构 State（自动转为响应式 ref）
const { isShowCatalog, isShowCreateMessage } = storeToRefs(toolStore)
const { isDark, componentKey } = storeToRefs(timeStore)
const { article } = storeToRefs(articleStore)

const showCatalog = () => {
    isShowCatalog.value = !isShowCatalog.value
}
const showCreateMessage = () => {
    isShowCreateMessage.value = !isShowCreateMessage.value
}

// 滚动条回到顶部
const toTop = () => {
    // 获取当前滚动位置
    const startScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const duration = 500; // 动画持续时间（毫秒）
    const startTime = performance.now();
    // 动画函数
    const animateScroll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        // 计算动画进度（0-1）
        const progress = Math.min(elapsedTime / duration, 1);
        // 使用缓动函数使动画更平滑（减速效果）
        const easeOutProgress = progress * (2 - progress);
        // 计算当前应该滚动到的位置
        const currentScroll = startScroll - (startScroll * easeOutProgress);
        // 执行滚动
        document.body.scrollTop = currentScroll;
        document.documentElement.scrollTop = currentScroll;
        // 如果动画未完成，继续下一帧
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    };
    // 开始动画
    requestAnimationFrame(animateScroll);
};

const toChat = () => {
    ElMessage.warning('在线聊天室尚未开发，敬请期待！')
}

// 挂载
onMounted(() => {
    getMusic()
    articleStore.getArticle();
})
// 推荐的文章
const hotArticle = computed(() => {
    return article.value
        .sort((a, b) => {
            // 确保观看次数存在，默认为0
            const countA = a.count || 0;
            const countB = b.count || 0;
            return countB - countA; // 降序排列（从高到低）
        }).slice(0, 10);
})
const router = useRouter()
// 查看文章
const toArticle = (item: any) => {
    router.push({
        name: 'article',
        query: { id: item.id }
    });
    componentKey.value += 1
    searchVisible.value = false
}
// 控制推荐|搜索的显示
const isShowRecomment = ref(true)
// 搜索的关键字
const searchKeyword = ref('')
// 搜索到的文章
const searchResult = ref([])
watch(searchKeyword, (newValue, oldValue) => {
    if (newValue.length === 0) {
        isShowRecomment.value = true
    }
})
// 搜索文章的方法
const filteredArticles = () => {
    // 关键词为空时返回全部文章  
    if (!searchKeyword.value.trim()) {
        return ElMessage.warning('请输入要搜索的内容')
    }
    const keyword = searchKeyword.value.toLowerCase().trim()
    // 搜索的的结果
    const result = article.value.filter(item => {
        // 在标题或内容中搜索关键词（忽略大小写）
        return item.name.toLowerCase().includes(keyword) ||
            item.content.toLowerCase().includes(keyword)
    })
    // 复制一份查找的结果做处理，避免污染数据
    const copyResult = JSON.parse(JSON.stringify(result))
    // 对结果高亮处理
    for (let i = 0; i < copyResult.length; i++) {
        copyResult[i].name = highlightMatchTitle(copyResult[i].name)
        copyResult[i].content = highlightMatchContent(copyResult[i].content)
    }
    searchResult.value = copyResult
    isShowRecomment.value = false
}
const highlightMatchTitle = (text: any) => {
    const regex = new RegExp(searchKeyword.value, 'gi')
    return text.replace(regex, match => `<span class="highlight">${match}</span>`)
}
const highlightMatchContent = (text: string) => {
    // 1. 处理原始内容为空的情况
    if (!text) {
        return '<span class="empty-content">无内容预览</span>';
    }

    // 2. 关键词为空时返回前50字预览
    if (!searchKeyword.value.trim()) {
        return text.length > 50 ? text.substring(0, 50) + '...' : text;
    }

    const keyword = searchKeyword.value.trim();
    // 3. 转义正则特殊字符（避免语法错误）
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // 只匹配第一个结果（不加 'g' 修饰符）
    const regex = new RegExp(escapedKeyword, 'i'); // 仅忽略大小写，不全局匹配

    // 4. 查找第一个匹配位置
    const matchResult = text.match(regex);
    if (!matchResult) {
        // 无匹配时返回前30字
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }

    // 5. 提取第一个匹配的信息
    const firstMatch = matchResult[0]; // 第一个匹配的文本
    const matchIndex = matchResult.index as number; // 第一个匹配的起始位置
    const matchLength = firstMatch.length; // 第一个匹配的长度

    // 6. 计算截取范围（上下文+匹配内容）
    const contextBefore = 10; // 匹配前显示10个字符
    const contextAfter = 20; // 匹配后显示20个字符
    const startIndex = Math.max(0, matchIndex - contextBefore);
    const endIndex = Math.min(
        matchIndex + matchLength + contextAfter,
        text.length
    );

    // 7. 处理截取范围异常（避免空字符串）
    if (startIndex >= endIndex) {
        return text.length > 30 ? text.substring(0, 30) + '...' : text;
    }

    // 8. 截取片段并高亮第一个匹配
    const snippet = text.substring(startIndex, endIndex);
    // 仅替换第一个匹配（因 regex 无 'g' 修饰符）
    const highlightedSnippet = snippet.replace(regex, (match) =>
        `<span class="highlight">${match}</span>`
    );

    // 9. 添加省略号（表示截断）
    const prefix = startIndex > 0 ? '...' : '';
    const suffix = endIndex < text.length ? '...' : '';

    return prefix + highlightedSnippet + suffix;
};

// 音乐
const music = ref()
// 当前音乐
const currentMusic = ref()
// 当前音乐的下标
const currentIndex = ref(0)
// 获取音乐
const getMusic = async () => {
    // 获取所有数据
    const result = await axios.get('https://api-music.2leo.top/')
    music.value = result.data
    currentMusic.value = result.data[0]
    // 获取第一条音乐的歌词
    const { data } = await axios.get(`${result.data[0].lrc}`)
    currentLrc.value = parseLyrics(data)
}
// 选择音乐
const selectMusic = async (item: any, index: any) => {
    currentMusic.value = item
    currentIndex.value = index
    // 获取音乐的歌词
    const { data } = await axios.get(`${currentMusic.value.lrc}`)
    currentLrc.value = parseLyrics(data)
    nextTick(() => {
        audio.value.play()
        isPlay.value = true
    })
}
// 播放器的dom
const audio = ref()
// 播放|暂停
const isPlay = ref(false)
// 切换播放|暂停的方法
const changePlay = () => {
    if (isPlay.value) {
        audio.value.pause()
    } else {
        audio.value.play()
    }
    isPlay.value = !isPlay.value
}
// 播放方式（0顺序、1随机、2单曲循环）
const playType = ref(0)
// 歌曲播放结束的方法
const handleAudioEnded = async () => {
  switch (playType.value) {
    case 0: // 0：顺序播放
      // 若当前是最后一首，不切换；否则自动下一曲
      if (currentIndex.value < music.value.length - 1) {
        await changMusic(1); // 调用下一曲方法
      } else {
        // 播放结束后重置状态（可选）
        isPlay.value = false;
        currentLrcIndex.value = -1;
      }
      break;
    case 1: // 1：随机播放
      // 生成随机索引（排除当前索引，避免重复）
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * music.value.length);
      } while (randomIndex === currentIndex.value && music.value.length > 1);
      // 切换到随机索引的歌曲
      await selectMusic(music.value[randomIndex], randomIndex);
      break;
      
    case 2: // 2：单曲循环
      // 重新播放当前歌曲
      audio.value.currentTime = 0; // 重置播放进度到开头
      audio.value.play();
      isPlay.value = true;
      break;
  }
};
// 切换播放方式
const changePlayType = () => {
    if (playType.value < 2) {
        playType.value += 1
    } else {
        playType.value = 0
    }
}
// 上一曲|下一曲
const changMusic = async (type: any) => {
    if (type === 0) {
        if (currentIndex.value - 1 < 0) return
        currentMusic.value = music.value[currentIndex.value - 1]
        currentIndex.value -= 1
    } else {
        if (currentIndex.value + 1 > music.value.length - 1) return
        currentMusic.value = music.value[currentIndex.value + 1]
        currentIndex.value += 1
    }
    // 获取音乐的歌词
    const { data } = await axios.get(`${currentMusic.value.lrc}`)
    currentLrc.value = parseLyrics(data)
    nextTick(() => {
        audio.value.play()
        isPlay.value = true
    })
}

// 歌曲总时长
const totalTime = ref('00:00')
// 获取歌曲总时长
const handleLoadedMetadata = () => {
    if (audio.value) {
        totalTime.value = formatMusicTime(audio.value.duration);
    }
}
// 当前播放时长
const currentTime = ref('00:00')
// 获取当前播放时长
const getCurrentTime = () => {
    if (audio.value && audio.value.duration) { // 确保 duration 已加载
        // 更新当前时间
        currentTime.value = formatMusicTime(audio.value.currentTime);
        // 同步更新进度条（计算当前进度百分比）
        const progressPercent = (audio.value.currentTime / audio.value.duration) * 100;
        progress.value = progressPercent; // 关键：让进度条跟随播放进度移动
        // 同步词条
        const index = findLyricIndex(audio.value.currentTime, currentLrc.value);
        console.log('当前时间:', audio.value.currentTime, '匹配索引:', index);

        if (index !== currentLrcIndex.value) {
            currentLrcIndex.value = index;
        }
    }
}
// 歌曲进度条
const progress = ref(0)
// 当前的歌词
const currentLrc = ref([])
// 当前词条索引
const currentLrcIndex = ref(-1)
// 显示|隐藏歌词
const isShowCaptions = ref(false)
// 更新进度条
const updateProgress = (e: any) => {
    if (audio.value && audio.value.duration) { // 确保 duration 已加载
        // 更新进度条
        progress.value = e.target.value
        // 同步更新当前时间
        audio.value.currentTime = (e.target.value / 100) * audio.value.duration;
    }
}
</script>
<style lang='less' scoped>
.tool {
    font-size: 30px;
    width: 30px;
    position: fixed;
    bottom: 12vh;
    right: 3vh;
    z-index: 1000;

    span {
        width: 40x;
        height: 30px;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        cursor: pointer;
    }
}

::v-deep .search-dialog {
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
    z-index: 9999 !important;
    background-color: black;

    .el-dialog__header {
        display: none;
    }

    .search {
        width: 100%;
        margin: 0 auto;
        border-radius: 10px;
        padding: 20px 50px;
        background-image: url(../assets/images/light-search.webp);
        background-size: cover;
        background-position: center;
        font-family: auto;
        cursor: default;

        .search-title {
            font-size: 17x;
            margin-top: 14px;
            margin-bottom: 5px;
            color: #9485f2;
        }

        .search-input {
            padding: 4px 12px;
            font-size: 14px;
            display: flex;
            align-items: center;

            input {
                height: 28px;
                width: 412px;
                font-size: 14px;
                padding: 6px 12px;
                border-radius: 10px 0 0 10px;
                background-color: transparent;
                border: 2px solid #9485f2;
                color: #9485f2;
                outline: none;
            }

            button {
                height: 28px;
                font-size: 12px;
                padding: 4px 20px;
                border-radius: 0 10px 10px 0;
                background-color: #9485f2;
                font-size: 12px;
                color: #fff;
            }
        }

        .search-content {
            width: 100%;
            height: 300px;
            overflow: auto;
            padding: 0 5px;

            .search-item {
                margin: 12px 0;
                padding: 4px 14px;
                background-color: rgba(40, 40, 40, 0.4);
                color: #fff;

                .title {
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .highlight {
                    color: #e34b4f;
                }
            }
        }

        .search-recommend {
            width: 100%;
            height: 314px;
            overflow: auto;
            margin-top: 10px;

            &>:nth-child(1) {
                .item-num {
                    background-color: #ff4d4f !important;
                    color: #fff;
                }
            }

            &>:nth-child(2) {
                .item-num {
                    background-color: orange !important;
                    color: #fff;
                }
            }

            &>:nth-child(3) {
                .item-num {
                    background-color: rgb(207, 174, 114) !important;
                    color: #fff;
                }
            }

            .news-item {
                display: flex;
                align-items: center;
                margin: 10px 12px;
                padding: 2px 10px;
                font-size: 14px;
                background-color: rgba(40, 40, 40, 0.4);
                color: #fff;

                .item-num {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background-color: #d9d9d9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 8px;
                    font-weight: 700;
                }

                .item-txt {
                    cursor: pointer;
                    letter-spacing: 1px;

                    &:hover {
                        color: #e34b4f;
                    }
                }
            }
        }
    }
}

::v-deep .music-dialog {
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
    z-index: 9999 !important;
    background-color: black;

    .el-dialog__header {
        display: none;
    }

    .music {
        width: 100%;
        margin: 0 auto;
        border-radius: 10px;
        padding: 20px 50px;
        background-image: url(../assets/images/light-music.webp);
        background-size: cover;
        background-position: center;
        font-family: auto;
        cursor: default;
        position: relative;

        .music-captions {
            width: 86%;
            height: 20px;
            padding: 0 10px;
            text-align: center;
            color: rgb(24, 87, 49);
            font-weight: 600;
            font-size: 14px;
            position: absolute;
            top: 12px;
        }

        .music-player {
            width: 98%;
            height: 104px;
            margin: 18px 12px 10px 12px;
            padding: 2px 10px;
            display: flex;
            background-color: rgba(40, 40, 40, 0.4);

            .player-left {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background-color: #9485f2;
                background-image: url(../assets/images/loading.gif);
                background-size: cover;
                background-position: center;
                margin-top: 4px;
                transition: all 1s;

                @keyframes rotate {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }

                &.rotate {
                    animation: rotate 8s linear infinite;
                }

                &.pause {
                    animation-play-state: paused;
                }

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    object-position: center;
                }
            }

            .player-right {
                width: 360px;
                margin-left: 20px;
                padding: 10px;

                .name {
                    font-size: 18px;
                    color: #fff;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .progress {
                    width: 78%;
                    height: 5px;
                    margin: 15px 0;
                }

                .player {
                    font-size: 15px;

                    span {
                        margin-right: 10px;
                    }
                }
            }
        }

        .music-list {
            width: 100%;
            height: 314px;
            overflow: auto;
            margin-top: 10px;

            &>:nth-child(1) {
                .item-num {
                    background-color: #ff4d4f !important;
                    color: #fff;
                }
            }

            &>:nth-child(2) {
                .item-num {
                    background-color: orange !important;
                    color: #fff;
                }
            }

            &>:nth-child(3) {
                .item-num {
                    background-color: rgb(207, 174, 114) !important;
                    color: #fff;
                }
            }

            .list-item {
                display: flex;
                align-items: center;
                margin: 10px 12px;
                padding: 2px 10px;
                font-size: 14px;
                background-color: rgba(40, 40, 40, 0.4);
                color: #fff;

                .item-num {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background-color: #d9d9d9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-right: 8px;
                    font-weight: 700;
                    font-size: 10px;
                }

                .item-txt {
                    cursor: pointer;
                    letter-spacing: 1px;
                    font-size: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;

                    &.selected {
                        color: #e34b4f;
                    }

                    &:hover {
                        color: #e34b4f;
                    }
                }
            }
        }
    }
}
</style>