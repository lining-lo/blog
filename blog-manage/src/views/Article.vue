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
                <span class="selected">全部</span>
                <span v-for="(item, index) in 5" :key="index">我的博客</span>
            </div>
            <div class="header-create">
                <button style="display: flex;align-items: center; color: #42b983;">
                    <el-icon>
                        <CirclePlusFilled />
                    </el-icon>
                    <span style="margin-left: 3px;">新增</span>
                </button>
            </div>
        </div>
        <div class="article-form">
            <el-table :data="tableData" border style="width: 100%" >
                <el-table-column prop="id" label="序号" width="60" align="center"/>
                <el-table-column label="封面" width="180" align="center">
                    <template #default="scope">
                        <img style="width: 100%;height: 55px;background-color: pink;" :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题" align="center"/>
                <el-table-column prop="content" label="文字描述" show-overflow-tooltip="true" align="center"/>
                <el-table-column prop="label" label="标签" align="center">
                    <template #default="{ row }">
                        <el-tag color="#f6f6f8" style="color: #42b983; padding: 5px 10px;">
                            {{ row.label }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否置顶" align="center">
                    <template #default="{ row }">
                        <el-switch v-model="row.istop"
                            style="--el-switch-on-color: #42b983; --el-switch-off-color: #f4f4f5" />
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" align="center"/>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button size="small" link type="success" @click="handleEdit(scope.$index, scope.row)">
                            <el-icon style="margin-right: 2px;">
                                <Edit />
                            </el-icon>编辑
                        </el-button>
                        <el-button size="small" link type="danger" @click="handleDelete(scope.$index, scope.row)">
                            <el-icon style="margin-right: 2px;">
                                <Delete />
                            </el-icon>删除
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
const tableData = [
    {
        id: 1,
        cover: 'https://s1.ax1x.com/2022/11/10/z9VlHs.png',
        title: '我的博客',
        content: '开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情',
        label: '学习',
        istop: true,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        cover: 'http://img.mrzym.top/FsmFwJb-phLb9aNSiKLYZP-s_vAk',
        title: '我不吃牛肉',
        content: '开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情',
        label: '生活',
        istop: false,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 1,
        cover: 'https://s1.ax1x.com/2022/11/10/z9VlHs.png',
        title: '我的博客',
        content: '开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情',
        label: '学习',
        istop: true,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        cover: 'http://img.mrzym.top/FsmFwJb-phLb9aNSiKLYZP-s_vAk',
        title: '我不吃牛肉',
        content: '开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情',
        label: '生活',
        istop: false,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 1,
        cover: 'https://s1.ax1x.com/2022/11/10/z9VlHs.png',
        title: '我的博客',
        content: '开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情',
        label: '学习',
        istop: true,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        cover: 'http://img.mrzym.top/FsmFwJb-phLb9aNSiKLYZP-s_vAk',
        title: '我不吃牛肉',
        content: '开发这个项目一来是为了练习全栈技术，积累项目经验，二来呢是拥有一个属于自己的博客是一个很酷的事情',
        label: '生活',
        istop: false,
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
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