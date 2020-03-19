<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '100%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">选择事件</div>
        <div class="list_wapper_title_right">
          <van-icon name="cross" slot="right-icon" @click="onClosePopup" size="20" />
        </div>
      </div>
      <div class="search-area">
        <van-search
          v-model="queryParam.Keyword"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <van-cell-group>

        </van-cell-group>
      </div>
      <div>
        <s-list
          :dataCallback="loadData"
          ref="mylist">
          <van-panel class="list-item" v-for="(item,index) in list" :key="index">
            <div class="list-item_title" slot="header">
              <div class="list-item_title_left">
                {{ item.evtTypeDisplayName }}
              </div>
              <div class="list-item_title_right">
                <a @click="onPopupConfirm(item)">选择</a>
              </div>
            </div>
            <van-row class="list-item_content">
              <van-col span="8">
                <!-- <img :src="item.imgUrl" class="list-item_content_img"> -->
                <!-- <van-image
                  lazy-load
                  :src="item.imgUrl"
                  class="list-item_content_img"
                /> -->
                <img-view :url="item.imgUrl" wapperClass="img-wapper"></img-view>
              </van-col>
              <van-col span="16">
                <van-cell title="事件地点" :value="item.address" style="padding-top:0"></van-cell>
                <van-cell title="上报时间">
                  <div>
                    {{ item.reportTime | dayjs('YYYY-MM-DD HH:mm') }}
                  </div>
                </van-cell>
                <van-cell title="上报来源" :value="item.ReportSource"></van-cell>
                <van-cell title="事件描述" :value="item.remark"></van-cell>
              </van-col>
            </van-row>
          </van-panel>
        </s-list>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 事件选择组件
 */
import SList from '../../components/list/SList.vue'
import { getPageDate } from '../../api/regulatoryApi'
import { isNotEmpty, getQueryConditon } from '../../utils/util'
import ImgView from '../../components/file/ImgView'
export default {
  name: 'EventListSelect',
  components: {
    SList,
    ImgView
  },
  props: {
    showPopup: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data () {
    return {
      queryParam: {
        Keyword: ''
      },
      list: [],
      showModel: false
    }
  },
  watch: {
    showPopup (value, oldValue) {
      if (value !== oldValue) {
        this.showModel = value
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.showModel = this.showPopup
    },
    loadData (parameter) {
      var rules = []
      if (isNotEmpty(this.queryParam.Keyword)) {
        rules = [
          {
            field: 'evtCode',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          },
          {
            field: 'remark',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          },
          {
            field: 'evtTypeDisplayName',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'or')
      return getPageDate('event_info', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            if (isNotEmpty(item.evtFileUrl)) {
              item.imgUrl = item.evtFileUrl.split(',')[0]
            }
            this.list.push(item)
          })
        }
        return res
      })
    //   return new Promise((resolve) => {
    //     var result = {}
    //     this.list = eventData
    //     console.log('list', this.list)
    //     result.Total = eventData.length
    //     return resolve(result)
    //   })
    },
    onSearch () {
      this.list = []
      this.$refs.mylist.refresh()
    },
    onClosePopup () {
      this.$emit('onClosePopup')
    },
    onPopupConfirm (item) {
      this.$emit('onPopupConfirm', item)
    }
  }
}
</script>

<style lang="less" scoped>
.list_wapper
{
    .list_wapper_title
    {
        height: 30px;
        line-height: 30px;
        padding-top: 10px;
        text-align: center;
        position: relative;
       .desc
       {
            font-size: 22px;
       }
       .list_wapper_title_right
       {
           position:absolute;
           top: 10px;
           right: 20px;
       }
    }

    .list-item_content
    {
      /deep/ .img-wapper
      {
        width: 100%;
        height: 170px;
      }
      .van-cell__title
      {
         max-width: 100px !important;
      }
    }

    .list-item
    {
       border-bottom: 20px solid #fafafa;
    }

    .list-item_title
    {
        height: 30px;
        line-height: 30px;
        padding: 20px 0px;
    }

    .list-item_title_left
    {
      float: left;
      padding-left: 30px;
    }

    .list-item_title_right
    {
      float: right;
       padding-right: 25px;
       a
       {
           color: #1989fa;
       }
    }
}
</style>
