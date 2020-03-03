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
    <div class="title">结案报告（单位）</div>
    <div class="content">
      <div class="box">
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案由</a-col>
          <a-col class="colSize" :span="12"> {{ data.CauseOfAction }} </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件来源</a-col>
          <a-col class="colSize" :span="12"> {{ data.Source }} </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">当事人</a-col>
          <a-col class="colSize" :span="12">
            <div>
              {{ data.PartyName }}
            </div>
            <div>
              <span>法人：</span>
              <span> {{ data.PartyLP }}  | </span>
              <span>  {{ data.PartyIDCard }} </span>
            </div>
            <div>
              <span>电话：</span>
              <span> {{ data.PartyPhone }} </span>
            </div>
            <div>
              <span>地址：</span>
              <span> {{ data.PartyAddress }} </span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">简要案情及调查经过</a-col>
          <a-col class="colSize" :span="12">
            <a-textarea autosize :placeholder="data.Content"></a-textarea>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">处罚结果</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span>
                {{ data.PenaltyResult }}  |
              </span>
              <span> {{ data.ExecuteResult }} </span>
            </div>
          </a-col>
        </a-row>
        <!-- <a-row class="row">
          <a-col class="colSize colLine" :span="4">关联表单</a-col>
          <a-col class="colSize" :span="12">
            <div></div>
          </a-col>
        </a-row> -->
      </div>
    </div>
    <div class="footer">
      <a-button style="margin-right:20px;" type="primary">提交</a-button>
      <a-button type="primary" @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
import { getFromAPROrg } from '@/api/sampleApi'
export default {
  name: 'CloseOrgReport',
  data () {
    return {
      data: {},
      id: '4aa3f532-2707-4cc8-a129-192e3237ec9e'
    }
  },
  mounted () {
    this.getFormReport()
  },
  methods: {
    // 获取结案报告
    getFormReport () {
      getFromAPROrg(this.id).then(res => {
        this.data = res
        console.log(res)
      }).catch(err => { console.log(err) })
    }
  }
}
</script>
