// HeaderBar路由数据
export const headerbarRoutes = [
    { path: 'home', name: '首页', icon: 'Discount', color: '#ffe394' },
    { path: 'timeline', name: '时间轴', icon: 'AlarmClock', color: '#4d8ada' },
    { path: 'favorites', name: '收藏', icon: 'Histogram', color: '#bf8a9e' },
    { path: 'album', name: '相册', icon: 'Money', color: '#caa7f7' },
    { path: 'diary', name: '说说', icon: 'Lollipop', color: '#eb254b' },
    { path: 'treehole', name: '树洞', icon: 'Bicycle', color: '#ee6c2a' },
    { path: 'friend', name: '友链', icon: 'Ship', color: '#a8e68a' },
    { path: 'message', name: '留言墙', icon: 'ChatDotRound', color: '#3873f0' },
]

// 轮播图
export const bannerImg = [
    [
        "url(src/assets/images/light-timeline.png)",
        "url(src/assets/images/light-favorites.png)",
        "url(src/assets/images/light-album.png)",
        "url(src/assets/images/light-diary.png)",
        "url(src/assets/images/light-treehole.png)",
        "url(src/assets/images/light-friend.png)",
        "url(src/assets/images/light-message.png)"
    ],
    [
        "url(src/assets/images/dark-timeline.png)",
        "url(src/assets/images/dark-favorites.png)",
        "url(src/assets/images/dark-album.png)",
        "url(src/assets/images/dark-diary.png)",
        "url(src/assets/images/dark-treehole.png)",
        "url(src/assets/images/dark-friend.png)",
        "url(src/assets/images/dark-message.png)"
    ],
]

// 标签颜色
export const labelColors = [
    "rgba(127, 29, 29, 0.95)", // 深红
    "rgba(133, 77, 14, 0.94)", // 深橙
    "rgba(133, 133, 10, 0.93)", // 深黄
    "rgba(22, 101, 15, 0.95)", // 深绿
    "rgba(22, 99, 99, 0.92)", // 深青
    "rgba(21, 49, 154, 0.94)", // 深蓝
    "rgba(76, 29, 149, 0.93)", // 深紫
    "rgba(131, 24, 129, 0.95)", // 深粉
    "rgba(64, 12, 12, 0.96)", // 暗红
    "rgba(66, 32, 5, 0.94)", // 暗橙
    "rgba(66, 66, 5, 0.93)", // 暗黄
    "rgba(11, 51, 8, 0.95)", // 暗绿
    "rgba(11, 50, 50, 0.92)", // 暗青
    "rgba(10, 24, 77, 0.94)", // 暗蓝
    "rgba(38, 15, 74, 0.93)", // 暗紫
    "rgba(65, 12, 64, 0.95)", // 暗粉
    "rgba(180, 38, 38, 0.94)", // 亮红
    "rgba(184, 107, 20, 0.93)", // 亮橙
    "rgba(184, 184, 14, 0.92)", // 亮黄
    "rgba(30, 138, 21, 0.95)", // 亮绿
    "rgba(30, 136, 136, 0.93)", // 亮青
    "rgba(29, 68, 209, 0.94)", // 亮蓝
    "rgba(105, 40, 206, 0.93)", // 亮紫
    "rgba(180, 33, 177, 0.95)", // 亮粉
    "rgba(96, 18, 18, 0.96)", // 中红
    "rgba(99, 48, 8, 0.94)", // 中橙
    "rgba(99, 99, 8, 0.93)", // 中黄
    "rgba(16, 77, 12, 0.95)", // 中绿
    "rgba(16, 76, 76, 0.92)", // 中青
    "rgba(15, 36, 114, 0.94)", // 中蓝
    "rgba(57, 22, 111, 0.93)", // 中紫
    "rgba(97, 18, 95, 0.95)"  // 中粉
  ];

// 留言墙标签
export const messageLabels =  ['留言', '目标', '理想', '过去', '将来', '爱情', '亲情', '友情', '秘密', '信条', '无题'];

// 留言卡片背景颜色
export const messageCardColors = [
    'rgba(252,175,162,0.30)',
    'rgba(255,227,148,0.30)',
    'rgba(146,230,245,0.30)',
    'rgba(168,230,138,0.30)',
    'rgba(202,167,247,0.30)',
    'rgba(212,212,212,0.30)'
]

// 创建留言卡片的颜色选项
export const createMessageCardColors = [
    'rgba(252,175,162,1)',
    'rgba(255,227,148,1)',
    'rgba(146,230,245,1)',
    'rgba(168,230,138,1)',
    'rgba(202,167,247,1)',
    'rgba(212,212,212,1)'
]

// 游客头像背景
export const portrait = [
    'linear-gradient(180deg,#FFA9D9 0%,#E83D3D 100%)',
    'linear-gradient(180deg,#FFA7EB 0%,#F026A8 100%)',
    'Linear-gradient(180deg,#F5A8FF 0%,#BF23E5 100%)',
    'linear-gradient(180deg,#DFA1FF 0%,#9A36F0 100%)',
    'linear-gradient(180deg,#C9AAFF 0%,#6D3CF5 100%)',
    'linear-gradient(180deg,#9EAAFF 0%,#3846F4 100%)',
    'linear-gradient(180deg,#8CD8FF 0%,#2A6AF0 100%)',
    'linear-gradient(180deg,#7BE7FF 2%,#1E85E2 100%)',
    'linear-gradient(180deg,#92FDFF 0%,#14B2DD 100%)',
    'linear-gradient(180deg,#89FED8 0%,#18C997 100%)',
    'linear-gradient(180deg,#D7FFA7 0%,#5ED52A 100%)',
    'linear-gradient(180deg,#FFED48 0%,#FD9E16 100%)',
    'linear-gradient(180deg,#FFDC83 0%,#F88816 100%)',
    'linear-gradient(180deg,#FFBA8D 1%,#EB6423 100%)',
];

// 图片分类
export const photoType = [
    {
        title:'风景',
        msg:'记录沿途的风景',
        cover:'src/assets/images/scenery.png'
    },
    {
        title:'美食',
        msg:'唯有美食不可辜负',
        cover:'src/assets/images/foot.png'

    },
    {
        title:'日常',
        msg:'随手拍拍~~',
        cover:'src/assets/images/daily.png'
    },
    {
        title:'二次元',
        msg:'动漫、手办、cosplay',
        cover:'src/assets/images/erciyuan.png'
    },
]