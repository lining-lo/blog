<template>
    <div class="container-article">
        <div class="article-title">
            <span>博客文章</span>
            <div class="title-search">
                <input placeholder="搜索文章">
                <div class="serch">
                    <el-icon size="12" color="gray">
                        <Search />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="article-header">
            <div class="header-labels">
                
            </div>
            <div class="header-create">
                <router-link to="createArticle" style="display: flex;align-items: center; color: #42b983;">
                    <el-icon>
                        <CirclePlusFilled />
                    </el-icon>
                    <span style="margin-left: 3px;">新增文章</span>
                </router-link>
            </div>
        </div>
        <div class="article-form">
            <el-table :data="article" border style="width: 100%">
                <el-table-column type="index" label="序号" width="60" align="center" />
                <el-table-column label="封面" width="180" align="center">
                    <template #default="scope">
                        <img style="width: 100%;height: 55px;object-fit: cover;object-position: center;"
                            :src="`${baseUrl}${scope.row.cover}`" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="标题" align="center" />
                <el-table-column label="文字描述" show-overflow-tooltip="true" align="center">
                    <template #default="scope">
                        {{ scope.row.content.substring(0, 80) }}...
                    </template>
                </el-table-column>
                <el-table-column prop="label" label="标签" align="center">
                    <template #default="{ row }">
                        <el-tag color="#f6f6f8" style="color: #42b983; padding: 5px 10px;font-size: 12px;">
                            {{ labels[row.label].name }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否置顶" align="center">
                    <template #default="{ row }">
                        <el-switch v-model="row.top"
                            style="--el-switch-on-color: #42b983; --el-switch-off-color: #f4f4f5" />
                    </template>
                </el-table-column>
                <el-table-column prop="createdate" label="创建时间" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" link type="success" @click="handleEdit(scope.$index, scope.row)">
                            <el-icon style="margin-right: 2px;">
                                <Edit />
                            </el-icon>
                            编辑
                        </el-button>
                        <el-button size="small" link type="danger" @click="handleDelete(scope.$index, scope.row)">
                            <el-icon style="margin-right: 2px;">
                                <Delete />
                            </el-icon>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="article-footer">
            <el-pagination :style="{ '--el-pager-bg-color': '#42b983' }" size="small" background
                layout="prev, pager, next" :total="50" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { baseUrl } from '../utils/env';

const { proxy } = getCurrentInstance()

// 文章
const article = ref([])
// 分页获取文章参数
const articlePageParams = {
    page: 1,
    pagesize: 100,
    user_id: 'sNbEkOHxk5',
    user_type: 0
};
// 分页获取文章方法
const getArticle = async () => {
    // 获取文章方法
    const result = await proxy.$api.selectArticlePage(articlePageParams)
    article.value = result.data.message.map(item => ({
        ...item,
        top: item.top === 1 ? false : true
    }));
}

// 标签数据
let labels = ref()
// 查找标签参数
const selectLabelPageParams = reactive({
    page: 1,
    pagesize: 100,
})
// 分页查找标签
const getLabels = async () => {
    const result = await proxy.$api.selectLabelPage(selectLabelPageParams)
    labels.value = result.data.message
    // console.log('labels', labels.value);
}
// 挂载
onMounted(() => {
    getArticle()
    getLabels()
})

const handleEdit = (index: any, row: any) => {

}

const handleDelete = (index: any, row: any) => {

}
</script>

<style lang='less' scoped>
.container-article {
    padding: 14px;
    width: 100%;
    height: 100%;

    .article-title {
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

        .title-search {
            width: 260px;
            height: 30px;
            border: 1px solid #e1d9d9;
            display: flex;
            align-items: center;
            justify-content: space-between;

            input {
                width: 100%;
                height: 100%;
                border-right: 0;
                border: none;
                outline: none;
                background-color: transparent;
                padding-left: 10px;
                font-size: 14px;
                font-family: "PingFang SC";
                font-style: normal;
                color: #d3d3d5;
            }

            .serch {
                width: 50px;
                height: 30px;
                display: flex;
                border: 1px solid #e1d9d9;
                border-right: none;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }

    .article-header {
        width: 100%;
        height: 40px;
        background-color: #fff;
        margin-top: 24px;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-labels {
            display: flex;
            font-size: 13px;

            & .selected {
                color: #42b983;
            }

            span {
                padding: 4px 16px;
                margin-right: 12px;
                cursor: pointer;
                border-radius: 2px;
                background: #F6F6F8;
                white-space: nowrap;
            }
        }
    }

    .article-form {
        margin-top: 10px;
        width: 100%;
        height: 502px;
        background-color: #fff;
        padding: 16px 24px;
        overflow: auto;
    }

    .article-footer {
        width: 100%;
        display: flex;
        margin-top: 16px;
        padding: 0 20px;
        justify-content: end;
    }
}
</style>