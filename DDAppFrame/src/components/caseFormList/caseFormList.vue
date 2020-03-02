<!--案件文件列表组件-->
<template>
  <div class="">
    <Slist :dataCallback="loadData" ref="mylist">
      <h2>{{ caseId }}</h2>
      <van-cell-group v-for="item in caseFileList" :key="item.fileName+'@'">
        <van-cell :title="item.fileName" icon="label-o" :value="item.fileTime"/>
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
      // 案件id
      id: this.caseId,
      // 演示数据
      caseFileList: [
        { fileName: '巡查记录表', fileTime: '2020-2-29 13:52:36' },
        { fileName: '案件受理记录', fileTime: '2020-2-20 14:32:26' },
        { fileName: '涉嫌犯罪案件移送书勘验（检查）', fileTime: '2020-2-18 10:22:10' }
      ]
    }
  },

  methods: {
    // 配置请求参数
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.caseId)) {
        rules = [
          {
            field: 'caseId', // 案件类型
            op: 'equal',
            value: this.caseId,
            type: 'string'
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'and')
      return getPageDate('form_all', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
        if (res.Rows) {
        //   res.Rows.forEach(item => {
        //     this.caseList.push(item)
        //   })
          console.log(res.Rows)
        }
        return res
      })
    }
  },
  mounted () {

  }
}
</script>
<style scoped>

</style>
