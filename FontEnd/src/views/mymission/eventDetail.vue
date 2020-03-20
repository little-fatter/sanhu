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
          {{ lawStaff.Username || '王五' }}
        </div>
        <div class="staff">
          <span>执法人:</span><span>{{ lawStaff.Username || '王五' }}</span>
        </div>
      </div>
      <div class="state">
        {{ caseData.CaseStatus || '已完成' }}
      </div>
    </div>
    <div class="content">
      <div class="box">
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">事发时间：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ loadData.IncidentTime }}
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">事发地点：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ eventInfo.address }}</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">事件类型：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ eventInfo.evtTypeDisplayName }}
          </a-col>
        </a-row>
        <!-- <a-row class="row">
          <a-col class="colSize colLine" :span="4">事件描述：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ eventInfo.remark }}
          </a-col>
        </a-row> -->
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">事件详情：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ loadData.EventDescribe }}
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">上报时间：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ eventInfo.reportTime }}</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">上报来源：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ eventInfo.ReportSource || ' 公众号举报' }}</a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">上报人：</a-col>
          <a-col class="colSize contentColor" :span="12">{{ eventInfo.reporterName }}</a-col>
        </a-row>
        <!-- <a-row class="row">
          <a-col class="colSize colLine" :span="4">当事人：</a-col>
          <a-col class="colSize contentColor" :span="12">
            <party-view :caseBreakLow="loadData.LawParties"></party-view>
          </a-col>
        </a-row> -->
        <!-- <a-row class="row">
          <a-col class="colSize colLine" :span="4">处理决定：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ loadData.ProcessingDecisions }}
          </a-col>
        </a-row> -->
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">处理结果：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ loadData.Result }}
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">是否请求执法人员处理：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ loadData.Needlawenforcement === 0 ? '否' : '是' }}
          </a-col>
        </a-row>
        <a-row class="row">
          <a-col class="colSize colLine" :span="4">是否需要跟踪整改：</a-col>
          <a-col class="colSize contentColor" :span="12">
            {{ loadData.Needtracking === 0 ? '否' : '是' }}
          </a-col>
        </a-row>
        <!-- <a-row class="row">
          <a-col class="colSize colLine" :span="4">关联表单：</a-col>
          <a-col class="colSize contentColor" :span="12">
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
              {{ loadData.Associatedforms }}
            </span>
          </a-col>
        </a-row> -->
      </div>
    </div>
    <div class="footer">
      <a-button @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
import { getDetails, getFormDetail } from '@/api/sampleApi'
import {
  isNotEmpty
} from '../../utils/util'
export default {
  name: 'EventDetail',
  components: {},
  data () {
    return {
      loadData: {}, // 详情信息
      eventInfo: {}, // 事件信息
      lawStaff: {},
      caseData: {}
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    // 页面数据
    init () {
      const queryParam = this.$route.query
      const id = queryParam.id || 'd652c736-609b-41b3-a491-90828bf32d25'
      const formType = queryParam.formType
      console.log(formType)
      // 请求事件巡查详情
      getFormDetail('task_patrol', null, id).then(res => {
        if (isNotEmpty(res)) {
          this.lawStaff = res.law_staff
          this.loadData = {
            ...res.MainForm,
            LawParties: res.law_party,
            Attachment: res.attachment
          }
          this.loadEventInfo(res.MainForm.EventInfoId)
        }
      })
    },
    // 获取事件信息
    loadEventInfo (EventInfoId) {
      getDetails('event_info', EventInfoId).then(res => {
        if (res) {
          this.eventInfo = res
        }
      })
    }
  },
  created () {
    this.init()
  },
  mounted () {
  }
}
</script>
