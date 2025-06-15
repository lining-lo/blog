<template>
    <div class="message-container">
        <div class="message-labels">
            <p class="selected">全部</p>
            <p v-for="(item, index) in messageLabels" :key="index">{{ item }}</p>
        </div>
        <div class="message-card">
            <message-card class="card-item" :card="item" v-for="(item, index) in messageCardsMock.data" :key="index" />
        </div>
        <div class="message-addbtn" @click="isShow = true">
            <el-icon class="icon">
                <Plus />
            </el-icon>
        </div>
        <create-message v-if="isShow" :isShow="isShow" @closePopup="closePopup" />
    </div>
</template>

<script setup lang='ts'>
import { messageLabels } from '../utils/data';
import { messageCardsMock } from '../../mock/mock'
import CreateMessage from '../components/CreateMessage.vue';
import MessageCard from '../components/MessageCard.vue';
import { ref } from 'vue';

//弹窗开关
const isShow = ref(false)

//关闭弹窗
const closePopup = () => {
    isShow.value = false
}

</script>
<style lang='less' scoped>
.message-container {
    width: 100%;
    height: 100%;

    .message-labels {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40px;

        p {
            padding: 0 14px;
            margin: 4px;
            color: #585858;
            box-sizing: border-box;
            cursor: pointer;
        }

        .selected {
            color: #202020;
            font-weight: 600;
            border: 1px solid #202020;
            border-radius: 16px;
        }
    }

    .message-card {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
        transition: all 0.3s;

        .card-item {
            margin: 6px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

            &:hover {
                transform: translateY(-8px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }
        }

        .cardselected {
            border: 1px solid #3873f0;
        }
    }

    .message-addbtn {
        width: 56px;
        height: 56px;
        background: #202020;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
        border-radius: 28px;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s;
        right: 23px;
        top: 55%;
        cursor: pointer;

        .icon {
            color: #ffffff;
            font-size: 24px;
        }
    }
}
</style>