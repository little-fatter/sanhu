<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '80%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">下一步任务信息</div>
        <div class="list_wapper_title_right">
          <van-icon name="cross" slot="right-icon" @click="onClosePopup" size="20" />
        </div>
      </div>
      <van-cell-group>
        <van-form @submit="onSubmit">
          <van-field
            name="taskTitle"
            :value="taskTitle"
            label="任务标题"
            placeholder="请输入任务标题"
            :rules="requiredRule"
            required
            readonly
          />
          <van-field
            name="taskContent"
            v-model="taskContent"
            rows="2"
            autosize
            label="任务描述"
            type="textarea"
            maxlength="200"
            placeholder="请输入任务描述"
            show-word-limit
            required
            :rules="requiredRule"
          />
          <div class="operate-area single-save">
            <van-button type="info" size="large" native-type="submit">确定</van-button>
          </div>
        </van-form>
      </van-cell-group>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'NextTaskModal',
  components: {

  },
  props: {

  },
  data () {
    // 必填规则
    this.requiredRule = [
      { required: true, message: ' ' }
    ]
    return {
      taskTitle: '',
      taskContent: '',
      showModel: false,
      data: null
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

<style lang="less" scoped>
.list_wapper
{
    .list_wapper_title
    {
        height: 40px;
        line-height: 40px;
        padding-top: 10px;
        text-align: center;
        position: relative;
       .desc
       {
            font-size: 22px;
       }
       .list_wapper_title_right
       {
           position:absolute;
           top: 10px;
           right: 20px;
       }
    }

    .list-item
    {
       border-bottom: 20px solid #fafafa;
    }

    .list-item_title
    {
        height: 30px;
        line-height: 30px;
        padding: 20px 0px;
    }

    .list-item_title_left
    {
      float: left;
      padding-left: 30px;
    }

    .list-item_title_right
    {
      float: right;
       padding-right: 25px;
       a
       {
           color: #1989fa;
       }
    }
}
</style>
