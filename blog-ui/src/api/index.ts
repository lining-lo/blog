import http from "../utils/request";

export default {
    /**
     * 评论相关
     */
    // 新建评论
    insertComment(data: any) {
        return http.post('/insertComment', data)
    },
    // 分页查询评论
    findCommentPage(data: any) {
        return http.post('/findCommentPage', data)
    },

    /**
     * 留言墙相关
     */
    // 新建墙
    insertWall(data: any) {
        return http.post('/insertWall', data)
    },
    // 分页查询墙
    selectWallPage(data: any) {
        return http.post('/selectWallPage', data)
    },

    /**
     * 用户相关
     */
    // 新建用户
    insertUser(data: any) {
        return http.post('/insertUser', data)
    },
    // 根据用户名查找用户
    findUserByUserName(data: any) {
        return http.post('/findUserByUserName', data)
    },
    // 用户登录
    login(data: any) {
        return http.post('/login', data)
    },
    // 用户登录
    getIp() {
        return http.post('/getIp')
    },
    // 修改用户信息
    updateUser(data: any) {
        return http.post('/updateUser',data)
    },
    // 文件上传
    profile(data: any) {
        return http.post('/profile', data)
    },
}