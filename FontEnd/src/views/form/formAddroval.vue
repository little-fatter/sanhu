<style scoped lang='less'>
.FDetails {
padding:40px;
.formTitle {
    color:#101010;font-family:SourceHanSansSC-bold;font-weight: bold;
}
.formContentBox {
    border:1px solid #BBBBBB;margin:20px;
    .boxTitle {
        display:flex;justify-content: center;border-bottom:1px solid #BBBBBB;
        align-items: center;padding: 30px 0 10px 0;
        .circleTitle {
            color:#101010;margin-right:20px;text-align:center;width: 56px;height: 56px;
            line-height: 56px;border-radius:50%;border:1px solid #bbbbbb;
        }
        .titleDes {
            margin-bottom: 6px;
        }
    }
    .boxContent {
        min-height:200px;border-bottom:1px solid #BBBBBB;
    }
}
.formFooter {
    width: 30%;
    margin-left: 35%;
    padding: 20px 10px;
    .footSteps {
      margin-bottom:30px;
      .stepsItemBox {
        .stepsItem {
          display:flex;justify-content:space-between;width:100%;
          align-items: center;
          .itemBox {
            display : flex;
            align-items: center;
            .circleTitleBox {
              position: relative;
              .circleTitle {
                width:56px;height:56px;line-height: 56px;border-radius:50%;
                border:1px solid #bbbbbb;text-align: center;margin-right: 20px;
              }
              .circleImg {
                position: absolute;
                top: 30px;
                left: 35px;
                img {
                  height: 40px;
                }
              }
            }
            .titleDes {
              margin-bottom:10px;
              .csPerson {
                margin-right: 10px;
              }
            }
            .relateNames {
              display:flex;
              justify-content: space-around;
              .circleBox {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                .smallCircle {
                  font-size:12px;width:20px;height:20px;border-radius:50%;line-height: 20px;
                  border:1px solid #bbbbbb;text-align: center;margin-bottom: 5px;
                }
                .circleImg {
                  position:absolute;
                  top: -5px;
                  left: 15px;
                  img {
                    height: 16px;
                  }
                }
              }
              .circleName {
                font-size: 12px;text-align: center;
              }
            }
          }
        }
      }
      .forLine:after {
        content: '';
        display: inline-block;
        background: #BBBBBB;
        height: 30px;
        border-radius: 1px;
        width: 1px;
        margin-left: 28px;
      }
    }
    .returnBox {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        height: 30px;
        width: 80px;
        border-radius: 4px;
        color:rgba(16,16,16,1);
        font-size: 14px;
        font-family: Microsoft Yahei;
        border:1px solid rgba(187,187,187,1);
        text-align: center;
        line-height: 30px;
      }
      div:hover {
        cursor: pointer;
      }
    }
}
}
</style>
<template>
  <div class="FDetails">
    <div class="formTitle">
      这是记录表名称
    </div>
    <div class="formContentBox">
      <div class="boxTitle">
        <div class="circleTitle">
          提交人
        </div>
        <div>
          <div class="titleDes">
            提交人姓名
          </div>
          <div>
            文件状态
          </div>
        </div>
      </div>
      <div class="boxContent">
        <component :is="formStyleName"></component>
      </div>
      <div class="boxContent">
        <a-form class="form">
          <a-form-item
            label="选择"
            :labelCol="{span:8}"
            :wrapperCol="{span:10}">
            <a-radio-group :options="options" @change="radioChange" v-model="value2" />
          </a-form-item>
          <a-form-item
            label="审批人员签字人签字"
            :labelCol="{lg: {span:8}}"
            :wrapperCol="{span:10}">
            <div>签字</div>
          </a-form-item>
          <a-form-item
            label="意见建议"
            :labelCol="{lg: {span:8}}"
            :wrapperCol="{span:10}">
            <a-textarea placeholder="Basic usage" :rows="4"/>
          </a-form-item>
          <a-form-item
            label="附件上传"
            :labelCol="{lg: {span:8}}"
            :wrapperCol="{span:10}">
            <a-upload name="file" :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :headers="headers" @change="handleChange">
              <a-button>
                <a-icon type="upload" /> 上传附件
              </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item
            label="其他"
            :labelCol="{lg: {span:8}}"
            :wrapperCol="{span:10}">
            <div style="display:flex;justify-content:space-around;">
              <div>
                <a-button>盖章</a-button>
              </div>
              <div>
                <a-button>催办</a-button>
              </div>
              <div>
                <a-button>通知</a-button>
              </div>
            </div>
          </a-form-item>
        </a-form>
      </div>
      <div class="formFooter">
        <div class="footSteps">
          <div class="stepsItemBox forLine">
            <div class="stepsItem" >
              <div class="itemBox">
                <div class="circleTitleBox">
                  <div class="circleTitle">
                    提交人
                  </div>
                  <div class="circleImg">
                    <img src="../../assets/icons/true.svg" alt="">
                  </div>
                </div>
                <div>
                  <div class="titleDes">
                    文件状态
                  </div>
                  <div>
                    提交人
                  </div>
                </div>
              </div>
              <div>time</div>
            </div>
          </div>
          <div class="stepsItemBox forLine">
            <div class="stepsItem">
              <div class="itemBox">
                <div class="circleTitleBox">
                  <div class="circleTitle">
                    <img src="../../assets/icons/vol.svg" alt="通知" style="height:40px;">
                  </div>
                  <div class="circleImg">
                    <img src="../../assets/icons/true.svg" alt="">
                  </div>
                </div>
                <div>
                  <div class="titleDes">
                    <span class="csPerson">已抄送2人</span>
                    <span>1人已读</span>
                  </div>
                  <div class="relateNames">
                    <div>
                      <div class="circleBox">
                        <div class="smallCircle" >标</div>
                        <div class="circleImg">
                          <img src="../../assets/icons/true.svg" alt="">
                        </div>
                      </div>
                      <div class="circleName">名字</div>
                    </div>
                    <div>
                      <div class="circleBox">
                        <div class="smallCircle" >标</div>
                      </div>
                      <div class="circleName">名字</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>time</div>
            </div>
          </div>
          <div class="stepsItemBox forLine" v-for="(item,index) in approvalList.slice(0,approvalList.length-1)" :key="index+'approvalList'">
            <div class="stepsItem">
              <div class="itemBox">
                <div class="circleTitleBox">
                  <div class="circleTitle">
                    {{ item }}
                  </div>
                  <div class="circleImg">
                    <img src="../../assets/icons/true.svg" alt="">
                  </div>
                </div>
                <div>
                  <span style="margin-right:10px">负责人职位</span>
                  <span>(状态)</span>
                </div>
              </div>
              <div>time</div>
            </div>
          </div>
          <div class="stepsItemBox">
            <div class="stepsItem">
              <div class="itemBox">
                <div class="circleTitleBox">
                  <div class="circleTitle">
                    {{ approvalList[approvalList.length-1] }}
                  </div>
                  <div class="circleImg">
                    <img src="../../assets/icons/true.svg" alt="">
                  </div>
                </div>
                <div>
                  <span style="margin-right:10px">负责人职位</span>
                  <span>(状态)</span>
                </div>
              </div>
              <div>time</div>
            </div>
          </div>
          <div>
            <div></div>
            <div>time</div>
          </div>
        </div>
        <div class="returnBox">
          <div @click="$router.back()">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailEnforce from './fromComponents/detail-enforce'
import detailPunish from './fromComponents/detail-punish'
export default {
  name: 'FormApproval',
  components: {
    detailEnforce, detailPunish
  },
  data () {
    return {
      formStyleName: 'detailEnforce', // 引用的组件名
      approvalList: ['负责人1', '负责人2', '负责人3'],
      options: [
        { label: '同意', value: '0' },
        { label: '驳回', value: '1' }
      ],
      value2: '0',
      headers: {
        authorization: 'authorization-text'
      }
    }
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
    radioChange2 (e) {
      console.log(e.target.value)
    }
  }
}
</script>
