<template>
    <header-bar />
    <banner />
    <div class="main-container">
        <router-view />
    </div>
    <footer-bar />
</template>

<script setup lang='ts'>
import HeaderBar from '../components/HeaderBar.vue';
import FooterBar from '../components/FooterBar.vue';
import Banner from '../components/Banner.vue';
</script>
<style lang='less' scoped>
.main-container{
    width: 90%;
    height: 100vh;
    background-color: pink;
    margin: 0 auto;
}
</style>