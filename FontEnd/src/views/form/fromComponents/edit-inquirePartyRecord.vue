<style lang="less" scoped>
 .form {
     font-size: 18px;
     color:#101010;
 }
</style>
<template>
  <a-form class="form">
    <a-form-item
      label="案由"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="案由"/>
    </a-form-item>
    <a-form-item
      label="询问地点"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="询问地点"/>
    </a-form-item>
    <a-form-item
      label="当事人姓名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人姓名"/>
    </a-form-item>
    <a-form-item
      label="当事人性别"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-select defaultValue="女" style="width: 120px">
        <a-select-option value="女">女</a-select-option>
        <a-select-option value="男">男</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="当事人民族"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人民族"/>
    </a-form-item>
    <a-form-item
      label="当事人出生年月"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-date-picker style="width:100%" size="large" />
    </a-form-item>
    <a-form-item
      label="当事人身份证号"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人身份证号"/>
    </a-form-item>
    <a-form-item
      label="当事人住址"
      :labelCol="{span:5}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人住址"/>
    </a-form-item>
    <a-form-item
      label="当事人工作单位"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input placeholder="当事人工作单位" />
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人姓名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="法定代表人或负责人姓名"/>
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人性别"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-select defaultValue="女" style="width: 120px">
        <a-select-option value="女">女</a-select-option>
        <a-select-option value="男">男</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人民族"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="法定代表人或负责人民族"/>
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人出生年月"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-date-picker style="width:100%" size="large" />
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人身份证号"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人身份证号"/>
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人职务"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input defaultValue="法定代表人或负责人职务" />
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人联系方式"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="法定代表人或负责人联系方式"/>
    </a-form-item>
    <a-form-item
      label="法定代表人或负责人单位地址"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="法定代表人或负责人单位地址"/>
    </a-form-item>
    <a-form-item
      label="询问人A"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="询问人A"/>
    </a-form-item>
    <a-form-item
      label="询问人B"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="询问人B"/>
    </a-form-item>
    <a-form-item
      label="询问时间"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-date-picker style="width:100%" size="large" />
    </a-form-item>
    <a-form-item
      label="执法人A"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-col :span="12">
        <a-input style="width:100%" size="large" placeholder="执法人A姓名"/>
      </a-col>
      <a-col :span="12">
        <a-input style="width:100%" size="large" placeholder="执法人A证件编号"/>
      </a-col>
    </a-form-item>
    <a-form-item
      label="执法人B"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-col :span="12">
        <a-input style="width:100%" size="large" placeholder="执法人B姓名"/>
      </a-col>
      <a-col :span="12">
        <a-input style="width:100%" size="large" placeholder="执法人B证件编号"/>
      </a-col>
    </a-form-item>
    <a-form-item
      label="被询问人对执法人员执法证件验证回答"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-radio-group @change="onChange" v-model="value">
        <a-radio :style="radioStyle" :value="1">看清</a-radio>
        <a-radio :style="radioStyle" :value="2">未看清</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item
      label="执法人员询问的时间"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="执法人员询问的时间"/>
    </a-form-item>
    <a-form-item
      label="询问记录"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="询问记录"/>
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
  name: 'EditInquirePartyRecord',
  data () {
    return {
      value: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px'
      }
    }
  },
  methods: {
    onChange (e) {
      console.log('radio checked', e.target.value)
    }
  }
}
</script>
