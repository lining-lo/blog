import http from "../utils/request";

export default {
    //新建留言/照片
    insertWall(data:any) {
        return http.post('/insertWall', data)
    },
}