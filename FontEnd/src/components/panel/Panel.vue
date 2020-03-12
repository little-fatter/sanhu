<!--
 * @Author: 616749285@qq.com
 * @Date: 2020-03-11 11:21:49
 * @LastEditors: 616749285@qq.com
 * @LastEditTime: 2020-03-11 11:21:50
 * @Description:  面板
 -->

<template>
  <div class="panel">
    <div class="panel-header">
      <slot name="title">
        <span class="panel-title"></span>
      </slot>
      <slot name="headerEnd" />
    </div>
    <div class="panel-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
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
  }
  &-title {
    width: 0;
    flex: 1
  }
  &-body {
    padding: 20px;
  }
}
</style>
