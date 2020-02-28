<template>
  <!-- <page-layout :desc="description" :title="getTitle" :link-list="linkList" :search="search" :tabs="tabs">
    <div slot="extra" class="extra-img">
      <img v-if="typeof extraImage !== 'undefined'" :src="extraImage"/>
    </div>
    <route-view ref="content"></route-view>
  </page-layout> -->
  <route-view ref="content"></route-view>

</template>

<script>
import PageLayout from '../page/PageLayout'
import RouteView from './RouteView'

/**
 * 通用页面布局组件
 */
export default {
  name: 'PageContent',
  components: {
    RouteView,
    PageLayout
  },
  data () {
    return {
      title: '', // 页面显示标题，一般是菜单名称
      description: '', // 页面功能描述
      linkList: [],
      extraImage: '',
      search: false, // 是否需要搜索组件
      tabs: {}
    }
  },
  mounted () {
    this.getPageHeaderInfo()
  },
  updated () {
    this.getPageHeaderInfo()
  },
  computed: {

    getTitle () {
      return this.$route.meta.title
    }

  },
  methods: {
    getPageHeaderInfo () {
      const that = this
      that.$nextTick(() => {
        that.title = this.$route.meta.title
        const refContent = that.$refs.content
        const content = refContent.getContent()
        if (content) {
          that.description = content.description
          that.linkList = content.linkList
          that.extraImage = content.extraImage
          that.search = content.search === true
          that.tabs = content.tabs
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .extra-img {
    margin-top: -60px;
    text-align: center;
    width: 195px;

    img {
      width: 100%;
    }
  }

  .mobile {
    .extra-img{
      margin-top: 0;
      text-align: center;
      width: 96px;

      img{
        width: 100%;
      }
    }
  }
</style>
