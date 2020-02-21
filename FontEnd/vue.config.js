const path = require('path')
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css', 'html']

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 判断是否开发环境
const isDev = process.env.NODE_ENV === 'development'

// vue.config.js
module.exports = {
  publicPath: '/',
  configureWebpack: config => {
    if (isDev) {
      return {
        devtool: 'source-map',
        plugins: [
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
        ]
      }
    } else {
      return {
        devtool: false,
        plugins: [
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          })
        ]
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
          'table-padding-vertical': '16px',
          'table-padding-horizontal': '16px',
          'menu-collapsed-width': '50px',
          'layout-header-height': '50px',
          'breadcrumb-last-item-color': '#1C7DFA'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // 配置开发环境代理
    proxy: {
      // 必须使用/easymock开头的接口才使用该代理
      '/easymock': {
        target: 'https://www.easy-mock.com/mock/5caacf05828c3a52184cd2a0/wjfrontframe',
        ws: false,
        changeOrigin: true,
        // 真实接口是/api开头的，使用pathRewrite将/gateway替换为/api
        pathRewrite: {
          '^/easymock': ''
        }
      },
      '/filesystem': {
        target: 'http://192.168.0.200:21771/FileSystem',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/filesystem': ''
        }
      }
    }
  },

  lintOnSave: undefined,
  transpileDependencies: []
}
