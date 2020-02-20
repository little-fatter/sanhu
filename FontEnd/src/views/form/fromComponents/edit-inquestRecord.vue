<style lang="less" scoped>
 .form {
     font-size: 18px;
     color:#101010;
 }
</style>
<template>
  <a-form class="form">
    <a-form-item
      label="检查事由"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="检查事由"/>
    </a-form-item>
    <a-form-item
      label="检查地点"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="检查地点"/>
    </a-form-item>
    <a-form-item
      label="当事人"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人"/>
    </a-form-item>
    <a-form-item
      label="检查人A"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="检查人A"/>
    </a-form-item>
    <a-form-item
      label="检查人B"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="检查人B"/>
    </a-form-item>
    <a-form-item
      label="记录人C"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="记录人C"/>
    </a-form-item>
    <a-form-item
      label="监督检查类别"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-select defaultValue="lucy" style="width: 120px">
        <a-select-option value="jack">Jack</a-select-option>
        <a-select-option value="lucy">Lucy</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="时间"
      :labelCol="{span:5}"
      :wrapperCol="{span:14}">
      <a-date-picker style="width:100%" size="large" />
    </a-form-item>
    <a-form-item
      label="执法人A"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-col :span="7">
        <a-input placeholder="请输入您的名字" />
      </a-col>
      <a-col :span="17">
        <a-input defaultValue="请输入您的执法证件编号" />
      </a-col>
    </a-form-item>
    <a-form-item
      label="执法人B"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-col :span="7">
        <a-input placeholder="请输入您的名字" />
      </a-col>
      <a-col :span="17">
        <a-input defaultValue="请输入您的执法证件编号" />
      </a-col>
    </a-form-item>
    <a-form-item
      label="被执行单位陪同人"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="被执行单位陪同人"/>
    </a-form-item>
    <a-form-item
      label="勘验检查记录"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="勘验检查记录"/>
    </a-form-item>
    <a-form-item
      label="当事人签名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <div></div>
    </a-form-item>
    <a-form-item
      label="见证人签名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <div></div>
    </a-form-item>
    <a-form-item
      label="执法人员A签名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <div></div>
    </a-form-item>
    <a-form-item
      label="执法人员B签名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <div></div>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'EditInquestRecord',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
