<style scoped>
/deep/ .ant-calendar-picker {
  width: 100% !important;
}

/deep/ .ant-col-20 .ant-input-group-addon {
  background-color: #1890ff;
}

/deep/ .ant-col-20 .ant-btn {
  box-shadow: none;
}

/deep/ .ant-col-20 .ant-btn:hover,
/deep/ .ant-col-20 .ant-btn:focus {
  background-color: #1890ff;
  border-color: #1890ff;
}
</style>
<style scoped lang='less'>
* {
  box-sizing: border-box;
}

.margin-bottom30 {
  margin-bottom: 30px;
  .box {
    display:inline-block;
    .boxItem {
      .span {
      color:#3A9DFA;
    margin-bottom: 30px;
}
    }
  }
}

.margin-bottom15 {
  margin-bottom: 15px;
}

.case-box {
  background-color: #f4f3f3;
  // height: 100vh;
  // overflow: auto;

  .case-top {
    padding: 0px 55px;
    background-color: #fff;
    .border-bottom {
      border-bottom: solid 1px #dcdee2;
      justify-content: flex-start;
      display: flex;
      padding: 25px 0 25px 25px;
      .page-title-border {
        background-color: #3a9dfa;
        height: 20;
        width: 4px;
        border-radius: 4px;
        margin-right: 8px;
      }
      .page-title {
        color: #222328;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .case-body {
    // margin-top: 15px;
    padding: 26px 55px;
    background-color: #fff;
  }
  .case-body span.ant-col-4,.case-body span.ant-col-2 {
    font-size: 14px;
    font-weight: bold;
    color: #64697C;
  }
  .card-sub-style .ant-card-body > div > div > div:first-child {
    text-align: right;
  }
  .lay_part_info{
    display: flex;
    justify-content: space-between;
    width: 100%;
    .sub_info{
      width:18%;
    }
    .sub_info_compy{
      width:28%;
    }
    .sub_info_address{
      width: 59%;
    }
    .sub_info_hao{
      margin-left: 2.5%;
    }
  }
}
</style>
<template>
  <div class="case-box">
    <div class="case-top">
      <a-row type="flex" justify="center">
        <a-col :span="17" class="border-bottom">
          <span class="page-title-border"></span>
          <span class="page-title">创建笔录</span>
        </a-col>
        <a-col :span="3" class="border-bottom">
          <a-button @click="openEventModal" type="primary">选择关联案件</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">案由</span>
          <span class="ant-col-20">
            <a-textarea
              v-model="mode.Originofcase"
              placeholder="请填写案由"
              :autosize="{ minRows: 2, maxRows: 10 }"
            />
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">询问对象</span>
          <span class="ant-col-16">
            <a-select class="ant-col-24" v-model="mode.InquiryType" placeholder="请选择">
              <a-select-option v-for="(item) in pbjectOption" :value="item.value" :key="item.value+'123@'">{{ item.text }}</a-select-option>
            </a-select>
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">询问地点</span>
          <span class="ant-col-16">
            <a-input placeholder="请输入事询问地点" class="ant-col-24" v-model="mode.Enquiryplace">
            </a-input>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">开始时间</span>
          <span class="ant-col-16">
            <a-date-picker
              showTime
              :disabledDate="disabledDate"
              placeholder="请选择时间"
              format="YYYY-MM-DD HH:mm"
              @change="selectStartTime"
            />
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">结束时间</span>
          <span class="ant-col-16">
            <a-date-picker
              showTime
              :disabledDate="disabledDate"
              placeholder="请选择时间"
              format="YYYY-MM-DD HH:mm"
              @change="selectEndTime"
            />
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <party-info ref="partyInfo" :initData="caseInfo.LawParties"></party-info>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">执法检查人员</span>
          <span class="ant-col-16">
            <a-select
              class="ant-col-24"
              mode="multiple"
              v-model="lawPersions"
              labelInValue
              placeholder="请选择">
              <a-select-option v-for="(item,index) in lawPersonOption" :value="item.id" :key="index + '12'">{{ item.name }}</a-select-option>
            </a-select>
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">记录人</span>
          <span class="ant-col-16">
            <a-select class="ant-col-24" labelInValue @change="recorderChange" placeholder="请选择">
              <a-select-option v-for="(item,index) in recordPersonOption" :value="item.id" :key="index + '12'">{{ item.name }}</a-select-option>
            </a-select>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <a-row>
            <span class="ant-col-4">被询问人是否看清执法证件</span>
            <span class="ant-col-16">
              <a-radio-group class="ant-col-24" v-model="mode.Isseeclearly">
                <a-radio :style="radioStyle" :value="1">看清</a-radio>
                <a-radio :style="radioStyle" :value="2">不清除</a-radio>
              </a-radio-group>
            </span>
          </a-row>
          <a-row>
            <span class="ant-col-4"></span>
            <span class="ant-col-16">
              依照法律规定，被询问人对调查询问，享有申请执法人员回避的权利，有如实接受调查询问的法律义务，如有意隐匿违法行为或者故意作伪证将承担法律责任。              </span>
          </a-row>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">被询问人是否明白权责义务</span>
          <span class="ant-col-16">
            <a-radio-group class="ant-col-24" v-model="mode.Isunderstand">
              <a-radio :style="radioStyle" :value="1">明白</a-radio>
              <a-radio :style="radioStyle" :value="2">不明白</a-radio>
            </a-radio-group>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">询问记录</span>
          <span class="ant-col-20">
            <a-textarea
              v-model="mode.Inquiryrecord"
              placeholder="请填写询问记录"
              :autosize="{ minRows: 2, maxRows: 10 }"
            />
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="8">
          <span class="ant-col-4"></span>
          <span class="ant-col-16">
            <a-button @click="onReturn" style="margin-right:20px;">返回</a-button>
            <a-button v-show="isRelated" type="primary" icon="check" @click="onSubmit">确认提交</a-button>
          </span>
        </a-col>
      </a-row>
    </div>
    <div>
      <select-case ref="selectCase" @on-select="selectCase"></select-case>
    </div>
  </div>
</template>
1
<script>
import { getDictionary, commonOperateApi, getFormDetail } from '../../api/sampleApi'
import { getCurrentUser } from '../../config/currentUser'
import { isNotEmpty } from '../../utils/util'
import SelectCase from '../../components/business/SelectCase'
import PartyInfo from './components/party'
import moment from 'moment'
export default {
  name: 'AskPutDownCreate',
  components: { PartyInfo, SelectCase },
  data () {
    return {
      isRelated: false,
      caseInfo: {},
      radioStyle: {
        height: '30px',
        margin: '20px'
      },
      mode: {
        InquiryType: null, // 询问对象
        Originofcase: '', // 案由
        Inquiryrecord: '', // 询问记录
        Isseeclearly: 1, // 是否清楚
        Isunderstand: 1, // 是否明白
        Enquiryplace: null, // 询问地点
        startTime: null,
        endTime: null
      },
      pbjectOption: [
        {
          text: '当事人', value: '当事人'
        },
        {
          text: '证人', value: '证人'
        },
        {
          text: '第三人', value: '第三人'
        }
      ],
      lawPersions: [], // 执法检查人员
      lawPersionNames: '',
      recordPersions: [], // 记录人员
      recordPersionNames: null, // 记录人员
      lawPersonOption: [{ id: '1', name: '李柳' }, { id: '2', name: '李思' }, { id: '3', name: '王琴' }, { id: '4', name: '陈琴' }], // 执法检查人
      recordPersonOption: [{ id: '1', name: '张柳' }, { id: '2', name: '张思' }, { id: '3', name: '王华' }, { id: '4', name: '陈华' }] // 执法检查人
    }
  },
  created () {
  },
  methods: {
    // 返回表单类型
    onReturn () {
      this.$router.push('/data-manage/form/form-add-list')
    },
    openEventModal () {
      this.$refs.selectCase.open()
    },
    selectCase (record) {
      getFormDetail('case_Info', null, record.ID).then((res) => {
        this.caseInfo = {
          ...res.MainForm,
          LawParties: res.law_party
        }
        this.mode.Originofcase = record.CauseOfAction
        this.mode.Enquiryplace = record.IncidentAddress
      })
      this.isRelated = true
    },
    // 禁用时间
    disabledDate (current) {
      return current && current > moment().endOf('day')
    },
    onSubmit () {
      var lawParties = this.caseInfo.LawParties
      if (this.mode.InquiryType !== '当事人') {
        lawParties = this.$refs.partyInfo.getResult()
      }
      var lawPersions = []
      this.lawPersions.forEach(item => {
        lawPersions.push(item.label)
      })
      var forms = {
        caseInfo: this.caseInfo,
        lawParties: lawParties,
        form: this.mode,
        lawPersions: this.lawPersions,
        lawPersionNames: lawPersions.join(),
        recordPersionNames: this.recordPersionNames
      }
      this.$router.push({ name: 'askPutdownPreview', params: { forms: forms } })
    },
    recorderChange (value) {
      this.recordPersionNames = value.label
      this.recordPersions = value.key
    },
    // 开始时间
    selectStartTime (value, dateString) {
      this.mode.startTime = dateString
    },
    // 结束时间
    selectEndTime (value, dateString) {
      this.mode.endTime = dateString
    }
  },
  // 生命周期钩子
  mounted () {
  }
}
</script>
