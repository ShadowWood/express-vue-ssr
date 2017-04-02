const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path');
const base = require('./webpack.base.config')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')

module.exports = merge(base, {
  target: 'node',
  devtool: '#source-map',
  entry: path.join(__dirname, '../src/entry-server.js'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  externals: Object.keys(require('../../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
})
