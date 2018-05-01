const webpack = require('webpack')
let baseConfig = require('./webpack.base')
let DefinePlugin = webpack.DefinePlugin   // webpack内置插件，助于浏览器区分环境

// 为了确保输出的值是一个string，需要在“”外再加一个’‘，或者使用JSON.stringify转string
baseConfig.plugins.push(new DefinePlugin({
  "process.env":'"development"'
}))

// 开发环境，需要起服务，不用进行代码压缩
module.exports = {
  ...baseConfig,
  devServer:{
    historyApiFallback: true,  //阻止404页面
    inline:true,        // 实时更新
    open:true,
    port:3006, 
    noInfo:true // 隐藏过多的命令行信息
  },
  devtool:"eval-source-map"
}