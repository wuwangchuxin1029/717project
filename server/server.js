// 搭建静态服务器
const express = require('express')  //引入express
const bodyParser = require('body-parser')  // 引入express内置中间件
const api = require('./api')//引入api.js文件

const app = express() //调用express

app.use(bodyParser.json())

// 设置跨域
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:3006") //支持跨域
    res.header("Access-Control-Allow-Headers","Content-Type,Token") // 允许包含请求头字段
    res.header("Content-Type","application/json;charset=utf-8") //设置响应的数据类型
    next()
})


api(app) // 调用api方法，启动后端接口

// 监听9000端口(注意这个端口号不要与项目的端口号冲突)
app.listen(9900,function(){
  console.log('server listen 9900,666')
})