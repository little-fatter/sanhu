<template>
  <a-form class="form">
    <a-form-item
      label="巡查时间"
      :labelCol="{span:11}"
      :wrapperCol="{span:10}">
      <div>时间</div>
    </a-form-item>
    <a-form-item
      label="巡查路线"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>某地至某地</div>
    </a-form-item>
    <a-form-item
      label="发现问题"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>问题描述</div>
    </a-form-item>
    <a-form-item
      label="初步处理意见"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>意见描述</div>
    </a-form-item>
    <a-form-item
      label="巡查人员签名"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>签名图片</div>
    </a-form-item>
    <a-form-item
      label="附件"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}"
      :required="false"
    >
      <div>附件</div>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'DetailEnforce',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
