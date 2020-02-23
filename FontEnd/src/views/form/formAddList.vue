<style scoped lang='less'>
.AddForm {
    background: #eeeeee;
    padding:50px 30px;
    .div {
        display:flex;
        .firstHaftBox {
            margin-right:20px;
        }
        .itemBox {
          display:flex;flex:1;background:#ffffff;padding:10px;margin-top:30px;
          .boxTitle {
              flex:1;color: #101010;font-weight: bold;
          }
          .boxCont {
              display:flex;flex-wrap: wrap;flex:9;
              .formItemBox {
                  margin-left:20px;width:100px;text-align: center;
                  .contImg {
                  display:flex;justify-content:center;
                  img {
                      width: 50px;
                      height: 40px;
                  }
              }
              }
          }
        }
    }
    .searchLine {
        display:flex;justify-content:center;align-items:center;
        .title {
            color:#101010;font-weight: bold
        }
        .space {
            margin-right:20px;
            span {
                margin-right:20px;
            }
        }
    }
}
</style>
<template>
  <div class="AddForm" >
    <div class="searchLine">
      <div class="title space">
        新增表单搜索
      </div>
      <div class="space">
        <span>表单类型:</span>
        <a-select v-model="formStyle" style="width: 120px" @change="handleChange">
          <a-select-option value="1">无</a-select-option>
          <a-select-option value="2">审批表单</a-select-option>
          <a-select-option value="3">非审批表单</a-select-option>
        </a-select>
      </div>
      <div class="space">
        <span>表单名称:</span>
        <a-select v-model="formStyle" style="width: 120px" @change="handleChange">
          <a-select-option value="1">无</a-select-option>
          <a-select-option value="2">审批表单</a-select-option>
          <a-select-option value="3">非审批表单</a-select-option>
        </a-select>
      </div>
      <div>
        <a-button type="primary">搜索</a-button>
      </div>
    </div>
    <div class="div">
      <div class="itemBox firstHaftBox" >
        <div class="boxTitle">巡检表单</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg">
              <img src="../../assets/icons/vol.svg" alt="">
            </div>
            <div>
              行政执法巡检记录表
            </div>
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="boxTitle">现场执法</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              当场行政处罚决定书
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="itemBox">
        <div class="boxTitle">调查取证</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              勘验纪录表
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              询问当事人笔录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              询问证人笔录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              询问第三人笔录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              采样纪录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              抽样取证审批表
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              抽样取证通知书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              证据先行登记保存决定书
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="itemBox">
        <div class="boxTitle">受理立案</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              立案审批表
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              立案报告
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              涉嫌犯罪案件移送审批表
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              案件移送函
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              涉嫌犯罪案件移送书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              案件受理纪录
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="itemBox">
        <div class="boxTitle">案件审理</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              重大行政执法决定法制审核意见
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              撤案审批表
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚决定审批表
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚案件合议纪录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              案件集体讨论纪录
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="itemBox">
        <div class="boxTitle">处罚告知</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              责令改正通知书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚事先通知书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚听证告知书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              不予受理听证申请通知书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              听证会通知书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚决定书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              不予行政处罚决定书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              履行行政处罚决定催告书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              送达回执
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              审批表（个人）
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              审批表（单位）
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              封条
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚听证笔录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              当事人陈述申辩笔录
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              申请法院强制执行申请书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚听证会报告书
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              申述和申辩复核意见书
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="itemBox">
        <div class="boxTitle">结案归档</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚案件结案报告（个人）
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              行政处罚案件结案报告（单位）
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              案件卷宗封面
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              卷内目录表（正卷）
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              卷内目录表（副卷）
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              抚管局档案盒
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="div">
      <div class="itemBox">
        <div class="boxTitle">许可证申请</div>
        <div class="boxCont">
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              渔业许可证
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              入湖许可证
            </div>
          </div>
          <div class="formItemBox">
            <div class="contImg"><img src="../../assets/icons/vol.svg" alt=""></div>
            <div>
              活动许可证
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormAddList',
  data () {
    return {
      formStyle: 1
    }
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    }
  }
}
</script>
