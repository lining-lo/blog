<template>
    我是main{{ countStore.count }}
    <router-view />
</template>

<script setup lang='ts'>
import { useCounterStore } from '../store';
const countStore = useCounterStore()
</script>
<style lang='less' scoped></style>