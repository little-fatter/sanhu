<!--案件文件列表组件-->
<template>
  <div class="">
    <Slist :dataCallback="loadData" ref="mylist">
      <van-cell-group v-for="item in caseFileList" :key="item.fileName+'@'">
        <van-cell :title="item.fileName?item.fileName:'后台没有给FromName'" icon="label-o" :value="item.CompletionTime" @click="goFromDetails(item.ID,item.FormType)"/>
      </van-cell-group>
    </Slist>

  </div>
</template>

<script>
import Slist from '../list/SList'// 翻页组件
import { isNotEmpty, getQueryConditon } from '../../utils/util' // 引入搜索规则
import { getPageDate } from '../../api/regulatoryApi' // 引入封装的请求
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
      return getPageDate('form_all', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
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
    goFromDetails (id, FormType) {
      if (FormType === 'from_inspectiontrecord') {
        this.$router.push({ path: 'recordOfInquestDetail', query: { id } })
      } else {
        console.log(`没有匹配成功`, id, FormType)
      }

    //   if (FormType === 'form_patrolrecord') {
    //     this.$router.push({ path: '/recordOfInquestDetail', query: { id: ID } })
    //   } else if (FormType === 'task_patrol') {
    //     this.$router.push({ path: '/eventDetail', query: { id: ID } })
    //   } else if (FormType === 'task_survey') {
    //     this.$router.push({ path: '/sceneInvestigationDetail', query: { id: ID } })
    //   } else if (FormType === 'from_inspectiontRecord') {
    //     console.log(`进入了这个跳转`)
    //     this.$router.push({ path: '/recordOfInquestDetail', query: { id: ID } })
    //   } else if (FormType === 'form_confiscated_item') {
    //     this.$router.push({ path: '/itemDetails', query: { id: ID } })
    //   } else if (FormType === 'case_Info') {
    //     this.$router.push({ path: '/createCaseDetails', query: { id: ID } })
    //   } else if (FormType === 'law_punishmentInfo') {
    //     this.$router.push({ path: '/PenalizeBookDetial', query: { id: ID } })
    //   }
    }

  },
  mounted () {

  }
}
</script>
<style scoped>

</style>
