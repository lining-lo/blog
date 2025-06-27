import http from "../utils/request";

export default {
    /**
     * 评论相关
     */
    // 新建评论
    insertComment(data:any) {
        return http.post('/insertComment', data)
    },
    // 分页查询评论
    findCommentPage(data:any) {
        return http.post('/findCommentPage', data)
    },

    /**
     * 留言墙相关
     */
    // 新建墙
    insertWall(data:any) {
        return http.post('/insertWall', data)
    },
    // 分页查询墙
    selectWallPage(data:any) {
        return http.post('/selectWallPage', data)
    },
}