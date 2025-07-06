<template>
  <div class="diary-container">
    <div class="diray-top"></div>
    <div class="diary-list">
      <div class="list-item" v-for="(item, index) in diary" :key="item.id">
        <div class="item-left"></div>
        <div class="item-right">
          <div class="right-name">
            <span style="margin-right: 5px;" :style="{ color: isDark ? '#ff4d4f' : '#000000' }">{{ item.user_name }}</span>
            <!-- 添加条件渲染 -->
            <template v-if="item.level">
              <img width="34" height="34" :src="item.level.level">
              <span class="level">{{ item.level.name }}</span>
            </template>
            <template v-else>
              <span class="level-placeholder">加载中...</span>
            </template>
          </div>
          <div class="right-msg" :style="{ color: isDark ? '#fff' : '#000000' }">{{ item.content }}</div>
          <div class="right-imgs" style="max-width: 300px;">
            <img class="imgs-item" :src="`http://localhost:3000${item.imgurl}`" alt="">
          </div>
          <div class="right-content">
            <div class="content-time">{{ item.createdate }}</div>
            <div class="content-message">
              <p>
                <el-icon :class="{ addlike: item.isPraise[0].count !== 0 }" @click="addPraise(item)"
                  class="message-like">
                  <Sugar />
                </el-icon>
                <span style="margin-left: 4px;">{{ item.praiseCount[0].count }}</span>
              </p>
              <p>
                <el-icon @click="toggleComment(item)" class="message-look">
                  <ChatDotSquare />
                </el-icon>
                <span style="margin-left: 4px;">{{ item.commentCount[0].count }}</span>
              </p>
            </div>
          </div>

          <!-- 添加过渡动画 -->
          <transition name="comment-fade">
            <div class="right-message" v-if="item.isShow">
              <div class="message-title">Comments|{{ item.commentCount[0].count }} 条留言</div>
              <textarea v-model="commentParams.content" class="message-text" placeholder="写下点什么..."
                maxlength="10000"></textarea>
              <div class="message-submit">
                <button @click="submit(item)">提交</button>
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
                    <div class="right-liuyan" :style="{ color: isDark ? '#fff' : '#000000',backgroundColor:isDark?'#5b5b5ccf':'#f7f9fe' }">
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
      </div>
    </div>
    <el-dialog center="true" title="留言" v-model="outerVisible" width="30%">
      <textarea v-model="recallContent" class="message-text" placeholder="写下点什么..." maxlength="10000"></textarea>
      <div class="message-submit">
        <button @click="send">发布</button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { portrait, userLevel } from '../utils/data';
import { nanoid } from 'nanoid';
import { useTimeStore, useUserStore } from '../store';
import { storeToRefs } from 'pinia';
import { formattime } from '../utils/customize';
import { ElMessage } from 'element-plus';

const outerVisible = ref(false)
const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)

// 说说数据
const diary = ref<any[]>([])
// 分页获取说说参数
const diaryPageParams = reactive({
  page: 1,
  pagesize: 100,
  user_id: token.value.type === 1 ? token.value.username : token.value.id,
  user_type: token.value.type
})

// 评论数据
const comment = ref<any[]>([])
// 当前的说说
const currentDiary = ref<any>(null)
// 查找评论参数
const findCommentParams = reactive({
  type_id: '',
  type: 1,
  page: 1,
  pagesize: 100,
})

// 新增评论参数
const commentParams = reactive({
  id: '',
  type: 1,
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

// 回复的内容
const recallContent = ref('')

// 分页获取说说方法（修复异步问题）
const getDiary = async () => {
  try {
    const result = await proxy.$api.selectDiaryPage(diaryPageParams)
    const diaryItems = []
    
    // 使用 for...of 确保每个 item.level 加载完成
    for (const item of result.data.message) {
      item.isShow = false
      item.level = await getLevel(item) // 等待等级加载完成
      diaryItems.push(item)
    }
    
    diary.value = diaryItems
  } catch (error) {
    console.error('获取说说失败:', error)
    ElMessage.error('获取说说失败')
  }
}

// 挂载
onMounted(() => {
  getDiary()
})

// 点赞参数
const praiseParams = reactive({
  id: nanoid(10),
  type_id: '',
  user_id: token.value.type === 1 ? token.value.username : token.value.id,
  user_type: token.value.type,
  createdate: formattime(Date.now())
})

// 点赞方法
const addPraise = async (item: any) => {
  praiseParams.type_id = item.id
  // 点过一次赞不允许再点赞
  if (item.isPraise[0].count === 0) {
    try {
      const result = await proxy.$api.insertPraise(praiseParams)
      item.praiseCount[0].count++
      item.isPraise[0].count++
    } catch (error) {
      console.error('点赞失败:', error)
      ElMessage.error('点赞失败')
    }
  }
}

// 切换评论区显示状态（修复异步问题）
const toggleComment = async (item: any) => {
  // 如果是关闭评论区，不需要重新获取数据
  if (item.isShow) {
    item.isShow = false
    return
  }
  
  // 打开评论区逻辑
  currentDiary.value = item
  findCommentParams.type_id = item.id
  
  try {
    const result = await proxy.$api.findCommentPage(findCommentParams)
    const commentItems = []
    
    // 使用 for...of 确保每个评论的 level 加载完成
    for (const commentItem of result.data.message) {
      commentItem.level = await getLevel(commentItem) // 等待等级加载完成
      commentItems.push(commentItem)
    }
    
    comment.value = commentItems
    
    // 关闭其他所有评论区，打开当前评论区
    diary.value.forEach(d => d.isShow = false)
    item.isShow = true

  } catch (error) {
    console.error('获取评论失败:', error)
    ElMessage.error('获取评论失败')
  }
}

// 初始化评论参数
const initCommentParams = () => {
  commentParams.id = ''
  commentParams.type = 1
  commentParams.type_id = ''
  commentParams.createdate = ''
  commentParams.content = ''
  commentParams.replier_id = ''
  commentParams.replier_name = ''
  recallContent.value = ''
}

// 新增评论
const submit = async (item: any) => {
  commentParams.id = nanoid(10)
  commentParams.type_id = item.id
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
    await toggleComment(item) // 刷新评论区
    await getDiary()          // 刷新说说列表
    
    // 清空数据
    initCommentParams()
    
    // 提示用户
    ElMessage.success('发送成功')
  } catch (error) {
    console.error('提交评论失败:', error)
    ElMessage.error('提交评论失败')
  }
}

// 跳转回复弹窗
const toReCall = (item: any) => {
  outerVisible.value = true
  commentParams.id = nanoid(10)
  commentParams.type_id = currentDiary.value.id
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
    await toggleComment(currentDiary.value)
    getDiary()
    
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

// 获取用户等级（增强数据校验）
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
</script>

<style scoped>
.diary-container {
  width: 100%;
  margin: 0 auto;
  position: relative;

  .diray-top {
    width: 170px;
    height: 100px;
    position: absolute;
    top: -78px;
    left: 50%;
    transform: translateX(-50%);
    background-size: cover;
    background-position: center;
    background-image: url(/src/assets/images/zhuangshi2.png);
  }

  .diary-list {
    max-width: 700px;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 1px 10px -6px black;
    border-radius: 10px;
    margin: 40px auto;
    padding: 40px 20px;

    .list-item {
      display: flex;
      border-bottom: .5px dashed rgb(162, 175, 185);
      padding: 10px;
      margin-bottom: 14px;

      .item-left {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: skyblue;
        background-image: url(../assets/images/avator.jpg);
        background-size: cover;
        background-position: center;
      }

      .item-right {
        margin-left: 10px;
        width: 100%;

        .right-name {
          color: #4b4948;
          font-size: 18px;
          display: flex;
          align-items: center;
        }

        .right-msg {
          margin: 20px 0 15px 0;
          font-size: 16px;
        }

        .right-imgs {
          width: 100%;
          margin-bottom: 14px;
          display: flex;

          .imgs-item {
            max-width: 300px;
            object-fit: cover;
            object-position: center;
            padding: 2px;
          }
        }

        .right-content {
          width: 100%;
          height: 24px;
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          color: #797979;
          font-size: 13px;

          .content-message {
            background: #f7f7f7;
            border-radius: 2px;
            display: flex;
            width: 80px;
            height: 21px;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 14px;

            .message-like {
              cursor: pointer;

              &.addlike {
                color: red;
              }

              &:hover {
                color: red;
              }
            }

            .message-look {
              cursor: pointer;

              &:hover {
                color: #73c3f7;
              }
            }

            .message-write {
              cursor: pointer;

              &:hover {
                color: purple;
              }
            }
          }
        }

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
    }
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