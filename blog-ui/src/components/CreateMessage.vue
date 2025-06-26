<template>
    <transition name="modal">
        <div class="createmessage">
            <div class="createmessage-head">
                <span class="title">写留言</span>
                <el-icon @click="emit('closePopup')" class="icon" size="22">
                    <CloseBold />
                </el-icon>
            </div>
            <div class="createmessage-main">
                <div class="main-colorlist">
                    <div :class="{ colorselected: createCardParams.color === index }" @click="getCardColor(index)"
                        class="colorlist-item" v-for="(item, index) in createMessageCardColors" :key="index"
                        :style="{ background: item }"></div>
                </div>
                <div class="main-messagecard" :style="{ background: messageCardColors[createCardParams.color] }">
                    <textarea v-model="createCardParams.content" class="messagecard-text" placeholder="留言..." maxlength="96"></textarea>
                    <input v-model="createCardParams.user_name" class="messagecard-name" type="text" placeholder="作者">
                </div>
                <div class="main-label">
                    <p class="label-title">选择标签</p>
                    <div class="label-list">
                        <p :class="{ labelselected: createCardParams.label === index }" @click="getCardLabel(index)"
                            class="list-item " v-for="(item, index) in messageLabels" :key="index">
                            {{ item }}
                        </p>
                    </div>
                </div>
                <div class="main-statement">
                    <p class="statement-title">免责声明</p>
                    <p class="statement-text"> 留言评论是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br>
                        1、反对宪法所确定的基本原则的；<br>
                        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br> 3、损害国家荣誉和利益的； <br>4、煽动民族仇恨、民族歧视，破坏民族团结的；<br>
                        5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br> 6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br> 7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
                        8、侮辱或者诽谤他人，侵害他人合法权益的；<br> 9、含有法律、行政法规禁止的其他内容的信息。 </p>
                </div>
                <div class="main-footer">
                    <el-button type="info" class="cancel" round @click="emit('closePopup')">丢弃</el-button>
                    <el-button @click="sumbit" class="submit" type="primary" round>确定</el-button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang='ts'>
import { nanoid } from 'nanoid';
import { ElMessage } from 'element-plus'
import { reactive } from 'vue';
import { createMessageCardColors, messageCardColors, messageLabels } from '../utils/data';

//获取父组件的参数
const props = defineProps(['isShow'])
//获取父组件方法
const emit = defineEmits(['closePopup'])

//表单参数
const createCardParams = reactive({
    id: '',
    label: 0,
    color: 0,
    content: '',
    user_id: '',
    user_type: 1,
    user_name: '',
    createdate: ''
})
//选中获取卡片颜色
const getCardColor = (index: number) => {
    createCardParams.color = index
}
//选中获取卡片标签
const getCardLabel = (index: number) => {
    createCardParams.label = index
}
//创建卡片
const sumbit = ()=>{
    //拼装数据
    createCardParams.id = nanoid(10)
    createCardParams.user_id = nanoid(10)
    createCardParams.user_name = '游客'
    createCardParams.createdate = JSON.stringify(Date.now())
    //校验数据
    if (createCardParams.content.trim()==='') {
        ElMessage.warning('内容输入不能为空')
        return
    }
    
}


</script>

<style lang='less' scoped>
.modal {

    //入场
    &-enter {
        &-from {
            transform: translateX(360px);
        }

        &-active {
            transition: all 0.2s ease-out;

        }

        &-to {
            transform: translateX(0px);
        }
    }

    //出场
    &-leave {
        &-from {
            transform: translateX(0px);
        }

        &-active {
            transition: all 0.2s ease-in;

        }

        &-to {
            transform: translateX(360px);
        }
    }
}

.createmessage {
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 60px;
    z-index: 1000;
    background: rgba(255, 255, 255);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(5px);

    .createmessage-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        box-sizing: border-box;

        .title {
            font-size: 16px;
            color: #202020;
            font-weight: 600;
        }

        .icon {
            color: #585858;
            cursor: pointer;
            padding-left: 8px;
        }
    }

    .createmessage-main {
        height: 100%;
        width: 100%;
        margin: 2px;
        overflow: auto;
        padding: 0 20px 200px;
        position: relative;

        .main-colorlist {
            padding-bottom: 12px;
            display: flex;
            align-items: center;
            box-sizing: border-box;

            .colorlist-item {
                width: 24px;
                height: 24px;
                margin-right: 8px;
                cursor: pointer;
            }

            .colorselected {
                border: 2px solid #3873f0;
            }
        }

        .main-messagecard {
            width: 100%;
            height: 240px;
            padding: 12px;
            box-sizing: border-box;
            transition: all 0.3;

            .messagecard-text {
                background: none;
                border: none;
                resize: none;
                padding: 8px;
                box-sizing: border-box;
                height: 172px;
                width: 100%;
                font-size: 16px;
                outline: none;
            }

            .messagecard-name {
                width: 100%;
                box-sizing: border-box;
                padding: 8px;
                background: none;
                border: #fff 1px solid;
                line-height: 20px;
                font-size: 16px;
                outline: none;
            }
        }

        .main-label {
            margin-top: 20px;

            .label-title {
                color: #202020;
                font-weight: 600;
                padding-top: 30px;
            }

            .label-list {
                display: flex;
                flex-wrap: wrap;
                width: 320px;

                .list-item {
                    padding: 2px 10px;
                    border-radius: 20px;
                    margin: 16px 1px 0 0;
                    cursor: pointer;
                    color: #585858;
                    transition: all 0.3;
                }

                .labelselected {
                    font-weight: 600;
                    color: #202020;
                    background-color: rgb(187, 165, 165);
                }
            }
        }

        .main-statement {
            padding-top: 10px;
            color: #949494;

            .statement-title {
                color: #202020;
                font-weight: 600;
                padding-top: 30px;
            }

            .statement-text {
                font-size: 12px;
                padding-top: 20px;
            }
        }

        .main-footer {
            padding: 20px;
            box-sizing: border-box;
            position: fixed;
            bottom: 52px;
            left: 0;
            background: rgba(255, 255, 255, 0.6);
            width: 100%;
            display: flex;
            justify-content: space-around;
            backdrop-filter: blur(10px);

            .cancel {
                cursor: pointer;
            }

            .submit {
                margin-left: 20px;
                width: 200px;
                cursor: pointer;
            }
        }

        /* 滚动条样式 */
        &.createmessage-main::-webkit-scrollbar {
            width: 4px;
            /*  设置纵轴（y轴）轴滚动条 */
            height: 4px;
            /*  设置横轴（x轴）轴滚动条 */
        }

        /* 滚动条滑块（里面小方块） */
        &.createmessage-main::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.2);
        }

        /* 滚动条轨道 */
        &.createmessage-main::-webkit-scrollbar-track {
            border-radius: 4px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
        }
    }
}
</style>