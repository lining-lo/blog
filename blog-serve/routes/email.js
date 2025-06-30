const nodemailer = require('nodemailer');

// 创建 SMTP 传输器
const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // 使用 SSL
    auth: {
        user: '2092576148@qq.com',
        pass: 'iafayigtmiphdaba', // QQ 邮箱的 SMTP 授权码
    },
});


//暴露接口
module.exports = function (app) {
    app.post('/sendEmail', (request, response) => {
        //生成随机4位数
        const p_code = Math.floor(Math.random() * 9000 + 1000)
        //获取参数
        const data = request.body
        //邮件选项
        const mailOptions = {
            from: '2092576148@qq.com',        // 发件人邮箱
            to: data.email,         // 收件人邮箱（多个邮箱用逗号分隔）
            subject: '来自 ling-lo 的验证码',     // 邮件主题
            text: "验证码：" + p_code,           // 纯文本内容
            html: `您的验证码为：<strong>${p_code}</strong><br/>如果不是本人操作请忽略`, // HTML 内容
        };
        //发送邮件
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('发送邮件失败:', error);
            } else {
                console.log('邮件发送成功:', info.response);
            }
        });
        //返回结果
        response.send({
            code: 200,
            message: p_code
        })
    })
}