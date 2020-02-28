<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '80%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="desc">选择案件</div>
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
                {{ item.CauseOfAction }}
              </div>
              <div class="list-item_title_right">
                <a @click="onPopupConfirm(item)">选择</a>
              </div>
            </div>
            <van-cell title="案件类型" :value="item.CaseType"></van-cell>
            <van-cell title="办案人" :value="item.Investigators"></van-cell>
            <div slot="footer" class="footer-wapper">
              <div class="footer_left">
                <div class="item">{{ item.DocNo }}</div>
                <div class="item">{{ item.CaseStatus }}</div>
              </div>
              <div class="footer_right">
                <div class="item">{{ item.CreateDate }}</div>
              </div>
            </div>
          </van-panel>
        </s-list>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 案件选择组件
 */
import SList from '../../components/list/SList.vue'
import { getQueryConditon, isNotEmpty } from '../../utils/util'
import { getPageDate } from '../../api/regulatoryApi'
export default {
  name: 'CaseListSelect',
  components: {
    SList
  },
  props: {
    showPopup: {
      type: Boolean,
      default: false,
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
            field: 'CauseOfAction',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          },
          {
            field: 'CaseType',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          },
          {
            field: 'CaseTitle',
            op: 'like',
            value: this.queryParam.Keyword,
            type: 'string'
          }
        ]
      }
      var conditon = getQueryConditon(rules, 'or')
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
        if (res.Rows) {
          res.Rows.forEach(item => {
            this.list.push(item)
          })
        }
        return res
      })
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

    .footer-wapper
    {
      height: 30px;
      line-height: 30px;
      .footer_left
      {
         float: left;
         margin-left: 20px;
         .item
         {
           display: inline-block;
          //  border: 1px solid #BBBBBB;
           padding: 2px;
           color: #4D6282;
           margin-right: 10px;
         }
      }

      .footer_right
      {
        float: right;
         .item
         {
           display: inline-block;
         }
      }
    }
}
</style>
