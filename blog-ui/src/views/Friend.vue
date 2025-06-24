<template>
  <div class="friend-container">
    <div class="friend-tip">
      <p>网站名称: LO' BLOG</p>
      <p>网址: https://xxxx.cn</p>
      <p>头像: https://s1.ax1x.com/2022/11/10/z9E7X4.jpg</p>
      <p>描述: 这是一个 Vue3 与 nodejs 结合的产物～</p>
      <p>网站封面: https://s1.ax1x.com/2022/11/10/z9VlHs.png</p>
      <button @click="isShow = true" style="font-size: 15px;color: blueviolet;">点我自助申请</button>
    </div>
    <div class="friend-submit" v-if="isShow">
      <div class="friend-close">
        <el-icon style="float: right;" @click="isShow = false">
          <Failed />
        </el-icon>
      </div>
      <div class="submit-form">
        <div class="form-content">
          <p class="content-name">
            <span>名称：</span><input type="text">
          </p>
          <p class="content-msg">
            <span>简介：</span><input type="text">
          </p>
          <p class="content-cover">
            <span>封面：</span><input type="text">
          </p>
          <p class="content-url">
            <span>网址：</span><input type="text">
          </p>
        </div>
        <div class="form-footer">
          <button class="footer-btn">申请</button>
          <div class="footer-img"></div>
          <div class="footer-welcome">欢迎交换友链</div>
          <div class="footer-bg"></div>
        </div>
      </div>
      <div class="submit-img"></div>
    </div>
    <div class="friend-list">
      <div class="list-item" v-for="(item, index) in 18" :key="index">
        <div class="item-img"></div>
        <div class="item-msg">
          <p style="font-style: 18px;font-weight: 600;margin-bottom: 10px;">个人主页网</p>
          <p style="font-size: 14px;height: 30px; overflow: hidden;">丰富的个人主页源码和模板</p>
          <p style="font-size: 12px; color: #797979; margin-top: 10px;display: flex;align-items: center;">
            <el-icon>
              <Calendar />
            </el-icon>
            <span style="margin-left: 3px;"> 2024-10-05</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const isShow = ref(false)

</script>
<style lang='less' scoped>
.friend-container {
  width: 100%;
  box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  margin: 40px 0;
  padding: 40px;

  .friend-tip {
    width: 100%;
    height: 132px;
    background-color: rgba(80, 210, 226, 0.5);
    border-radius: 5px;
    border-left: 2px solid #1a72cb;
    padding: 10px 16px;
    color: #626263;
  }

  .friend-close {
    width: 100%;
  }

  .friend-submit {
    position: relative;
    width: 530px;
    height: 553px;
    margin: 20px auto;

    .submit-form {
      .form-content {
        width: 500px;
        height: 200px;
        margin: 0 auto;
        margin-top: 12px;
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

  .friend-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .list-item {
      height: 250px;
      width: calc(25% - 10px);
      margin: 5px;
      border-radius: 10px;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);

      .item-img {
        width: 100%;
        height: 60%;
        background-color: skyblue;
        border-radius: 10px 10px 0 0;
      }

      .item-msg {
        width: 100%;
        height: 40%;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 0 0 10px 10px;
        padding: 10px 16px;
      }
    }
  }

}
</style>