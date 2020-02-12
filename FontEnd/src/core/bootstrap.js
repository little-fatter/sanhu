import Vue from 'vue'
import store from '@/store/'
import {
  DEFAULT_COLOR
} from '@/store/mutation-types'
import config from '@/config/defaultSettings'

/**
 * 应用启动函数,主要用于加载系统配置
 */
export default function Initializer () {
  store.commit('TOGGLE_COLOR', Vue.ls.get(DEFAULT_COLOR, config.primaryColor))
}
