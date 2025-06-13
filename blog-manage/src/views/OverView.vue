<template>
  <div class="overview">
    <p class="overview-title">总览</p>
    <div class="overview-list">
      <div class="list-item" v-for="(item, index) in overviewData" :key="index" :style="{ background: item.color }">
        <div class="item-left">
          <p class="title">{{ item.title }}</p>
          <p class="count">12</p>
        </div>
        <div class="item-right" v-if="index !== 0">
          <el-icon size="12">
            <Plus />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="overview-card">
      <div class="card-left">
        <div class="left-top"></div>
        <div class="left-bottom"></div>
      </div>
      <div class="card-right"></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { overviewData } from '../utils/data';

</script>
<style lang='less' scoped>
.overview {
  padding: 14px;
  width: 100%;
  height: 100%;
  overflow: auto;

  .overview-title {
    color: #000000;
    font-family: "PingFang SC";
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: 36px;
  }

  .overview-list {
    width: 100%;
    height: 118px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;

    .list-item {
      height: 118px;
      width: 25%;
      border-radius: 8px;
      margin-right: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 35px 24px;

      .item-left {
        .title {
          color: #1e2025b8;
          font-family: "PingFang SC";
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        .count {
          color: #1e2025;
          font-family: "PingFang SC";
          font-size: 32px;
          font-style: normal;
          font-weight: 500;
          line-height: 42px;
        }
      }

      .item-right {
        opacity: 0.5;
        display: flex;
        padding: 17px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 8px;
        background: #1e202514;
        cursor: pointer;
      }
    }

    .list-item:last-child {
      margin-right: 0;
    }
  }

  .overview-card {
    display: flex;
    width: 100%;
    height: 640px;
    margin-top: 24px;
    margin-bottom: 70px;

    .card-left {
      width: 50%;
      height: 100%;
      .left-top {
        height: 308px;
        background-color: #fff;
      }

      .left-bottom {
        margin-top: 24px;
        height: 308px;
        background-color: #fff;
      }
    }

    .card-right {
      width: 50%;
      height: 100%;
      margin-left: 24px;
      background-color: #fff;
    }
  }
}
</style>