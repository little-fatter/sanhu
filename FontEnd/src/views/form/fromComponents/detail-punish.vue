<template>
  <a-form class="form">
    <a-form-item
      label="当事人"
      :labelCol="{span:11}"
      :wrapperCol="{span:10}">
      <div>当事人</div>
    </a-form-item>
    <a-form-item
      label="时间"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>时间</div>
    </a-form-item>
    <a-form-item
      label="违法事实及证据"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ detailData.Illegalfacts }}</div>
    </a-form-item>
    <a-form-item
      label="违法依据"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div></div>
    </a-form-item>
    <a-form-item
      label="处理结果"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}">
      <div>{{ Punishmentdecision }}</div>
    </a-form-item>
    <a-form-item
      label="被执行人签字"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}"
      :required="false"
    >
      <div>{{ detailData.PartySign }}</div>
    </a-form-item>
    <a-form-item
      label="附件"
      :labelCol="{lg: {span:11}}"
      :wrapperCol="{span:10}"
      :required="false"
    >
      <div>附件</div>
    </a-form-item>
  </a-form>
</template>

<script>
import { getDetails } from '@/api/sampleApi'

export default {
  name: 'DetailPunish',
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
    this.getLawPunish()
  },
  methods: {
    getLawPunish () {
      getDetails('law_punishmentInfo', this.id).then(res => {
        this.detailData = res
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
