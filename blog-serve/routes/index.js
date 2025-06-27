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
}