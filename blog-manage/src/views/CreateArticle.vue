<template>
    <div class="article-create">
        <div class="create-title">
            <span>新增文章</span>
            <div class="title-right">
                <button style="background-color: skyblue;"><el-icon>
                        <Refresh />
                    </el-icon><span>重置</span>
                </button>
                <button style="background-color: #42b983;"><el-icon>
                        <Tickets />
                    </el-icon><span>发布</span>
                </button>
                <button @click="router.push('article')" style="background-color: gray;"><el-icon>
                        <DArrowLeft />
                    </el-icon><span>返回</span>
                </button>
            </div>
        </div>
        <div class="create-header">
            <div class="header-upload">
                <el-upload
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :show-file-list="false"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="img" />
                    <el-icon class="icon" v-else ><Plus /></el-icon>
             </el-upload>
            </div>
            <div class="header-title" style="margin: 0 25px;">
                <span>标题：</span><br>
                <el-input v-model="title" style="width: 180px;margin-top: 5px;" />
            </div>
            <div class="header-msg">
                <span>文章描述：</span><br>
                <el-input v-model="desc" style="width: 400px;margin-top: 5px;" />
            </div>
            <div class="header-label" style="width: 180px;margin: 0 25px;">
                <span>标签：</span><br>
                <el-cascader v-model="label" style="margin-top: 5px;" placeholder=" " :options="options"
                    @change="handleChange" />
            </div>
            <div class="header-istop">
                <span>置顶：</span><br>
                <el-switch v-model="istop"
                    style="--el-switch-on-color: #42b983; --el-switch-off-color: #f4f4f5;margin-top: 5px;" />
            </div>
        </div>
        <MdEditor class="create-content" v-model="text" />
    </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';

const text = ref('Hello Editor!');
const router = useRouter()
//文件上传
const imageUrl = ref('')

//单选框
const label = ref('')
const options = [
    {
        label: '博客',
        value: '博客'
    },
    {
        label: '学习',
        value: '学习'
    },
    {
        label: '生活',
        value: '生活'
    },
]
const title = ref('')
const desc = ref('')
const istop = ref(true)
const handleChange = (value: any) => {
    console.log(value)
}


</script>

<style lang='less' scoped>
.article-create {
    padding: 14px;
    width: 100%;

    .create-title {
        width: 100%;
        height: 32px;
        color: #000000;
        font-family: "PingFang SC";
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title-right {
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                color: #fff;
                padding: 5px 10px;
                margin: 0 2px;
                display: flex;
                align-items: center;
                transition: all 0.2s;

                &:hover {
                    color: saddlebrown;
                }

                span {
                    margin-left: 2px;
                }
            }

        }
    }

    .create-header {
        width: 100%;
        height: 80px;
        background-color: #fff;
        margin-top: 24px;
        padding: 10px 24px;
        display: flex;
        align-items: center;

        .header-upload {
            height: 100%;
            width: 160px;
            border: 1px dashed gray;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover{
                color: #70b6ff;
                border: 1px dashed #70b6ff;
            }

            .icon{
                color: gray;
            }

            img{
                height: 60px;
                width: 160px;
            }
        }

        span {
            color: #909399;
            font-weight: 500;
        }
    }

    .create-content {
        margin-top: 20px;
        padding: 16px 24px;
    }
}
</style>