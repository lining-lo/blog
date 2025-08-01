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
     * 点赞相关
     */
    // 新建点赞
    app.post('/insertPraise', (request, response) => {
        controller.insertPraise(request, response)
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
    // 根据用户名和邮箱查找用户
    app.post('/findUserByUserNameAndEmai', (request, response) => {
        controller.findUserByUserNameAndEmai(request, response)
    })
    // 根据邮箱和用户名修改密码
    app.post('/updatePasswordByEmail', (request, response) => {
        controller.updatePasswordByEmail(request, response)
    })

    /**
     * 友链相关相关
     */
    // 新建友链
    app.post('/insertLink', (request, response) => {
        controller.insertLink(request, response)
    })
    // 分页查询友链
    app.post('/selectLinkPage', (request, response) => {
        controller.selectLinkPage(request, response)
    })

    /**
     * 图库相关
     */
    // 分页获取图库
    app.post('/selectAlbumPage', (request, response) => {
        controller.selectAlbumPage(request, response)
    })

    /**
     * 说说相关
     */
    // 分页获取说说
    app.post('/selectDiaryPage', (request, response) => {
        controller.selectDiaryPage(request, response)
    })

    /**
     * 收藏相关
     */
    // 新建收藏
    app.post('/insertFavorites', (request, response) => {
        controller.insertFavorites(request, response)
    })
    // 分页查询收藏
    app.post('/selectFavoritesPage', (request, response) => {
        controller.selectFavoritesPage(request, response)
    })

    /**
     * 文章相关
     */
    // 分页查询文章
    app.post('/selectArticlePage', (request, response) => {
        controller.selectArticlePage(request, response)
    })
    // 分页查询文章
    app.post('/selectArticleById', (request, response) => {
        controller.selectArticleById(request, response)
    })

    /**
     * 网站信息相关
     */
    // 获取网站信息
    app.post('/selectInfo', (request, response) => {
        controller.selectInfo(request, response)
    })

    /**
     * 分类（标签）相关
     */
    // 分页获取标签
    app.post('/selectLabelPage', (request, response) => {
        controller.selectLabelPage(request, response)
    })

    /**
     * 音乐相关
     */
    // 分页获取音乐
    app.post('/selectMusicPage', (request, response) => {
        controller.selectMusicPage(request, response)
    })
}