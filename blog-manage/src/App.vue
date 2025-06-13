<template>
  <!-- 头部导航栏 -->
  <header-bar />
  <!-- 主体内容 -->
  <router-view />
</template>

<script setup lang='ts'>
import HeaderBar from './components/HeaderBar.vue';

</script>

<style lang='less'>
#app {
  height: 100%;
  width: 100%;
}
</style>