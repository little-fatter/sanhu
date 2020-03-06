<style lang="less" scoped>
.wrapper {
    margin: 0 15%;
    padding: 20px 0px;
    color: #101010;
    .title {
          text-align: center;
          font-weight: bold;
          color:#101010;
          padding: 20px 0;
          letter-spacing: 16px;
          border-bottom: 1px solid #DCDEE2;
          font-size: 22px;
        }
    .content {
      .box {
        .row {
      padding: 10px;
      .colLine {
        text-align: left;
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
    .handlerInfo {
      padding:20px 0;border-top:1px solid #DCDEE2;display:flex;align-items: center;
      .handler {
        width:60px;height:60px;border-radius:50%;boerder:1px solid #1FC08E;
      text-align:center;background:#1FC08E;color:#ffffff;line-height:60px;
      }
      .handlerBox {
        padding:10px 20px;border:1px solid #DCDEE2;flex:1;margin-left:20px;border-radius: 8px;
        .top {
          margin-bottom:14px;font-size:16px;
        }
        .bottom {
          display:flex;justify-content:space-between;color:#A1A6BA;
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
          <a-col class="colSize colLine" :span="4">案由：</a-col>
          <a-col class="colSize" :span="12"> {{ data.CauseOfAction || '随地大小便' }} </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件来源：</a-col>
          <a-col class="colSize" :span="12"> {{ data.Source || '公众举报' }} </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">当事人：</a-col>
          <a-col class="colSize" :span="12">
            <div>
              {{ data.PartyName || '马三立' }}
            </div>
            <div>
              <span>法人：</span>
              <span> {{ data.PartyLP || '徐国强' }}  | </span>
              <span>  {{ data.PartyIDCard || '510012356549115024' }} </span>
            </div>
            <div>
              <span>电话：</span>
              <span> {{ data.PartyPhone || '18888886666' }} </span>
            </div>
            <div>
              <span>地址：</span>
              <span> {{ data.PartyAddress || '玉溪市广庙街12号' }} </span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">简要案情及调查经过：</a-col>
          <a-col class="colSize" :span="12">
            <a-textarea autosize :placeholder="data.Content"></a-textarea>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">处罚结果：</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span>
                {{ data.PenaltyResult || '口头警告' }}  |
              </span>
              <span> {{ data.ExecuteResult || '已处理' }} </span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">关联表单</a-col>
          <a-col class="colSize" :span="12">
            <div>
              <span>
                <svg
                  t="1582606760517"
                  class="icon"
                  viewBox="0 0 1000 1000"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5583"
                  width="20"
                  height="20"
                >
                  <path
                    d="M546.133333 520.533333l59.733334-59.733333 21.333333 21.333333 115.2-115.2-119.466667-119.466666-115.2 115.2 4.266667 8.533333-59.733333 59.733333L384 358.4 614.4 128l243.2 243.2-230.4 230.4-81.066667-81.066667z m-115.2-68.266666L371.2 512l-8.533333-8.533333-115.2 115.2 119.466666 119.466666 115.2-115.2-21.333333-21.333333 59.733333-59.733333 81.066667 81.066666L371.2 853.333333 128 614.4 358.4 384l72.533333 68.266667zM571.733333 341.333333l59.733334 59.733334-230.4 230.4L341.333333 571.733333 571.733333 341.333333z"
                    fill="#8a8a8a"
                    p-id="5584"
                  />
                </svg>
                相关表单
              </span>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="handlerInfo">
      <div class="handler">{{ data.CaseHandler || '王小五' }}</div>
      <div class="handlerBox">
        <div class="top">发起上传</div>
        <div class="bottom">
          <div>{{ data.CaseHandler || '王小五' }}</div>
          <div>{{ data.InitiationTime || '2020-02-10 16:00:45' }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <!-- <a-button style="margin-right:20px;" type="primary">提交</a-button> -->
      <a-button @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
import { getDetails } from '@/api/sampleApi'
export default {
  name: 'CloseOrgReport',
  data () {
    return {
      data: {},
      id: '289a3fbd-be87-432a-939a-91881e7a2d41'
    }
  },
  mounted () {
    if (this.$route.query.id) { this.id = this.$route.query.id }
    this.getFormReport()
  },
  methods: {
    // 获取结案报告
    getFormReport () {
      getDetails('from_APROrg', this.id).then(res => {
        this.data = res
      }).catch(err => { console.log(err) })
    }
  }
}
</script>
