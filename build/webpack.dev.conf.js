'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge').merge
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-source-map is faster for development
  devtool: config.dev.devtool,

  watchOptions: {
    ignored: /node_modules/,
  },

  // these devServer options should be customized in /config/index.js
  devServer: {
    client: {
      logging: 'info',
      overlay: config.dev.errorOverlay ? {
        errors: true,
        warnings: false,
      } : false,
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    allowedHosts: 'all',
    host: '127.0.0.1',
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    static: {
      directory: path.join(__dirname, '../static'),
      publicPath: config.dev.assetsPublicPath,
      watch: {
        ignored: /node_modules/,
      },
    },
    proxy: Object.keys(config.dev.proxyTable).length > 0 ? config.dev.proxyTable : undefined,
  },
  optimization: {
    emitOnErrors: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
  ]
})

module.exports = devWebpackConfig
