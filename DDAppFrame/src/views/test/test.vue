<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="leave.num"
        label="请假天数"
        placeholder="请输入请假天数"
      />

    </van-cell-group>
    <item-group title="请上传图片">
      <s-upload
        ref="myupload"
        :accept="access"
      >
      </s-upload>
    </item-group>
    <div class="operate-area">
      <van-button type="info" :loading="loading" @click="save" size="large">保存</van-button>
      <div>当前示例：{{ processInstanceId }}</div>
      <div>当前spaceId：{{ spaceId }}</div>
    </div>
  </div>

</template>

<script>
import ItemGroup from '../../components/tools/ItemGroup'
import SUpload from '../../components/file/StandardUploadFile'
import { AcceptImageAll } from '../../utils/helper/accept.helper'
import { startProcessInstance } from '../../api/ddApi'
import { getCurrentUserInfo, getAgentId } from '../../service/currentUser.service'
import { ddprocessinstanceCspacePreview, ddprocessinstanceCspaceInfo } from '../../service/ddJsApi.service'
export default {
  name: '',
  components: {
    ItemGroup,
    SUpload
  },
  data () {
    return {
      access: AcceptImageAll,
      loading: false,
      leave: {
        num: ''
      },
      processInstanceId: '',
      spaceId: ''
    }
  },
  created () {
    ddprocessinstanceCspaceInfo().then((res) => {
      this.spaceId = res
    })
  },
  mounted () {
    console.log('url', window.location.href)
  },
  methods: {
    save () {
      var userInfo = getCurrentUserInfo()
      console.log('userInfo', userInfo)
      const data = {}
      data.AgentId = parseInt(getAgentId())
      data.ProcessCode = 'PROC-0B1F060A-3DD4-4F1C-A215-EF0072D4795E'
      data.OriginatorUserId = userInfo.userid
      data.DeptId = userInfo.deptid
      data.Approvers = userInfo.userid
      var formComponentValues = []
      formComponentValues.push({
        name: '请假天数',
        value: this.leave.num
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
      var fileIdsStr = fileIds.join()

      formComponentValues.push({
        name: '附件',
        value: formFileValues
      })
      data.FormComponentValues = JSON.stringify(formComponentValues)
      console.log('startProcessInstance', data)
      this.loading = true
      startProcessInstance(data).then(res => {
        this.processInstanceId = res
        // this.$toast.success('发起流程成功')
        ddprocessinstanceCspacePreview(fileIdsStr, null, res, data.Approvers).then((tt) => {
          this.$toast.success('发起流程成功')
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
