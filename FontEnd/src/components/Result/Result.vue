<template>
  <div class="result">
    <div>
      <a-icon :class="{ 'icon': true, 'success': isSuccess, 'error': !isSuccess }" :type="isSuccess ? 'check-circle' : 'close-circle'"/>
    </div>
    <div class="title" v-if="title">{{ title }}</div>
    <div class="description" v-if="description">{{ description }}</div>
    <div class="content" v-if="content">
      <slot></slot>
    </div>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script>
/**
 * 通用操作结果组件
 * 一般用于需要展示复杂结果的页面
 */
export default {
  name: 'Result',
  props: {
    // 是否成功
    isSuccess: {
      type: Boolean,
      default: false
    },
    // 操作标题
    title: {
      type: String,
      default: ''
    },
    // 操作描述
    description: {
      type: String,
      default: ''
    },
    // 是否有自定义内容
    content: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
  .result {
    text-align: center;
    width: 72%;
    margin: 0 auto;
    padding: 24px 0 8px;

    .icon {
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .success {
      color: #52c41a;
    }
    .error {
      color: red;
    }
    .title {
      font-size: 24px;
      color: rgba(0, 0, 0, .85);
      font-weight: 500;
      line-height: 32px;
      margin-bottom: 16px;
    }
    .description {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 24px;
    }
    .content {
      background: #fafafa;
      padding: 24px 40px;
      border-radius: 2px;
      text-align: left;
    }
    .action {
      margin-top: 32px;
    }
  }

  .mobile {
    .result {
      width: 100%;
      margin: 0 auto;
      padding: unset;
    }
  }
</style>
