<style lang="less" scoped>
.wrapper {
    margin: 60px;
    border: 1px solid #bbbbbb;
    padding: 20px 50px;
    color: #101010;
    .title {
          text-align: center;
          font-weight: bold;
          color:#101010;
          margin: 10px 0 40px 0;
          letter-spacing: 16px;
          font-size: 22px;
        }
    .content {
      display: flex;justify-content: flex-end;
      .box {
        width: 70%;
        .row {
      padding: 10px;
      .colLine {
        text-align: right;
      }
      .colSize {
        padding: 0 20px;
        div {
          margin-bottom:10px;
        }
      }
    }
      }
    }
    .footer {
      display:flex;justify-content:center;
    }

}
</style>
<template>
  <div class="wrapper">
    <div class="title">结案报告</div>
    <div class="content">
      <div class="box">
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案由</a-col>
          <a-col class="colSize" :span="12">违法捕捞</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件来源</a-col>
          <a-col class="colSize" :span="12">网上举报</a-col>
        </a-row>
        <a-row v-if="type == 0" class="row">
          <a-col class="colSize colLine" :span="4">当事人</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span> name </span>
              <span> | sex </span>
              <span> | age</span>
              <span> | Occupation</span>
            </div>
            <div>
              <span>身份证：</span>
              <span>xxxx</span>
            </div>
            <div>
              <span>电话：</span>
              <span>xxxx</span>
            </div>
            <div>
              <span>地址：</span>
              <span>xxxx</span>
            </div>
          </a-col>
        </a-row>
        <a-row v-else class="row">
          <a-col class="colSize colLine" :span="4">当事人</a-col>
          <a-col class="colSize" :span="12">
            <div>
              company name
            </div>
            <div>
              <span>法人：</span>
              <span>name | </span>
              <span> ID Card No.</span>
            </div>
            <div>
              <span>电话：</span>
              <span>xxxx</span>
            </div>
            <div>
              <span>地址：</span>
              <span>xxxx</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">简要案情及调查经过</a-col>
          <a-col class="colSize" :span="12">
            <a-textarea autosize placeholder="预填充案件经过"></a-textarea>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">处罚结果</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span>
                处罚方式 |
              </span>
              <span> 是否执行</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">关联表单</a-col>
          <a-col class="colSize" :span="12">
            <div></div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="footer">
      <a-button style="margin-right:20px;" type="primary" @click="type == 0? type = 1 : type = 0">提交</a-button>
      <a-button type="primary" @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CloseReport',
  data () {
    return {
      type: 0
    }
  },
  methods: {
  }
}
</script>
