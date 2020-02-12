import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

/**
 * 定义应用的store
 */
export default new Vuex.Store({
  modules: {
    app
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
