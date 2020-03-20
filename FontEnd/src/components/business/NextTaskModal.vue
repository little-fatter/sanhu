<template>
  <a-modal
    v-model="showModel"
    @cancel="onClosePopup"
  >
    <div slot="footer"></div>
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">下一步任务信息</div>
        <div class="list_wapper_title_right">
        </div>
      </div>
      <a-row>
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-form-item label="任务标题">
            <a-input disabled placeholder="请输入任务标题" v-model="taskTitle" 
      />
          </a-form-item>
          <a-form-item label="任务描述">
            <a-textarea  placeholder="请输入任务描述" v-model="taskContent" />
          </a-form-item>
          <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol">
      <a-button type="primary" @click="onSubmit">
        确定
      </a-button>
    </a-form-item>
        </a-form>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};
export default {
  name: 'NextTaskModal',
  components: {

  },
  props: {

  },
  data () {
    // 必填规则
    this.requiredRule = [{ rules: [{ required: true, message: '请输入' }] }]
    return {
      taskTitle: '',
      taskContent: '',
      showModel: false,
      data: null,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this, { name: 'dynamic_rule' }),
    }
  },
  created () {
  },
  methods: {
    show (title, content, data) {
      this.taskTitle = title
      this.taskContent = content
      this.data = data
      this.showModel = true
    },
    onClosePopup () {
      this.showModel = false
    },
    onSubmit (values) {
      console.log(values)
      var result = {
        data: this.data,
        ...values
      }
      this.$emit('onPopupConfirm', result)
      this.showModel = false
    }
  }
}
</script>
