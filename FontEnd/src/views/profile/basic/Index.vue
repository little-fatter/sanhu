<template>
  <page-layout :title="title">
    <a-card :bordered="false">
      <detail-list title="退款申请">
        <detail-list-item term="取货单号">1000000000</detail-list-item>
        <detail-list-item term="状态">已取货</detail-list-item>
        <detail-list-item term="销售单号">1234123421</detail-list-item>
        <detail-list-item term="子订单">3214321432</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="用户信息">
        <detail-list-item term="用户姓名">周星星</detail-list-item>
        <detail-list-item term="联系电话">18100000000</detail-list-item>
        <detail-list-item term="常用快递">京东快递</detail-list-item>
        <detail-list-item term="取货地址">成都XXX区</detail-list-item>
        <detail-list-item term="备注">	无</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>

      <div class="title">退货商品</div>
      <s-table
        style="margin-bottom: 24px"
        rowKey="id"
        :columns="goodsColumns"
        :dataCallback="loadGoodsData">
      </s-table>

      <div class="title">退货进度</div>
      <s-table
        style="margin-bottom: 24px"
        rowKey="key"
        :columns="scheduleColumns"
        :dataCallback="loadScheduleData">

        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status" :text="status | statusFilter"/>
        </template>

      </s-table>
    </a-card>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/page/PageLayout'
import STable from '@/components/table/'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
/**
 * 基础详情页演示实例
 */
export default {
  components: {
    PageLayout,
    DetailList,
    DetailListItem,
    STable
  },
  data () {
    return {
      goodsColumns: [
        {
          title: '商品编号',
          dataIndex: 'id'
        },
        {
          title: '商品名称',
          dataIndex: 'name'
        },
        {
          title: '商品条码',
          dataIndex: 'barcode'
        },
        {
          title: '单价',
          dataIndex: 'price',
          align: 'right'
        },
        {
          title: '数量（件）',
          dataIndex: 'num',
          align: 'right'
        },
        {
          title: '金额',
          dataIndex: 'amount',
          align: 'right'
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadGoodsData: () => {
        return new Promise(resolve => {
          resolve({
            rows: [
              {
                id: '1234561',
                name: '矿泉水 550ml',
                barcode: '12421432143214321',
                price: '2.00',
                num: '1',
                amount: '2.00'
              },
              {
                id: '1234562',
                name: '凉茶 300ml',
                barcode: '12421432143214322',
                price: '3.00',
                num: '2',
                amount: '6.00'
              },
              {
                id: '1234563',
                name: '好吃的薯片',
                barcode: '12421432143214323',
                price: '7.00',
                num: '4',
                amount: '28.00'
              },
              {
                id: '1234564',
                name: '特别好吃的蛋卷',
                barcode: '12421432143214324',
                price: '8.50',
                num: '3',
                amount: '25.50'
              }
            ],
            pageIndex: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      },

      scheduleColumns: [
        {
          title: '时间',
          dataIndex: 'time'
        },
        {
          title: '当前进度',
          dataIndex: 'rate'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作员ID',
          dataIndex: 'operator'
        },
        {
          title: '耗时',
          dataIndex: 'cost'
        }
      ],
      loadScheduleData: () => {
        return new Promise(resolve => {
          resolve({
            rows: [
              {
                key: '1',
                time: '2017-10-01 14:10',
                rate: '联系客户',
                status: 'processing',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '2',
                time: '2017-10-01 14:05',
                rate: '取货员出发',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '1h'
              },
              {
                key: '3',
                time: '2017-10-01 13:05',
                rate: '取货员接单',
                status: 'success',
                operator: '取货员 ID1234',
                cost: '5mins'
              },
              {
                key: '4',
                time: '2017-10-01 13:00',
                rate: '申请审批通过',
                status: 'success',
                operator: '系统',
                cost: '1h'
              },
              {
                key: '5',
                time: '2017-10-01 12:00',
                rate: '发起退货申请',
                status: 'success',
                operator: '用户',
                cost: '5mins'
              }
            ],
            pageIndex: 1,
            totalCount: 10
          })
        }).then(res => {
          return res
        })
      }
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'processing': '进行中',
        'success': '完成',
        'failed': '失败'
      }
      return statusMap[status]
    }
  },
  computed: {
    title () {
      return this.$route.meta.title
    }
  }

}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
</style>
