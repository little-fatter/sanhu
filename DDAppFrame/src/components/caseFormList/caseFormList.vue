<!--案件文件列表组件-->
<template>
  <div class>
    <Slist :dataCallback="loadData" ref="mylist">
      <van-cell-group v-for="item in caseFileList" :key="item.ID+'@'">
        <van-cell
          :title="item.FormName?item.FormName:'测试表单名称'"
          icon="label-o"
          :value="item.CompletionTime"
          @click="goFromDetails(item)"
        />
      </van-cell-group>
    </Slist>
  </div>
</template>

<script>
import Slist from '../list/SList' // 翻页组件
import { isNotEmpty, getQueryConditon } from '../../utils/util' // 引入搜索规则
import { getPageDate, FromType } from '../../api/regulatoryApi' // 引入封装的请求
export default {
  components: {
    Slist
  },
  // 接收参数
  props: {
    caseId: {
      // 案件id
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 演示数据
      caseFileList: []
    }
  },

  methods: {
    // 配置请求参数
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.caseId)) {
        rules = [
          {
            field: 'CaseId', // 写案件ID
            op: 'equal',
            value: this.caseId, // 写案件ID
            type: 'string'
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'and')
      // 请求
      return getPageDate('formwith_eventcase', parameter.pageIndex, parameter.pageSize, conditon).then(res => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.caseFileList.push(item)
          })
        }
        console.log(this.caseFileList)
        return res
      })
    },
    // 去该案件表单详情
    goFromDetails (item) {
      // console.log(item)
      if (item.FormType === FromType.goodsList) {
        // 物品清单
        this.$router.push({
          path: '/goodsList', query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.caseDetails) {
        // 案件详情
        this.$router.push({
          path: '/caseDetails', query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.PromptlyPunishNote) {
        // 处罚当场决定书
        this.$router.push({
          path: '/PromptlyPunishNote', query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.RecordOfInquest) {
        // 勘验记录
        this.$router.push({
          path: '/RecordOfInquest',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.caseReport) {
        if (item.FormState === 1) {
          // 结案报告
          this.$router.push({
            path: '/caseReport',
            query: { ID: item.FormID }
          })
        } else {
          // 结案报告未审批
          this.$router.push({
            path: '/closingReportDetail',
            query: { ID: item.FormID }
          })
        }
      } else if (item.FormType === FromType.caseCover) {
        // 卷宗封面
        this.$router.push({
          path: '/form_inquiryrecord',
          query: { id: item.CaseId }
        })
      } else if (item.FormType === FromType.AskThirdPartyNote) {
        // 询问第三人笔录
        this.$router.push({
          path: '/AskThirdPartyNote',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.AskPartyNote) {
        // 询问当事人笔录
        this.$router.push({
          path: '/AskPartyNote',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.AskWitnessNote) {
        // 询问证人笔录
        this.$router.push({
          path: '/AskWitnessNote',
          query: { ID: item.FormID }
        })
      } else if (item.FormType === FromType.sceneInvestigationDetail) {
        // 现场勘查
        this.$router.push({
          path: '/sceneInvestigationDetail',
          query: { ID: item.EventInfoId }
        })
      } else if (item.FormType === FromType.eventDetail) {
        // 事件核查
        this.$router.push({
          path: '/eventDetail',
          query: { ID: item.EventInfoId }
        })
      }
    }
  },
  mounted () {}
}
</script>
<style scoped>
.van-cell__title{
  flex: 1 !important;
}
.van-cell__value{
  flex: unset !important;
  width: auto !important;
}
</style>
