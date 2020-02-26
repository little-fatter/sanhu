<template>
  <div class="wrapper">
    <div class="headLine">
      <div>
        <span>交办时间：</span>
        <span>2020-02-20 14：02：30</span>
      </div>
      <div>
        <span>期望完成时间：</span>
        <span>2020-02-20 14：02：30</span>
      </div>
      <div>
        <span>协办人：</span>
        <span>李四</span>
      </div>
    </div>
    <div class="details">
      <span class="detailTitle">事件信息</span>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事发地点：</a-col>
        <a-col class="colSize" :span="12">
          <span>澄江县XX路XX号</span>
          <!-- <span>  |距离</span> -->
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报时间：</a-col>
        <a-col class="colSize" :span="12">2020-02-20 12：22：22</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报来源：</a-col>
        <a-col class="colSize" :span="12">公众号举报</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">上报人：</a-col>
        <a-col class="colSize" :span="12">王五（133xxxxxxxx）</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事件类型：</a-col>
        <a-col class="colSize" :span="12">非法捕捞</a-col>
      </a-row>
      <a-row class="row">
        <a-col class="colSize colLine" :span="5">事件描述：</a-col>
        <a-col class="colSize" :span="12">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</a-col>
      </a-row>
      <!-- <a-row class="row">
        <a-col class="colSize colLine" :span="5">关联表单：</a-col>
        <a-col class="colSize" :span="12">
          <div>关联的表单</div>
        </a-col>
      </a-row> -->
    </div>
    <div>
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
    </div>
    <div class="buttons">
      <a-button class="button-submit" type="primary" >提交</a-button>
      <a-button class="button-return" @click="$router.back()">返回</a-button>
    </div>
  </div>
</template>

<script>
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
      ]
    }
  },
  computed: {},
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
    }
  },
  created () {

  },
  mounted () {

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
