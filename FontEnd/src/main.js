import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import '@/core/lazy_use' // 加载第三方VUE插件
import bootstrap from './core/bootstrap' // 应用启动服务
import '@/permission' // 入口路由权限控制
// import '@/core/icons'// 自定义图标
import '@/utils/directive'// 公共指令
import '@/utils/filter' // 公共管道
import '@/components/global.less'
import '@/assets/css/global.less' // 引用全局样式,覆盖默认样式
import print from './views/config/printer'
Vue.use(print)

console.log('当前环境', process.env.VUE_APP_CURRENTENV)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created () {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
