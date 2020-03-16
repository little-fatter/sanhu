<style scoped lang='less'>
.AddForm {
    background: rgba(246,247,251,1);
    padding: 30px 20px 20px 50px;
 div {
   text-align: center;
   font-family: Microsoft YaHei;
   color:#63687B;
   font-size: 12px;
 }
 .topRow {
   margin-bottom: 30px;
   .topRow-L-col {
     margin-right: 20px;
     .top-card {
       margin-bottom: 20px;
     }
   }
   .topRow-R-col {
     .R-top {
       margin-bottom: 20px;
       .R-top-L-col {

       }
     }
   }
 }
 .bottomRow {

 }
}
.formName {
  min-height: 36px;
}
</style>
<style scoped lang="less">
/deep/ .ant-card{
  border-radius: 10px!important;
}
/deep/ .ant-row {
  margin-bottom: 20px!important;
}
/deep/ .ant-card-head-title {
      font-weight: 400;
      text-align: left;
      color: #222328;
}
</style>
<template>
  <div class="AddForm" >
    <a-row class="topRow">
      <a-col :span="5" class="topRow-L-col">
        <div class="top-card">
          <a-card title="受理立案">
            <a-row>
              <a-col :span="12" @click="gotoCreate('caseCreate')">
                <div>
                  <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                </div>
                <div class="formName">案件创建表</div>
              </a-col>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 686.png" alt="图片加载失败">
                </div>
                <div class="formName">立案审批表</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 687.png" alt="图片加载失败">
                </div>
                <div class="formName">立案报告</div>
              </a-col>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                </div>
                <div class="formName">涉嫌犯罪案件移送审批表</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                </div>
                <div class="formName">案件移送函</div>
              </a-col>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                </div>
                <div class="formName">涉嫌犯罪案件移送书</div>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                </div>
                <div class="formName">案件受理记录</div>
              </a-col>
              <a-col :span="12">
              </a-col>
            </a-row>
          </a-card>
        </div>
        <div class="bot-card">
          <a-card title="巡检表单">
            <a-row>
              <a-col :span="12">
                <div>
                  <img src="../../assets/icons/组 697.png" alt="图片加载失败">
                </div>
                <div class="formName">行政执法巡查记录表</div>
              </a-col>
              <a-col :span="12">
              </a-col>
            </a-row>
          </a-card>
        </div>
      </a-col>
      <a-col :span="18" class="topRow-R-col">
        <a-row class="R-top">
          <a-col class="R-top-L-col" :span="12">
            <a-card title="受理立案">
              <a-row>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 690.png" alt="图片加载失败">
                  </div>
                  <div class="formName">勘验记录表</div>
                </a-col>
                <a-col :span="8" @click="gotoCreate('askPutDownCreate')">
                  <div>
                    <img src="../../assets/icons/组 691.png" alt="图片加载失败">
                  </div>
                  <div class="formName" >询问笔录</div>
                </a-col>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 691.png" alt="图片加载失败">
                  </div>
                  <div class="formName">采样笔录</div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 704.png" alt="图片加载失败">
                  </div>
                  <div class="formName">抽样取证审批表</div>
                </a-col>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 704.png" alt="图片加载失败">
                  </div>
                  <div class="formName">抽样取证通知书</div>
                </a-col>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 700.png" alt="图片加载失败">
                  </div>
                  <div class="formName">证据先行登记保存决定书</div>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
          <a-col :span="12">
            <a-card title="案件审理">
              <a-row>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">重大行政执法决定法制审核意见</div>
                </a-col>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                  </div>
                  <div class="formName">撤案审批表</div>
                </a-col>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚决定审批表</div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 703.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚案件合议纪录</div>
                </a-col>
                <a-col :span="8">
                  <div>
                    <img src="../../assets/icons/组 703.png" alt="图片加载失败">
                  </div>
                  <div class="formName">案件集体讨论纪录</div>
                </a-col>
                <a-col :span="8">
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-card title="处罚告知">
              <a-row>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">责令改正通知书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚事先告知书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚听证告知书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">不予受理听证申请通知书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">听证会通知书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚决定书</div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">不予行政处罚决定书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">履行行政处罚决定书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 696.png" alt="图片加载失败">
                  </div>
                  <div class="formName">送达回执</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                  </div>
                  <div class="formName">（）审批表</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 685.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚听证会告知书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 695.png" alt="图片加载失败">
                  </div>
                  <div class="formName">封条</div>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 691.png" alt="图片加载失败">
                  </div>
                  <div class="formName">行政处罚听证笔录</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 691.png" alt="图片加载失败">
                  </div>
                  <div class="formName">当事人陈述申辩笔录</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">陈述和申辩复核意见书</div>
                </a-col>
                <a-col :span="4">
                  <div>
                    <img src="../../assets/icons/组 689.png" alt="图片加载失败">
                  </div>
                  <div class="formName">申请法院强制执行申请书</div>
                </a-col>
                <a-col :span="4">
                </a-col>
                <a-col :span="4">
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row class="bottomRow">
      <a-col :span="14">
        <a-card title="结案归档">
          <a-row>
            <a-col :span="4">
              <div>
                <img src="../../assets/icons/组 698.png" alt="图片加载失败">
              </div>
              <div class="formName">
                行政处罚案件结案报告
              </div>
            </a-col>
            <a-col :span="4">
              <div>
                <img src="../../assets/icons/组 699.png" alt="图片加载失败">
              </div>
              <div class="formName">
                卷宗壳
              </div>
            </a-col>
            <a-col :span="4">
              <div>
                <img src="../../assets/icons/组 699.png" alt="图片加载失败">
              </div>
              <div class="formName">
                案卷卷宗封面
              </div>
            </a-col>
            <a-col :span="4">
              <div>
                <img src="../../assets/icons/组 700.png" alt="图片加载失败">
              </div>
              <div class="formName">
                卷内目录表（正卷）
              </div>
            </a-col>
            <a-col :span="4">
              <div>
                <img src="../../assets/icons/组 700.png" alt="图片加载失败">
              </div>
              <div class="formName">
                卷内目录表（副卷）
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4">
              <div>
                <img src="../../assets/icons/组 701.png" alt="图片加载失败">
              </div>
              <div class="formName">
                抚管局档案盒
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="10">
        <a-card title="许可证申请">
          <a-row>
            <a-col :span="8">
              <div>
                <img src="../../assets/icons/组 702.png" alt="图片加载失败">
              </div>
              <div class="formName">
                捕捞许可证
              </div>
            </a-col>
            <a-col :span="8">
              <div>
                <img src="../../assets/icons/组 702.png" alt="图片加载失败">
              </div>
              <div class="formName">
                非机动船入湖许可证
              </div>
            </a-col>
            <a-col :span="8">
              <div>
                <img src="../../assets/icons/组 702.png" alt="图片加载失败">
              </div>
              <div class="formName">
                大型活动许可证
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <div>
                <img src="../../assets/icons/组 702.png" alt="图片加载失败">
              </div>
              <div class="formName">
                放生许可证
              </div>
            </a-col>
            <a-col :span="8">
              <div>
                <img src="../../assets/icons/组 702.png" alt="图片加载失败">
              </div>
              <div class="formName">
                取水许可证
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'FormAddList',
  data () {
    return {
    }
  },
  methods: {
    gotoCreate (name) {
      console.log(name)
      this.$router.push({ name: name })
    }
  }
}
</script>
