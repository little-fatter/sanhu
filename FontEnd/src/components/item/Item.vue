<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 17:01:11
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 11:07:03
 * @Description:  子项
 -->

<template>
  <div class="item">
    <div class="item-cover" :style="genImgBackground(cover)" v-if="!hideCover"></div>
    <div class="item-main">
      <div class="item-main-header" v-if="!hideHeader">
        <span class="item-title" :title="title" :class="{ ellipsis }">
          <slot name="title">{{ title }}</slot>
        </span>
        <slot name="headerEnd" />
      </div>
      <div class="item-main-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { genImgBackground } from '@/utils/util'

export default {
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 封面
    cover: {
      type: String,
      default: ''
    },
    // 隐藏封面
    hideCover: {
      type: Boolean,
      default: false
    },
    // 隐藏标题栏
    hideHeader: {
      type: Boolean,
      default: false
    },
    // 省略号
    ellipsis: {
      type: Boolean,
      default: true
    }
  },
  data () {
    this.genImgBackground = genImgBackground
    return {}
  }
}
</script>

<style scoped lang="less">
@import './item.less';
</style>
