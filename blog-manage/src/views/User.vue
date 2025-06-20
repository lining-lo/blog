<template>
    <div class="container-user">
        <div class="user-tittle">
            <span>用户管理</span>
            <div class="title-search">
                <input placeholder="搜索用户">
                <div class="serch">
                    <el-icon size="12" color="gray">
                        <Search />
                    </el-icon>
                </div>
            </div>
        </div>
        <div class="user-form">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="序号" width="60" align="center" />
                <el-table-column label="头像" align="center">
                    <template #default="scope">
                        <img style="width: 54px;height: 54px;background-color: #42b983;margin: 0 auto;border-radius: 50%;" :src="scope.row.cover" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名" align="center" />
                <el-table-column prop="password" label="密码" align="center" />
                <el-table-column label="管理权限" align="center">
                    <template #default="{ row }">
                        <el-switch v-model="row.istop"
                            style="--el-switch-on-color: #42b983; --el-switch-off-color: #f4f4f5" />
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="创建时间" align="center" />
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
        <div class="user-footer">
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
        username: 'lining-lo',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
    {
        id: 2,
        cover: 'http://img.mrzym.top/Fm70i8AbBRc0pWnU5WmRaDW4XFZ_',
        username: 'aaa',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
    {
        id: 3,
        cover: 'http://img.mrzym.top/Fs-qr0iD2EUC0nlO7dzWpYbj5kvq',
        username: 'aaa',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
    {
        id: 3,
        cover: 'http://img.mrzym.top/Fpet0b3C-UBzDZBeTnDk_pMDRQyD',
        username: 'aaa',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
    {
        id: 3,
        cover: '',
        username: 'aaa',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
    {
        id: 3,
        cover: 'http://img.mrzym.top/Fph1gRHpP48xJYG465kqWhZHtJ3C',
        username: 'aaa',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
    {
        id: 3,
        cover: 'http://img.mrzym.top/Fi0we0GBRfzFOXnYZ_aJQiX3vJbh',
        username: 'aaa',
        password: '123456',
        istop: true,
        date: '2016-05-03',
    },
]

const handleEdit = (index:any,row:any)=>{

}

const handleDelete = (index:any,row:any)=>{

}
</script>

<style lang='less' scoped>
.container-user {
    padding: 14px;
    width: 100%;
    height: 100%;

    .user-tittle {
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

    .user-form {
        margin-top: 24px;
        width: 100%;
        height: 554px;
        background-color: #fff;
        padding: 10px 24px;
        overflow: auto;
    }

    .user-footer {
        width: 100%;
        display: flex;
        margin-top: 16px;
        padding: 0 20px;
        justify-content: end;
    }
}
</style>