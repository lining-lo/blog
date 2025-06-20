<template>
    <div class="container-label">
        <div class="label-title">
            <span>分类标签</span>
            <div class="title-search">
                <input placeholder="搜索标签">
                <div class="serch">
                    <el-icon size="12" color="gray">
                        <Search />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="label-header">
            <div class="header-delete">
                <button style="display: flex;align-items: center; color: red;">
                    <el-icon size="12" style="margin-right: 3px;">
                        <Delete />
                    </el-icon>
                    <span>批量删除</span>
                </button>
            </div>
            <div class="header-create">
                <button @click="dialogVisible = true" style="display: flex;align-items: center; color: #42b983;">
                    <el-icon size="16">
                        <Plus style="margin-right: 3px;" />
                    </el-icon>
                    <span>新增标签</span>
                </button>
            </div>
        </div>
        <div class="label-form">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" :selectable="selectable" width="55" align="center" />
                <el-table-column prop="id" label="序号" width="60" align="center" />
                <el-table-column prop="content" label="标签" align="center" />
                <el-table-column prop="createtime" label="创建时间" align="center" />
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
        <div class="label-footer">
            <el-pagination :style="{ '--el-pager-bg-color': '#42b983' }" size="small" background
                layout="prev, pager, next" :total="50" />
        </div>
        <div class="label-create">
            <el-dialog v-model="dialogVisible" title="添加标签" width="500">
                <span></span>
                <template #footer>
                    <div class="dialog-footer">
                        <button @click="dialogVisible = false">取消</button>
                        <button @click="dialogVisible = false">确认</button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const tableData = [
    {
        id: 1,
        content: '我的博客1',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 2,
        content: '我的博客2',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 3,
        content: '我的博客3',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 4,
        content: '我的博客4',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 5,
        content: '我的博客5',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 6,
        content: '我的博客6',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 7,
        content: '我的博客7',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 8,
        content: '我的博客8',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 9,
        content: '我的博客9',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 10,
        content: '我的博客10',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    },
    {
        id: 11,
        content: '我的博客11',
        createtime: '2014-03-22',
        updatetime: '2016-05-03',
    }
]

const selectable = (row: any) => row.id
const handleEdit = (index: any, row: any) => { }
const handleDelete = (index: any, row: any) => { }

const dialogVisible = ref(false)
</script>

<style lang='less' scoped>
.container-label {
    padding: 14px;
    width: 100%;
    height: 100%;

    .label-title {
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

    .label-header {
        width: 100%;
        height: 40px;
        background-color: #fff;
        margin-top: 24px;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .header-delete {
            display: flex;
            font-size: 13px;

            button {
                padding: 4px 16px;
                cursor: pointer;
                border-radius: 2px;
                background: #F6F6F8;
            }
        }

        .header-create {
            display: flex;
            font-size: 13px;

            button {
                padding: 4px 16px;
                cursor: pointer;
                border-radius: 2px;
                background: #F6F6F8;
            }
        }
    }

    .label-form {
        margin-top: 10px;
        width: 100%;
        height: 508px;
        background-color: #fff;
        padding: 16px 24px;
        overflow: auto;
    }

    .label-footer {
        width: 100%;
        display: flex;
        margin-top: 16px;
        padding: 0 20px;
        justify-content: end;
    }
}
</style>