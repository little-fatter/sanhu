import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import userMenu from './modules/userMenu'
import getters from './getters'

Vue.use(Vuex)

/**
 * 定义应用的store
 */
export default new Vuex.Store({
  modules: {
    user,
    userMenu
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
