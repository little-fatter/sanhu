<template>
  <div class="page-content">
    <!-- <home-page-layout ref="homePageLayout" :isNeedBanner="false" v-if="isNeedMenuLayout">
      <div>
        <p>测试Token： {{ token }}</p>
        <p>当前人： {{ userName }}</p>
        <p>部门：{{ deptId }}</p>
        <p>spaceid：{{ spaceid }}</p>
        <van-button @click="fileUploadTest">附件上传测试</van-button>
        <van-button @click="fileView">附件预览测试</van-button>

        <s-upload ref="myupload"></s-upload>
        <van-button @click="getUploadResult">获取上传结果</van-button>
        <van-button @click="selectPersion">选择人</van-button>
      </div>
    </home-page-layout>
    <div v-else>
      <p>测试Token： {{ token }}</p>
      <p>当前人： {{ userName }}</p>
      <p>部门：{{ deptId }}</p>
      <van-button @click="selectPersion">选择人</van-button>
    </div> -->
    <van-button @click="test">测试</van-button>
  </div>
</template>

<script>
import { getCurrentUserInfo } from '../../service/currentUser.service'
import { ddgetCustomSpace, ddgrantCustomSpace, ddfilePreview, ddcomplexPicker, ddAlert } from '../../service/ddJsApi.service'
import { startProcessInstance } from '@/api/ddApi'
import HomePageLayout from '@/components/layouts/HomePageLayout'
import appConfig from '@/config/app.config'
import SUpload from '@/components/file/StandardUploadFile'
import * as dd from 'dingtalk-jsapi'
import { sendChatMsg } from '../../api/ddApi'
export default {
  name: 'Workplace',
  components: {
    HomePageLayout,
    SUpload
  },
  data () {
    return {
      isNeedMenuLayout: appConfig.isNeedMenuLayout,
      num: '',
      token: '',
      userId: '',
      userName: '',
      deptId: '',
      spaceid: '',
      fileResult: {}
    }
  },
  created () {
    var userInfo = getCurrentUserInfo()
    this.userId = userInfo.userid
    this.userName = userInfo.name
    this.deptId = userInfo.deptid
    this.token = userInfo.token

    // ddgetCustomSpace('abcdef').then(res => {
    //   this.spaceid = res
    // })

    // ddgrantCustomSpace('add', 'abcdef').then((res) => {
    //   console.log('附加新增授权信息：', res)
    // })
  },
  mounted () {

  },
  methods: {
    test () {
      dd.biz.chat.chooseConversationByCorpId({
        corpId: 'ding8fd8d57eb130109b4ac5d6980864d335', // 企业id,必须是用户所属的企业的corpid
        isAllowCreateGroup: false,
        filterNotOwnerGroup: false,
        onSuccess: function (res) {
          ddAlert(res.chatId)
          // onSuccess将在选择结束之后调用
          /* {
            chatId: 'xxxx',
            title:'xxx'
        } */
          var data = {
            Chatid: res.chatId,
            Msgtype: 'text',
            Text_: {
              Content: '这是群消息测试'
            }
          }
          sendChatMsg(data).then((res) => {
            this.$toast.success('发送群消息成功')
          })
        },
        onFail: function (err) {
          ddAlert(err)
        }
      })
    },
    onSubmit () {
      var data = {
        originator_user_id: this.userId,
        dept_id: this.deptId
      }
      data.form_component_values = [
        { name: '请假天数', value: this.num },
        {
          name: '请假明细',
          value: [
            { name: '明细1', value: 'a1' },
            { name: '明细2', value: 'a2' }
          ]
        },
        {
          name: '请假明细',
          value: [
            { name: '明细1', value: 'b1' },
            { name: '明细2', value: 'b2' }
          ]
        }
      ]
      startProcessInstance(data).then((res) => {
        this.$toast.success(`保存成功,实例Id:${res.process_instance_id}`)
      })
    },
    onCreateWorkrecord () {

    },
    fileView () {
      var file = this.fileResult.data[0]
      ddfilePreview('abcdef', file)
    },
    getUploadResult () {
      const result = this.$refs.myupload.getUploadResult()
      console.log('result', result)
    },
    selectPersion () {
      ddcomplexPicker().then(res => {
        console.log('选择人员:', res)
      })
    },
    fileUploadTest () {
      var that = this
      this.$dd.biz.util.uploadAttachment({
        image: { multiple: true, compress: false, max: 9, spaceId: that.spaceid },
        space: { corpId: appConfig.corpId, spaceId: that.spaceid, isCopy: 1, max: 9 },
        file: { spaceId: that.spaceid, max: 1 },
        types: ['photo', 'camera', 'file', 'space'], // PC端支持["photo","file","space"]
        onSuccess: function (result) {
          console.log('result', result)
          that.fileResult = result
          // onSuccess将在文件上传成功之后调用
        /*
       {
          type:'', // 用户选择了哪种文件类型 ，image（图片）、file（手机文件）、space（钉盘文件）
          data: [
             {
               spaceId: "232323",
               fileId: "DzzzzzzNqZY",
               fileName: "审批流程.docx",
               fileSize: 1024,
               fileType: "docx"
            },
            {
               spaceId: "232323",
               fileId: "DzzzzzzNqZY",
               fileName: "审批流程1.pdf",
               fileSize: 1024,
               fileType: "pdf"
            },
            {
               spaceId: "232323",
               fileId: "DzzzzzzNqZY",
               fileName: "审批流程3.pptx",
               fileSize: 1024,
               fileType: "pptx"
             }
          ]

       }
        */
        },
        onFail: function (err) {
          console.log('err', err)
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
</style>
