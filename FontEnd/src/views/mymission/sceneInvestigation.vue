<template>
  <div class="wrapper">
    <div class="title">
      现场勘验
    </div>
    <div class="headLine">
      <div>
        <span>交办时间：</span>
        <span>{{ missionData.createTime || '2020-02-28 20:00:45' }}</span>
      </div>
      <div>
        <span>期望完成时间：</span>
        <span>{{ missionData.ExpectedCompletionTime || '2020-03-01 23:46:47' }}</span>
      </div>
      <div>
        <span>协办人：</span>
        <span>{{ missionData.CoOrganizer || '马艳' }}</span>
      </div>
    </div>
    <div class="details">
      <span class="detailTitle">事件信息</span>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事发地点：</a-col>
        <a-col class="colSize" :span="12">
          <span>{{ data.address || '玉溪市抚仙湖区抚仙湖路38号' }}</span>
          <!-- <span>坐标{{ data.lng }},{{ data.lat }}</span> -->
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报时间：</a-col>
        <a-col class="colSize" :span="12">{{ data.reportTime|| '2020-02-25 12:46:11' }}</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报来源：</a-col>
        <a-col class="colSize" :span="12">公众号举报</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报人：</a-col>
        <a-col class="colSize" :span="12">{{ data.reporterName || '周围' }}（{{ data.wxUserId || '13685462132' }}）</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事件类型：</a-col>
        <a-col class="colSize" :span="12">{{ data.evtTypeDisplayName || '执法事件' }}</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事件描述：</a-col>
        <a-col class="colSize" :span="12">{{ data.remark || '违法排污' }}</a-col>
      </a-row>
      <!-- <a-row class="row">
        <a-col class="colSize colLine" :span="5">关联表单：</a-col>
        <a-col class="colSize" :span="12">
          <div>
            <span>
              <svg
                t="1582606760517"
                class="icon"
                viewBox="0 0 1000 1000"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5583"
                width="20"
                height="20"
              >
                <path
                  d="M546.133333 520.533333l59.733334-59.733333 21.333333 21.333333 115.2-115.2-119.466667-119.466666-115.2 115.2 4.266667 8.533333-59.733333 59.733333L384 358.4 614.4 128l243.2 243.2-230.4 230.4-81.066667-81.066667z m-115.2-68.266666L371.2 512l-8.533333-8.533333-115.2 115.2 119.466666 119.466666 115.2-115.2-21.333333-21.333333 59.733333-59.733333 81.066667 81.066666L371.2 853.333333 128 614.4 358.4 384l72.533333 68.266667zM571.733333 341.333333l59.733334 59.733334-230.4 230.4L341.333333 571.733333 571.733333 341.333333z"
                  fill="#8a8a8a"
                  p-id="5584"
                />
              </svg>
              相关表单
            </span>
          </div>
        </a-col>
      </a-row> -->
    </div>
    <!-- <div>
      <a-form
        :form="form"
      >
        <a-form-item
          label="事件类型"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            placeholder="选择事件类型"
          >
            <a-select-option value="male">
              非法捕捞
            </a-select-option>
            <a-select-option value="female">
              乱仍垃圾
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="事发时间"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-date-picker />
        </a-form-item>
        <a-form-item
          label="事发地点"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input placeholder="xxxxxxxxx">
            <a-icon slot="addonAfter" type="environment"/>
          </a-input>
        </a-form-item>
        <a-form-item
          label="当事人"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <div>
            <partyForm :dataList="PartyList"></partyForm>
          </div>
        </a-form-item>
        <a-form-item
          label="处理结果"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea placeholder="Basic usage" :rows="4"/>
        </a-form-item>
        <a-form-item
          label="图片"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChange">
            <a-button>
              <a-icon type="upload" /> 添加图片
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="附件"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChange">
            <a-button>
              <a-icon type="upload" /> 添加附件
            </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item
          label="处理决定"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            placeholder="选择处理决定"
          >
            <a-select-option value="1">
              不予处罚
            </a-select-option>
            <a-select-option value="2">
              移送其他部门
            </a-select-option>
            <a-select-option value="3">
              处罚程序
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="是否涉嫌犯罪"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-radio-group v-model="trackValue">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="2">否</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </div> -->
    <div class="buttons">
      <!-- <a-button class="button-submit" type="primary" >提交</a-button> -->
      <a-button class="button-return" @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
import { getRelateForm, getDetails, getPageData } from '@/api/sampleApi'
import partyForm from './components/partyorcompany'

export default {
  name: 'SceneInvestigation',
  components: {
    partyForm
  },
  data () {
    return {
      form: this.$form.createForm(this),
      trackValue: 1,
      headers: {
        authorization: 'authorization-text'
      },
      PartyList: [
        { category: '个人', // 当事人类型
          personName: null, // 当事人名称
          companyName: null, // 当事单位名称
          legalName: null, // 法人名称
          sex: 1, // 当事人性别
          occupation: null, // 当事人职位
          IDnumber: null, // 身份证号
          address: null, // 地址
          phone: null // 联系方式
        }
      ],
      paramters: { rules: [
      ],
      op: 'or' },
      rules: [{
        field: 'EventID',
        op: 'equal',
        value: '',
        type: 'string'
      }, {
        field: 'CaseID',
        op: 'equal',
        value: '',
        type: 'string'
      }],
      eventId: ' ', // 事件id
      Id: '', // 任务id
      data: {}, // 事件信息，
      formAll: [], // 关联的表单
      missionData: {} // 任务信息
    }
  },
  computed: {},
  watch: {},
  mounted () {
    this.eventId = this.$route.params.eventId
    this.Id = this.$route.params.id
    this.getDetail()
    this.getMissionDetail()
  },
  methods: {
    handleChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    getDetail () {
      getDetails('event_info', this.eventId).then(res => {
        this.data = res
      }).catch(err => {
        console.log(err)
      })
    },
    getRelateForm () {
      const params = {
        rules: [
          {
            field: 'EventInfoId',
            op: 'equal',
            value: this.missionData.EventInfoId,
            type: 'string'
          }
        ]
      }
      getRelateForm(params).then(res => {
        this.formAll = res
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    getMissionDetail () {
      getDetails('work_task', this.Id).then(res => {
        this.missionData = res
        this.getRelateForm()
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {

  }
}
</script>
<style lang='less' scoped>
.wrapper {
    width: 80%;
    margin-left: 10%;
    padding: 20px 10%;
    border: 1px solid #bbbbbb;
    margin-top: 20px;
    color: #101010;
    border-radius: 10px;
    box-shadow: 2px 0px 2px 3px #aaaaaa;
    .title {
      text-align: center;
      color: #111111;
      font-size: 20px;
      font-weight: 700;
      position: absolute;
      top: 30px;
      left: 160px;
      letter-spacing: 8px;
    }
    .headLine {
        display:flex;justify-content:space-around;
        border-bottom: 1px solid #aaaaaa;
        padding-bottom: 20px;
    }
    .details {
        margin: 20px;
        border-bottom: 1px solid #aaaaaa;
        padding-bottom: 20px;
        .detailTitle {
            margin-left: 30px;
            font-size: 16px;
            font-weight: bold
        }
        .row {
            margin-top: 10px;
            .colLine {
                text-align: right;
            }
            .colSize {
                padding-left:20px;
            }
        }
    }
    .buttons {
        text-align: center;
        .button-submit {
            margin-right: 60px;
        }
    }
}
</style>
