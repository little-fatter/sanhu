<template>
  <div id="app">
    <!-- 全局组件 -->
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import { ddgetMapLocation } from './service/ddJsApi.service'
import { savePatrolPoints } from './api/regulatoryApi'
// import { isHomePageByCurrentPath } from './utils/helper/menu.helper'
export default {
  name: 'App',
  data () {
    return {
      transitionName: '',
      interval: null,
      clickCount: 0,
      time1: null,
      time2: null,
      currentPath: ''
    }
  },
  created () {
    this.currentPath = this.$route.path
    // 记录路由,动态给定动画
    this.$navigation.on('forward', to => {
      this.transitionName = to.route.meta.isTransition ? 'slide-left' : ''
    })
    this.$navigation.on('back', (to, from) => {
      if (to.route.meta.isTransition || from.route.meta.isTransition) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = ''
      }
    })
  },
  computed: {

  },
  mounted () {
    this.init()
  },
  watch: {
    $route: 'changeRoute'
  },
  methods: {
    init () {
      ddgetMapLocation().then(location => {
        savePatrolPoints(location.longitude, location.latitude).then((res) => {
          console.log('同步经纬度成功')
        })
      })
    },
    keybackEventListener () {
      // if (isAppEnv()) {
      //   const that = this
      //   that.$acApi.addEventListener({
      //     name: 'keyback'
      //   }, function (ret, err) {
      //     const frameNameForFullScreen = that.$api.getStorage('frameNameForFullScreen')
      //     const externalWebOpen = that.$api.getStorage('frm_ExternalWeb')
      //     if (isNotEmpty(frameNameForFullScreen)) {
      //       that.$acApi.execScript({
      //         frameName: frameNameForFullScreen,
      //         script: 'fullScreen(false);'
      //       })
      //     } else if (isNotEmpty(externalWebOpen)) {
      //       that.$api.rmStorage('frm_ExternalWeb')
      //       that.$acApi.closeFrame({
      //         name: 'frm_ExternalWeb'
      //       })
      //     } else if (isHomePageByCurrentPath(that.currentPath) === true) {
      //       that.exitApp()
      //     } else {
      //       that.$router.back()
      //     }
      //   })
      // }
    },
    changeRoute () {
      this.currentPath = this.$route.path
    }
  }
}
</script>

<style lang="less" scope>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}
.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

#__vconsole .vc-switch {
	right: 10px !important;
	bottom: 50% !important;
  background-color: #aad6aa !important;
  z-index: 1000000000 !important;
  position:fixed !important;
}
</style>
