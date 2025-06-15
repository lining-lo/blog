//引入mock
import Mock from 'mockjs'

//留言卡片
export const messageCardsMock = Mock.mock({
    'data|20': [{
        //创建时间
        'moment': new Date(),
        //id
        "id|+1": 1,
        //userid
        'userid|+1': 10,
        //内容
        'message|24-96': '@cword',
        //label
        'label|0-10': 0,
        //name
        'name': '@cname',
        //like
        'like|0-120': 0,
        'comment|0-20': 0,
        //背景色
        'imgurl|0-4': 0,
        //是否撤销
        'revoke|0-20': 0,
        //是否举报
        'report|0-20': 0,
        'type': 0
    }]
})