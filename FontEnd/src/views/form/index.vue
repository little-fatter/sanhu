<style scoped lang='less'>
.formContent {
 padding:20px 40px;background-color:#EEEEEE;
 .return {
     color :#101010;
     font-weight: 700;
     font-family: SourceHanSansSC-bold;
     margin-bottom: 20px;margin-top:50px;
     font-weight: bold;
 }
 .tags{
    margin-bottom: 20px;margin-top:50px;
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
 .searchItemBox {
        display:flex;justify-content: space-between;margin-bottom: 20px;
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
            .advancedSearch:hover {
                cursor: pointer;
            }
        }
    }

}
</style>
<template>
  <div class="formContent">
    <div class="tags" v-show="AdvancedSearch">
      <span class="title">选择</span>
      <a-button class="button" :type="clickIndex == 1 ? 'primary' : 'default'" @click="clickIndex = 1">全部</a-button>
      <a-button class="button" :type="clickIndex == 2 ? 'primary' : 'default'" @click="clickIndex = 2">我发起的</a-button>
      <a-button class="button" :type="clickIndex == 3 ? 'primary' : 'default'" @click="clickIndex = 3">我审批的</a-button>
      <a-button class="button" :type="clickIndex == 4 ? 'primary' : 'default'" @click="clickIndex = 4">待我审批的</a-button>
      <a-button class="button" :type="clickIndex == 5 ? 'primary' : 'default'" @click="clickIndex = 5">抄送我的</a-button>
      <a-button class="button" type="primary" @click="$router.push('/form/form-add-list')">新增</a-button>
    </div>
    <div class="return" v-show="!AdvancedSearch" @click="AdvancedSearch = true">
      < 返回
    </div>
    <div class="searchLine">
      搜索
    </div>
    <div class="searchItem">
      <div class="submitTime" v-show="!AdvancedSearch">
        <span>提交审批时间：</span>
        <a-range-picker @change="onChange" />
      </div>
    </div>
    <div class="searchItemBox">
      <div v-if="AdvancedSearch">
        <span>发起时间：</span>
        <a-range-picker @change="onChange" />
      </div>
      <div v-else>
        <span>完成审批时间：</span>
        <a-range-picker @change="onChange" />
      </div>
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
      <div class="formNameBox">
        <div class="itemName">表单名称：</div>
        <a-input class="itemInput" v-model="formName" placeholder="请输入表单名称、申请人名字、审批意见"/>
      </div>
      <div class="searchButtonItem">
        <a-button class="search" type="primary">搜索</a-button>
        <div class="advancedSearch">
          <span v-if="AdvancedSearch" @click="AdvancedSearch = false">高级搜索</span>
          <span v-else @click="AdvancedSearch = true">关闭高级搜索</span>
        </div>
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
        <template slot="title" >
          我发起的表单
        </template>
        <span slot="action" >
          <a href="javascript:;" @click="gotoDetail">详情</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="editForm()">修改</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="$router.push('/form/form-print')">打印</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="sendNotice()">通知<span>(不可用)</span></a>
          <a-divider type="vertical" />
          <a href="javascript:;">
            罚款收取
          </a>
        </span>
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
      AdvancedSearch: true, // true为普通搜索，false为高级搜索
      formName: '',
      columns: [{
        title: '发起时间',
        dataIndex: 'InitiationTime',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '完成时间',
        dataIndex: 'finishTime',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '表单名称',
        dataIndex: 'formName',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '内容简介',
        dataIndex: 'contentValidity',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '申请部门',
        dataIndex: 'department',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '表单状态',
        dataIndex: 'formStates',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '申请人',
        dataIndex: 'applicant',
        className: 'backColorType',
        align: 'center'
      }, {
        title: '操作',
        dataIndex: 'action',
        className: 'backColorType',
        scopedSlots: { customRender: 'action' },
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
        pageSizeOptions: ['5', '10', '15', '20'],
        onShowSizeChange: (current, pageSize) => this.pageSize = pageSize
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
