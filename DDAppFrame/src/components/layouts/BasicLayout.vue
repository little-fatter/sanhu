<template>
  <div>
    <div class="content">
      <route-view></route-view>
    </div>

    <page-footer
      v-if="isNeedPageFooter"
    >
    </page-footer>
    <!-- <footer class="footer"></footer> -->
  </div>
</template>

<script>
/**
 * 基础布局组件
 */
import RouteView from './RouteView.vue'
import PageFooter from '../page/PageFooter.vue'
import { isEmpty, isNotEmpty } from '../../utils/util'
import appConfig from '@/config/app.config'
import * as dd from 'dingtalk-jsapi'
import { ddsetNavigateSingeRight, ddAlert } from '../../service/ddJsApi.service'
export default {
  name: 'BasicLayout',
  components: {
    RouteView,
    PageFooter
  },
  data () {
    return {
      isNeedPageFooter: appConfig.isNeedMenuLayout
    }
  },
  created () {
    this.changeRoute()
  },
  mounted () {
    this.init()
  },
  watch: {
    $route: 'changeRoute'
  },
  methods: {
    init () {
      function refreshCall () {
        window.location.reload()
      }
      ddsetNavigateSingeRight('刷新', refreshCall)
    },
    handleHeaderLeft () {
      this.$router.back()
    },
    handleHeaderRight () {
    },
    changeRoute () {
      var title = ''
      if (isNotEmpty(this.$route.meta.pageTitle)) {
        title = this.$route.meta.pageTitle
      } else {
        title = this.$route.meta.title
      }
      this.$dd.biz.navigation.setTitle(
        {
          title: title
        }
      )
      if (appConfig.isNeedMenuLayout) {
        this.isNeedPageFooter = isEmpty(this.$route.meta.isNeedPageFooter) ? true : this.$route.meta.isNeedPageFooter
      }
      this.init()
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
// .content
// {
//   .px2rem(margin-top, 44);
// }

// .contentByAppearance
// {
//   .px2rem(margin-top, 64) !important;
// }
.footer
{
  .px2rem(height, 64);
}
</style>
