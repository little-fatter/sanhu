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
        <a-col :span="20" class="border-bottom">
          <span class="page-title-border"></span>
          <span class="page-title">物品清单</span>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案由</span>
          <span class="ant-col-16">
            {{ caseInfo.CauseOfAction || '乱丢垃圾' }}
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">案件号</span>
          <span class="ant-col-16">
            {{ caseInfo.CaseNumber || '案456【12】36号' }}
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <a-select class="ant-col-20" labelInValue v-model="dsr.id" @change="objectChange" placeholder="请选择">
            <a-select-option v-for="(item) in caseInfo.dsrs" :value="item.id" :key="item.id">{{ item.name }}</a-select-option>
          </a-select>
          <span class="ant-col-20">
            选择当事人
          </span>
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
            <a-button block type="primary" icon="check" @click="onSubmit">确认提交</a-button>
          </span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getDictionary, commonOperateApi, getDetails } from '../../api/sampleApi'
import { isNotEmpty } from '../../utils/util'
export default {
  name: 'InventoryCreate',
  components: {
  },
  props: {

  },
  data () {
    return {
      loading: false,
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
      ] // 物品信息
    }
  },
  created () {
    this.init()
  },
  methods: {
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
      this.dsr.id = value.key
      this.dsr.name = value.name
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
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    onSubmit () {
      var forms = {
        caseInfo: this.caseInfo,
        inventory: { dsr: this.dsr, list: this.list, otherItem: this.others }
      }
      this.showPopup = true
      console.log(forms)
      this.$router.push({ name: 'inventoryView', params: { forms: forms } })
    }
  }
}
</script>
