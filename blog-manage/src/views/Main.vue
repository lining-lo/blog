<template>
    <div class="aa">
        <span class="bb">测试less</span>
        我是Main{{ counter.count }}
        <div class="mb-4">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </div>
        <router-view />
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useCounterStore } from '../store'

const counter = useCounterStore()
</script>
<style lang='less' scoped>
.aa {
    .bb {
        color: red;
    }
}
</style>