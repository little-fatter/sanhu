<style scoped lang='less'>
.formContent {
 background-color:#EEEEEE;
 .tags{
    padding-bottom: 20px;padding-top:20px;background-color: #ffffff;margin-top:30px;
    .button {
        margin-left:40px;
    }
    .title {
        color:#101010;
        margin-right:20px;
    }
 }
 .searchItemBox {
        display:flex;justify-content: space-around;background-color: #ffffff;
    padding-bottom: 20px;align-items: flex-start;
    .secondLine {
      margin-top:20px;
      .select {
        min-width: 316px!important;
      }
    }
        .formNameBox {
            display: flex;align-items: center;
            .itemName {
                min-width: 80px;
            }
            .itemInput {
                display:inline-block
            }
        }
        .searchButtonItem {
            display:flex;align-items: center;
            .search {
                margin-right:10px;
            }
        }
    }
    .table {
      background-color:#ffffff;padding: 20px;
    }
}
</style>
<template>
  <div class="formContent">
    <div class="tags" >
      <!-- <a-button class="button" :type="clickIndex == 1 ? 'primary' : 'default'" @click="clickIndex = 1">全部</a-button>
      <a-button class="button" :type="clickIndex == 2 ? 'primary' : 'default'" @click="clickIndex = 2">我发起的</a-button>
      <a-button class="button" :type="clickIndex == 3 ? 'primary' : 'default'" @click="clickIndex = 3">我审批的</a-button>
      <a-button class="button" :type="clickIndex == 4 ? 'primary' : 'default'" @click="clickIndex = 4">待我审批的</a-button>
      <a-button class="button" :type="clickIndex == 5 ? 'primary' : 'default'" @click="clickIndex = 5">抄送我的</a-button>
      <a-button class="button" type="primary" @click="$router.push('/form/form-add-list')">新增</a-button> -->
    </div>
    <div class="searchItemBox">
      <div>
        <div>
          <span>发起时间：</span>
          <a-range-picker @change="onInitiationChange" />
        </div>
        <div v-show="open" class="secondLine">
          <span>表单状态：</span>
          <a-select class="select" v-model="formState">
            <a-select-option v-for="item in formStateOptions" :key="item.ID" :value="item.ItemCode">{{ item.Title }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div>
        <div>
          <span>完成时间：</span>
          <a-range-picker @change="onEndChange" />
        </div>
        <div v-show="open" class="secondLine">
          <span>表单类型：</span>
          <a-select class="select" v-model="formTypes" style="min-width: 120px">
            <a-select-option v-for="item in formTypeOptions" :key="item.ID" :value="item.ItemCode">{{ item.Title }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="formNameBox">
        <div class="itemName">表单名称：</div>
        <a-input class="itemInput" v-model="formName" placeholder="请输入表单名称、申请人名字、审批意见"/>
      </div>
      <div class="searchButtonItem">
        <a-button class="search" type="primary" @click="onSearch">搜索</a-button>
        <span v-show="!open" class="search" @click="open = true">展开</span>
        <span v-show="open" class="search" @click="open = false">收起</span>
      </div>
    </div>
    <div class="table">
      <s-table
        ref="table"
        size="default"
        :columns="columns"
        :dataCallback="loadData"
      >
        <template slot="action" slot-scope="text, record">
          <div class="editable-row-operations">
            <span>
              <a @click="() => gotoDetail(record)">查看</a>
            </span>
          </div>
        </template>
      </s-table>
    </div>
    <!-- <a-modal
      v-model="visible"
    >
      <template slot="header">
      </template>
      <template slot="footer">
        <div style="display:flex;justify-content:center;">
          <a-button style="margin-right:20px;" key="back" @click="visible = false">发送</a-button>
          <a-button key="submit" >
            拨打电话
          </a-button>
        </div>
      </template>
      <a-form style="margin-top:20px;" class="form">
        <a-form-item
          label="通知对象"
          :labelCol="{span:6}"
          :wrapperCol="{span:14}">
          <a-input placeholder="Basic usage"/>
        </a-form-item>
        <a-form-item
          label="通知方式"
          :labelCol="{span:6}"
          :wrapperCol="{span:14}">
          <a-input-group size="large">
            <a-col :span="7">
              <a-select defaultValue="短信">
                <a-select-option value="短信">短信</a-select-option>
                <a-select-option value="邮箱">邮箱</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="17">
              <a-input defaultValue="26888888" />
            </a-col>
          </a-input-group>
        </a-form-item>
        <a-form-item
          label="通知内容"
          :labelCol="{span:6}"
          :wrapperCol="{span:14}">
          <a-input placeholder="Basic usage"/>
        </a-form-item>
        <a-form-item
          label="链接"
          :labelCol="{span:6}"
          :wrapperCol="{span:14}">
          <a-input placeholder="Basic usage"/>
        </a-form-item>
      </a-form>
    </a-modal> -->
  </div>
</template>

<script>
import { getPageData, getDictionary } from '@/api/sampleApi'
import STable from '@/components/table/'
import { isNotEmpty } from '@/utils/util'

export default {
  name: 'Index',
  components: {
    STable
  },
  data () {
    return {
      open: true,
      visible: false,
      clickIndex: 1,
      formStateOptions: [],
      formTypeOptions: [],
      formState: '', // 表单状态
      formTypes: '', // 表单类型
      BInitiationTime: '', // 开始发起时间
      EInitiationTime: '', // 结束发起时间
      BENDTime: '', // 开始完成时间
      EENDTime: '', // 结束完成时间
      formName: '', // 输入框内容
      queryParam: {}, // 查询参数
      columns: [
      //   {
      //   title: '',
      //   dataIndex: '',
      //   className: 'backColorType',
      //   align: 'center'
      // },
        {
          title: '表单编号',
          dataIndex: 'FormNumber',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '表单标题',
          dataIndex: 'FormName',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '表单摘要',
          dataIndex: 'ContentValidity',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '发起时间',
          dataIndex: 'InitiationTime',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '完成时间',
          dataIndex: 'CompletionTime',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '状态',
          dataIndex: 'FormState',
          className: 'backColorType',
          align: 'center'
        }, {
          title: '操作',
          dataIndex: 'action',
          width: '120px',
          scopedSlots: { customRender: 'action' }
        }],
      data: []
    }
  },
  mounted () {
  },
  created () {
    this.getFormType()
    this.getFormState()
  },
  methods: {
    onSearch () {
      this.$refs.table.refresh()
    },
    // 获取表单类型
    getFormType () {
      getDictionary({ model: 'res_dictionary', context: 'FormType' }).then(res => {
        this.formTypeOptions = res
        console.log(res)
        const option = { ID: 'allType',
          ItemCode: '',
          Title: '全部类型' }
        this.formTypeOptions.splice(0, 0, option)
        console.log(this.formTypeOptions)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取表单状态
    getFormState () {
      getDictionary({ model: 'res_dictionary', context: 'FormState' }).then(res => {
        this.formStateOptions = res
        const option = { ID: 'allState',
          ItemCode: '',
          Title: '全部状态' }
        this.formStateOptions.splice(0, 0, option)
      }).catch((err) => {
        console.log(err)
      })
    },
    onInitiationChange (date, dateString) {
      this.BInitiationTime = dateString[0]
      this.EInitiationTime = dateString[1]
    },
    onEndChange (date, dateString) {
      this.BEndTime = dateString[0]
      this.EEndTime = dateString[1]
    },
    gotoDetail (record) {
      if (record.FormType === 'form_confiscated_item') { // 物品清单
        this.$router.push({
          path: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'form_inquiryrecord') { // 询问记录
        this.$router.push({
          path: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'case_Info') { // 案件
        this.$router.push({
          path: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'law_punishmentInfo') { // 处罚当场决定书
        this.$router.push({
          path: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'case_report') { // 结案报告
        this.$router.push({
          path: '/data-manage/form/close-person-report',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'case_cover') { // 卷宗封面
        this.$router.push({
          path: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'form_inquestrecord') { // 勘验记录
        this.$router.push({
          name: 'sceneInvestigationDetail',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'form_inquiryrecord_third') { // 询问第三人笔录
        this.$router.push({
          name: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'form_inquiryrecord_litigant') { // 询问当事人笔录
        this.$router.push({
          name: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'task_patrol') { // 事件核查
        this.$router.push({
          name: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'task_survey') { // 现场勘查
        this.$router.push({
          name: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'form_confiscated') { // 没收清单
        this.$router.push({
          name: '',
          query: { id: record.ID }
        })
      } else if (record.FormType === 'form_inquiryrecord_witness') { // 询问证人笔录
        this.$router.push({
          name: '',
          query: { id: record.ID }
        })
      }
    },
    // 处理参数
    dealParameter () {
      var rules =
      [
        {
          field: 'InitiationTime',
          op: 'greater',
          value: '',
          type: 'datepicker'
        },
        {
          field: 'InitiationTime',
          op: 'less',
          value: '',
          type: 'datepicker'
        },
        {
          field: 'CompletionTime',
          op: 'greater',
          value: '',
          type: 'datepicker'
        },
        {
          field: 'CompletionTime',
          op: 'less',
          value: '',
          type: 'datepicker'
        },
        {
          field: 'FormState',
          op: 'equal',
          value: '',
          type: 'string'
        },
        {
          field: 'FormType',
          op: 'equal',
          value: '',
          type: 'string'
        }
      ]
      var groups =
      [
        {
          rules: [{
            field: 'FormName', // 表单名称
            op: 'like',
            value: '',
            type: 'string'
          }, {
            field: 'CaseNumber',
            op: 'like',
            value: '',
            type: 'string'
          }, {
            field: 'CauseOfAction',
            op: 'like',
            value: 'this.formName',
            type: 'string'
          }
          // {
          //   field: 'FormNumber',
          //   op: 'like',
          //   value: '',
          //   type: 'string'
          // }
          ],
          op: 'or' }
      ]
      var paramArr = [this.BInitiationTime, this.EInitiationTime, this.BEndTime, this.EEndTime, this.formState, this.formTypes]
      rules.map((item, index) => {
        item.value = paramArr[index]
      })
      var newRules = rules.filter(item => {
        return isNotEmpty(item.value)
      })
      var paramters = { groups: [], op: 'and', rules: [] }
      if (isNotEmpty(this.formName)) {
        groups[0].rules.map(item => {
          item.value = this.formName
        })
        paramters.groups = groups
        if (newRules.length > 0) {
          paramters.rules = newRules
        } else {
          paramters.rules = []
        }
      } else {
        paramters.groups = []
        if (newRules.length > 0) {
          paramters.rules = newRules
        } else {
          paramters.rules = []
        }
      }
      return paramters
    },
    loadData (parameter) {
      var queryParam = this.dealParameter()
      return getPageData('formwith_eventcase', queryParam, parameter.pageIndex, parameter.pageSize).then(res => {
        return res
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
