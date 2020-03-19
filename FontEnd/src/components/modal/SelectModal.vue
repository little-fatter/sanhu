<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-10 16:48:34
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-18 10:57:46
 * @Description:  
 -->

<template>
  <a-modal
    v-model="show"
    :width="width"
    :mask-closable="false"
    :footer="null"
    :closable="false"
    :body-style="{ padding: '0 20px 20px 20px' }"
  >
    <div class="select-modal" :style="{ height: `${height}px` }">
      <div class="select-modal-header">
        <slot name="title">
          <span class="select-modal-title">
            {{ title }}
            <!-- <a-divider>{{ title }}</a-divider> -->
          </span>
        </slot>
        <span class="select-modal-close" @click="close">
          <a-icon type="close" />
        </span>
      </div>
      <slot name="other" />
      <div class="select-modal-body scroll-small">
        <slot />
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  props: {
    // 模态宽度
    width: {
      type: Number,
      default: 900
    },
    height: {
      type: Number,
      default: 400
    },
    // 模态标题
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.show = true
    },
    close () {
      this.show = false
    }
  }
}
</script>

<style scoped lang="less">
.select-modal {
  display: flex;
  flex-direction: column;
  &-header {
    position: relative;
    height: 60px;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
  }
  &-title {
    color: #222328;
    &:after,
    &:before {
      content: '';
      width: 50px;
      border-top: 1px #63687b solid;
      display: inline-block;
      vertical-align: middle;
    }
    &:before {
      margin-right: 10px;
    }
    &:after {
      margin-left: 10px;
    }
  }
  &-close {
    position: absolute;
    display: block;
    width: 50px;
    height: 50px;
    top: 0;
    right: -20px;
    font-size: 14px;
    line-height: 50px;
    cursor: pointer;
    color: #A1A6BA;
  }
  &-body {
    height: 0;
    flex: 1;
    overflow-y: auto;
  }
}
</style>