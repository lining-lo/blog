<template>
    <div class="header-bar">
        <p class="header-left">
            LO'S BELOG
        </p>
        <div class="header-right">
            <div class="right-routes">
                <router-link :to="item.path" class="route" v-for="item in headerbarRoutes" :key="item.path">
                    <component class="route-icon" :is="item.icon" :style="{ color: item.color }"></component>
                    <span class="route-name">{{ item.name }}</span>
                </router-link>
            </div>
            <el-switch v-model="isDark" :active-action-icon="MoonNight" :inactive-action-icon="Sunny"
                style="--el-switch-on-color: #6f5ac3; --el-switch-off-color: #f4c97a" />
            <div class="right-avator" @click="outerVisible = true"
                :style="{ backgroundImage: token.type === 0 ? `url(http://localhost:3000${token.imgurl})` : `${portrait[token.imgurl]}` }">
            </div>
            <el-dialog :show-close="false" v-model="outerVisible" width="800">
                <div class="content" :style="{ background: isDark ? '#26282a' : '' }">
                    <div class="left" :style="{ backgroundImage: getbackground(), opacity: isDark ? 0.5 : 0.9 }"></div>
                    <div class="right"
                        :style="{ background: isDark ? `rgba(228, 231, 254, -0.2)` : `rgba(228, 231, 254, 0.8)` }">
                        <div class="login" v-if="token.type === 1 && match === 0">
                            <h4>登 录</h4>
                            <div class="form">
                                <input v-model="loginParams.username" class="acc" type="text" placeholder="用户名">
                                <input v-model="loginParams.password" class="acc" type="password" placeholder="密码">
                                <button @click="login" class="submit">Login</button>
                            </div>
                            <div class="bottom">
                                <span @click="match = 1">注册账号</span>
                                <span @click="match = 2">找回密码</span>
                            </div>
                        </div>
                        <div class="regist" v-if="token.type === 1 && match === 1">
                            <h4>注 册</h4>
                            <div class="form">
                                <input v-model="registParams.username" class="acc" type="text" placeholder="用户名">
                                <input v-model="registParams.password" class="acc" type="password" placeholder="密码">
                                <button @click="regist" class="submit">Regist</button>
                            </div>
                            <div class="bottom">
                                <span @click="match = 0">用户登录</span>
                                <span @click="match = 2">找回密码</span>
                            </div>
                        </div>
                        <div class="findpassword" v-if="token.type === 1 && match === 2">
                            <h4>找回密码</h4>
                            <div class="form">
                                <input class="acc" v-model="findPasswordParams.username" type="text" placeholder="用户名">
                                <input class="acc" v-model="findPasswordParams.email" type="text" placeholder="邮箱号">
                                <div style="display: flex;width: 400px;align-items: baseline;cursor: pointer;">
                                    <input class="acc" type="text" v-model="findPasswordParams.code"
                                        style="width: 320px;" placeholder="验证码">
                                    <button :disabled="isSend" @click="sendCode" class="verifyCodeBtn"
                                        style="margin-bottom: 20px;">获取验证码</button>
                                </div>
                                <input class="acc" type="password" v-model="findPasswordParams.password"
                                    placeholder="新密码">
                                <button class="submit" @click="findPassword">FindPassword</button>
                            </div>
                            <div class="bottom">
                                <span @click="match = 0">用户登录</span>
                                <span @click="match = 1">注册账号</span>
                            </div>
                        </div>
                        <div class="userInfo" v-if="token.type === 0">
                            <h4>个人信息</h4>
                            <div class="upload">
                                <input class="upload-file" id="file" type="file" accept="image/*" @change="uploadFile">
                                <div class="upload-icon" v-if="!imgurl && !token.imgurl">
                                    <el-icon class="icon">
                                        <Plus />
                                    </el-icon>
                                </div>
                                <img :class="{ cleardark: isDark }" v-if="imgurl || token.imgurl"
                                    :src="imgurl ? imgurl : `http://localhost:3000/${token.imgurl}`" alt="">
                            </div>
                            <div class="form">
                                <div class="username"><span>用户：</span><input type="text"
                                        v-model="updateUserParams.username" readonly></div>
                                <div class="password"><span>密码：</span><input type="text"
                                        v-model="updateUserParams.password"></div>
                                <div class="email"><span>邮箱：</span><input type="text" v-model="updateUserParams.email">
                                </div>
                            </div>
                            <div class="btn">
                                <button @click="updateUser">修改信息</button>
                                <button style="margin-left: 20px;" @click="logout">退出登录</button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { headerbarRoutes, portrait } from '../utils/data'
import { Sunny, MoonNight } from '@element-plus/icons-vue'
import { useTimeStore, useUserStore } from '../store'
import { storeToRefs } from 'pinia'
import { getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { nanoid } from 'nanoid'
import { formattime, encryptIpToPassword, getObjectURL } from '../utils/customize'
import { ElMessage } from 'element-plus'

const outerVisible = ref(false)
const { proxy } = getCurrentInstance()


// 实例化 Store
const timeStore = useTimeStore()
const userStore = useUserStore()
// 解构 State（自动转为响应式 ref）
const { isDark } = storeToRefs(timeStore)
const { token } = storeToRefs(userStore)

// 控制登录0、注册1、找回密码2、用户信息3的开关
const match = ref(0)
// 获取背景图片
const getbackground = () => {
    let url = ''
    if (token.value.type === 1 && match.value === 0) {
        url = `url(/src/assets/images/login.png)`;
    } else if (token.value.type === 1 && match.value === 1) {
        url = `url(/src/assets/images/regist.png)`;
    } else if (token.value.type === 1 && match.value === 2) {
        url = `url(/src/assets/images/findpassword.png)`;
    } else {
        url = `url(/src/assets/images/person.png)`;
    }
    return url
}

// 注册用户参数
const registParams = reactive({
    id: '',
    username: '',
    password: '',
    createdate: '',
    imgurl: '/photo/1751212892031.png'
})
// 注册用户方法
const regist = async () => {
    // 拼接参数
    registParams.id = nanoid(10)
    registParams.createdate = formattime(Date.now())
    // 数据校验
    if (registParams.username === '' || registParams.password === '') {
        return ElMessage.warning('请填写账号密码！')
    }
    // 查找用户
    const result1 = await proxy.$api.findUserByUserName(registParams)
    if (result1.data.message.length > 0) {
        return ElMessage.warning('该账号已被注册！')
    }
    // 创建用户
    const result2 = await proxy.$api.insertUser(registParams)
    // console.log(result2);
    ElMessage.success('注册成功')
    // 清空数据
    registParams.id = ''
    registParams.username = ''
    registParams.password = ''
    registParams.createdate = ''
}

// 用户登录参数
const loginParams = reactive({
    username: '',
    password: '',
})
// 用户登录方法
const login = async () => {
    // 数据校验
    if (loginParams.username === '' || loginParams.password === '') {
        return ElMessage.warning('请填写账号密码！')
    }
    // 发送请求
    const result = await proxy.$api.login(loginParams)
    // console.log(result);
    if (result.data.message.length === 0) {
        return ElMessage.error('账号或密码错误！')
    }
    // 登录后的逻辑
    let token = {
        type: 0,// 0登录用户，1游客
        id: result.data.message[0].id,
        username: result.data.message[0].username,
        password: result.data.message[0].password,
        imgurl: result.data.message[0].imgurl,
        email: result.data.message[0].email,
        createdate: result.data.message[0].createdate
    }
    userStore.setToken(JSON.stringify(token))
    match.value = 3
    //刷新页面
    location.reload()
    ElMessage.success('登录成功')
    // 清空数据
    loginParams.username = ''
    loginParams.password = ''
    outerVisible.value = false
}
// 退出登录
const logout = async () => {
    userStore.clearToken()
    outerVisible.value = false
    let token = {
        type: 1,// 0登录用户，1游客
        username: '',
        imgurl: 0
    }
    const result = await proxy.$api.getIp()
    token.username = encryptIpToPassword(result.data.message)
    token.imgurl = Math.trunc(Math.random() * 14);
    userStore.setToken(JSON.stringify(token))
    //刷新页面
    location.reload()
}

// 控制点击次数开关
const isSend = ref(false)
// 找回密码参数
const findPasswordParams = reactive({
    username: '',
    email: '',
    password: '',
    code: ''
})
// 验证码
const code = ref()
// 发送验证码
const sendCode = async () => {
    //邮箱必须填写且格式正确
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (findPasswordParams.email === '' || !emailRegex.test(findPasswordParams.email)) {
        return ElMessage.error('请正确填写邮箱！')
    }
    //防止多次点击
    isSend.value = true
    //初始数据
    const verifyCodeBtn = document.querySelector('.verifyCodeBtn');
    let countdown = 60; // 倒计时秒数
    //设置透明度为0.5
    verifyCodeBtn.style.opacity = 0.5;
    //发送验证码
    const result = await proxy.$api.sendEmail(findPasswordParams)
    code.value = result.data.message
    //倒计时逻辑
    const interval = setInterval(() => {
        //设置按钮内容
        countdown--;
        verifyCodeBtn.textContent = `${countdown}秒后重试`;
        //60s后
        if (countdown <= 0) {
            //清除定时器
            clearInterval(interval);
            //恢复按钮状态
            isSend.value = false
            //设置按钮内容
            verifyCodeBtn.textContent = '获取验证码';
            //重置倒计时
            countdown = 60;
            //设置透明度为1
            verifyCodeBtn.style.opacity = 1;
        }
    }, 1000);
}
// 找回密码方法
const findPassword = async () => {
    // 表单校验
    if (findPasswordParams.username === '' || findPasswordParams.email === '' || findPasswordParams.password === '') {
        return ElMessage.error('请仔细填写信息！')
    }
    // 验证码错误
    if (findPasswordParams.code != code.value) {
        return ElMessage.error('验证码错误！')
    }
    // 发送请求查找用户
    const findResult = await proxy.$api.findUserByUserNameAndEmai(findPasswordParams)
    if (findResult.data.message.length === 0) {
        return ElMessage.error('用户或邮箱不存在！')
    }
    // 发送更改密码请求
    await proxy.$api.updatePasswordByEmail(findPasswordParams)
    //关闭弹窗并清空数据
    outerVisible.value = false
    findPasswordParams.username = ''
    findPasswordParams.email = ''
    findPasswordParams.password = ''
    findPasswordParams.code = ''
    //提示用户
    ElMessage.success('修改成功')
}

// 获取token
const getToken = async () => {
    if (token.value.username === undefined) {
        let token = {
            type: 1,// 0登录用户，1游客
            username: '',
            imgurl: 0
        }
        const result = await proxy.$api.getIp()
        token.username = encryptIpToPassword(result.data.message)
        token.imgurl = Math.trunc(Math.random() * 14);
        userStore.setToken(JSON.stringify(token))
    }
}
// 挂载
onMounted(() => {
    getToken()
})

// 图片路径
const imgurl = ref()
// 上传图片
const uploadFile = () => {
    let file = getObjectURL(document.getElementById("file").files[0]);
    imgurl.value = file
}
// 修改用户参数
const updateUserParams = reactive({
    username: token.value.username,
    password: token.value.password,
    imgurl: token.value.imgurl,
    permission: 1,
    createdate: token.value.createdate,
    email: token.value.email,
    id: token.value.id
})
// 修改用户
const updateUser = async () => {
    // 信息校验
    if (updateUserParams.username === '' || updateUserParams.password === '') {
        return ElMessage.error('密码不能为空')
    }
    // 上传图片
    if (imgurl.value) {
        updateUserParams.imgurl = imgurl.value
        const formData = new FormData()
        formData.append('file', document.getElementById("file").files[0])
        const uploadResult = await proxy.$api.profile(formData)
        updateUserParams.imgurl = uploadResult.data
    }
    // 更新用户
    await proxy.$api.updateUser(updateUserParams)
    // 更新token信息
    let token = {
        type: 0,// 0登录用户，1游客
        id: updateUserParams.id,
        username: updateUserParams.username,
        password: updateUserParams.password,
        imgurl: updateUserParams.imgurl,
        email: updateUserParams.email,
        createdate: updateUserParams.createdate
    }
    userStore.setToken(JSON.stringify(token))
    ElMessage.success('修改成功')
    outerVisible.value = false
}
</script>
<style lang='less' scoped>
.header-bar {
    position: fixed;
    z-index: 999;
    height: 60px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    transition: all 0.5s;

    &:hover {
        background: rgba(5, 12, 14, 0.8);
    }

    .header-left {
        color: #1861a6;
        font-size: 17px;
        font-family: fantasy;
        word-break: break-word;
    }

    .header-right {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right-routes {
            display: flex;

            .route {
                height: 40px;
                display: flex;
                align-items: center;
                cursor: pointer;
                padding: 0 6px;
                margin: 0 6px;

                &:hover {
                    border-bottom: 2px solid #42b983;

                    &>.route-name {
                        color: #42b983;
                    }
                }

                &.router-link-active {
                    border-bottom: 2px solid #42b983;

                    &>.route-name {
                        color: #42b983;
                    }
                }

                .route-icon {
                    height: 20px;
                    width: 20px;
                }

                .route-name {
                    padding-left: 2px;
                    font-size: 17px;
                    font-weight: 300;
                    color: #fff;
                    font-family: cursive;
                }
            }
        }

        .right-avator {
            margin-left: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #53e5b9;
            cursor: pointer;
            background-size: cover;
            background-position: center;
        }
    }
}

::v-deep .el-dialog {
    padding: 0;
    border-radius: 10px;
    box-shadow: 0 1px 20px -6px rgba(0, 0, 0, 0.5);
    z-index: 9999 !important;

    .el-dialog__header {
        display: none;
    }

    .content {
        display: flex;
        width: 100%;
        height: 100%;
        font-family: auto;
        font-size: 10px;
        border-radius: 10px;

        .left {
            width: 300px;
            height: 400px;
            background-color: #53e5b9;
            background-image: url(../assets/images/login.png);
            background-size: cover;
            background-position: center;
            border-radius: 10px 0 0 10px;
            opacity: 0.9;
        }

        .right {
            width: 500px;
            height: 400px;
            border-radius: 0 10px 10px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(228, 231, 254, 0.8);

            .login,
            .regist {
                width: 100%;
                height: 100%;
                border-radius: 0 10px 10px 0;
                display: flex;
                flex-direction: column;
                align-items: center;

                h4 {
                    color: rgb(144, 129, 241);
                    font-size: 24px;
                    margin: 30px 0;
                }

                .form {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;

                    input {
                        outline: none;
                        width: 80%;
                        height: 40px;
                        font-size: 12px;
                        padding: 5px 10px;
                        border: none;
                        border-bottom: 1px solid rgb(144, 129, 241);
                        color: rgb(144, 129, 241);
                        background-color: rgba(0, 0, 0, 0);
                        margin-bottom: 30px;
                    }

                    .submit {
                        width: 60%;
                        height: 40px;
                        color: #f6f6f6;
                        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
                        font-size: 14px;
                        border: none;
                        border-radius: 0.5rem;
                        margin: 20px 0 0 50%;
                        transform: translateX(-50%);
                        cursor: pointer;
                        transition: all 0.2s;

                        &:hover {
                            font-size: 16px;
                            background-image: linear-gradient(120deg, #7a2dc2 0%, #3182d3 100%);
                        }
                    }
                }

                .bottom {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    width: 70%;

                    span {
                        font-size: 12px;
                        padding: 5px 10px;
                        margin-top: 10px;
                        color: #666;
                        cursor: pointer;

                        &:hover {
                            color: rgb(144, 129, 241);
                        }
                    }
                }
            }

            .findpassword {
                width: 100%;
                height: 100%;
                border-radius: 0 10px 10px 0;
                display: flex;
                flex-direction: column;
                align-items: center;

                h4 {
                    color: rgb(144, 129, 241);
                    font-size: 24px;
                    margin: 20px 0;
                }

                .form {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;

                    input {
                        outline: none;
                        width: 80%;
                        height: 40px;
                        font-size: 12px;
                        padding: 5px 10px;
                        border: none;
                        border-bottom: 1px solid rgb(144, 129, 241);
                        color: rgb(144, 129, 241);
                        background-color: rgba(0, 0, 0, 0);
                        margin-bottom: 12px;
                    }

                    .verifyCodeBtn {
                        font-size: 12px;
                    }

                    .submit {
                        width: 60%;
                        height: 40px;
                        color: #f6f6f6;
                        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
                        font-size: 14px;
                        border: none;
                        border-radius: 0.5rem;
                        margin: 13px 0 0 50%;
                        transform: translateX(-50%);
                        cursor: pointer;
                        transition: all 0.2s;

                        &:hover {
                            font-size: 16px;
                            background-image: linear-gradient(120deg, #7a2dc2 0%, #3182d3 100%);
                        }
                    }
                }

                .bottom {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                    width: 70%;

                    span {
                        font-size: 12px;
                        padding: 5px 10px;
                        color: #666;
                        cursor: pointer;

                        &:hover {
                            color: rgb(144, 129, 241);
                        }
                    }
                }
            }

            .userInfo {
                width: 100%;
                height: 100%;
                border-radius: 0 10px 10px 0;
                display: flex;
                flex-direction: column;
                align-items: center;

                h4 {
                    color: rgb(144, 129, 241);
                    font-size: 24px;
                    margin: 24px 0;
                }

                .upload {
                    position: relative;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;

                    .upload-file {
                        position: absolute;
                        z-index: 10;
                        height: 120px;
                        width: 120px;
                        opacity: 0;
                        cursor: pointer;
                        background-color: pink;
                        border-radius: 50%;
                    }

                    .upload-icon {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border: 1px solid #fff;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        background: rgba(0, 0, 0, 0.2);

                        .icon {
                            font-size: 20px;
                            color: #fff;
                        }
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                        object-position: center;
                    }
                }

                .form {
                    margin-top: 20px;

                    input {
                        outline: none;
                        font-size: 12px;
                        padding: 0 10px;
                        border: none;
                        border-bottom: 1px solid rgb(144, 129, 241);
                        color: rgb(144, 129, 241);
                        background-color: rgba(0, 0, 0, 0);
                        margin-bottom: 20px;
                    }
                }

                .btn {
                    margin-top: 10px;

                    button {
                        padding: 5px 20px;
                        background-color: #1861a6;
                        color: #f6f6f6;
                        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
                        transition: all 0.2s;

                        &:hover {
                            font-size: 16px;
                            background-image: linear-gradient(120deg, #7a2dc2 0%, #3182d3 100%);
                        }
                    }
                }
            }
        }
    }
}
</style>