import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import appConfig from './config/app.config'
import getCurrentUser from './config/currentUser'
import { isNotEmpty } from './utils/util'

NProgress.configure({ showSpinner: false })

console.log('currentUser', getCurrentUser())

const whiteList = ['login']

/** 路由进入事件 */
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar

  if (isNotEmpty(getCurrentUser().userInfo)) {
    if (to.path === '/user/login') {
      next({ path: '/dashboard/workplace' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (isNotEmpty(appConfig.loginUrl)) {
      next({ path: appConfig.loginUrl })
    } else {
      if (whiteList.includes(to.name)) {
        // 在免登录白名单，直接进入
        next()
      } else {
        next({ path: '/user/login', query: { redirect: to.fullPath } })
        NProgress.done()
      }
    }
  }
})

/** 路由完成事件 */
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
