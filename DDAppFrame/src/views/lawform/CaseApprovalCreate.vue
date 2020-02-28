<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="casereport.caseName"
        label="选择立案报告"
        placeholder="请选择案件"
        :readonly="true"
      >
        <van-icon name="ellipsis" slot="right-icon" @click="handleShowPopup" />
      </van-field>
      <!-- <div>
        <a href="http://192.168.0.102:8080/sh#/caseReportDetail">查案立案报告详情</a>
      </div> -->
      <van-field
        v-model="casereport.ay"
        label="案由"
        placeholder="请输入案由"
      />
      <van-field
        v-model="casereport.dsy"
        label="当事人"
        placeholder="请输入当事人"
      />
      <van-field
        v-model="casereport.aq"
        rows="2"
        autosize
        label="案情"
        type="textarea"
        maxlength="200"
        placeholder="请输入案情"
        show-word-limit
      />
    </van-cell-group>
    <item-group title="证据附件">
      <s-upload
        ref="myupload"
        :accept="access"
        :sync2Dingding="true"
      >
      </s-upload>
    </item-group>
    <item-group title="违法依据">
      <div>
        {{ casereport.yj }}
      </div>
    </item-group>
    <div class="operate-area">
      <van-button type="info" :loading="loading" @click="save" size="large">提交审批</van-button>
    </div>
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        show-toolbar
        title="请选择案件"
        :columns="caseColumns"
        @cancel="togglePopup"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import ItemGroup from '../../components/tools/ItemGroup'
import SUpload from '../../components/file/StandardUploadFile'
import { AcceptImageAll } from '../../utils/helper/accept.helper'
import { ddcomplexPicker, getApproverIds } from '../../service/ddJsApi.service'
import { getCurrentUserInfo, getAgentId } from '../../service/currentUser.service'
import { startProcessInstance } from '../../api/ddApi'
export default {
  name: 'CaseApprovalCreate',
  components: {
    ItemGroup,
    SUpload
  },
  data () {
    return {
      message: '',
      showPopup: false,
      loading: false,
      access: AcceptImageAll,
      casereport: {
        caseName: '',
        caseId: '',
        ay: '',
        dsy: '',
        aq: '',
        yj: `    当事人已违反《中华人民共和国×××法》×××条×××款×××项、
        《云南省抚仙湖保护条例》第×××条×××款×××项、......的规定，
        根据《中华人民共和国×××法》×××条×××款×××项、
        《云南省抚仙湖保护条例》第×××条×××款×××项、......的规定，
        建议对×××的违法问题立案查处。`
      },
      caseColumns: [
        {
          text: '立案报告1',
          key: 1
        },
        {
          text: '立案报告2',
          key: 2
        },
        {
          text: '立案报告3',
          key: 3
        }
      ]
    }
  },
  created () {

  },
  methods: {
    togglePopup () {
      this.showPopup = !this.showPopup
    },
    handleShowPopup () {
      this.showPopup = true
    },
    onConfirm (value) {
      this.casereport.caseName = value.text
      this.casereport.caseId = value.key
      this.togglePopup()
    },
    save () {
      ddcomplexPicker().then((approve) => {
        console.log('Approve', approve)
        var userInfo = getCurrentUserInfo()
        const data = {}
        data.AgentId = parseInt(getAgentId())
        data.ProcessCode = 'PROC-3FAAE43D-D1F0-457E-864A-BFB3F44F3C23'
        data.OriginatorUserId = userInfo.userid
        data.DeptId = userInfo.deptid
        data.Approvers = getApproverIds()
        var formComponentValues = []
        formComponentValues.push({
          name: '当事人',
          value: this.casereport.dsy
        })
        formComponentValues.push({
          name: '案由',
          value: this.casereport.ay
        })
        formComponentValues.push({
          name: '案情',
          value: this.casereport.aq
        })
        formComponentValues.push({
          name: '违法依据',
          value: this.casereport.yj
        })
        formComponentValues.push({
          name: '立案报表详情',
          value: 'http://192.168.0.102:8080/sh#/caseReportDetail'
        })
        const fileResult = this.$refs.myupload.getUploadResult()
        console.log('fileResult', fileResult)
        const fileIds = []
        const formFileValues = []
        fileResult.forEach(item => {
          fileIds.push(item.fileId)
          formFileValues.push({
            spaceId: item.spaceId,
            fileName: item.fileName,
            fileSize: item.fileSize,
            fileType: item.fileType,
            fileId: item.fileId
          })
        })

        formComponentValues.push({
          name: '证据附件',
          value: formFileValues
        })
        data.FormComponentValues = JSON.stringify(formComponentValues)
        console.log('startProcessInstance', data)
        this.loading = true
        startProcessInstance(data).then(res => {
          var msg = '提交审批流程成功,实例ID:' + res.ProcessInstanceId
          this.$dialog.alert({
            message: msg
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
