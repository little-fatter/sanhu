<style lang="less" scoped>
 .form {
     font-size: 18px;
     color:#101010;
 }
</style>
<style scoped>
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>
<template>
  <a-form class="form">
    <a-form-item
      label="当事人"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="当事人"/>
    </a-form-item>
    <a-form-item
      label="时间"
      :labelCol="{span:5}"
      :wrapperCol="{span:14}">
      <a-date-picker style="width:100%" size="large" />
    </a-form-item>
    <a-form-item
      label="违法事实及证据"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="问题描述"/>
      <a-upload
        action=""
        listType="picture"
        :defaultFileList="fileList"
        class="upload-list-inline"
      >
        <a-button>
          <a-icon type="upload" /> upload
        </a-button>
      </a-upload>
    </a-form-item>
    <a-form-item
      label="违法依据"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="违法依据"/>
    </a-form-item>
    <a-form-item
      label="处理结果"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <a-input style="width:100%" size="large" placeholder="处理结果"/>
    </a-form-item>
    <a-form-item
      label="被执行人签名"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <div>签名图片</div>
    </a-form-item>
    <a-form-item
      label="执法人员签字"
      :labelCol="{lg: {span:5}}"
      :wrapperCol="{span:14}">
      <div>签名图片</div>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'EditPunish',
  data () {
    return {
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }, {
        uid: '-2',
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }]
    }
  },
  methods: {
  }
}
</script>
