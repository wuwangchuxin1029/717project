const webpack = require('webpack')
let baseConfig = require('./webpack.base')
let UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
let DefinePlugin = webpack.DefinePlugin   //webpack内置插件，助于浏览器区分环境

baseConfig.plugins.push(new UglifyJsPlugin())

// 为了确保输出的值是一个string，需要在“”外再加一个’‘，或者使用JSON.stringify转string
baseConfig.plugins.push(new DefinePlugin({
  "process.env":'"production"'
}))

// 生产环境，不用起服务，要进行代码分离与压缩
module.exports = {
  ...baseConfig
}