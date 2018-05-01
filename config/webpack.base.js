// const webpack = require('webpack')

let dir = process.cwd()  // 获取当前工作目录
let baseConfig = {
  entry:{
    bundle:dir+'/src/main'
  }, 
  output: {
    path: dir+'/dist',
    filename: '[name].js'
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        use:['babel-loader']
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      },
      {
        test:/\.(eot|svg|ttf|woff)$/,
        use:['url-loader']
      },
      {
        test:/\.(jpg|png|gif|jpeg)$/,
        use:['url-loader']
      }
    ] 
  },
  plugins:[],
  resolve:{
    extensions:['.js','.jsx','.css','.sass','.scss']
  },

}
module.exports = baseConfig