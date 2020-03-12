<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 17:01:11
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 17:39:22
 * @Description:  子项
 -->

<template>
  <div class="item">
    <div class="item-cover" :style="genImgBackground(cover)"></div>
    <div class="item-main">
      <div class="item-main-header">
        <span class="item-title" :title="title">
          <slot name="title">{{ title }}</slot>
        </span>
        <slot name="headerEnd" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { genImgBackground } from '@/utils/util'

export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 封面
    cover: {
      type: String,
      default: ''
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
