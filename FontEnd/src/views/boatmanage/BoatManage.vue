<style lang="less" scoped>
.wrapper {
  background-color: #eeeeee;
  margin: 30px;
  .header {
    padding: 30px;
    background-color: #ffffff;
    .search {
    }
    .searchInput {
      line-height: 30px;
      display: flex;
    }
  }
  .dataListHeader {
    display: flex;
    justify-content: space-between;
    width: 90%;
    padding: 30px;
    font-weight: bolder;
    color: #101010;
  }
}
</style>

<template>
  <div class="wrapper">
    <div class="header">
      <div class="search">
        <span>搜索</span>
      </div>
      <div class="searchInput">
        录入时间:
        <span>
          <a-date-picker></a-date-picker>
        </span>
        船只编号:
        <span>
          <a-input placeholder="请输入"></a-input>
        </span>
        船只类型:
        <span class="kind">
          <a-select>
            <a-select-option value="渔船">渔船</a-select-option>
            <a-select-option value="非机动船">非机动船</a-select-option>
          </a-select>
        </span>
        船牌号:
        <span>
          <a-input placeholder="请输入"></a-input>
        </span>
        船主:
        <span>
          <a-input placeholder="请输入"></a-input>
        </span>
        经营户:
        <span>
          <a-input placeholder="请输入"></a-input>
        </span>
        关联许可证:
        <span>
          <a-input placeholder="请输入"></a-input>
        </span>
        <span>
          <a-button type="primary">搜索</a-button>
        </span>
      </div>
    </div>

    <div>
      <hr />
    </div>

    <div class="dataListHeader">
      <span>数据列表</span>
      <a-button type="primary">新增船只</a-button>
    </div>
    <div class="dataList">
      <a-table
        v-show="tableNum===0"
        :pagination="pagination"
        :columns="dataList"
        :dataSource="dataSource"
      ></a-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [
        {
          title: '录入时间',
          dataIndex: 'recodeDate',
          key: 'recodeDate'
        },
        {
          title: '船只编号',
          dataIndex: 'boatId',
          key: 'boatId'
        },
        {
          title: '船只类型',
          dataIndex: 'boatKind',
          key: 'boatKind'
        },
        {
          title: '船牌号',
          dataIndex: 'boatNumber',
          key: 'boatNumber'
        },
        {
          title: '船主',
          dataIndex: 'boatOwner',
          key: 'boatOwner'
        },
        {
          title: '经营户',
          dataIndex: 'bussier',
          key: 'bussier'
        },
        {
          title: '关联许可证',
          dataIndex: 'linkAllow',
          key: 'linkAllow'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  }
}
</script>
