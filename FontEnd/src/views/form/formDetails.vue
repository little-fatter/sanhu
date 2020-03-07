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
    <!-- <div class="formTitle">
      这是记录表名称
    </div> -->
    <div class="formContentBox">
      <div class="boxTitle">
        <div class="circleTitle">
          {{ detailData.CreateUser[1].slice(0,3) }}
        </div>
        <div>
          <div class="titleDes">
            {{ detailData.CreateUser[1] }}
          </div>
          <div>
            {{ detailData.FormState }}
          </div>
        </div>
      </div>
      <div class="boxContent">
        <component :is="formStyleName" :detailData="detailData"></component>
      </div>
      <div class="formFooter">
        <div class="footSteps">
          <div class="stepsItemBox forLine">
            <div class="stepsItem" >
              <div class="itemBox">
                <div class="circleTitleBox">
                  <div class="circleTitle">
                    {{ detailData.CreateUser[1].slice(0,3) }}
                  </div>
                  <div class="circleImg">
                    <img src="../../assets/icons/true.svg" alt="">
                  </div>
                </div>
                <div>
                  <div class="titleDes">
                    {{ detailData.FormState }}
                  </div>
                  <div>
                    {{ detailData.CreateUser[1] }}
                  </div>
                </div>
              </div>
              <div>{{ detailData.CreateDate }}</div>
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
          <!-- <div>
            <div></div>
            <div>time</div>
          </div> -->
        </div>
        <div class="returnBox">
          <div @click="printForm" style="margin-right:20px;background-color:#1890FF;color:white;">打印预览</div>
          <div @click="$router.back()">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailEnforce from './fromComponents/detail-enforce'
import { getDetails, printPreview } from '@/api/sampleApi'
import detailPunish from './fromComponents/detail-punish'
export default {
  name: 'FormDetails',
  components: {
    detailEnforce, detailPunish
  },
  data () {
    return {
      formStyleName: 'detailPunish', // 引用的组件名
      approvalList: ['负责人1', '负责人2', '负责人3'], // 审批人列表
      formId: 'af5f950b-79a6-45de-829d-4f7e4838cbe2', // 详情id
      detailData: {} // 表单详情
    }
  },
  mounted () {
    if (this.$route.query.id) { this.formId = this.$route.query.id }
    this.getFromPatrolRecord()
  },
  methods: {
    // 获取表单详情
    getFromPatrolRecord () {
      getDetails('form_patrolRecord', this.formId).then(res => {
        this.detailData = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 打印预览
    printForm () {
      printPreview().then(res => {
        const url = `http://8030.gr2abce8.fhmpsbz4.8e9bcb.grapps.cn/web/preview?rnd=${new Date().getTime()}`
        const data1 = `${res[0].ID}`
        const data2 = this.formId
        this.openPostWindow(url, data1, data2)
      }).catch(err => { console.log(err) })
    },
    // 生成表单进行post请求
    openPostWindow (url, data1, data2) {
      const newWin = window.open()
      let formStr = ''
      formStr = '<form style="visibility:hidden;" method="POST" action="' + url + '">' +
           '<input type="hidden" name="templateId" value="' + data1 + '" />' +
           '<input type="hidden" name="context" value="' + data2 + '" />' +
           '</form>'

      newWin.document.body.innerHTML = formStr
      newWin.document.forms[0].submit()

      return newWin
    }
  }
}
</script>
