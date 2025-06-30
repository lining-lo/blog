//引入express
const express = require('express')
//引入path
const path = require('path')
//引入ejs
const ejs = require('ejs')
//引入cors
const cors = require('cors')
//引入配置文件
const config = require('./config/default')

//创建express实例
const app = express()

//解析数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//解决跨域
app.use(cors())

//引入路由
require('./routes')(app)
require('./routes/files')(app)
require('./routes/email')(app)

//设置静态资源位置
app.use(express.static(__dirname + '/data'))

//加入html视图
app.engine('html', ejs.__express)
app.set('view engine', 'html')


//监听端口，启动项目
app.listen(config.port, () => {
    console.log(`${config.port}端口监听中，项目启动`);
})