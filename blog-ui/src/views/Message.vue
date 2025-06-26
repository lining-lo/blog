<template>
    <div class="message-container">
        <div class="message-labels">
            <p @click="selectLable(-1)" :class="{ selected: lableSelected === -1 }">全部</p>
            <p @click="selectLable(index)" :class="{ selected: lableSelected === index }"
                v-for="(item, index) in messageLabels" :key="index">{{ item }}</p>
        </div>
        <div class="message-card">
            <message-card @click="selectCard(index)" :class="{ cardselected: cardSelected === index }" class="card-item" :card="item"
                v-for="(item, index) in messageCardsMock.data" :key="index" />
        </div>
        <div class="message-addbtn" @click="isShowCreateCardPopup = true">
            <el-icon class="icon">
                <Plus />
            </el-icon>
        </div>
        <create-message v-if="isShowCreateCardPopup" :isShow="isShowCreateCardPopup" @closePopup="closeCreateCardPopup" />
        <card-detail :card="messageCardsMock.data[cardSelected]"  v-if="isShowCardDetailPopup" @closePopup="closeCardDetailPopup" />
    </div>
</template>

<script setup lang='ts'>
import { messageLabels } from '../utils/data';
import { messageCardsMock } from '../../mock/mock'
import CreateMessage from '../components/CreateMessage.vue';
import MessageCard from '../components/MessageCard.vue';
import CardDetail from '../components/CardDetail.vue';
import { ref } from 'vue';

//创建卡片弹窗开关
const isShowCreateCardPopup = ref(false)
//关闭创建卡片弹窗
const closeCreateCardPopup = () => {
    isShowCardDetailPopup.value = false
    isShowCreateCardPopup.value = false
}

//创建卡片弹窗开关
const isShowCardDetailPopup = ref(false)
//关闭创建卡片弹窗
const closeCardDetailPopup = () => {
    isShowCardDetailPopup.value = false
    isShowCreateCardPopup.value = false
    cardSelected.value = -1
}

//选中的标签（默认未选-1）
const lableSelected = ref(-1)
//选择标签的方法
const selectLable = (index: number) => {
    lableSelected.value = index
    //获取墙数据
    //关闭弹窗
    isShowCardDetailPopup.value = false
    isShowCreateCardPopup.value = false
    cardSelected.value = -1
}

//选中的卡片（默认未选-1）
const cardSelected = ref(-1)
//选择卡片的方法
const selectCard = (index:number)=>{
    //选中
    if (cardSelected.value !== index) {
        cardSelected.value = index
        isShowCardDetailPopup.value = true
    }else{
        //取消选中
        cardSelected.value = -1
        isShowCardDetailPopup.value = false
        isShowCreateCardPopup.value = false
    }
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
        top: 63%;
        cursor: pointer;

        .icon {
            color: #ffffff;
            font-size: 24px;
        }
    }
}
</style>