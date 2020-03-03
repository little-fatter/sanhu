<style lang="less" scoped>
.wrapper {
  background: #eeeeee;
  padding: 30px;
  color: #101010;
  .header {
    padding: 20px;
    margin-bottom: 30px;
    .choose {
      margin-bottom: 30px;
      display: flex;
      justify-content: space-around;
      width: 40%;
      span {
        background-color: #00aeff;
        color: white;
        cursor: pointer;
      }
    }
    .search {
      display: flex;
      justify-content: space-around;
      width: 85%;
      span {
        width: 100%;
        margin-right: 20px;
      }
      input {
        width: 100%;
      }
      button {
        border: none;
      }
      .status {
        width: 120px;
      }
      .useWay {
        width: 120px;
      }
    }
  }
  .tablebox {
    background: #ffffff;
    padding-left: 15px;
    color: #101010;
    .table {
      margin-bottom: 50px;
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <div class="header">
      <div class="choose">
        选择
        <span
          v-for="item in manageChoose"
          :key="item.num"
          @click="changeNum(item.num)"
        >{{ item.name }}</span>
      </div>
      <div class="search">
        <span>
          <br />所属湖:
          <a-select defaultValue="全部">
            <a-select-option value="抚仙湖">抚仙湖</a-select-option>
            <a-select-option value="杞麓湖">杞麓湖</a-select-option>
            <a-select-option value="星云湖">星云湖</a-select-option>
          </a-select>
        </span>
        <span>
          <br />状态:
          <a-select class="status" defaultValue="全部">
            <a-select-option value="正常">正常</a-select-option>
            <a-select-option value="过期">过期</a-select-option>
            <a-select-option value="审核中">审核中</a-select-option>
            <a-select-option value="审核不通过">审核不通过</a-select-option>
          </a-select>
        </span>
        <span>
          <br />用途:
          <a-select class="useWay" defaultValue="全部">
            <a-select-option value="农业用水">农业用水</a-select-option>
            <a-select-option value="工业用水">工业用水</a-select-option>
          </a-select>
        </span>
        <span class="c1">
          许可证编号:
          <input placeholder="单行输入" />
        </span>
        <span>
          取水户名称:
          <input placeholder="单行输入" />
        </span>
        <span>
          法人:
          <input placeholder="单行输入" />
        </span>
        <span>
          发放时间:
          <a-range-picker @change="onChange" />
        </span>
        <a-button type="primary" size="large">搜索</a-button>
      </div>
    </div>
    <!-- 取水许可证管理 -->
    <div class="tablebox">
      <hr />
      <span v-show="tableNum===0">抚仙湖取水许可证列表</span>
      <div class="table">
        <a-table
          v-show="tableNum===0"
          :pagination="pagination"
          :columns="allowList"
          :dataSource="dataFxlakes"
          :rowKey="record => record.id"
          :customRow="click"
        >
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
          <span slot="customTitle">许可证编号</span>
        </a-table>
        <span v-show="tableNum===0">杞麓湖取水许可证列表</span>
        <a-table
          v-show="tableNum===0"
          :pagination="pagination"
          :columns="allowList"
          :dataSource="dataQllakes"
        >
          <span slot="customTitle">许可证编号</span>
        </a-table>
      </div>
    </div>
    <!-- 取水户管理 -->
    <div class="tablebox">
      <span v-show="tableNum===1">抚仙湖取水户列表</span>
      <div class="table">
        <a-table
          v-show="tableNum===1"
          :pagination="pagination"
          :columns="userList"
          :dataSource="datauser"
        >
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
          <template slot="operation" slot-scope="text, record">
            <a-popconfirm
              v-if="datauser.length"
              title="确定要重新编辑该条信息吗?"
              @confirm="() => edit(record.key)"
            >
              <a href="javascript:;">查看</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 取水口管理 -->
    <div class="tablebox">
      <span v-show="tableNum===2">抚仙湖取水口列表</span>
      <div class="table">
        <a-table
          v-show="tableNum===2"
          :pagination="pagination"
          :columns="areaList"
          :dataSource="dataarea"
        >
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
          <span slot="customTitle">取水口名称</span>
        </a-table>
      </div>
    </div>
    <!-- 流量计费设备管理 -->
    <div class="tablebox">
      <span v-show="tableNum===3">流量计费设备管理</span>
      <div>
        <a-table
          v-show="tableNum===3"
          :pagination="pagination"
          :columns="configList"
          :dataSource="dataconfig"
        >
          <a slot="name" slot-scope="text" href="javascript:;">{{ text }}</a>
          <span slot="customTitle">设备编号</span>
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
const allowList = [
  {
    dataIndex: 'number',
    key: 'number',
    slots: { title: 'customTitle' }
  },
  {
    title: '取水人名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '法人',
    dataIndex: 'linkman',
    key: 'linkman'
  },
  {
    title: '联系电话',
    key: 'tel',
    dataIndex: 'tel'
  },
  {
    title: '所属湖',
    key: 'lakes',
    dataIndex: 'lakes'
  },
  {
    title: '地址',
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: '发放日期',
    key: 'extendDate',
    dataIndex: 'extendDate'
  },
  {
    title: '有效期',
    key: 'usefulDate',
    dataIndex: 'usefulDate'
  }
]
// const userList = [
//   {
//     dataIndex: 'number',
//     key: 'number',
//     slots: { title: 'customTitle' }
//   },
//   {
//     title: '取水户名称',
//     dataIndex: 'name',
//     key: 'name'
//   },
//   {
//     title: '法人',
//     dataIndex: 'linkman',
//     key: 'linkman'
//   },
//   {
//     title: '联系电话',
//     key: 'tel',
//     dataIndex: 'tel'
//   },
//   {
//     title: '所属湖',
//     key: 'lakes',
//     dataIndex: 'lakes'
//   },
//   {
//     title: '地址',
//     key: 'address',
//     dataIndex: 'address'
//   }
// ],
// const areaList = [
//   {
//     dataIndex: 'name',
//     key: 'name',
//     slots: { title: 'customTitle' }
//   },
//   {
//     title: '取水口编号',
//     dataIndex: 'id',
//     key: 'id'
//   },
//   {
//     title: '取水口地址',
//     key: 'address',
//     dataIndex: 'address'
//   }
// ],
// const configList = [
//   {
//     title: '设备编号',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: '设备名称',
//     dataIndex: 'name',
//     key: 'name'
//   },
//   {
//     title: '设备类型',
//     key: 'kind',
//     dataIndex: 'kind'
//   }, {
//     title: '设备地址',
//     dataIndex: 'address',
//     key: 'address'
//   }
// ]
/* const dataFxlakes = [
  {
    number: '取水（玉抚水）字[2019]第157号',
    key: '1',
    name: '江川区湖畔渔家饭店',
    linkman: '许江',
    tel: '13987735324',
    lakes: '抚仙湖',
    address: '牛摩下村环湖路下',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  },
  {
    number: '取水（玉抚水）字[2019]第156号',
    key: '2',
    name: '路居镇红源老字号饭店',
    linkman: '黄汝洪',
    tel: '13988412358',
    lakes: '抚仙湖',
    address: '牛摩下村直沟头',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  },
  {
    number: '取水（玉抚水）字[2019]第155号',
    key: '3',
    name: '路居镇红福鱼庄',
    linkman: '黄余',
    tel: '13529786762',
    lakes: '抚仙湖',
    address: '牛摩下村直沟头',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  },
  {
    number: '取水（玉抚水）字[2019]第154号',
    key: '4',
    name: '路居镇路缘酒庄',
    linkman: '罗娇',
    tel: '17387706618',
    lakes: '抚仙湖',
    address: '张家田',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  },
  {
    number: '取水（玉抚水）字[2019]第154号',
    key: '5',
    name: '路居镇路缘酒庄',
    linkman: '罗娇',
    tel: '17387706618',
    lakes: '抚仙湖',
    address: '张家田',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  },
  {
    number: '取水（玉抚水）字[2019]第154号',
    key: '6',
    name: '路居镇路缘酒庄',
    linkman: '罗娇',
    tel: '17387706618',
    lakes: '抚仙湖',
    address: '张家田',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  }
],
const dataFxlakes = [
  {
    number: '取水（玉抚水）字[2019]第157号',
    key: '1',
    name: '江川区湖畔渔家饭店',
    linkman: '许江',
    tel: '13987735324',
    lakes: '抚仙湖',
    address: '牛摩下村环湖路下',
    extendDate: '2019年11月15日',
    usefulDate: '至2020年11月15日'
  }
] */
export default {
  data () {
    return {
      allowList,
      pagination: {
        defaultPageSize: 5,
        showTotal: total => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
      tableNum: 0,
      dataFxlakes: [
        {
          number: '取水（玉抚水）字[2019]第157号',
          key: '1',
          name: '江川区湖畔渔家饭店',
          linkman: '许江',
          tel: '13987735324',
          lakes: '抚仙湖',
          address: '牛摩下村环湖路下',
          status: '正常',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        },
        {
          number: '取水（玉抚水）字[2019]第156号',
          key: '2',
          name: '路居镇红源老字号饭店',
          linkman: '黄汝洪',
          tel: '13988412358',
          lakes: '抚仙湖',
          address: '牛摩下村直沟头',
          status: '过期',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        },
        {
          number: '取水（玉抚水）字[2019]第155号',
          key: '3',
          name: '路居镇红福鱼庄',
          linkman: '黄余',
          tel: '13529786762',
          lakes: '抚仙湖',
          address: '牛摩下村直沟头',
          status: '审核中',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        },
        {
          number: '取水（玉抚水）字[2019]第154号',
          key: '4',
          name: '路居镇路缘酒庄',
          linkman: '罗娇',
          tel: '17387706618',
          lakes: '抚仙湖',
          address: '张家田',
          status: '审核不通过',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        },
        {
          number: '取水（玉抚水）字[2019]第154号',
          key: '5',
          name: '路居镇路缘酒庄',
          linkman: '罗娇',
          tel: '17387706618',
          lakes: '抚仙湖',
          address: '张家田',
          status: '审核不通过',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        },
        {
          number: '取水（玉抚水）字[2019]第154号',
          key: '6',
          name: '路居镇路缘酒庄',
          linkman: '罗娇',
          tel: '17387706618',
          lakes: '抚仙湖',
          address: '张家田',
          status: '审核不通过',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        }
      ],
      dataQllakes: [
        {
          number: '取水（玉抚水）字[2019]第157号',
          key: '1',
          name: '江川区湖畔渔家饭店',
          linkman: '许江',
          tel: '13987735324',
          lakes: '抚仙湖',
          address: '牛摩下村环湖路下',
          status: '审核不通过',
          extendDate: '2019年11月15日',
          usefulDate: '至2020年11月15日'
        }
      ],
      userList: [
        {
          dataIndex: 'number',
          key: 'number',
          slots: { title: 'customTitle' }
        },
        {
          title: '取水户名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '法人',
          dataIndex: 'linkman',
          key: 'linkman'
        },
        {
          title: '联系电话',
          key: 'tel',
          dataIndex: 'tel'
        },
        {
          title: '所属湖',
          key: 'lakes',
          dataIndex: 'lakes'
        },
        {
          title: '地址',
          key: 'address',
          dataIndex: 'address'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      areaList: [
        {
          dataIndex: 'name',
          key: 'name',
          slots: { title: 'customTitle' }
        },
        {
          title: '取水口编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '取水口地址',
          key: 'address',
          dataIndex: 'address'
        }
      ],
      configList: [
        {
          title: '设备编号',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '设备名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '设备类型',
          key: 'kind',
          dataIndex: 'kind'
        },
        {
          title: '设备地址',
          dataIndex: 'address',
          key: 'address'
        }
      ],
      datauser: [
        {
          key: '1',
          name: '取水户壹号',
          linkman: '许三多',
          tel: '111111111111',
          lakes: '抚仙湖',
          address: '牛摩下村环湖路下',
          use: '查看'
        }
      ],
      dataarea: [
        {
          name: '取水口壹号',
          id: '01',
          address: '牛摩下村'
        }
      ],
      dataconfig: [
        {
          id: '0001',
          name: '设备壹号',
          kind: '小型设备',
          address: '牛摩下村村口'
        }
      ],
      manageChoose: [
        { num: 0, name: '取水许可管理' },
        { num: 1, name: '取水户管理' },
        { num: 2, name: '取水口管理' },
        { num: 3, name: '流量计费设备管理' }
      ]
    }
  },
  methods: {
    changeNum (num) {
      this.tableNum = num
      console.log(this.tableNum)
    },
    onChange (date, dateString) {
      console.log(date, dateString)
    },
    edit (key) {
      const datauser = [...this.datauser]
      this.datauser = datauser.filter(item => item.key !== key)
    },
    click (record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index)
            const { address, extendDate, key, lakes, linkman, name, number, status, tel, usefulDate } = record
            console.log(address, extendDate, key, lakes, linkman, name, number, status, tel, usefulDate)
            this.$router.push({
              path: '/takewatermanage/takewaterallowlist',
              query: {
                address: address,
                extendDate: extendDate,
                key: key,
                lakes: lakes,
                linkman: linkman,
                name: name,
                number: number,
                status: status,
                tel: tel,
                usefulDate: usefulDate
              }
            })
          }
        }
      }
    }
  }
}
</script>
