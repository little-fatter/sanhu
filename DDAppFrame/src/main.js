import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/'
import '@/assets/css/global.less' // 样式初始化
// 加载Vue第三方组件
import '@/utils/lazy_use'
import '@/utils/directive'// 公共指令
import '@/utils/filter' // 公共管道
import '@/permission.js'
import Navigation from 'vue-navigation'
import * as dd from 'dingtalk-jsapi'
// import Router from 'vue-router'
import { autoLogin } from './service/currentUser.service'
import { ddJsApiAuth } from './service/ddJsApi.service'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.config.productionTip = false
// 引入路由记录插件
Vue.use(Navigation, {
  router,
  moduleName: 'navigation',
  keyName: 'AS'
})
dd.ready(function () {
  // 保存钉钉对象，后续直接使用this.$dd来访问钉钉jsapi
  Vue.prototype.$dd = dd
  /** 实现免登录 */
  autoLogin(true).then(() => {
    // 实现钉钉jsApi鉴权
    ddJsApiAuth().then(() => {
      console.log('钉钉jsApi鉴权成功')
      new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
    })
  }).catch((err) => {
    console.log('免登录错误', err)
  })
})
