const controller = require('../controller/dbServe')
module.exports = function (app) {
    /**
     * 评论相关
     */
    // 新建评论
    app.post('/insertComment', (request, response) => {
        controller.insertComment(request, response)
    })
    // 分页查询评论
    app.post('/findCommentPage', (request, response) => {
        controller.findCommentPage(request, response)
    })

    /**
     * 留言墙相关
     */
    // 新建墙
    app.post('/insertWall', (request, response) => {
        controller.insertWall(request, response)
    })
    // 分页查询墙
    app.post('/selectWallPage', (request, response) => {
        controller.selectWallPage(request, response)
    })

    /**
     * 用户相关
     */
    // 新建用户
    app.post('/insertUser', (request, response) => {
        controller.insertUser(request, response)
    })
    // 根据用户名查找用户
    app.post('/findUserByUserName', (request, response) => {
        controller.findUserByUserName(request, response)
    })
    // 用户登录
    app.post('/login', (request, response) => {
        controller.login(request, response)
    })
    // 获取ip地址
    app.post('/getIp', (request, response) => {
        controller.getIp(request, response)
    })
    // 修改用户信息
    app.post('/updateUser', (request, response) => {
        controller.updateUser(request, response)
    }) 
}