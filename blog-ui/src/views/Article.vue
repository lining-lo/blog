<template>
  <div class="article-container">
    <div class="article-content">
      <MdPreview :style="{ backgroundColor: isDark ? '#26282a' : '#fff' }" v-if="currentArticle" :id="id"
        :modelValue="currentArticle.content" :previewTheme="isDark ? 'default' : 'vuepress'"
        :class="{ 'dark': isDark, 'light': !isDark }" />
    </div>
    <div class="article-catalog" v-if="isShowCatalog" :style="{ backgroundColor: isDark ? '#26282a' : '#f7f9fe' }">
      <MdCatalog :editorId="id" :scrollElement="scrollElement" :offsetTop="80" />
    </div>
    <div class="article-tip">
      <p>本站作者：@lining-lo</p>
      <p>1.本网站所发布的内容，包括但不限于文字、图片、音频、视频、文章、软件、程序等可能来源于网路，仅供学习和参考，如有侵权请联系作者（2092576148@qq.com）进行删除处理。</p>
      <p>2.本网站一切内容不代表本站立场，并不代表本站赞同其观点和对其真实性负责。</p>
      <p>3.版权&许可请详阅<span style="color: rgb(51, 136, 255); cursor: pointer;"> 版权声明</span></p>
    </div>
    <div class="article-praise" v-if="currentArticle">
      <span class="addpraise" @click="addPraise"
        :class="{ addlike: currentArticle.isPraise[0].count !== 0 }">❤</span><span style="margin-left: 20px;">{{
          currentArticle.praiseCount[0].count }}</span>
    </div>
    <div class="article-next">
      <div class="left" @click="changeArticle(0)" :class="{ disabled: !lastArticle }">
        <div class="last"
          :style="lastArticle ? { backgroundImage: `url(http://localhost:3000${lastArticle.cover})` } : {}">
          <p style="font-size: 18px;font-weight: 600;opacity: lastArticle ? 1 : 0.5;">
            < 上一篇</p>
              <p style="font-size: 15px;font-weight: 600;margin-top: 10px;opacity: lastArticle ? 1 : 0.5;">{{
                lastArticle?.name || '没有上一篇' }}</p>
        </div>
      </div>
      <div @click="changeArticle(1)" class="right" :class="{ disabled: !nextArticle }">
        <div class="next"
          :style="nextArticle ? { backgroundImage: `url(http://localhost:3000${nextArticle.cover})` } : {}">
          <p style="font-size: 18px;font-weight: 600;opacity: nextArticle ? 1 : 0.5;">下一篇 ></p>
          <p style="font-size: 15px;font-weight: 600;margin-top: 10px;opacity: nextArticle ? 1 : 0.5;">{{
            nextArticle?.name || '没有下一篇' }}</p>
        </div>
      </div>
    </div>
    <div class="article-comment">
      <!-- 添加过渡动画 -->
      <transition name="comment-fade">
        <div class="right-message">
          <div class="message-title">Comments|{{ comment.length }} 条留言</div>
          <textarea v-model="commentParams.content" class="message-text" placeholder="写下点什么..."
            maxlength="10000"></textarea>
          <div class="message-submit">
            <button @click="submit">提交</button>
          </div>
          <div class="message-commentList">
            <div class="commentList-item" v-for="(commentItem, idx) in comment" :key="idx">
              <div class="item-left"
                :style="{ backgroundImage: commentItem.user_type === 0 ? `url(http://localhost:3000${commentItem.user_imgurl})` : `${portrait[commentItem.user_imgurl]}` }">
              </div>
              <div class="item-right">
                <div class="right-title">
                  <div class="title-left">
                    <div class="name">
                      <span style="margin-right: 5px;font-size: 16px;"
                        :style="{ color: isDark ? '#ff4d4f' : '#000000' }">{{ commentItem.user_name }}</span>
                      <!-- 添加条件渲染 -->
                      <template v-if="commentItem.level">
                        <img width="30" height="30" :src="commentItem.level.level">
                        <span class="level">{{ commentItem.level.name }}</span>
                      </template>
                      <template v-else>
                        <span class="level-placeholder">加载中...</span>
                      </template>
                    </div>
                    <div class="date">{{ commentItem.createdate }}</div>
                  </div>
                  <button class="title-right" @click="toReCall(commentItem)"
                    v-if="token.type === 0 ? commentItem.user_id !== token.id : commentItem.user_id !== token.username">回复</button>
                </div>
                <div class="right-liuyan"
                  :style="{ color: isDark ? '#fff' : '#000000', backgroundColor: isDark ? '#5b5b5ccf' : '#f7f9fe' }">
                  <div v-if="commentItem.replier_id !== '' && commentItem.replier_id !== null"
                    style="display: inline-block;">
                    <span>回复 </span><span style="color: #0f91c8;">@{{ commentItem.replier_name }}</span>：
                  </div>
                  {{ commentItem.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <!-- <div class="article-tool">
      <span @click="isShow = !isShow">🕹️</span>
      <span @click="toTop">🚁</span>
      <span>🔍</span>
      <span>🎸</span>
      <span>📻</span>
    </div> -->
    <el-dialog center="true" title="留言" v-model="outerVisible" width="30%">
      <textarea v-model="recallContent" class="message-text" placeholder="写下点什么..." maxlength="10000"></textarea>
      <div class="message-submit">
        <button @click="send">发布</button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import { useRoute, useRouter } from 'vue-router';
import { useArticleStore, useTimeStore, useToolStore, useUserStore } from '../store';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';
import { portrait, userLevel } from '../utils/data';

const { proxy } = getCurrentInstance() as any
const outerVisible = ref(false)

//文本编辑器
//只读
const id = 'preview-only';
//滚动条
const scrollElement = document.body;

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
const articleStore = useArticleStore()
// 实例化 Store
const toolStore = useToolStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)
const { article } = storeToRefs(articleStore)
const { isShowCatalog } = storeToRefs(toolStore)

// 控制目录开关
const isShow = ref(false)
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

const route = useRoute();
// 文章id
const article_id = computed(() => route.query.id);
// 文章
const articleFromId = ref()
// 根据id获取文章
const getArticle = async () => {
  const result = await proxy.$api.selectArticleById({ id: article_id.value })
  articleFromId.value = result.data.message[0]
  articleStore.getArticle()
}
// 挂载
onMounted(() => {
  getArticle()
  getComment()
})

// 上一篇文章
const lastArticle = computed(() => {
  const articleId = route.query.id as string | undefined;
  if (!articleId || !article.value || article.value.length === 0) {
    return null;
  }

  const index = article.value.findIndex(item => item.id === articleId);
  if (index === -1) return null;

  return index - 1 >= 0 ? article.value[index - 1] : null;
});

// 当前文章
const currentArticle = computed(() => {
  const articleId = route.query.id as string | undefined;
  if (!articleId || !article.value || article.value.length === 0) {
    return null;
  }

  const index = article.value.findIndex(item => item.id === articleId);
  return index === -1 ? null : article.value[index];
});

// 下一篇文章
const nextArticle = computed(() => {
  const articleId = route.query.id as string | undefined;
  if (!articleId || !article.value || article.value.length === 0) {
    return null;
  }

  const index = article.value.findIndex(item => item.id === articleId);
  if (index === -1) return null;

  return index + 1 < article.value.length ? article.value[index + 1] : null;
});

// 点赞参数
const praiseParams = reactive({
  id: nanoid(10),
  type_id: '',
  user_id: token.value.type === 1 ? token.value.username : token.value.id,
  user_type: token.value.type,
  createdate: formattime(Date.now())
})
// 点赞方法
const addPraise = async () => {
  praiseParams.type_id = article_id.value
  // 点过一次赞不允许再点赞
  if (currentArticle.value.isPraise[0].count === 0) {
    try {
      const result = await proxy.$api.insertPraise(praiseParams)
      currentArticle.value.praiseCount[0].count++
      currentArticle.value.isPraise[0].count++
    } catch (error) {
      console.error('点赞失败:', error)
      ElMessage.error('点赞失败')
    }
    articleStore.getArticle()
  }
}

// 评论数据
const comment = ref<any[]>([])
// 查找评论参数
const findCommentParams = reactive({
  type_id: '',
  type: 0,
  page: 1,
  pagesize: 100,
})
// 获取评论
const getComment = async () => {
  findCommentParams.type_id = article_id.value
  try {
    const result = await proxy.$api.findCommentPage(findCommentParams)
    const commentItems = []
    // 使用 for...of 确保每个评论的 level 加载完成
    for (const commentItem of result.data.message) {
      commentItem.level = await getLevel(commentItem) // 等待等级加载完成
      commentItems.push(commentItem)
    }
    comment.value = commentItems
  } catch (error) {
    console.error('获取评论失败:', error)
    ElMessage.error('获取评论失败')
  }
}

// 新增评论参数
const commentParams = reactive({
  id: '',
  type: 0,
  type_id: '',
  user_id: token.value.type === 1 ? token.value.username : token.value.id,
  user_name: token.value.type === 1 ? `游客${token.value.username}` : token.value.username,
  user_type: token.value.type,
  user_imgurl: token.value.imgurl,
  createdate: '',
  content: '',
  replier_id: '',
  replier_name: ''
})
// 初始化评论参数
const initCommentParams = () => {
  commentParams.id = ''
  commentParams.type = 0
  commentParams.type_id = ''
  commentParams.createdate = ''
  commentParams.content = ''
  commentParams.replier_id = ''
  commentParams.replier_name = ''
  recallContent.value = ''
}
// 新增评论
const submit = async () => {
  commentParams.id = nanoid(10)
  commentParams.type_id = article_id.value
  commentParams.createdate = formattime(Date.now())
  // 校验
  if (commentParams.content.trim() === '') {
    ElMessage.warning('内容输入不能为空')
    return
  }
  try {
    // 发送请求
    const result = await proxy.$api.insertComment(commentParams)
    // 重新获取数据
    await getComment() // 刷新评论区
    articleStore.getArticle()
    // 清空数据
    initCommentParams()
    // 提示用户
    ElMessage.success('发送成功')
  } catch (error) {
    console.error('提交评论失败:', error)
    ElMessage.error('提交评论失败')
  }
}

// 回复的内容
const recallContent = ref('')
// 跳转回复弹窗
const toReCall = (item: any) => {
  outerVisible.value = true
  commentParams.id = nanoid(10)
  commentParams.type_id = article_id.value
  commentParams.user_id = token.value.type === 1 ? token.value.username : token.value.id
  commentParams.user_name = token.value.type === 1 ? `游客${token.value.username}` : token.value.username
  commentParams.createdate = formattime(Date.now())
  commentParams.replier_id = item.user_id
  commentParams.replier_name = item.user_name
}
// 回复评论
const send = async () => {
  // 拼接参数
  commentParams.content = recallContent.value
  // 校验
  if (commentParams.content.trim() === '') {
    ElMessage.warning('内容输入不能为空')
    return
  }
  try {
    // 发送请求
    const result = await proxy.$api.insertComment(commentParams)
    // 重新获取数据
    await getComment()
    articleStore.getArticle
    outerVisible.value = false
    // 清空数据
    initCommentParams()
    // 提示用户
    ElMessage.success('回复成功')
  } catch (error) {
    console.error('回复失败:', error)
    ElMessage.error('回复失败')
  }
}

// 获取用户等级
const getLevel = async (item: any) => {
  try {
    // 校验用户名是否存在
    if (!item.user_name) {
      console.warn('用户名为空:', item)
      return userLevel[0]
    }
    const result = await proxy.$api.findUserByUserName({ username: item.user_name })
    // 多层校验接口返回数据
    if (
      !result ||
      !result.data ||
      !result.data.message ||
      result.data.message.length === 0
    ) {
      console.warn('用户数据不存在:', item.user_name)
      return userLevel[0]
    }
    const userInfo = result.data.message[0]
    // 校验 createdate 是否存在
    if (!userInfo.createdate) {
      console.warn('用户创建日期不存在:', item.user_name)
      return userLevel[0]
    }
    // 计算月数差
    const createDate = new Date(userInfo.createdate)
    const now = new Date()
    const monthsDiff = (now.getFullYear() - createDate.getFullYear()) * 12 +
      (now.getMonth() - createDate.getMonth())
    // 根据月数差确定等级索引（每6个月提升一级）
    const levelIndex = Math.min(
      Math.floor(monthsDiff / 6),
      userLevel.length - 1 // 限制最高等级
    )
    return userLevel[levelIndex]
  } catch (error) {
    console.error('获取用户等级失败:', error, item)
    return userLevel[0] // 出错时返回默认等级
  }
}

const router = useRouter()
const changeArticle = async (type: number) => {
  const articleId = route.query.id as string | undefined;
  if (!articleId) {
    ElMessage.error('文章ID错误');
    return;
  }

  if (!article.value || article.value.length === 0) {
    ElMessage.error('文章列表为空');
    return;
  }

  const index = article.value.findIndex(item => item.id === articleId);
  if (index === -1) {
    ElMessage.error('当前文章不存在');
    return;
  }

  let targetArticle = null;
  if (type === 0) { // 上一篇
    if (index - 1 >= 0) {
      targetArticle = article.value[index - 1];
    } else {
      ElMessage.warning('已经是第一篇文章');
      return;
    }
  } else { // 下一篇
    if (index + 1 < article.value.length) {
      targetArticle = article.value[index + 1];
    } else {
      ElMessage.warning('已经是最后一篇文章');
      return;
    }
  }

  if (!targetArticle) {
    ElMessage.warning('目标文章不存在');
    return;
  }
  router.push({
    name: 'article',
    query: { id: targetArticle.id }
  });
  await nextTick();
  getArticle();
};

</script>
<style lang='less' scoped>
.article-container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;

  .article-content {
    width: 875px;
    margin: 0 auto;

    ::v-deep .md-editor-preview {
      font-size: 15px;

      // font-family: fangsong;
      img {
        pointer-events: none;
      }

      .md-editor-code {
        .md-editor-code-head {
          z-index: 1;
        }
      }
    }
  }

  .article-catalog {
    width: 250px;
    position: fixed;
    top: 18vh;
    right: 3vh;
    background: #f7f9fe;
    border-radius: 8px;
    z-index: 100;
    transition: all 1s;
    color: #595a5a;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
    font-weight: 600;
    font-family: fangsong;
    max-height: 70vh;
    overflow: auto;

    ::v-deep .md-editor-catalog {

      .md-editor-catalog-indicator {
        height: 20px;
        width: 1.5px;
      }
    }
  }

  .article-tip {
    width: 875px;
    margin: 40px auto;
    background-color: rgba(80, 210, 226, 0.3);
    border-radius: 5px;
    border-left: 2px solid #1a72cb;
    padding: 10px 16px;
    color: #949294;

    p {
      line-height: 2;
      border-left: .2rem solid var(--blue);
      border-radius: 4px;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }
  }

  .article-praise {
    width: 100%;
    height: 20px;
    margin: 40px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: gray;

    .addpraise {
      font-size: 30px;
      cursor: pointer;
      transition: all 0.3s;

      &.addlike {
        color: red;
      }

      &:hover {
        font-size: 40px;
        color: red;
      }
    }

  }

  .article-next {
    width: 875px;
    height: 112px;
    background-color: pink;
    border-radius: 5px;
    margin: 20px auto;
    display: flex;
    color: #fff;
    font-family: auto;
    inset: 0px;
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.7);

    .left,
    .right {
      &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
      }

      .last,
      .next {
        &:hover {
          transform: scale(1.2);
          opacity: 0.7 !important;
        }
      }
    }

    .left {
      width: 50%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;

      .last {
        width: 100%;
        height: 100%;
        background-color: steelblue;
        background-image: url(../assets/images/endTip.png);
        background-size: cover;
        background-position: center;
        opacity: 0.3;
        padding: 30px 40px;
        transition: all 0.5s;
        overflow: hidden;

        &:hover {
          opacity: 0.7;
          transform: scale(1.2);
        }
      }
    }

    .right {
      width: 50%;
      height: 100%;
      overflow: hidden;
      cursor: pointer;

      .next {
        width: 100%;
        height: 100%;
        background-color: rgb(31, 117, 86);
        text-align: end;
        background-image: url(../assets/images/endTip.png);
        background-size: cover;
        background-position: center;
        opacity: 0.3;
        padding: 30px 40px;
        transition: all 0.5s;
        overflow: hidden;

        &:hover {
          opacity: 0.7;
          transform: scale(1.2);
        }
      }
    }
  }

  .article-comment {
    width: 875px;
    margin: 0 auto;
    margin-bottom: 80px;

    .right-message {
      width: 100%;
      overflow: hidden;
      /* 确保动画正确显示 */

      .message-title {
        margin: 20px 0;
        color: #797979;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      .message-text {
        border: 1px solid #ddd;
        width: 100%;
        font-size: 14px;
        padding: 15px;
        min-height: 180px;
        resize: none;
        outline: none;
        border-radius: 4px;
        background-image: url(../assets/images/commentURL.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 100%;
        margin-bottom: 10px;

        &:focus {
          border: 1px solid #ffa500;
        }
      }

      .message-submit {
        width: 100%;
        display: flex;
        justify-content: end;
        margin-bottom: 20px;

        button {
          cursor: pointer;
          width: 66px;
          height: 33px;
          border-radius: 4px;
          color: #fff;
          font-size: 14px;
          overflow: hidden;
          transition: all 0.3;
          background: rgb(131, 123, 199);

          &:hover {
            background-color: #f22c54;
          }
        }
      }

      .message-commentList {
        width: 100%;

        .commentList-item {
          display: flex;
          width: 100%;
          margin-bottom: 15px;

          .item-left {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: skyblue;
            background-size: cover;
            background-position: center;
          }

          .item-right {
            width: 100%;
            margin-left: 10px;

            .right-title {
              display: flex;
              justify-content: space-between;

              .title-left {
                .name {
                  display: flex;
                  align-items: center;
                }

                .date {
                  font-size: 12px;
                  color: #999;
                }
              }

              .title-right {
                cursor: pointer;
                color: #73c3f7;
                font-size: 12px;
              }
            }

            .right-liuyan {
              margin-top: 8px;
              line-height: 1.5;
              background: #f7f9fe;
              padding: 10px;
            }
          }
        }
      }
    }
  }

  .article-tool {
    font-size: 30px;
    width: 30px;
    position: fixed;
    bottom: 80px;
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
}

::v-deep .dark {

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #d53c3c !important;
  }

  p,
  ul,
  li,
  tr,
  td {
    color: #999999;
  }
}

.level {
  font-size: 13px;
  color: #67c23a;
  border: 1px solid #67c23a;
  border-radius: .2rem;
  font-size: 12px;
  padding: 1px 2px;
  vertical-align: 1px;
}

/* 新增加载占位符样式 */
.level-placeholder {
  font-size: 12px;
  color: #999;
  border: 1px solid #eee;
  border-radius: .2rem;
  padding: 1px 4px;
  vertical-align: 1px;
  background-color: #f5f5f5;
}

::v-deep .el-dialog {
  .message-text {
    margin-top: 20px;
    border: 1px solid #ddd;
    width: 100%;
    font-size: 14px;
    padding: 15px;
    min-height: 180px;
    resize: none;
    outline: none;
    border-radius: 4px;
    background-image: url(../assets/images/commentURL.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 100%;
    margin-bottom: 10px;

    &:focus {
      border: 1px solid #ffa500;
    }
  }

  .message-submit {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-bottom: 20px;

    button {
      cursor: pointer;
      width: 66px;
      height: 33px;
      border-radius: 4px;
      color: #fff;
      font-size: 14px;
      overflow: hidden;
      transition: all 0.3;
      background: rgb(131, 123, 199);

      &:hover {
        background-color: #f22c54;
      }
    }
  }
}

/* 评论区动画效果 */
.comment-fade-enter-active,
.comment-fade-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
}

.comment-fade-enter-from,
.comment-fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>