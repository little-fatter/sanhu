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
  .margin-right20 {
      margin-right: 20px;
  }
}

.case-box {
  background-color: #f4f3f3;

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
          <span class="page-title">物品清单</span>
        </a-col>
        <a-col :span="3" class="border-bottom">
          <a-button @click="openEventModal" type="primary">选择关联案件</a-button>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案由</span>
          <span class="ant-col-16">
            {{ caseInfo.CauseOfAction }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">案件号</span>
          <span class="ant-col-16">
            {{ caseInfo.CaseNumber }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <a-select class="ant-col-20" labelInValue @change="objectChange" v-if="caseInfo.LawPartys && caseInfo.LawPartys.length > 0" placeholder="请选择">
            <a-select-option v-for="(item) in caseInfo.LawPartys" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
          </a-select>
          <a-select class="ant-col-20" labelInValue @change="objectChange" v-else placeholder="请选择">
            <a-select-option v-for="(item) in lawPersonOption" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">物品</span>
          <div class="ant-col-20" >
            <div v-for="(item,index) in list" :key="index+'111'">
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <a-input placeholder="请输入物品名称" v-model="item.name"></a-input>
                </a-col>
                <a-col :span="10">
                  <a-input placeholder="请输入物品生产企业或经营单位" v-model="item.enterprise"></a-input>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <a-input placeholder="请输入规格" v-model="item.specification"></a-input>
                </a-col>
                <a-col :span="10">
                  <a-input placeholder="请输入生产批次" v-model="item.batchNumber"></a-input>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <a-input placeholder="请输入生产时间" v-model="item.produceDate"></a-input>
                </a-col>
                <a-col :span="10">
                  <a-input placeholder="请输入数量" v-model="item.count"></a-input>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <a-input placeholder="请输入单价" v-model="item.price"></a-input>
                </a-col>
                <a-col :span="10">
                  <a-input placeholder="请输入包装" v-model="item.pack"></a-input>
                </a-col>
              </a-row>
              <a-row class="margin-bottom15" type="flex" justify="space-between">
                <a-col :span="10" class="margin-right20">
                  <a-input placeholder="备注" v-model="item.remark"></a-input>
                </a-col>
                <a-col :span="10">
                  <a-button type="primary" @click="addList" class="margin-right20">添加</a-button>
                  <span @click="deleteList(index)" v-if="list.length > 1">删除</span>
                </a-col>
              </a-row>
            </div>
          </div>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">其他物品</span>
          <div class="ant-col-20" >
            <a-textarea placeholder="请输入物品描述" v-model="others" style="min-height:50px;"></a-textarea>
          </div>
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

<script>
import { getDictionary, commonOperateApi, getDetails } from '../../api/sampleApi'
import SelectCase from '../../components/business/SelectCase'
import { isNotEmpty } from '../../utils/util'
export default {
  name: 'InventoryCreate',
  components: { SelectCase },

  props: {

  },
  data () {
    return {
      loading: false,
      isRelated: false,
      caseInfo: {
        ay: null
      },
      event: {},
      taskInfo: {},
      eventInfoId: null,
      CaseID: null,
      dsr: {},
      others: null,
      list: [
        {
          name: '',
          enterprise: '',
          specification: '',
          batchNumber: '',
          produceDate: '',
          count: null,
          price: null,
          pack: '',
          remark: ''
        }
      ], // 物品信息
      lawPersonOption: [{ id: '1', name: '李柳' }, { id: '2', name: '李思' }, { id: '3', name: '王琴' }, { id: '4', name: '陈琴' }] // 执法检查人
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    // 返回表单类型
    onReturn () {
      this.$router.push('/data-manage/form/form-add-list')
    },
    openEventModal () {
      this.$refs.selectCase.open()
    },
    // 选择案件
    selectCase (record) {
      this.caseInfo = record
      this.isRelated = true
    },
    // 添加物品
    addList () {
      this.list.push({
        name: '',
        enterprise: '',
        specification: '',
        batchNumber: '',
        produceDate: '',
        count: null,
        price: null,
        pack: '',
        remark: ''
      })
    },
    // 删除物品
    deleteList (index) {
      this.list.splice(index, 1)
    },
    objectChange (value) {
      console.log(value)
      this.dsr.id = value.key
      this.dsr.name = value.label
      console.log(this.dsr)
    },
    init () {
      const queryParam = this.$route.query
      const taskid = queryParam.taskid
      if (isNotEmpty(taskid)) {
        getDetails('work_task', taskid)
          .then(res => {
            this.taskInfo = res
            this.eventInfoId = res.EventInfoId
            this.CaseID = res.CaseID
            this.getEventInfo(res.EventInfoId)
            this.getCaseInfo(res.CaseID)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getEventInfo (EventInfoId) {
      getDetails('event_info', EventInfoId).then((res) => {
        if (res) {
          this.event = res
        }
      })
    },
    getCaseInfo (CaseID) {
      if (isNotEmpty(CaseID)) {
        getDetails('case_Info', CaseID)
          .then(res => {
            this.caseInfo = res
            this.isRelated = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    onSubmit () {
      var forms = {
        caseInfo: this.caseInfo,
        inventory: { lawParty: this.dsr.id, lawPartyName: this.dsr.name, list: this.list, Othergoods: this.others }
      }
      this.showPopup = true
      console.log(forms)
      this.$router.push({ name: 'inventoryView', params: { forms: forms } })
    }
  }
}
</script>
