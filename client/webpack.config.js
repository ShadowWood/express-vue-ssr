const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './src/main.js',
  //定义webpack输出的文件，我们在这里设置了
  // 让打包后生成的文件放在dist文件夹下的build.js文件中
  output: {
    path: path.join(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    loaders: [
      //转化ES6语法
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      //图片转化，小于8K自动转化为base64的编码
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        vue: {
          loaders: {
            js: 'babel'
          }
        }
      }
    })
  ],
  resolve: {
    // require时省略的扩展名，如：require('app') 不需要app.js
    extensions: ['', '.js', '.vue'],
    // 别名，可以直接使用别名来代表设定的路径以及其他
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/components'),
      'vue$': 'vue/dist/vue.common.js'
    }
  }
}