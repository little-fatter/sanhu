<template>
  <div class="head-info" :class="center && 'center'">
    <span>{{ title }}</span>
    <p>{{ content }}</p>
    <em v-if="bordered"/>
  </div>
</template>

<script>
/**
 * 通用展示头信息组件
 * 一般用于展示头描述信息
 */
export default {
  name: 'HeadInfo',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 内容
    content: {
      type: String,
      default: ''
    },
    // 是否需要边框分隔符
    bordered: {
      type: Boolean,
      default: false
    },
    // 是否居中显示
    center: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    p {
      color: rgba(0, 0, 0, .85);
      font-size: 24px;
      line-height: 32px;
      margin: 0;
    }
    em {
      background-color: #e8e8e8;
      position: absolute;
      height: 56px;
      width: 1px;
      top: 0;
      right: 0;
    }
  }
</style>
