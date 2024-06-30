# 搭建个人博客

> docsify+Gitub Pages
>
> docsify官方文档：https://docsify.js.org/

## 遇到的报错

1.用` npm i docsify-cli -g `安装docsify-cli 一直安装不上，排查了之后才发现是：` 证书已过期 `

> 报错信息：request to https://registry.npm.taobao.org/docsify-cli failed, reason: certificate has expired
>
> 解决方法：直接使用`npm config set registry https://registry.npmmirror.com`



2.初始化项目` docsify init ./docs `报错，排查了之后才发现是：`没有权限`

> 报错信息：Cannot create directory `D:\blog\docs`: EPERM: operation not permitted, mkdir 'D:\blog\docs'
>
> 解决方法：用用户身份运行命令提示符



