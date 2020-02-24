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
    <div class="title">卷宗封面</div>
    <div class="content">
      <div class="box">
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件号</a-col>
          <a-col class="colSize" :span="12">案（2020） 1221 号</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案由</a-col>
          <a-col class="colSize" :span="12">违法捕捞</a-col>
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
          <a-col class="colSize colLine" :span="4">处罚决定</a-col>
          <a-col class="colSize" :span="12">
            <div>玉抚管罚决字（2020）4001号</div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">立案时间</a-col>
          <a-col class="colSize" :span="12">
            <div>xxx年xx月xx日</div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">结案时间</a-col>
          <a-col class="colSize" :span="12">
            <div>xxx年xx月xx日</div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">办案人员</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span>张三 </span>
              <span> | 李四</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">归档人</a-col>
          <a-col class="colSize" :span="12">
            <div>选择归档人，预填当前用户</div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">保存期限</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span>默认10</span>
              <span>年</span>
            </div>
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
