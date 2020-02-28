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
    background-color: #F4F3F3;
    height: 100vh;
    overflow: auto;

    .case-top {
      padding: 26px 55px;
      background-color: #FFF;
      height: 136px;

      h5 {
        font-size: 18px;
        color: #101010;
      }

      .case-serch-bar {
        padding-top: 15px;

        .maigin-top {
          margin-top: 15px;
        }
      }
    }

    .case-body {
      margin-top: 15px;
      padding: 26px 55px;
      background-color: #FFF;
    }

    .card-sub-style .ant-card-body > div > div > div:first-child {
      text-align: right;
    }
  }
</style>
<template>
  <div class="case-box">
    <div class="case-top">
      <h5>新增案件</h5>
      <div class="case-serch-bar">
        <a-row>
          <a-col :span="20">
            <span>说明：如不需要面包屑导航或者标题提示 请直接删除  "div class='case-top'" 标签 </span>
          </a-col>
          <a-col :span="4">

          </a-col>
        </a-row>
      </div>
    </div>
    <div class="case-body">
      <a-row class="margin-bottom30">
        <a-col :span="16">
          <span class="ant-col-2">案由：</span>
          <span class="ant-col-20">
            <a-textarea v-model="caseInfo.caseReason" placeholder="请填写案由" :autosize="{ minRows: 2, maxRows: 10 }"/>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
        <a-col :span="8">
          <span class="ant-col-4">案件类型：</span>
          <span class="ant-col-16">
            <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseType">
              <a-select-option value="水政">水政</a-select-option>
              <a-select-option value="环保">环保</a-select-option>
              <a-select-option value=" 渔政">渔政</a-select-option>
              <a-select-option value="水运">水运</a-select-option>
              <a-select-option value="海事">海事</a-select-option>
            </a-select>
          </span>
        </a-col>
        <a-col :span="8">
          <span class="ant-col-4">案件来源：</span>
          <span class="ant-col-16">
            <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseFrom">
              <a-select-option value="AI识别">AI识别</a-select-option>
              <a-select-option value="网上举报">网上举报</a-select-option>
            </a-select>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
        <a-col :span="8">
          <span class="ant-col-4">适用程序：</span>
          <span class="ant-col-16">
            <a-select placeholder="请选择" class="ant-col-24" v-model="caseInfo.caseFunction">
              <a-select-option value="简易程序">简易程序</a-select-option>
              <a-select-option value="一般程序">一般程序</a-select-option>
            </a-select>
          </span>
        </a-col>
        <a-col :span="8">
          <span class="ant-col-4">事发时间：</span>
          <span class="ant-col-16">
            <a-date-picker showTime placeholder="请选择时间" format="YYYY-MM-DD HH:mm" @change="selectTime"/>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
        <a-col :span="16">
          <span class="ant-col-2">事发地点：</span>
          <span class="ant-col-20">
            <a-input defaultValue="请输入事发地点" class="ant-col-24" v-model="caseInfo.caseLocation">
              <a-button
                @click="viewMap"
                slot="addonAfter"
                type="primary"
                shape="circle"
                icon="environment"
                size="small"/>
            </a-input>
            <!--    地图查看弹窗-->
            <a-modal
              title="请选择位置"
              :visible="visible"
              @cancel="handleCancel"
            >
              <!--<template slot="footer">
              <a-button @click="handleCancel">取消</a-button>
            </template>-->
              <p>展示地图</p>
            </a-modal>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
        <a-col :span="16">
          <span class="ant-col-2">当事人：</span>
          <span class="ant-col-20">
            <a-button type="primary" @click="addCaseBreakLow">新增当事人</a-button>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
        <a-col :span="24">
          <div>
            <a-row :gutter="24">
              <a-col class="margin-bottom30" :span="8" v-for="(item,index) in caseInfo.caseBreakLow" :key="index">
                <a-card class="card-sub-style" title="当事人信息" hoverable>
                  <template slot="extra">
                    <a-button type="primary" icon="delete" size="small" @click="delCaseBreakLow(index)">删除</a-button>
                  </template>
                  <div>
                    <a-row class="margin-bottom15">
                      <a-col :span="6">人员性质：</a-col>
                      <a-col :span="18">
                        <a-select placeholder="请选择" class="ant-col-24" v-model="item.belong">
                          <a-select-option value="个人">个人</a-select-option>
                          <a-select-option value="单位">单位</a-select-option>
                        </a-select>
                      </a-col>
                    </a-row>
                    <a-row class="margin-bottom15">
                      <a-col :span="6">姓名：</a-col>
                      <a-col :span="18">
                        <a-input placeholder="请输入姓名或单位名称" v-model="item.name"/>
                      </a-col>
                    </a-row>
                    <template v-if="item.belong=='个人'">
                      <a-row class="margin-bottom15">
                        <a-col :span="6">性别：</a-col>
                        <a-col :span="18">
                          <a-radio-group name="sex" v-model="item.sex">
                            <a-radio value="男">男</a-radio>
                            <a-radio value="女">女</a-radio>
                          </a-radio-group>
                        </a-col>
                      </a-row>
                      <a-row class="margin-bottom15">
                        <a-col :span="6">职业：</a-col>
                        <a-col :span="18">
                          <a-input placeholder="请输入职业" v-model="item.profession"/>
                        </a-col>
                      </a-row>
                    </template>
                    <template v-else>
                      <a-row class="margin-bottom15">
                        <a-col :span="6">法人姓名：</a-col>
                        <a-col :span="18">
                          <a-input placeholder="请输入法人姓名" v-model="item.legalPerson"/>
                        </a-col>
                      </a-row>
                    </template>
                    <a-row class="margin-bottom15">
                      <a-col :span="6">身份证：</a-col>
                      <a-col :span="18">
                        <a-input placeholder="身份证号" v-model="item.idNumber"/>
                      </a-col>
                    </a-row>
                    <a-row class="margin-bottom15">
                      <a-col :span="6">住址：</a-col>
                      <a-col :span="18">
                        <a-textarea placeholder="请输入住址" v-model="item.address" :autosize="{ minRows: 2, maxRows: 3 }"/>
                      </a-col>
                    </a-row>
                    <a-row class="margin-bottom15">
                      <a-col :span="6">联系电话：</a-col>
                      <a-col :span="18">
                        <a-input type="tel" placeholder="请输入电话号码" v-model="item.telNumber"/>
                      </a-col>
                    </a-row>
                  </div>
                </a-card>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
        <a-col :span="8">
          <span class="ant-col-4">协办人：</span>
          <span class="ant-col-16">
            <a-select mode="tags" style="width: 100%" @change="handleChange" placeholder="请选择">
              <a-select-option v-for="item in waitingCasePartin" :key="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </span>
        </a-col>
      </a-row>
      <a-row class="margin-bottom30">
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
import axios from 'axios'

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
        caseBreakLow: [ // 当事人信息组
          {
            belong: '个人', // 违规违法人员性质
            name: '', // 姓名
            sex: '男', // 性别
            profession: '', // 职业
            legalPerson: '', // 法人姓名
            idNumber: '', // 身份证号
            address: '', // 住址
            telNumber: ''// 手机号
          }
        ],
        casePartin: []// 协办人数组
      },
      waitingCasePartin: ['张柳', '李思', '王琴', '陈华', '黛玉']// 候选协办人
    }
  },
  methods: {
    viewMap () {
      this.visible = true// 显示地图加载模态框
    },
    handleCancel (e) {
      this.visible = false// 关闭地图模态框
    },
    // 新增当事
    addCaseBreakLow () {
      this.caseInfo.caseBreakLow.push({
        belong: '个人', // 违规违法人员性质
        name: '', // 姓名
        sex: '男', // 性别
        profession: '', // 职业
        legalPerson: '', // 法人姓名
        idNumber: '', // 身份证号
        address: '', // 住址
        telNumber: ''// 手机号
      })
    },
    // 删除当事人
    delCaseBreakLow (index) {
      if (index === 0) {
        alert('最少有一个当事人')
      } else {
        this.caseInfo.caseBreakLow.splice(index, 1)
        alert('当事人已被删除')
      }
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
    // 提交新建案件
    pushCaseInfo () {
      axios.post('api/addCase', {
        caseData: this.caseInfo
      })
      // console.log(this.caseInfo)
    }
  },
  // 生命周期钩子
  mounted () {
    // 生成案件编号
    const date = new Date()
    // 此处应该获取后台最后一个案件的编号
    const testCaseNmuber = '20201234' // 测试的案件编号
    if (testCaseNmuber === '') {
      this.caseInfo.caseNumber = date.getFullYear() + '1'
    } else {
      const lastNumber = testCaseNmuber.slice(4)// 获取除开年份的案件编号
      this.caseInfo.caseNumber = date.getFullYear().toString() + ((lastNumber - 0) + 1)
    }
    console.log('这是生成的案件号：' + this.caseInfo.caseNumber)

    // 获取协办人 数组 暂时无请求地址
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

  /deep/ .ant-col-20 .ant-btn:hover, /deep/ .ant-col-20 .ant-btn:focus {
    background-color: #1890ff;
    border-color: #1890ff;
  }

</style>
