<style lang='less' scoped>
</style>
<template>
  <div class="FAdd" style="padding:20px 16px 20px 90px;">
    <div
      style="border:1px solid #bbbbbb;padding:10px;color:#101010;display: flex;
    align-items: center;margin: 20px 0;">
      <div style="margin: 0 200px 0 10px;" @click="$router.back()">
        <span style="margin-right:10px;"><</span>
        <span>表单类型名</span>
      </div>
      <a-steps style="width:60%" :current="current" >
        <a-step title="表单填写" />
        <a-step title="表单审查" />
        <a-step title="审查完成" />
      </a-steps>
    </div>
    <div style="border:1px solid #bbbbbb;padding:10px;color:#101010;">
      <div ref="print" style="min-height:200px;margin:20px;">
        <component :is="formStyleName"></component>
      </div>
      <div style="display:flex;justify-content:center;margim:20px;">
        <a-button type="primary" size="large" @click="addForm">提交</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import editEnforce from './fromComponents/edit-enforce'
import editPunish from './fromComponents/edit-punish'
import editInquestRecord from './fromComponents/edit-inquestRecord'
import editInquirePartyRecord from './fromComponents/edit-inquirePartyRecord'
export default {
  name: 'FormAdd',
  components: {
    editEnforce, editPunish, editInquestRecord, editInquirePartyRecord
  },
  data () {
    return {
      current: 0,
      formStyleName: 'editEnforce'
    }
  },
  methods: {
    addForm () {
      this.$router.push({ path: '/form/base-form' })
    }
  }
}
</script>
