<style lang='less' scoped>
.FEdits {
    padding:40px;
    .formTitle {
        color:#101010;font-family:SourceHanSansSC-bold;font-weight: bold;
    }
    .formContent {
        border:1px solid #BBBBBB;margin:20px;
        .title {
            display:flex;justify-content: left;border-bottom:1px solid #BBBBBB;
            align-items: center;padding: 18px 0 10px 200px;
            .circleTitle {
                color:#101010;margin-right:20px;text-align:center;width: 56px;height: 56px;
                line-height: 56px;border-radius:50%;border:1px solid #bbbbbb;
            }
            .titleDes {
                margin-bottom: 6px;
            }
        }
        .footer {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-bottom: 50px;
            .footerButton {
                text-align: center;
                font-size: 14px;
                color:#101010;
                border:1px solid rgba(187,187,187,1);
                border-radius: 4px;
                width: 266px;
                height: 77px;
                line-height: 77px;
            }
        }
        .content {
            min-height: 200px;
            padding: 50px 0;
        }
    }
}
</style>
<template>
  <div class="FEdits">
    <div class="formTitle">
      <span @click="$router.back()">
        <
      </span>
      这是记录表名称
    </div>
    <div class="formContent">
      <div class="title">
        <div class="circleTitle">
          提交人
        </div>
        <div>
          <div class="titleDes">
            提交人姓名
          </div>
          <div>
            文件状态
          </div>
        </div>
      </div>
      <div class="content">
        <component :is="formStyleName"></component>
      </div>
      <div class="footer">
        <div class="footerButton">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import editEnforce from './fromComponents/edit-enforce'
import editPunish from './fromComponents/edit-punish'
export default {
  name: 'FormEdit',
  components: {
    editEnforce, editPunish
  },
  data () {
    return {
      formStyleName: 'editEnforce'// 引用的组件名
    }
  },
  methods: {
  }
}
</script>
