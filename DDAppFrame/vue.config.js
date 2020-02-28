const WebpackOnBuildPlugin = require('on-build-webpack')
const path = require('path')
const fs = require('fs')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

const appname = 'DDApp' // 项目文件名

const env = process.env.NODE_ENV

const isProduction = env !== 'development'

module.exports = {
  publicPath: '/sh',
  outputDir: appname, // 运行时生成的生产环境构建文件的目录(默认""dist""，构建之前会被清除)
  assetsDir: 'public', // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认"")
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  filenameHashing: true, // 是否生产文件名Hash
  pages: {
    // pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      // 除了 entry 之外都是可选的
      entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 apiCloud/index.html 的输出
      title: 'DDAppFrame', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
      chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk
    }
  },
  lintOnSave: false, // 是否在保存的时候检查
  productionSourceMap: !isProduction, // 生产环境是否生成 sourceMap 文件
  // css配置
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {
      less: {
        modifyVars: {
        }
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  // webpack配置
  chainWebpack: config => {
    config.entry('index').add('@babel/polyfill') // 添加babel-poiyfill

    config.resolve.alias
      .set('@$', path.join(__dirname, 'src'))
  },
  configureWebpack: config => {
    config.plugins = config.plugins.concat([
      // 删除build时旧的文件
      new WebpackOnBuildPlugin(function (stats) {
        try {
          const newlyCreatedAssets = stats.compilation.assets
          const unlinked = []
          const files = fs.readdirSync(path.resolve(`./${appname}/`))
          if (files.length) {
            // 过滤一下js和CSS文件
            const jsFiles = files.filter(f => /.*(\.js|\.json|\.css)$/.test(f))
            jsFiles.forEach(file => {
              if (!newlyCreatedAssets[file]) {
                // 删除文件
                fs.unlinkSync(path.resolve(`./${appname}/${file}`))
                unlinked.push(file)
              }
            })
            if (unlinked.length > 0) {
              console.log('删除文件: ', unlinked)
            }
          }
        } catch (ex) {

        }
      })
    ])
  },
  // vue-loader配置
  // vueLoader: {},
  // pwa插件配置
  pwa: {},
  // webpack-dev-server配置
  devServer: {
    // 配置开发环境代理
    proxy: {
      '/framework': {
        target: 'http://localhost:8090/framework',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/framework': ''
        }
      },
      '/filesystem': {
        target: 'http://localhost:8090/FileSystem',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/filesystem': ''
        }
      }
    }
  },
  transpileDependencies: ['swiper', 'dom7', 'ssr-window'],
  // 第三方插件配置
  pluginOptions: {}
}
