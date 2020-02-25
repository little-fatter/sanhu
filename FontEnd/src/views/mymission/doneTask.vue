<style lang="less" scoped>
.wrapper {
    background: #eeeeee;padding:30px;color:#101010;
    .head {
        background: #ffffff;padding:20px;margin-bottom:30px;
        .missionStyle {
            display: flex;
            .currentName {
            font-size: 18px;color:#101010;font-weight: bold;
            font-family: SourceHanSansSC-regular;margin:0 30px 30px 0;
        }
        .names {
            font-size: 14px;color:#101010;display:flex;align-items:center;
            span {
                margin-right: 10px;
                padding: 6px 10px;
                border: 1px solid #eeeeee;
                border-radius: 8px;
            }
            span:hover{
                cursor: pointer;
                border-color: #1990FF;
                color:#1990FF;
            }
        }
        }
        .search-line {
            display: flex;
            .box {
                display: flex;margin-right:30px;align-items:center;
                .box-left {
                    margin-right: 10px;
                }
            }

        }
    }
    .body {
        .body-item{
            margin-bottom:20px;background:#ffffff;padding:20px;
            .item-head {
                .left {
                    margin-right:90px;
                }
            }
            .item-body {
                display:flex;margin: 20px 0;
                .left {
                    margin-right:50px;width:70px;height:70px;
                }
                .middle{
                    margin-right:200px;
                    .middle-head {
                        margin-bottom:10px;
                        .left {
                            margin-right:20px;
                        }
                    }
                    .middle-body {
                        .left {
                            margin-right:20px;
                        }
                    }
                }
                .right {
                    flex:3;
                    .first {
                        margin-bottom:10px;
                        .left {
                        margin-right:20px;
                    }
                    }
                    .second {
                        .left {
                        margin-right:20px;
                    }
                    }

                }
            }
            .item-footer {
                display:flex;justify-content:space-between;
                .space {
                    margin-right:20px;
                }
            }
        }
    }
}
</style>

<template>
  <div class="wrapper">
    <div class="head">
      <div class="missionStyle">
        <div class="currentName">已办任务</div>
      </div>
      <div class="search-line">
        <div class="box">
          <div class="box-left">
            任务类型:
          </div>
          <div>
            <a-select></a-select>
          </div>
        </div>
        <div class="box">
          <div class="box-left">
            任务编号:
          </div>
          <div>
            <a-input placeholder="编号"></a-input>
          </div>
        </div>
        <div class="box">
          <a-button> 搜索 </a-button>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="body-item" v-for="(item,index) in dataList" :key="item.num + index">
        <div class="item-head">
          <span class="left">{{ item.style }}</span>
          <span>{{ item.num }}</span>
        </div>
        <div class="item-body">
          <div class="left">
            任务图片
          </div>
          <div class="middle">
            <div class="middle-head">
              <span class="left">事件类型：</span>
              <span>{{ item.Tstyle }}</span>
            </div>
            <div class="middle-body">
              <span class="left">上传时间：</span>
              <span>{{ item.time }}</span>
            </div>
          </div>
          <div class="right">
            <div class="first">
              <span class="left">主办人：</span>
              <span>{{ item.helper }}</span>
            </div>
            <div class="second">
              <span class="left">协办人：</span>
              <span>{{ item.helper }}</span>
            </div>
          </div>
        </div>
        <div class="item-footer">
          <div>
            <span class="space">期望完成时间：</span>
            <span>{{ item.time1 }}</span>
          </div>
          <div>
            <span class="space">{{ item.time2 }}</span>
            <span>来自 {{ item.from }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          style: '事件核查',
          num: 'SJHX23093432',
          Tstyle: '非法捕捞',
          time: '2020-02-21 18:54:44',
          time1: '2020-02-21 18:56:44',
          time2: '2020-02-21 18:57:44',
          helper: '李四',
          from: '指挥中心'
        },
        {
          style: '事件核查',
          num: 'SJHX23093432',
          Tstyle: '非法捕捞',
          time: '2020-02-21 18:54:44',
          time1: '2020-02-21 18:56:44',
          time2: '2020-02-21 18:57:44',
          helper: '李四',
          from: '指挥中心'
        }
      ]
    }
  },
  created () {
  },
  methods: {

  }
}
</script>
