const db = require('../lib/db')
/**
 * 评论相关
 */
// 新建评论
exports.insertComment = async (request, response) => {
    const data = request.body
    await db.insertComment([data.id, data.type, data.type_id, data.user_id, data.user_name, data.user_type, data.user_imgurl, data.createdate, data.content, data.replier_id, data.replier_name]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 分页查询评论
exports.findCommentPage = async (request, response) => {
    const data = request.body
    await db.findCommentPage(data.type_id, data.type, data.page, data.pagesize).then(result => {
        response.send({
            code: 200,
            message: result
        })
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
            result[i].isPraise = await db.isPraise([result[i].id, data.user_id, data.user_type])
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

/**
 * 点赞相关
 */
// 新建点赞
exports.insertPraise = async (request, response) => {
    const data = request.body
    await db.insertPraise([data.id, data.type_id, data.user_id, data.user_type, data.createdate]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

/**
 * 用户相关
 */
// 新建用户
exports.insertUser = async (request, response) => {
    const data = request.body
    await db.insertUser([data.id, data.username, data.password, data.createdate, data.imgurl]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 根据用户名查找用户
exports.findUserByUserName = async (request, response) => {
    const data = request.body
    await db.findUserByUserName([data.username]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 用户登录
exports.login = async (request, response) => {
    const data = request.body
    await db.login([data.username, data.password]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 获取ip地址
exports.getIp = async (request, response) => {
    response.send({
        code: 200,
        message: request.ip
    })
}
// 修改用户信息
exports.updateUser = async (request, response) => {
    const data = request.body
    data.imgurl = data.imgurl ? data.imgurl : ''
    await db.updateUser([data.username, data.password, data.imgurl, data.permission, data.createdate, data.email, data.id]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 根据用户名和邮箱查找用户
exports.findUserByUserNameAndEmai = async (request, response) => {
    const data = request.body
    await db.findUserByUserNameAndEmai([data.username, data.email]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 根据邮箱和用户名修改密码
exports.updatePasswordByEmail = async (request, response) => {
    const data = request.body
    await db.updatePasswordByEmail([data.password, data.username, data.email]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

/**
 * 友链相关相关
 */
// 新建友链
exports.insertLink = async (request, response) => {
    const data = request.body
    await db.insertLink([data.id, data.name, data.introduction, data.cover, data.url, data.createdate]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
// 分页查询友链
exports.selectLinkPage = async (request, response) => {
    const data = request.body
    await db.selectLinkPage([(data.page - 1) * data.pagesize, data.pagesize]).then(async result => {
        // 返回结果
        response.send({
            code: 200,
            message: result
        })
    })
}

/**
 * 图库相关
 */
// 分页获取图库
exports.selectAlbumPage = async (request, response) => {
    const data = request.body
    await db.selectAlbumPage([(data.page - 1) * data.pagesize, data.pagesize]).then(async result => {
        // 返回结果
        response.send({
            code: 200,
            message: result
        })
    })
}

/**
 * 说说相关
 */
// 分页获取说说
exports.selectDiaryPage = async (request, response) => {
    const data = request.body
    await db.selectDiaryPage([(data.page - 1) * data.pagesize, data.pagesize]).then(async result => {
        // 查询各反馈总数据
        for (let i = 0; i < result.length; i++) {
            // 是否点赞
            result[i].isPraise = await db.isPraise([result[i].id, data.user_id, data.user_type])
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