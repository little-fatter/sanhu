/**
 * 定义自定义指令
 */
import Vue from 'vue'
import { getCurrentUserPermissions } from '../service/currentUser.service'

/**
 * 功能权限指令
 * 指令用法：
 *  - 在需要控制功能级别权限的组件上使用 v-auth="permissionCode" , 如下：
 *    <a-button v-auth="order-list-add">新增订单</a-button>
 *    <a v-auth="order-list-edit" @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *
 */
Vue.directive('auth', {
  bind: function (el, binding, vnode) {
    const permissionCode = binding.value
    const permissions = getCurrentUserPermissions()
    if (!permissions.includes(permissionCode)) {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
})

Vue.directive('focusEvent', {
  inserted: function (el, binding, vnode) {
    console.log('el', el)
    el.addEventListener('focus', function () {
      console.log('focus')
    })
    el.addEventListener('blur', function () {
      console.log('blur')
    })
  }
})
