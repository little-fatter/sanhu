<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="casereport.caseName"
        label="选择案件"
        placeholder="请选择案件"
        :readonly="true"
      >
        <van-icon name="ellipsis" slot="right-icon" @click="handleShowPopup" />
      </van-field>
      <van-field
        v-model="casereport.dsy"
        label="当事人"
        placeholder="请输入当事人"
      />
      <van-field
        v-model="casereport.xb"
        label="性别"
        placeholder="请输入性别"
      />
      <van-field
        v-model="casereport.sfz"
        label="身份证号"
        placeholder="请输入身份证号"
      />
      <van-field
        v-model="casereport.ajly"
        label="案件来源"
        placeholder="请输入案件来源"
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
        :sync2Dingding="false"
      >
      </s-upload>
    </item-group>
    <item-group title="违法依据">
      <div>
        {{ casereport.yj }}
      </div>
    </item-group>
    <van-cell-group>
      <van-field
        v-model="casereport.sbr"
        label="上报人员"
        placeholder="请输入上报人员"
      />
    </van-cell-group>
    <div class="operate-area">
      <van-button type="info" :loading="loading" @click="save" size="large">保存</van-button>
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
export default {
  name: 'CaseReportCreate',
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
        sbr: '',
        caseName: '',
        xb: '',
        sfz: '',
        ajly: '',
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
          text: '案件1',
          key: 1
        },
        {
          text: '案件2',
          key: 2
        },
        {
          text: '案件3',
          key: 3
        }
      ]
    }
  },
  created () {

  },
  mounted () {
    // ddsetNavigateSingeRight('发送').then((res) => {
    //   var msg = parseInt(new Date().getTime() / 1000)
    //   ddAlert('点击了发送' + msg)
    // })
    var items = [
      {
        id: '1', // 字符串
        iconId: 'file', // 字符串，图标命名
        text: '帮助'
      },
      {
        id: '2',
        iconId: 'photo',
        text: 'dierge'
      },
      {
        id: '3',
        iconId: 'setting',
        text: 'disange'
      },
      {
        id: '4',
        iconId: 'time',
        text: 'disige'
      }
    ]
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
      this.togglePopup()
    },
    save () {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
