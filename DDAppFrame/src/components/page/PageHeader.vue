<template>
  <div class="page-header" id="pageHeader">
    <van-nav-bar
      ref="pageheader"
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      :left-arrow="leftArrow"
      :fixed="fixed"
      :border="border"
      :z-index="zIndex"
      @click-left="handleClickLeft"
      @click-right="handleClickRight"
    >
      <template v-if="this.$slots.title">
        <template slot="title">
          <slot name="title"></slot>
        </template>
      </template>
      <template v-if="this.$slots.left">
        <template slot="left">
          <slot name="left"></slot>
        </template>
      </template>
      <template v-if="this.$slots.right">
        <template slot="right">
          <slot name="right"></slot>
        </template>
      </template>

    </van-nav-bar>
  </div>
</template>

<script>
import { isNotEmpty } from '../../utils/util'
import { isFirstLevelMenu } from '../../utils/helper/menu.helper'
export default {
  name: 'PageHeader',
  props: {
    /** 自定义标题，如不传，则从路由自动读取 */
    customerTitle: {
      type: String,
      default: ''
    },
    /** 左侧信息 */
    customerLeftText: {
      type: String,
      default: ''
    },
    /** 右侧信息 */
    customerRightText: {
      type: String,
      default: ''
    },
    /** 自定义是否显示左侧箭头 */
    customerLeftArrow: {
      type: Boolean,
      default: null
    },
    /** 是否固定在顶部 */
    fixed: {
      type: Boolean,
      default: false
    },
    /** 是否显示下边框 */
    border: {
      type: Boolean,
      default: true
    },
    /** 元素 z-index */
    zIndex: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      title: '',
      leftArrow: false,
      leftText: '',
      rightText: ''
    }
  },
  created () {
    this.changeData()
  },
  mounted () {
    this.setStatusBarStyle()
    this.fixStatusBar()
  },
  watch: {
    $route: 'changeData'
  },
  methods: {
    setStatusBarStyle () {
      if (this.$acApi) {
        this.$acApi.setStatusBarStyle({
          style: 'light',
          color: '#1875F0'
        })
      }
    },
    changeData () {
      const currentPath = this.$route.path
      if (isNotEmpty(this.customerTitle)) {
        this.title = this.customerTitle
      } else {
        if (isNotEmpty(this.$route.meta.pageTitle)) {
          this.title = this.$route.meta.pageTitle
        } else {
          this.title = this.$route.meta.title
        }
      }
      if (isNotEmpty(this.customerRightText)) {
        this.rightText = this.customerRightText
      }

      if (isNotEmpty(this.customerLeftText) || isNotEmpty(this.customerLeftArrow)) {
        this.leftText = this.customerLeftText
        this.leftArrow = this.customerLeftArrow
      } else {
        if (!isFirstLevelMenu(currentPath)) {
          this.leftArrow = true
          this.leftText = '返回'
        } else {
          this.leftArrow = false
          this.leftText = ''
        }
      }
    },
    handleClickLeft () {
      this.$emit('handleHeaderLeft')
    },
    handleClickRight () {
      this.$emit('handleHeaderRight')
    },
    fixStatusBar () {
      if (this.$acApi && this.$acApi.statusBarAppearance) {
        const appDom = document.querySelector('#pageHeader')
        this.$api.fixStatusBar(appDom)
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.page-header
{
   position: fixed;
   top:0;
   left: 0;
   width: 100%;
   z-index: 999999999;
   background-color: #1875F0;
   box-sizing:border-box;
   .px2rem(height, 44);
   .van-nav-bar
   {
       background-color: #1875F0;
       .px2rem(height, 44);
       .px2rem(line-height, 44);
       .van-nav-bar__title
       {
          color: #FFFFFF;
          font-size: 25px;
       }

       .van-icon
       {
          color: #FFFFFF;
          font-size: 25px;
       }

       .van-nav-bar__text
       {
          color: #FFFFFF;
          font-size: 25px;
       }
   }

   .van-nav-bar__text:active
   {
       background-color: #1875F0;
   }
}
</style>
