<template>
  <div class="wrapper">
    <div class="headLine">
      <div>
        <span>任务类型：</span>
        <span>事件巡查</span>
      </div>
      <div>
        <span>交办时间：</span>
        <span>{{ missionData.createTime }}</span>
      </div>
      <div>
        <span>期望完成时间：</span>
        <span>{{ missionData.ExpectedCompletionTime }}</span>
      </div>
    </div>
    <div class="details">
      <span class="detailTitle">事件信息</span>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事发地点：</a-col>
        <a-col class="colSize" :span="12">
          <span>{{ data.address }}</span>
          <span>坐标{{ data.lng }},{{ data.lat }}</span>
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报时间：</a-col>
        <a-col class="colSize" :span="12">{{ data.reportTime }}</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报来源：</a-col>
        <a-col class="colSize" :span="12">公众号举报</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报人：</a-col>
        <a-col class="colSize" :span="12">{{ data.reporterName }}（{{ data.wxUserId }}）</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事件类型：</a-col>
        <a-col class="colSize" :span="12">{{ data.evtTypeDisplayName }}</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事件描述：</a-col>
        <a-col class="colSize" :span="12">{{ data.remark }}</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">关联表单：</a-col>
        <a-col class="colSize" :span="12">
          <div v-if="formAll && formAll.length > 0">
            <div v-for="item in formAll" :key="item">{{ item.Title }}</div>
          </div>
          <div v-else>无</div>
        </a-col>
      </a-row>
    </div>
    <!-- <div>
      <a-form
        :form="form"
      >
        <a-form-item
          label="事件描述"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-textarea placeholder="Basic usage" :rows="4"/>
        </a-form-item>
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
          label="是否请求执法人员处理"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-radio-group v-model="processModeValue">
            <a-radio :value="1">自行处理</a-radio>
            <a-radio :value="2">请求执法</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-show="processModeValue == 1"
          label="是否跟踪整改"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-radio-group v-model="trackValue">
            <a-radio :value="1">无需跟踪</a-radio>
            <a-radio :value="2">需要跟踪</a-radio>
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
import { getRelateForm, getDetails } from '@/api/sampleApi'

export default {
  name: 'EventInspection',
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      trackValue: 1,
      processModeValue: 1,
      headers: {
        authorization: 'authorization-text'
      },
      eventId: ' ', // 事件id
      Id: '', // 任务id
      data: { }, // 事件信息
      missionData: {}, // 任务信息
      formAll: [] // 关联的表单
    }
  },
  computed: {
  },
  watch: {},
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
    // 获取事件信息详情
    getDetail () {
      getDetails('event_info', this.eventId).then(res => {
        this.data = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取关联表单
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
    // 获取任务详情
    getMissionDetail () {
      getDetails('work_task', this.Id).then(res => {
        this.missionData = res
        this.getRelateForm()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  created () {

  },
  mounted () {
    this.eventId = this.$route.params.eventId
    this.Id = this.$route.params.id
    this.getDetail()
    this.getMissionDetail()
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
    border-radius: 4px;
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
            margin-left: 20px;
            font-size: 18px;
            font-weight: bold;
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
