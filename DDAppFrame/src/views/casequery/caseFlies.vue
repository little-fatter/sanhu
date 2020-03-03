<template>
  <div>
    <!--案件文件 列表组件-->
    <CaseFileList :caseId="caseId"></CaseFileList>
  </div>
</template>

<script>
import CaseFileList from '../../components/caseFormList/caseFormList' // 案件文件 列表组件
export default {
  name: 'CaseFlies',
  components: {
    CaseFileList
  },
  data () {
    return {
      caseId: '' // 案件ID
    }
  },
  mounted () {
    // 接收路由传参
    this.caseId = this.$route.query.caseId
  }
}
</script>

<style scoped>
    .tip {
        width: 60%;
        margin-left: 20%;
    }
</style>
