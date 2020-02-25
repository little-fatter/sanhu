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
        <a-select v-model="formState" style="width: 120px" @change="formStateChange">
          <a-select-option value="待审批">待审批</a-select-option>
          <a-select-option value="已审批">已审批</a-select-option>
          <a-select-option value="已提交">已提交</a-select-option>
        </a-select>
      </div>
      <div>
        <span>表单类型：</span>
        <a-select v-model="formTypes" style="width: 120px" @change="formTypesChange">
          <a-select-option value="类型1">类型1</a-select-option>
          <a-select-option value="类型2">类型2</a-select-option>
        </a-select>
      </div>
    </div>
    <div>
      <a-table
        style="background-color: #ffffff"
        :columns="columns"
        :pagination="pagination"
        :rowKey="record => record.InitiationTime"
        :dataSource="formData"
        bordered>
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
export default {
  name: 'Index',
  data () {
    return {
      visible: false,
      clickIndex: 1,
      formState: '待审批',
      formTypes: '类型1',
      formName: '',
      columns: [{
        title: '',
        dataIndex: 'InitiationTime',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '表单编号',
        dataIndex: 'finishTime',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '表单标题',
        dataIndex: 'formName',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '表单摘要',
        dataIndex: 'contentValidity',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '发起时间',
        dataIndex: 'department',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '完成时间',
        dataIndex: 'formStates',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '状态',
        dataIndex: 'applicant',
        className: 'backColorType',
        align: 'center'
      }],
      formData: [{
        InitiationTime: 'xxxx年yy月zz日',
        finishTime: 'xxxx年yy月zz日',
        formName: 'jack',
        contentValidity: 'New York No. 1 Lake Park',
        department: '技术部',
        formStates: '已提交',
        applicant: 'abbc'
      }],
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },
  methods: {
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
    }
  }
}
</script>
