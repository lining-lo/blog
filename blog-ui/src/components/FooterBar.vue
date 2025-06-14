<template>
  <div class="footerbar">
    <div class="footerbar-inner">
      <div class="footer-left">
        <div class="logo">
          <img src="../../public/yksg.svg" alt="">
          <div class="logo-name">LO'S BELOG</div>
        </div>
        <p>这是我第一个用全栈技术从0到1搭建的个人博客项目。</p>
        <p>开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情。<br />
          我会博客分享一些记录自己平时学习的笔记、心得还有做项目时的记录以及踩过的坑。<br />
          这个博客我会一直完善下去，毕竟现在还比较菜，只能实现一些简单的功能。</p>
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

    .footer-left {
      p {
        font-size: 16px;
        font-weight: 300;
        color: #fff;
        font-family: cursive;
      }

      .logo {
        display: flex;
        align-items: center;
        padding-bottom: 20px;

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