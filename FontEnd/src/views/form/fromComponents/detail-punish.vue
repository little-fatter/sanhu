<template>
  <a-form class="form">
    <a-form-item
      label="当事人"
      :labelCol="{span:11}"
      :wrapperCol="{span:10}">
      <div>当事人</div>
    </a-form-item>
    <a-form-item
      label="时间"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>时间</div>
    </a-form-item>
    <a-form-item
      label="违法事实及证据"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>违法事实及证据</div>
    </a-form-item>
    <a-form-item
      label="违法依据"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>违法依据</div>
    </a-form-item>
    <a-form-item
      label="处理结果"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>处理结果</div>
    </a-form-item>
    <a-form-item
      label="被执行人签字"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}"
      :required="false"
    >
      <div>被执行人签字</div>
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
  name: 'DetailPunish',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
