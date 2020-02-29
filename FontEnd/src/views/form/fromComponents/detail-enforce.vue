<template>
  <a-form class="form">
    <a-form-item
      label="巡查时间"
      :labelCol="{span:11}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.PatrolTimeBegin }}至{{ detailData.PatrolTimeEnd }}</div>
    </a-form-item>
    <a-form-item
      label="巡查路线"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.PatrolAddressBegin }}至{{ detailData.PatrolAddressEnd }}</div>
    </a-form-item>
    <a-form-item
      label="发现问题"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.Situation }}</div>
    </a-form-item>
    <a-form-item
      label="初步处理意见"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.HandlingOpinions }}</div>
    </a-form-item>
    <a-form-item
      label="初步处理结果"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.Result }}</div>
    </a-form-item>
    <a-form-item
      label="巡查人员签名"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.PatrolPerson }}</div>
    </a-form-item>
    <!-- <a-form-item
      label="附件"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}"
      :required="false"
    >
      <div>附件</div>
    </a-form-item> -->
  </a-form>
</template>

<script>
import { getFromPatrolRecord } from '@/api/sampleApi'
export default {
  name: 'DetailEnforce',
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      detailData: {}
    }
  },
  mounted () {
    this.getFromPatrolRecord()
  },
  methods: {
    getFromPatrolRecord () {
      getFromPatrolRecord(this.id).then(res => {
        this.detailData = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>
