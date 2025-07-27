// 引入依赖
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cors = require('cors');
const config = require('./config/default');

// 创建 Express 实例
const app = express();

// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 解决跨域问题
app.use(cors());

// 静态资源服务（优先处理静态文件）
app.use(express.static(path.join(__dirname, 'data')));
app.use(express.static(path.join(__dirname, 'dist')));

// 设置视图引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 引入路由模块（确保路由路径格式正确）
require('./routes')(app);
require('./routes/files')(app);
require('./routes/email')(app);
require('./routes/weather')(app);

// Vue Router history 模式支持（放在所有路由最后）
// 修复：使用更安全的路径匹配，避免与后端路由冲突
app.get(/^\/(?!api).*/, (req, res) => { // 排除以/api开头的请求
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(404).send('页面未找到');
    }
  });
});

// 启动服务器
app.listen(config.port, () => {
  console.log(`服务器已启动，监听端口：${config.port}`);
});