<style scoped lang='less'>
* {
  box-sizing: border-box;
}

.margin-bottom30 {
  margin-bottom: 30px;
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
        <a-col :span="20" class="border-bottom">
          <span class="page-title-border"></span>
          <span class="page-title">创建案件</span>
        </a-col>
      </a-row>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">案由</span>
          <span class="ant-col-20">
            <a-textarea
              v-model="caseInfo.caseReason"
              placeholder="请填写案由"
              :autosize="{ minRows: 2, maxRows: 10 }"
            />
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">案件类型</span>
          <span class="ant-col-16">
            <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseType" @change="CaseTypeChoiceEvn">
              <a-select-option v-for="item in Case_Type" :key="item.ID+'@'" :value="item.ItemCode" >{{ item.Title }}</a-select-option>
            </a-select>
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">案件来源</span>
          <span class="ant-col-16">
            <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseFrom" @change="CaseSourceEvn">
              <a-select-option v-for="item in CaseSourceType" :key="item.ID+'@'" :value="item.ItemCode">{{ item.Title }}</a-select-option>
            </a-select>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="10">
          <span class="ant-col-4">适用程序</span>
          <span class="ant-col-16">
            <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseFunction" @change="CaseApplicableProcedureTypeEvn">
              <a-select-option v-for="item in CaseApplicableProcedureType" :key="item.ID+'@'" :value="item.ID">{{ item.Title }}</a-select-option>
            </a-select>
          </span>
        </a-col>
        <a-col :span="10">
          <span class="ant-col-4">事发时间</span>
          <span class="ant-col-16">
            <a-date-picker
              showTime
              placeholder="请选择时间"
              format="YYYY-MM-DD HH:mm"
              @change="selectTime"
            />
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">事发地点</span>
          <span class="ant-col-20">
            <a-input defaultValue="请输入事发地点" class="ant-col-24" v-model="caseInfo.caseLocation">
              <a-button
                @click="viewMap"
                slot="addonAfter"
                type="primary"
                shape="circle"
                icon="environment"
                size="small"
              />
            </a-input>
            <!--    地图查看弹窗-->
            <a-modal title="请选择位置" :visible="visible" @cancel="handleCancel">
              <!--<template slot="footer">
              <a-button @click="handleCancel">取消</a-button>
              </template>-->
              <p>展示地图</p>
            </a-modal>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">当事人</span>
          <span class="ant-col-20">
            <a-button type="primary" @click="addCaseBreakLow">新增当事人</a-button>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center" >
        <a-col
          class="margin-bottom15"
          :span="20"
          v-for="(item,index) in caseInfo.caseBreakLow"
          :key="index+'@'">
          <div class="ant-col-2"></div>
          <div class="ant-col-20">
            <span class="ant-col-24 lay_part_info margin-bottom15" >
              <a-select placeholder="请选择" v-model="item.belong" class="sub_info">
                <a-select-option value="个人">个人</a-select-option>
                <a-select-option value="单位">单位</a-select-option>
              </a-select>

              <template v-if="item.belong=='个人'">
                <a-input placeholder="请输入姓名" v-model="item.name" class="sub_info"/>
                <a-select placeholder="请选择" v-model="item.sex" class="sub_info">
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                </a-select>
                <a-input placeholder="请输入职业" v-model="item.profession" class="sub_info"/>
              </template>
              <template v-else>
                <a-input placeholder="请输入单位名称" v-model="item.companyName" class=" sub_info_compy"/>
                <a-input placeholder="请输入法人姓名" v-model="item.legalPerson" class=" sub_info_compy"/>
              </template>
              <a-input placeholder="请输入身份证号" v-model="item.idNumber" class="sub_info"/>
            </span>
            <span class="ant-col-24 lay_part_info" style="justify-content:start">
              <a-input placeholder="请输入现居住地址" class="sub_info_address" v-model="item.address" />
              <a-input placeholder="手机号" class="sub_info sub_info_hao" v-model="item.telNumber" />
              <a-button
                type="primary"
                icon="delete"
                class="sub_info_hao"
                @click="delCaseBreakLow(index)"
              >删除</a-button>
            </span>
          </div>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="20">
          <span class="ant-col-2">协办人</span>
          <span class="ant-col-20">
            <a-select mode="tags" class="ant-col-9" @change="handleChange" placeholder="请选择">
              <a-select-option v-for="item in waitingCasePartin" :key="item">{{ item }}</a-select-option>
            </a-select>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30" type="flex" justify="center">
        <a-col :span="8">
          <span class="ant-col-4"></span>
          <span class="ant-col-16">
            <a-button block type="primary" icon="check" @click="pushCaseInfo">确认提交</a-button>
          </span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { getDictionary } from '../../api/sampleApi'
export default {
  name: 'NewCase',
  data () {
    return {
      visible: false, // 地图弹窗默认不显示,
      caseInfo: {
        caseNumber: '', // 案件号
        caseReason: '', // 案由
        caseType: '请选择', // 案件类型
        caseFrom: '请选择', // 案件来源
        caseFunction: '请选择', // 案件适用程序
        caseTime: '', // 案发时间
        caseLocation: '请输入事发地点',
        caseBreakLow: [
          // 当事人信息组
          {
            belong: '个人', // 违规违法人员性质
            name: '', // 姓名
            sex: '男', // 性别
            profession: '', // 职业
            companyName: '', // 单位名称
            legalPerson: '', // 法人姓名
            idNumber: '', // 身份证号
            address: '', // 住址
            telNumber: '' // 手机号
          }
        ],
        casePartin: [] // 协办人数组
      },
      waitingCasePartin: ['张柳', '李思', '王琴', '陈华', '黛玉'], // 候选协办人
      Case_Type: [], // 案件类型
      CaseSourceType: [], // 案件来源
      CaseApplicableProcedureType: []// 处理程序
    }
  },
  methods: {
    viewMap () {
      this.visible = true // 显示地图加载模态框
    },
    handleCancel (e) {
      this.visible = false // 关闭地图模态框
    },
    // 新增当事
    addCaseBreakLow () {
      this.caseInfo.caseBreakLow.push({
        belong: '个人', // 违规违法人员性质
        name: '', // 姓名
        sex: '男', // 性别
        profession: '', // 职业
        companyName: '', // 单位名称
        legalPerson: '', // 法人姓名
        idNumber: '', // 身份证号
        address: '', // 住址
        telNumber: '' // 手机号
      })
    },
    // 删除当事人
    delCaseBreakLow (index) {
      if (this.caseInfo.caseBreakLow.length <= 1) {
        alert('最少有一个当事人')
      } else {
        this.caseInfo.caseBreakLow.splice(index, 1)
      }
    },
    // 案件号生成
    caseNumber () {
      // 生成案件编号
      const date = new Date()
      // 此处应该获取后台最后一个案件的编号
      const testCaseNmuber = '20201234' // 测试的案件编号
      if (testCaseNmuber === '') {
        this.caseInfo.caseNumber = date.getFullYear() + '1'
      } else {
        const lastNumber = testCaseNmuber.slice(4) // 获取除开年份的案件编号
        this.caseInfo.caseNumber = date.getFullYear().toString() + (lastNumber - 0 + 1)
      }
      console.log('这是生成的案件号：' + this.caseInfo.caseNumber)
    },
    // 协办人输入
    handleChange (value) {
      this.caseInfo.casePartin = []
      this.caseInfo.casePartin = value
    },
    // 案发时间选择
    selectTime (value, dateString) {
      this.caseInfo.caseTime = dateString
    },
    // 获取案件类型
    getCaseType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseType' }).then(res => {
        res.map(item => {
          this.Case_Type.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取案件来源
    getCaseSourceType () {
      getDictionary({ model: 'res_dictionary', context: 'CaseSourceType' }).then(res => {
        res.map(item => {
          this.CaseSourceType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 获取案件适用程序
    getApplicableProcedureType () {
      getDictionary({ model: 'res_dictionary', context: 'ApplicableProcedureType' }).then(res => {
        res.map(item => {
          this.CaseApplicableProcedureType.push({ ID: item.ID, Title: item.Title, ItemCode: item.ItemCode })
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 选中的案件类型
    CaseTypeChoiceEvn (msg) {
      this.caseInfo.caseType = msg
    },
    // 选中的案件来源
    CaseSourceEvn (msg) {
      this.caseInfo.caseFrom = msg
    },
    // 选中案件 处理程序
    CaseApplicableProcedureTypeEvn (msg) {
      console.log(msg)
    },
    // 提交新建案件
    pushCaseInfo () {
    }
  },
  // 生命周期钩子
  mounted () {
    // 案件号生成
    this.caseNumber()
    // 获案件类型
    this.getCaseType()
    // 获取案件来源
    this.getCaseSourceType()
    // 获取案件适用程序
    this.getApplicableProcedureType()
  }
}
</script>

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
