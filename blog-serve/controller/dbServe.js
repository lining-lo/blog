const db = require('../lib/db')
/**
 * 留言墙相关
 */
//新建留言
exports.insertWall = async (request, response) => {
    const data = request.body
    await db.insertWall([data.id,data.label,data.color,data.content,data.user_id,data.user_type,data.user_name,data.createdate]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}