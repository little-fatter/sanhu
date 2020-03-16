<style lang="less" scoped>
.wrapper {
    margin: 0 15%;
    padding: 20px 0px;
    color: #101010;
    font-family: Microsoft YaHei;
    .title {
          padding: 20px;
          border-bottom: 1px solid #DCDEE2;
          font-size: 16px;
          position: relative;
          .staff-box{
            display: flex;
            align-items: center;
            .pic {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              line-height: 60px;
              color:#ffffff;
              background: #1FC08E;
              text-align: center;
            }
          .staff {
            color:#222328;
            margin-left: 20px;
            font-weight:400;
          }
          }
          .state {
            position: absolute;
            right:30px;
            color:#3A9DFA;
            top: 40px;
            font-weight: 400;
          }
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
.contentColor {
  color:#64697C;
  font-size: 14px;;
}
</style>
<template>
  <div class="wrapper">
    <div class="title">
      <div class="staff-box">
        <div class="pic">
          {{ lawStaff[0] ? lawStaff[0].Username.slice(0,2) : '王五' }}
        </div>
        <div class="staff">
          <span>执法人:</span><span>{{ lawStaff[0] ? lawStaff[0].Username : '王五' }}</span>
        </div>
      </div>
      <div class="state">
        {{ caseData.CaseStatus || '已完成' }}
      </div>
    </div>
    <div class="content">
      <div class="box">
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案由：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ caseData.CauseOfAction || '乱丢垃圾' }}</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件号：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ caseData.CaseNumber || '案20200309-00001号' }}</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">创建时间：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ caseData.CreateDate || '2020-03-09 13:43:04' }}</a-col>
        </a-row>
        <!-- <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件类型：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ caseData.CaseType || 'other' }}</a-col>
        </a-row> -->
        <div v-for="(item,index) in lawParty" :key="item.AssociationobjectID" >
          <a-row class="row" v-if="item.Typesofparties==1">
            <a-col class="colSize colLine" :span="4">当事人({{ index+1 }}):</a-col>
            <a-col class="colSize contentColor" :span="12">
              <div>
                <span>身份证：</span>
                <span>{{ item.IDcard || '510012356549115024' }}</span>
              </div>
              <div>
                <span>电话：</span>
                <span>{{ item.Contactnumber || '18888886666' }}</span>
              </div>
              <div>
                <span>地址：</span>
                <span>{{ item.address || '玉溪市广庙街12号' }}</span>
              </div>
            </a-col>
          </a-row>
          <a-row class="row" v-else>
            <a-col class="colSize colLine" :span="4">当事人({{ index+1 }})：</a-col>
            <a-col class="colSize contentColor" :span="12">
              <div>
                {{ item.Name || '马三立' }}
              </div>
              <div>
                <span>法人：</span>
                <span> {{ item.Nameoflegalperson || '徐国强' }}  | </span>
                <span>  {{ item.IDcard || '510012356549115024' }} </span>
              </div>
              <div>
                <span>电话：</span>
                <span> {{ item.Contactnumber || '18888886666' }} </span>
              </div>
              <div>
                <span>地址：</span>
                <span> {{ item.address || '玉溪市广庙街12号' }} </span>
              </div>
            </a-col>
          </a-row>
        </div>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">案件来源：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ caseData.sourceOfCase || '网上投诉' }}</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">简要案情及调查经过:</a-col>
          <a-col class="colSize contentColor" :span="12">
            <a-textarea autosize style="min-height:100px;" v-model="mainData.CaseDetail"></a-textarea>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">处罚结果:</a-col>
          <a-col class="colSize contentColor" :span="12">
            <div>
              <span>
              </span>
              <span> {{ mainData.ExecuteState || '已执行' }}</span>
            </div>
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">关联表单</a-col>
          <a-col class="colSize contentColor" :span="12">
            <div>
              <span @click="checkPunishInfo">
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
                {{ relateForm.length > 0 ? '处罚决定书' : '无' }}
              </span>
            </div>
          </a-col>
        </a-row>
      </div>
      <div v-if="fileData.length > 0" class="box border">
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">附件:</a-col>
          <a-col class="colSize contentColor" :span="20">
            <div style="display:flex;flex-wrap:wrap;">
              <div style="margin-right:20px;" v-for="(item,index) in fileData" :key="index+'ScImg'" >
                <img style="width:200px;" :src="item" alt="图片加载失败" >
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="footer">
      <a-button @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
import { getDetails, getPageData, getFormDetail } from '@/api/sampleApi'
import {
  isNotEmpty
} from '../../utils/util'
export default {
  name: 'ClosePersonReport',
  data () {
    return {
      mainData: {},
      caseData: {},
      lawParty: [], // 当事人
      lawStaff: [], // 执法人
      relateForm: [], // 关联处罚决定书
      fileData: [],
      id: 'd2440a27-7abf-4cd1-95bf-0b800972f5be'
    }
  },
  mounted () {
    if (this.$route.query.id) { this.id = this.$route.query.id }
    this.init()
  },
  methods: {
    // 获取页面数据
    init () {
      getFormDetail('case_report', null, this.id).then(res => {
        this.mainData = res.MainForm
        this.lawParty = res.law_party
        this.lawStaff = res.law_staff
        getDetails('case_Info', res.MainForm.CaseId).then(res => {
          this.caseData = res
        })
        getFormDetail('law_punishmentInfo', res.MainForm.EventInfoId).then(res => {
          this.lawParty = res.law_party
          this.relateForm = res.attachment
          console.log(this.relateForm)
        })
        // this.loadEventInfo(res.MainForm.EventInfoId)
      })
    },
    // 获取事件信息
    loadEventInfo (EventInfoId) {
      getDetails('event_info', EventInfoId).then(res => {
        if (res) {
          this.fileData = res.evtFileUrl.split(',').filter(item => { return isNotEmpty(item) })
        }
      })
    },
    // 查看处罚决定书
    checkPunishInfo () {
      // this.$router.push({ name: '', query: { id: this.relateForm[0].ID } })
    }
  }
}
</script>
