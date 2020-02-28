<template>
  <van-popup
    v-model="showModel"
    position="bottom"
    :style="{ height: '80%' }"
    @close="onClosePopup"
  >
    <div class="list_wapper">
      <div class="list_wapper_title">
        <div class="list_wapper_title_left">
          <van-button type="info" size="small" @click="onPopupConfirm">确定</van-button>
        </div>
        <div class="desc">选择关联表单</div>
        <div class="list_wapper_title_right">
          <van-icon name="cross" slot="right-icon" @click="onClosePopup" size="20" />
        </div>
      </div>
      <div>
        <s-list
          :dataCallback="loadData"
          ref="mylist">
          <van-checkbox-group v-model="result">
            <van-cell-group>
              <van-cell
                v-for="(item, index) in list"
                clickable
                :key="index"
                :title="item.Title"
                :value="item.CreateOn"
                @click="toggle(index)"
              >
                <van-checkbox slot="icon" :name="item" ref="checkboxes" class="checkboxeItem" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </s-list>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * 案件关联表单选择组件
 */
import SList from '../../components/list/SList.vue'
const datas = [
  { ID: 1, Title: '表单1', CreateOn: '2012-02-12' },
  { ID: 2, Title: '表单2', CreateOn: '2012-02-12' }
]
export default {
  name: 'RelCaseFormListSelect',
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
      result: [],
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
      return new Promise((resolve) => {
        var result = {}
        this.list = datas
        result.Total = datas.length
        return resolve(result)
      })
    },
    onSearch () {
      this.list = []
      this.$refs.mylist.refresh()
    },
    toggle (index) {
      this.$refs.checkboxes[index].toggle()
    },
    onClosePopup () {
      this.$emit('onClosePopup')
    },
    onPopupConfirm () {
      console.log('result', this.result)
      this.$emit('onPopupConfirm', this.result)
    }
  }
}
</script>

<style lang="less" scoped>
.list_wapper
{
   .list_wapper_title
    {
        height: 40px;
        line-height: 40px;
        padding-top: 10px;
        padding-bottom:10px;
        text-align: center;
        position: relative;
       .desc
       {
            font-size: 22px;
       }
       .list_wapper_title_left
       {
           position:absolute;
           top: 10px;
           left: 20px;
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
    .checkboxeItem
    {
        margin-right: 10px;
    }
}
</style>
