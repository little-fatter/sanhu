import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap, asyncRouterMap } from '@/config/router.config'

Vue.use(Router)

/**
 * 加载应用的路由
 */
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL, // 应用的基路径
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})
