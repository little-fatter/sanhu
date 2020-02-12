import Vue from 'vue'
import {
  DEFAULT_COLOR
} from '@/store/mutation-types'

/**
 * 定义store模块：应用基础app
 * 主要用于控制主题色
 */
const app = {
  state: {
    // 屏幕类型
    device: 'desktop',
    // 设置主题色
    color: null
  },
  mutations: {
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_COLOR: (state, color) => {
      Vue.ls.set(DEFAULT_COLOR, color)
      state.color = color
    }
  },
  actions: {
    ToggleDevice ({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleColor ({ commit }, color) {
      commit('TOGGLE_COLOR', color)
    }
  }
}

export default app
