// import Vue from 'vue'
import { DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'

/**
 * 封装公共可用的组件mixin
 * 主要方便组件获取store中各种状态，并提供公共方法
 */
const mixin = {
  computed: {
    ...mapState({
      primaryColor: state => state.app.color
    })
  },
  methods: {

  }
}

/**
 * 封装公共可用的组件响应式屏幕类型mixin
 * 主要方便组件获取当前屏幕类型，判断是否PC,平板,手机
 */
const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

export { mixin, mixinDevice }
