const controller = require('../controller/dbServe')
module.exports = function (app) {
    /**
     * 留言墙相关
     */
    //新建留言/照片
    app.post('/insertWall', (request, response) => {
        controller.insertWall(request, response)
    })
}