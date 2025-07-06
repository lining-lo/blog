<template>
  <div class="friend-container">
    <div class="friend-title" :style="{ color: isDark ? '#ff4d4f' : '#000000' }">🌸申请方式</div>
    <div class="friend-tip">
      <p>网站名称: LO' BLOG</p>
      <p>网址: https://xxxx.cn</p>
      <p>头像: https://s1.ax1x.com/2022/11/10/z9E7X4.jpg</p>
      <p>描述: 这是一个 Vue3 与 nodejs 结合的产物～</p>
      <p>网站封面: https://s1.ax1x.com/2022/11/10/z9VlHs.png</p>
      <button @click="outerVisible = true" style="font-size: 15px;color: blueviolet;">点我自助申请</button>
    </div>
    <hr>
    <el-dialog :show-close="false" v-model="outerVisible" width="530">
      <div class="top"></div>
      <div class="friend-submit" v-if="outerVisible">
        <div class="submit-form">
          <div class="form-content">
            <p class="content-name">
              <span>名称：</span><input v-model="insertLinkParams.name" type="text">
            </p>
            <p class="content-msg">
              <span>简介：</span><input v-model="insertLinkParams.introduction" type="text">
            </p>
            <p class="content-cover">
              <span>封面：</span><input v-model="insertLinkParams.cover" type="text">
            </p>
            <p class="content-url">
              <span>网址：</span><input v-model="insertLinkParams.url" type="text">
            </p>
          </div>
          <div class="form-footer">
            <button class="footer-btn" @click="insertLink">申请</button>
            <div class="footer-img"></div>
            <div class="footer-welcome">欢迎交换友链</div>
            <div class="footer-bg"></div>
          </div>
        </div>
        <div class="submit-img"></div>
      </div>
    </el-dialog>

    <div class="friend-title" :style="{ color: isDark ? '#ff4d4f' : '#000000' }">🥇友链列表</div>
    <div class="friend-list">
      <a target="_blank" :href="item.url" class="list-item" v-for="(item, index) in link" :key="index">
        <div class="item-img">
          <img :src="item.cover" alt="">
        </div>
        <div class="item-msg">
          <p class="name">{{ item.name }}</p>
          <p style="font-size: 14px;height: 30px; overflow: hidden;color: #8c7373;">{{ item.introduction }}</p>
          <p style="font-size: 12px; color: #797979; margin-top: 10px;display: flex;align-items: center;">
            <el-icon>
              <Calendar />
            </el-icon>
            <span style="margin-left: 3px;"> {{ item.createdate }}</span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useTimeStore } from '../store';
import { storeToRefs } from 'pinia';
import { nanoid } from 'nanoid';
import { formattime } from '../utils/customize';
import { ElMessage } from 'element-plus';

const outerVisible = ref(false)
const { proxy } = getCurrentInstance()

// 实例化 Store
const timeStore = useTimeStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)

// 新建友链参数
const insertLinkParams = reactive({
  id: '',
  name: '',
  introduction: '',
  cover: '',
  url: '',
  createdate: ''
})
// 新建友链
const insertLink = async () => {
  // 拼接参数
  insertLinkParams.id = nanoid(10)
  insertLinkParams.createdate = formattime(Date.now())
  // 校验
  if (insertLinkParams.name === '' || insertLinkParams.introduction === '' || insertLinkParams.cover === '' || insertLinkParams.url === '') {
    return ElMessage.error('请仔细填写信息！')
  }
  // 发送请求
  const result = await proxy.$api.insertLink(insertLinkParams)
  // 清空数据
  insertLinkParams.id = ''
  insertLinkParams.name = ''
  insertLinkParams.introduction = ''
  insertLinkParams.cover = ''
  insertLinkParams.url = ''
  insertLinkParams.createdate = ''
  // 关闭弹窗
  outerVisible.value = false
  // 提示用户
  ElMessage.success('申请成功，请耐心等待')
}

// 友链数据
const link = ref()
// 获取友链参数
const linkPageParams = reactive({
  page: 1,
  pagesize: 100,
})
// 获取友链方法
const getLink = async () => {
  const result = await proxy.$api.selectLinkPage(linkPageParams)
  link.value = result.data.message
}
// 挂载
onMounted(() => {
  getLink()
})

</script>
<style lang='less' scoped>
.friend-container {
  width: 100%;
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 10px 0;
  padding: 40px;
  margin-bottom: 40px;

  .friend-title {
    font-size: 17px;
    font-weight: 600;
  }

  .friend-tip {
    margin-top: 20px;
    width: 100%;
    height: 132px;
    background-color: rgba(80, 210, 226, 0.5);
    border-radius: 5px;
    border-left: 2px solid #1a72cb;
    padding: 10px 16px;
    color: #433b3b;
  }

  hr {
    position: relative;
    margin: 40px auto;
    border: 2px dashed #39c5bb;
    overflow: visible;

    &::before {
      position: absolute;
      top: -14px;
      left: 5%;
      color: #39c5bb;
      content: "❄";
      font-size: 30px;
      line-height: 1;
      transition: 1s ease-in-out;
    }
  }

  ::v-deep .el-dialog {
    border-radius: 35px 35px 0 0;
    background-color: #50748b;
    padding: 0;

    .el-dialog__header {
      display: none;
    }

    .top {
      width: 100%;
      height: 35px;
      background-color: #50748b;
      border-radius: 110px 104px 0 0;
    }

    .friend-submit {
      position: relative;
      width: 530px;
      height: 506px;
      margin: 0 auto;

      .submit-form {
        .form-content {
          width: 500px;
          height: 200px;
          margin: 0 auto;
          background-color: #eee;
          border: 1px solid #ddd;
          padding: 10px 0;
          text-align: center;

          p {
            margin: 12px 0;

            input {
              background-color: #f3f3f3;
              border: none;
              height: 28px;
              width: 180px;
              padding: 2px 10px;
              outline: none;
              color: #7e8083;
            }
          }
        }

        .form-footer {
          width: 500px;
          height: 100px;
          background-color: #fff;
          margin: 0 auto;
          border: 1px solid #dddddd;

          .footer-btn {
            width: 60px;
            height: 30px;
            background-color: #837bc7;
            margin: 20px calc(50% - 30px);
            color: #fff;
            transition: all 0.2s;

            &:hover {
              background: #f22f50;
              font-size: 14px;
            }
          }

          .footer-img {
            height: 24px;
            width: 100%;
            background-image: url(../assets/images/poetize.cn_favorite_friend.png);
            background-size: cover;
            background-position: center;
          }

          .footer-welcome {
            text-align: center;
            background-color: #fff;
            padding: 20px;
            color: gray;
            font-size: 12px;
          }

          .footer-bg {
            width: 100%;
            height: 70px;
            background-color: #50748b
          }
        }
      }

      .submit-img {
        width: 100%;
        height: 260px;
        background-image: url(../assets/images/friendLetterBottom.png);
        background-size: cover;
        background-position: center;
        position: absolute;
        bottom: 0;
        left: 0;

        /* 左上角三角形 */
        &::before {
          content: "";
          position: absolute;
          top: 1px;
          left: 1px;
          border-top: 7px solid #50748b;
          border-left: 7px solid transparent;
          border-right: 7px solid #50748b;
          border-bottom: 7px solid transparent;
        }

        /* 右上角三角形 */
        &::after {
          content: "";
          position: absolute;
          position: absolute;
          top: 3px;
          right: 2px;
          border-top: 7px solid #50748b;
          border-left: 7px solid #50748b;
          border-right: 7px solid transparent;
          border-bottom: 7px solid transparent;
        }
      }
    }
  }

  .friend-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .list-item {
      height: 250px;
      width: calc(25% - 20px);
      margin: 10px;
      border-radius: 10px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
      cursor: default;

      .item-img {
        width: 100%;
        height: 60%;
        // background-color: #f5f7fa;
        border-radius: 10px 10px 0 0;
        background-image: url(../assets/images/loading.gif);
        background-size: cover;
        background-position: center;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.8s ease;
          &:hover{
            transform: scale(1.2);
          }
        }
      }

      .item-msg {
        width: 100%;
        height: 40%;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0 0 10px 10px;
        padding: 10px 16px;

        .name {
          font-weight: 600;
          margin-bottom: 10px;
          color: #658daa;
          transition: all 0.2s;

          &:hover {
            color: #39c5bb;
          }
        }
      }
    }
  }

}
</style>