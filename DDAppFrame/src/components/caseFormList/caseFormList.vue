<!--案件文件列表组件-->
<template>
  <div class>
    <Slist :dataCallback="loadData" ref="mylist">
      <van-cell-group v-for="item in caseFileList" :key="item.ID+'@'">
        <van-cell
          :title="item.FormName?item.FormName:'测试表单名称'"
          icon="label-o"
          :value="item.CompletionTime"
          @click="goFromDetails(item,that)"
        />
      </van-cell-group>
    </Slist>
  </div>
</template>

<script>
import Slist from '../list/SList' // 翻页组件
import { isNotEmpty, getQueryConditon } from '../../utils/util' // 引入搜索规则
import { getPageDate, FromType, goFormDetail } from '../../api/regulatoryApi' // 引入封装的请求
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
      caseFileList: [],
      that: this // this
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
        // console.log(this.caseFileList)
        return res
      })
    },
    // 去该案件表单详情
    goFromDetails (item, that) {
      // console.log(item.FormType)
      goFormDetail(item, that)
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
