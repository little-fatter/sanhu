<template>
  <a-layout v-show="show">
    <a-layout-header class="header">
      <div class="left title-icon"></div>
      <div class="left title-text">{{ info.name }}</div>
      <div class="right">{{ type == 2?'摄像头位置':'机库地址' }}: xxxx<a-icon class="info-close" type="close" @click="close"/></div>
      <div class="clear"></div>
    </a-layout-header>
    <a-layout-content>
      <!-- 在飞无人机 -->
      <template v-if="type == 0">
        <div class="type1">
          <video class="type1-video"></video>
          <div class="type1-fly-height font-12">飞行高度: {{ info.height }} m</div>
          <div class="type1-fly-location font-12">经纬度: {{ info.lnglat[0] }} {{ info.lnglat[1] }}</div>
          <div class="type1-controll-div left">
            <a-button type="primary" class="type1-controll-stop">悬停</a-button>
            <a-button type="primary" class="type1-controll-up" icon="arrow-up"></a-button>
            <a-button type="primary" class="type1-controll-zoomIn" icon="zoom-in"></a-button>
            <a-button type="primary" class="type1-controll-rotate-right" icon="redo"></a-button>
            <a-button type="primary" class="type1-controll-rotate-left" icon="undo"></a-button>
            <a-button type="primary" class="type1-controll-down" icon="arrow-down"></a-button>
            <a-button type="primary" class="type1-controll-zoomOut" icon="zoom-out"></a-button>
          </div>
          <div class="type1-button-group right">
            <a-button type="primary" class="type1-button-group-button1">喊话</a-button>
            <a-button type="primary" class="type1-button-group-button2">拍照</a-button>
            <a-button type="primary" class="type1-button-group-button2" @click="openVideotapePanel">录像</a-button>
          </div>
          <div class="clear"></div>
        </div>
      </template>
      <!-- 待飞无人机 -->
      <template v-if="type == 1">
        <div class="type2">
          <a-tabs v-model="activeTabKey">
            <a-tab-pane tab="历史记录" key="1" class="a-tab-pane">
              <video class="type1-video"></video>
            </a-tab-pane>
            <a-tab-pane tab="飞行计划" key="2">
              <div class="type2-jihua">
                <a-table :columns="flyTable.header" :dataSource="flyTable.rows">
                  <span slot="flyPath" slot-scope="">
                    <a-button icon="fund"></a-button>
                  </span>
                </a-table>
              </div>
            </a-tab-pane>
            <div slot="tabBarExtraContent">
              <template v-if="activeTabKey == 1">
                <a-button icon="table" style="background:rgba(31, 192, 142, 1)"></a-button>
              </template>
              <template v-if="activeTabKey == 2">
                <a-button style="background:rgba(31, 192, 142, 1)" @click="openCreatePlanPanel">新建计划</a-button>
              </template>
            </div>
          </a-tabs>
        </div>

      </template>
      <!-- 摄像头 -->
      <template v-if="type == 2">
        <div class="type3">
          <video class="type1-video"></video>
          <div class="type3-controll-div left">
            <a-button type="primary" class="type3-controll-up" icon="arrow-up"></a-button>
            <a-button type="primary" class="type3-controll-down" icon="arrow-down"></a-button>
            <a-button type="primary" class="type3-controll-left" icon="arrow-left"></a-button>
            <a-button type="primary" class="type3-controll-right" icon="arrow-right"></a-button>
            <div class="type3-controll-zoom-div">
              缩放:<a-button icon="plus"></a-button><a-button icon="minus"></a-button>
            </div>
            <div class="type3-controll-aperture-div">
              光圈:<a-button icon="plus"></a-button><a-button icon="minus"></a-button>
            </div>
            <div class="type3-controll-focus-div">
              焦距:<a-button icon="plus"></a-button><a-button icon="minus"></a-button>
            </div>
          </div>
          <div class="type3-button-group right">
            <a-button type="primary" class="type3-button-group-button1">设为默认视角</a-button>
            <a-button type="primary" class="type3-button-group-button2">拍照</a-button>
            <a-button type="primary" class="type3-button-group-button2" @click="openVideotapePanel">录像</a-button>
          </div>
          <div class="clear"></div>
        </div>
      </template>
    </a-layout-content>
    <!-- 录像面板 -->
    <template v-if="videotapePanel.show">
      <a-modal
        class=""
        title="录像"
        centered
        v-model="videotapePanel.show"
        @ok="videotapePanelOk"
      >
        <div>
          <video class="type1-video"></video>
          <a-slider
            class="a-slider-time2"
            range
            :max="videotapePanel.max"
            :min="videotapePanel.min"
            v-model="videotapePanel.value"
            :tooltipVisible="true"
            :tipFormatter="tipFormatter"
          />
        </div>
      </a-modal>
    </template>
    <!-- 新建计划面板 -->
    <template v-if="show">
      <a-modal
        title="新建计划"
        centered
        v-model="createPlanPanel.show"
        @ok="createPlanPanelOk"
      >
        <div>
          <div class="font-14">
            起飞时间:
            <a-date-picker
              showTime
              placeholder="选择起飞时间"
              v-model="createPlanPanel.time"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div class="font-14">
            路线预设:
          </div>
          <div class="create-plan-map">

          </div>
        </div>
      </a-modal>
    </template>
  </a-layout>
</template>
<script>
import moment from 'moment'
import appConfig from '@/config/app.config'
export default {
  name: 'MyEquipmentInfoBox',
  props: {
    afterClose: {
      type: Function,
      default: undefined
    }
  },
  data: function () {
    return {
      show: false,
      type: 2,
      info: {
        name: '摄像头xxx',
        height: 23,
        lnglat: [100.0, 25.0]
      },
      statusTable: [
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi.png',
          title: '任务待接受'
        },
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi(1).png',
          title: '任务已接受'
        },
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi(2).png',
          title: '任务已完成'
        },
        {
          src: appConfig.StaticWebContext + '/img/yzt-renyuanceng/zhuyi(3).png',
          title: '任务失败'
        }
      ],
      activeTabKey: '1',
      flyTable: {
        header: [
          {
            title: '起飞时间',
            dataIndex: 'startTime',
            key: 'startTime'
          },
          {
            title: '预计时长',
            dataIndex: 'flyTime',
            key: 'flyTime'
          },
          {
            title: '预计飞行',
            dataIndex: 'flyDistance',
            key: 'flyDistance'
          },
          {
            title: '飞行路线',
            key: 'flyPath',
            scopedSlots: { customRender: 'flyPath' }
          }
        ],
        rows: [
          {
            startTime: '2019-12-22 19:35:40',
            flyTime: 34,
            flyDistance: 23
          },
          {
            startTime: '2019-12-22 19:35:40',
            flyTime: 34,
            flyDistance: 23
          },
          {
            startTime: '2019-12-22 19:35:40',
            flyTime: 34,
            flyDistance: 23
          }
        ]
      },
      videotapePanel: {
        show: false,
        max: 120,
        min: 0,
        value: [0, 120],
        date: '2019-12-22'
      },
      createPlanPanel: {
        show: false,
        time: moment()
      }
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
        this.type = info.type
        this.info.height = info.height
        this.info.loc = info.loc
      }
      this.show = true
    },
    openVideotapePanel: function () {
      this.videotapePanel.show = true
      this.videotapePanel.min = 0
      this.videotapePanel.max = 86399
      this.videotapePanel.value = [10000, 50000]
    },
    videotapePanelOk: function () {
      console.log('videotapePanelOk', this.videotapePanel.value)
      this.videotapePanel.show = false
    },
    openCreatePlanPanel: function () {
      this.createPlanPanel.show = true
      this.createPlanPanel.time = moment().add(1, 'hours')
    },
    createPlanPanelOk: function () {
      var time = this.createPlanPanel.time.format('YYYY-MM-DD HH:mm:ss')
      console.log('createPlanPanelOk', time)
      this.createPlanPanel.show = false
    },
    tipFormatter: function (v) {
      var ms = new Date(this.videotapePanel.date + ' 00:00:00') * 1 + v * 1000
      return new Date(ms).toTimeString().substr(0, 8)
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
/* type1 是在飞无人机的infobox样式 */
.type1{
  padding: 28px;
}
.type1-video{
  width: 473px;
  height: 253px;
  border: 1px rgba(182, 183, 188, 1) solid;
}
.type1-fly-height{
  margin-top: 10px;
}
.type1-fly-location{
  margin-top: 10px;
}
.type1-controll-div{
    width: 328px;
    height: 140px;
    padding: 30px;
    position: relative;
    border: 1px rgba(182, 183, 188, 1) solid;
}
.type1-controll-stop{
    position: absolute;
    width: 120px;
    height: 40px;
}
.type1-controll-up{
    position: absolute;
    width: 25px;
    height: 40px;
    left: 200px;
    padding: 0;
}
.type1-controll-down{
    position: absolute;
    width: 25px;
    height: 40px;
    top: 78px;
    left: 200px;
    padding: 0;
}
.type1-controll-rotate-right{
    position: absolute;
    width: 50px;
    height: 25px;
    top: 92px;
    left: 28px;
    padding: 0;
}
.type1-controll-rotate-left{
    position: absolute;
    width: 50px;
    height: 25px;
    top: 92px;
    left: 100px;
    padding: 0;
}
.type1-controll-zoomIn{
    position: absolute;
    width: 25px;
    height: 40px;
    left: 255px;
    padding: 0;
}
.type1-controll-zoomOut{
    position: absolute;
    width: 25px;
    height: 40px;
    top: 78px;
    left: 255px;
    padding: 0;
}
.type1-button-group{
    width: 120px;

}
.type1-button-group-button1{
    width: 120px;
    height: 40px;
}
.type1-button-group-button2{
    width: 120px;
    height: 40px;
    margin-top: 10px;
}
/* type2 是待飞无人机的infobox样式 */
.type2 {
    padding: 28px;
}
.type2-jihua{
  width: 473px;
  height: 253px;
  border: 1px rgba(182, 183, 188, 1) solid;
}
.a-slider-time2{
  margin-top: 40px;
}
.create-plan-map{
  width: 473px;
  height: 173px;
  border: 1px rgba(182, 183, 188, 1) solid;
}
/* type3 是摄像头的infobox样式 */
.type3{
    padding: 28px;
}
.type3-controll-div{
    width: 328px;
    height: 140px;
    padding: 30px;
    position: relative;
    border: 1px rgba(182, 183, 188, 1) solid;
}
.type3-controll-up{
    position: absolute;
    width: 25px;
    height: 40px;
    left: 70px;
    padding: 0;
}
.type3-controll-down{
    position: absolute;
    width: 25px;
    height: 40px;
    top: 78px;
    left: 70px;
    padding: 0;
}
.type3-controll-left{
    position: absolute;
    width: 40px;
    height: 25px;
    left: 25px;
    top: 60px;
    padding: 0;
}
.type3-controll-right{
    position: absolute;
    width: 40px;
    height: 25px;
    left: 100px;
    top: 60px;
    padding: 0;
}
.type3-controll-zoom-div{
    position: absolute;
    height: 25px;
    right: 25px;
    top: 25px;
    padding: 0;
}
.type3-controll-aperture-div{
    position: absolute;
    height: 25px;
    right: 25px;
    top: 60px;
    padding: 0;
}
.type3-controll-focus-div{
    position: absolute;
    height: 25px;
    right: 25px;
    top: 95px;
    padding: 0;
}
.type3-button-group{
    width: 120px;

}
.type3-button-group-button1{
    width: 120px;
    height: 40px;
}
.type3-button-group-button2{
    width: 120px;
    height: 40px;
    margin-top: 10px;
}
</style>
