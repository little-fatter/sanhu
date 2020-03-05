<template>
  <a-tabs v-if="show" v-model="activeTabKey">
    <a-tab-pane :key="1" :tab="tabs[0].title">
      <div class="my-a-tab-pane">
        <div class="font-16 margin-10-top-bottom">开始时间</div>
        <div class="margin-10-top-bottom">
          <a-date-picker
            showTime
            placeholder="请输入开始时间"
            v-model="tabs[0].start"
            format="YYYY-MM-DD HH:mm:ss"
            style="width:100%"
          />
        </div>
        <div class="font-16 margin-10-top-bottom">结束时间</div>
        <div class="margin-10-top-bottom">
          <a-date-picker
            showTime
            placeholder="请输入结束时间"
            v-model="tabs[0].end"
            format="YYYY-MM-DD HH:mm:ss"
            style="width:100%"
          />
        </div>
        <div class="margin-10-top-bottom center">
          <a-button type="primary">确定</a-button>
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane :key="2" :tab="tabs[1].title">
      <div class="my-a-tab-pane">
        <div class="font-16 margin-10-top-bottom">基础类型</div>
        <div class="font-14 margin-10-top-bottom">船只类型:&emsp;&emsp;{{ info.shipType }}</div>
        <div class=" margin-10-top-bottom">
          <p class="font-14">
            &emsp;&emsp;{{ info.des }}
          </p>
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane :key="3" :tab="tabs[2].title">
      <div class="my-a-tab-pane" >
        <div class="font-16 margin-10-top-bottom">拨打电话</div>
        <div class="font-14 margin-10-top-bottom">船主联系电话:&emsp;{{ info.phone }}</div>
        <div class="operation margin-10-top-bottom">
          <a-button type="primary" class="operation-j">拨打</a-button>
          <a-button type="danger" class="operation-g" @click="close">挂断</a-button>
          <a-button type="primary" class="operation-v">录音</a-button>
        </div>
        <div class="link-info font-14">
          连接状况...
        </div>
      </div>
    </a-tab-pane>
    <a-tab-pane :key="4" :tab="tabs[3].title">
      <div class="my-a-tab-pane" >
        <div class="font-16 margin-10-top-bottom">发送短信</div>
        <div class="font-14 margin-10-top-bottom">船主联系电话:&emsp;{{ info.phone }}</div>
        <div class="operation margin-10-top-bottom">
          <a-button type="primary" class="operation-j">模板一</a-button>
          <a-button type="primary" class="operation-g">模板二</a-button>
          <a-button type="primary" class="operation-v">模板三</a-button>
        </div>
        <div class="link-info font-14">
          请输入短信内容...
        </div>
        <div class="margin-10-top-bottom center"><a-button type="primary" style="background:rgba(31, 192, 142, 1);width:200px">发送</a-button></div>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
<script>
import moment from 'moment'

export default {
  name: 'MyShipInfoBox',
  props: {
    afterClose: {
      type: Function,
      default: undefined
    },
    afterShipListItemClick: {
      type: Function,
      default: undefined
    }
  },
  data: function () {
    return {
      show: false,
      info: {
        shipType: '渔船',
        phone: 13800000000,
        des: '船只的详情内容，展示船只详情字段，不同船只字段不同。船只的详 情内容，展示船只详情字段，不同船只字段不同。船只的详情内容，展示 船只详情字段，不同船只字段不同。船只的详情内容，展示船只详情字段， 不同船只字段不同。'
      },
      activeTabKey: 1,
      tabs: [
        {
          key: 1,
          title: '查看轨迹',
          data: {
            start: moment(),
            end: moment()
          }
        }, {
          key: 2,
          title: '船只详情'
        }, {
          key: 3,
          title: '拨打电话'
        }, {
          key: 4,
          title: '发送短信'
        }
      ]
    }
  },
  methods: {
    close: function () {
      this.show = false
      this.afterClose && this.afterClose()
    },
    open: function (info) {
      if (info) {
        this.info.name = info.name || '-'
        this.info.shipType = info.type
      }
      this.show = true
    }
  }
}
</script>
<style scoped>
.header{
  background-color: white;
  height: 44px;
  line-height: 44px;
  padding-left: 32px;border-radius: 5px;
}
.left{
  float: left;
}
.right{
  float: right;
}
.clear{
  clear: both;
}
.title-icon{
  width:4px;
  height: 20px;
  background: rgba(58, 157, 250, 1);
  margin-top: 12px;
  margin-right: 14px;
}
.title-text{
  color: rgba(34, 35, 40, 1);
  font-size: 16px;
}
.info-close{
  margin-left: 30px;
}
.line{
  height:1px;
  border:none;
  border-top:1px solid rgba(235, 235, 235, 1);
}
.font-16{
  font-size: 16px;
  color: rgba(127, 135, 174, 1);
}
.font-14{
  font-size: 14px;
  color: rgba(127, 135, 174, 1);
}
.font-12{
  font-size: 12px;
  color: rgba(127, 135, 174, 1);
}

.my-a-tab-pane{
  padding: 25px;
}

.width-100p{
  width: 100%
}
.margin-10-top-bottom{
  margin: 10px 0;
}
.center{
  text-align: center;
}

.user-name{
    width: 100%;
}
.link-info{

    width: 100%;
    height: 150px;
    top: 80px;
    border: 1px gray solid;
}
.operation{
    text-align: center;
}
.operation-j{
    margin-left: 0
}
.operation-g{
    margin-left: 10px
}
.operation-v{
    margin-left: 10px
}
</style>
