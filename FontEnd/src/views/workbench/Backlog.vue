<style lang="less" scoped>

.font {
  color: #101010;
  font-family: 'SourceHanSansSC-regular';
  font-size: 14px;
}

@yahei: 'Microsoft YaHei';
@title: 18px;

.backlog-wrapper {
  height: 100vh;
  font-family: @yahei;
  display: flex;
  flex-direction: column;
  .header-wrapper {
    .header-title {
      padding: 27px 50px;
      font-size: @title;
    }
    .header-menu-wrapper {
      padding-left: 50px;
      .ant-menu-horizontal {
        border-bottom: none;
      }
    }
  }

  .body-wrapper {
    flex: 1;
    background: #f4f3f3;
    padding:10px;
    display: flex;
    .content-wrapper {
      background: #fff;
      height: 100%;
      width: 100%;
      padding: 10px;
      // background: red;
      .content-item {
        .item-wrapper {
          height: 100px;
          border-bottom: 1px solid #bbb;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item-before {
            display: flex;
            .item-img {
              width: 75px;
              height: 70px;
              line-height: 70px;
              text-align: center;
              border-radius: 4px 4px 4px 4px;
              background: #EAA23D;
              border: 1px solid #FFFFFF;
            }
            .item-info {
              .item-title {
                font-family: 'SourceHanSansSC-bold';
                color: #101010;
                font-size: 16px;
                margin-left: 16px;
                margin-bottom: 22px;
              }
              .item-time {
                .font();
                display: inline-block;
                margin-left: 16px;
                width: 250px;
              }
              .item-owner {
                .font();
                display: inline-block;
              }
            }
          }
          .item-after {
            margin-right: 110px;
            .font();
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="backlog-wrapper">
    <div class="header-wrapper">
      <div class="header-title">
        待办事项
      </div>
      <div class="header-menu-wrapper">
        <a-menu mode="horizontal">
          <a-menu-item v-for="item of menuList" :key="item.key">
            <div>
              {{ item.key }}
              ({{ item.number }})
            </div>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
    <div class="body-wrapper">
      <a-row class="content-wrapper">
        <div class="content-item" v-for="item of dataList" :key="item.key">
          <div class="item-wrapper">
            <div class="item-before">
              <div class="item-img">
                案件
              </div>
              <div class="item-info">
                <div class="item-title">
                  {{ item.name }}
                </div>
                <div class="item-time">
                  接收时间：{{ item.recTime }}
                </div>
                <div class="item-owner">所属事件：{{ item.owner }}</div>
              </div>
            </div>
            <div class="item-after">
              {{ item.status }}
            </div>
          </div>
        </div>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          key: '全部',
          number: 20
        },
        {
          key: '审批',
          number: 10
        },
        {
          key: '案件',
          number: 8
        },
        {
          key: '巡检',
          number: 2
        }
      ],
      dataList: [
        {
          name: '“XXXX“的初查核实',
          key: 1,
          recTime: '2019/10/10 14：00',
          owner: '114',
          status: '初查核实'
        },
        {
          name: 'XXXXX的现场执法',
          key: 2,
          recTime: '2019/10/10 14：00',
          owner: '124',
          status: '简易流程'
        },
        {
          name: 'XXXXXXX的处罚执行',
          key: 3,
          recTime: '2019/10/10 14：00',
          owner: '21',
          status: '一般流程'
        },
        {
          name: 'XXXXXXX的结案归档',
          key: 4,
          recTime: '2019/10/10 14：00',
          owner: '334',
          status: '案件移交'
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
