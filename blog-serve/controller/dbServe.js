const db = require('../lib/db')
/**
 * 评论相关
 */
// 新建评论
exports.insertComment = async (request, response) => {
    const data = request.body
    await db.insertComment([data.id, data.type, data.type_id, data.user_id, data.user_name, data.user_type, data.createdate, data.content, data.replier_id]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 分页查询评论
exports.findCommentPage = async (request, response) => {
    const data = request.body

    await db.findCommentPage([data.type_id, (data.page - 1) * data.pagesize, data.pagesize]).then(result => {
        response.send({
            code: 200,
            message: result
        })
        console.log(result);
        
    })
}

/**
 * 留言墙相关
 */
// 新建墙
exports.insertWall = async (request, response) => {
    const data = request.body
    await db.insertWall([data.id, data.label, data.color, data.content, data.user_id, data.user_type, data.user_name, data.createdate]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 分页查询墙
exports.selectWallPage = async (request, response) => {
    const data = request.body
    await db.selectWallPage([(data.page - 1) * data.pagesize, data.pagesize]).then(async result => {
        // 查询各反馈总数据
        for (let i = 0; i < result.length; i++) {

            // 是否点赞
            result[i].isPraise = await db.isPraise([result[i].id, result[i].user_id, result[i].user_type])
            // 点赞总数
            result[i].praiseCount = await db.praiseCount([result[i].id])
            // 评论总数
            result[i].commentCount = await db.commentCount([result[i].id])
        }
        // 返回结果
        response.send({
            code: 200,
            message: result
        })
    })
}
