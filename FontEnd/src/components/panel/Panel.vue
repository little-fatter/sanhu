<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 11:21:49
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-13 11:07:43
 * @Description:  面板
 -->

<template>
  <div class="panel">
    <div class="panel-header" v-if="!hideHeader">
      <slot name="title">
        <span class="panel-title">{{ title }}</span>
      </slot>
      <slot name="headerEnd" />
    </div>
    <div class="panel-body" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 隐藏头部
    hideHeader: {
      type: Boolean,
      default: false
    },
    // 容易样式
    bodyStyle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="less">
.panel {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  &-header {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid #DCDEE2;
  }
  &-title {
    width: 0;
    flex: 1;
    font-size: 16px;
    color: #222328;
  }
  &-body {
    padding: 20px;
  }
}
</style>
