<style lang="less" scoped>
.wrapper {
  background-color: #eeeeee;
  padding: 30px;
  font-size: 20px;
  .header {
    background-color: #ffffff;
    padding: 30px;
    .listHeader {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .listStatus {
        .status {
          padding-left: 50px;
        }
      }
      .eventButton {
        span {
          padding-left: 20px;
        }
      }
    }
  }
  .body {
    background-color: #ffffff;
    margin-top: 80px;
    margin-left: 20px;
    padding: 20px;
    .baseInfo {
      .infoHeader {
        width: 100%;
      }
      .credentials {
        display: flex;
        .left {
          margin-right: 200px;
        }
      }
    }
    .userInfo {
      margin-top: 80px;
      .userInfos {
        display: flex;
        .left {
          margin-right: 200px;
        }
      }
    }
    .areaInfo {
      margin-top: 80px;
      .areaInfos {
        display: flex;
        .left {
          margin-right: 200px;
        }
      }
    }
    .renewalRecord {
      margin-top: 80px;
      .renewalRecords {
        .left {
          margin-right: 200px;
        }
      }
    }
    .waterBack{
      margin-top: 80px;
      .waterBacks{
        display: flex;
        .left{
          margin-right: 200px;
        }
      }
    }
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="header">
      <div class="listHeader">
        <span class="listStatus">
          <span>{{ this.$route.query.number }}</span>
          <span class="status">{{ this.$route.query.status }}</span>
        </span>
        <span class="eventButton">
          <span class="print">
            <a-button size="large">打印</a-button>
          </span>
          <span class="download">
            <a-button size="large">下载</a-button>
          </span>
          <span class="service">
            <a-button size="large">送达</a-button>
          </span>
        </span>
      </div>
    </div>
    <div class="body">
      <div class="baseInfo">
        <span class="infoHeader">
          许可证基本信息
          <hr />
        </span>
        <div class="credentials">
          <div class="left">
            <div>取水用途:</div>
            <div>生效日期:</div>
            <div>是否应收费:</div>
            <div>审批单位:</div>
          </div>
          <div class="right">
            <div>核准取水量:</div>
            <div>到期日期:</div>
          </div>
        </div>
      </div>
      <div class="userInfo">
        <span class="infoHeader">
          取水户信息
          <hr />
        </span>
        <div class="userInfos">
          <div class="left">
            <div>取水户:{{ this.$route.query.name }}</div>
            <div>法定代表人:{{ this.$route.query.linkman }}</div>
          </div>
          <div class="right">
            <div>地址:{{ this.$route.query.address }}</div>
            <div>手机号:{{ this.$route.query.tel }}</div>
          </div>
        </div>
      </div>
      <div class="areaInfo">
        <span class="infoHeader">
          取水口信息
          <hr />
        </span>
        <div class="areaInfos">
          <div class="left">
            <div>取水口:{{ this.$route.query.address }}</div>
            <div>所属湖:{{ this.$route.query.lakes }}</div>
            <div>计量设备:</div>
            <div>取水方式:</div>
            <div>水源类型:</div>
          </div>
          <div class="right">
            <div>地址:</div>
          </div>
        </div>
      </div>
      <div class="renewalRecord">
        <span class="infoHeader">
          续期记录
          <hr />
        </span>
        <div class="renewalRecords">
          <div>
            <span>1</span>
            <span>{{ this.$route.query.extendDate }}</span>
            <span>生效</span>
            <span>有效期{{ this.$route.query.extendDate }}——{{ this.$route.query.usefulDate }}</span>
            <hr />
          </div>
          <div>
            <span>2</span>
            <span>2018-02-01</span>
            <span>生效</span>
            <span>有效期2019.02.01——2020.2.28</span>
            <hr />
          </div>
        </div>
      </div>
      <div class="waterBack">
        <span class="infoHeader">
          取水口信息
          <hr />
        </span>
        <div class="waterBacks">
          <div class="left">
            <div>退水地点:</div>
            <div>退水水质要求:</div>
          </div>
          <div class="right">
            <div>退税方式:</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
