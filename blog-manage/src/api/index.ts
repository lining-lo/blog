import http from "../utils/request";

export default {
    /**
    * 文章相关
    */
    // 分页获取文章
    selectArticlePage(data: any) {
        return http.post('/selectArticlePage', data)
    },

    /**
    * 分类（标签）相关
    */
    // 分页获取标签
    selectLabelPage(data: any) {
        return http.post('/selectLabelPage', data)
    },
}