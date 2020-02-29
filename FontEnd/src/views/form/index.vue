<style scoped lang='less'>
.formContent {
 background-color:#EEEEEE;
 .return {
     color :#101010;
     font-weight: 700;
     font-family: SourceHanSansSC-bold;
     margin-bottom: 20px;margin-top:50px;
     font-weight: bold;
 }
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
 .searchLine {
     color:#101010;
     margin-bottom: 20px;
 }
 .searchItem {
     .submitTime {
        margin-bottom: 20px;
    }
 }
 .formStatus {
display:flex;margin-bottom: 20px;background-color: #ffffff;padding-bottom: 20px;padding-left: 30px;
div {
  margin-right:40px;
}
 }
 .searchItemBox {
        display:flex;justify-content: space-around;background-color: #ffffff;
    padding-bottom: 20px;
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

}
</style>
<template>
  <div class="formContent">
    <div class="tags" >
      <a-button class="button" :type="clickIndex == 1 ? 'primary' : 'default'" @click="clickIndex = 1">全部</a-button>
      <a-button class="button" :type="clickIndex == 2 ? 'primary' : 'default'" @click="clickIndex = 2">我发起的</a-button>
      <a-button class="button" :type="clickIndex == 3 ? 'primary' : 'default'" @click="clickIndex = 3">我审批的</a-button>
      <a-button class="button" :type="clickIndex == 4 ? 'primary' : 'default'" @click="clickIndex = 4">待我审批的</a-button>
      <a-button class="button" :type="clickIndex == 5 ? 'primary' : 'default'" @click="clickIndex = 5">抄送我的</a-button>
      <!-- <a-button class="button" type="primary" @click="$router.push('/form/form-add-list')">新增</a-button> -->
    </div>
    <div class="searchItemBox">
      <div>
        <span>发起时间：</span>
        <a-range-picker @change="onChange" />
      </div>
      <div>
        <span>完成时间：</span>
        <a-range-picker @change="onChange" />
      </div>
      <div class="formNameBox">
        <div class="itemName">表单名称：</div>
        <a-input class="itemInput" v-model="formName" placeholder="请输入表单名称、申请人名字、审批意见"/>
      </div>
      <div class="searchButtonItem">
        <a-button class="search" type="primary">搜索</a-button>
      </div>
    </div>
    <div class="formStatus">
      <div>
        <span>表单状态：</span>
        <a-select v-model="formState" style="min-width: 120px" @change="formStateChange">
          <a-select-option v-for="item in formStateOptions" :key="item.ID" :value="item.Title">{{ item.Title }}</a-select-option>
        </a-select>
      </div>
      <div>
        <span>表单类型：</span>
        <a-select v-model="formTypes" style="min-width: 120px" @change="formTypesChange">
          <a-select-option v-for="item in formTypeOptions" :key="item.ID" :value="item.Title">{{ item.Title }}</a-select-option>
        </a-select>
      </div>
    </div>
    <div>
      <a-table
        :customRow="clickRow"
        style="background-color: #ffffff"
        :columns="columns"
        :pagination="pagination"
        :rowKey="record => record.ID"
        :dataSource="data"
      >
      </a-table>
    </div>
    <a-modal
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
    </a-modal>
  </div>
</template>

<script>
import { getFormList, getDictionary } from '@/api/sampleApi'

export default {
  name: 'Index',
  data () {
    return {
      visible: false,
      clickIndex: 1,
      formState: '全部状态',
      formTypes: '全部类型',
      formStateOptions: [],
      formTypeOptions: [],
      formName: '',
      columns: [{
        title: '',
        dataIndex: '',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '表单编号',
        dataIndex: 'FormID',
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
      }],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      data: []
    }
  },
  mounted () {
    this.getFormList()
  },
  created () {
    this.getFormType()
    this.getFormState()
  },
  methods: {
    clickRow (record, index) {
      return {
        on: {
          click: () => {
            if (index === 0) {
              console.log(record, index)

              this.$router.push('/data-manage/form/form-details')
            }
            if (index === 1) { this.$router.push('/data-manage/form/close-person-report') }
            if (index === 2) { this.$router.push('/data-manage/form/close-org-report') }
            console.log(record, index)
          }
        }
      }
    },
    // 获取表单类型
    getFormType () {
      getDictionary({ model: 'res_dictionary', context: 'FormType' }).then(res => {
        this.formTypeOptions = res
        const option = { ID: 'quanbu',
          Title: '全部类型' }
        this.formTypeOptions.splice(0, 0, option)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取表单状态
    getFormState () {
      getDictionary({ model: 'res_dictionary', context: 'FormState' }).then(res => {
        this.formStateOptions = res
        const option = { ID: 'quanbu',
          Title: '全部状态' }
        this.formStateOptions.splice(0, 0, option)
      }).catch((err) => {
        console.log(err)
      })
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    formStateChange (value) {
      console.log(`selected ${value}`)
    },
    formTypesChange (value) {
      console.log(`selected ${value}`)
    },
    gotoDetail () {
      this.$router.push('/form/form-details')
    },
    sendNotice () {
      this.visible = true
    },
    editForm () {
      this.$router.push({ path: '/form/form-edit' })
    },
    getFormList () {
      getFormList().then(res => {
        this.data = res.Rows
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
