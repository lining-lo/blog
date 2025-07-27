<template>
  <div class="footerbar">
    <div class="footerbar-inner">
      <div class="footer-left">
        <div class="logo">
          <div class="logo-name">LO'S BELOG</div>
        </div>
        <p>哈喽，大家好！这是我从 0 到 1 搭建的个人博客，用于记录学习笔记、心得、项目过程及踩坑经历</p>
        <p class="state"><span>声明</span><span>备案/许可证粤ICP备19012866号</span>
        </p>
      </div>
      <div class="link">
        <p class="title">链接</p>
        <div class="link-iner">
          <a href="https://github.com/lining-lo">一刻时光</a>
          <a href="https://space.bilibili.com/1009154695?spm_id_from=333.1007.0.0">bilibili</a>
        </div>
      </div>
      <div class="footer-right">
        <p class="right-title">打赏</p>
        <div class="right-inner">
          <div>
            <img src="../assets/images/wx.png" alt="">
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="../assets/images/zfb.png" alt="">
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

</script>
<style lang='less' scoped>
.footerbar {
  width: 100%;
  background: rgba(5, 12, 14, 0.8);
  padding: 20px;
  box-sizing: border-box;

  .footerbar-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1200px) {
      width: 100%;
      text-align: center;
    }

    .footer-left {
      p {
        font-size: 16px;
        font-weight: 300;
        color: #fff;
        font-family: cursive;
      }

      .logo {
        width: 100%;
        padding-bottom: 20px;

        @media screen and (max-width: 1200px) {
          width: 100%;
          text-align: center;
        }

        .logo-name {
          color: #fff;
          font-size: 20px;
          font-family: fantasy;
          word-break: break-word;
          padding-left: 10px;
        }
      }

      .state {
        color: #eeddbe;
        padding-top: 20px;

        span {
          padding-right: 12px;
        }
      }
    }

    .link {
      @media screen and (max-width: 1200px) {
        display: none;
      }

      .title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        font-family: cursive;
        padding-bottom: 12px;
      }

      a {
        font-family: cursive;
        color: #eeddbe;
        padding-right: 20px;
        font-size: 12px;
      }
    }

    .footer-right {
      @media screen and (max-width: 1200px) {
        display: none;
      }

      .right-title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        font-family: cursive;
        padding-bottom: 12px;
      }

      .right-inner {
        display: flex;

        img {
          width: 100px;
          padding-right: 40px;
        }

        .ds-title {
          color: #fff;
          font-family: cursive;
          font-size: 14px;
          font-weight: 300;
          padding-top: 8px;
        }
      }
    }
  }
}
</style>