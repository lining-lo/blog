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

//树洞弹幕
export const treeholeMock = Mock.mock({
    'data|50': [{
        //id
        "id|+1": 0,
        //内容
        'message|2-20': '@cword',
        //背景色
        'imgurl|0-20': 0,
        //弹幕位置
        'top|60-700': 0,
        //弹幕的速度
        'animationDuration|8-18': 0
    }]
})