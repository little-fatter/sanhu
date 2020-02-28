<template>
  <div class="SubmitForm">
    <van-cell-group>
      <van-row>
        <van-col span="12">
          <van-popup v-model="searchShow" position="top" :style="{ height: '80%' }">
            <SearcheForm @show="show"></SearcheForm>
          </van-popup>
          <van-cell class="center" @click="searchePage" title="搜索" icon="search" />
        </van-col>
        <van-col span="12">
          <van-popup
            v-model="screenShow"
            closeable
            close-icon-position="top-right"
            position="top"
            :style="{ height: '50%' }"
          >
            <ScreenForm></ScreenForm>
          </van-popup>
          <van-cell class="center" @click="screenPage" title="筛选" icon="filter-o" />
        </van-col>
      </van-row>
    </van-cell-group>
    <van-cell title="测试页面" @click="go"></van-cell>
    <!-- 表格列表组件 -->
    <Slist :dataCallback="loadData" ref="mylist">
      <van-cell>
        <div class="careBox" :key="index" v-for="(item,index) in listData">
          <div @click="goTodetail">
            <div class="careTop">
              <h3>行政执法巡查记录表</h3>
              <span style="color:#939393;">2020-02-25</span>
            </div>
            <p>申请部门：</p>
            <p>申请人：</p>
            <p>事件编号：</p>
            <p>事件类型：</p>
            <p>申请部门：</p>
            <p>
              <span style="color:#10B523;">审批中</span>
            </p>
          </div>
        </div>
      </van-cell>
    </Slist>
  </div>
</template>

<script>
import SearcheForm from '@/views/details/SearcheForm.vue'
import ScreenForm from '@/views/details/ScreenForm.vue'
import Slist from '@/components/list/SList.vue'
export default {
  name: 'SubmitForm',
  components: {
    SearcheForm,
    ScreenForm,
    Slist
  },
  props: {},
  data () {
    return {
      searchShow: false,
      screenShow: false,
      listData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 搜索弹窗显示隐藏
    searchePage () {
      this.searchShow = !this.searchShow
    },
    // 筛选弹窗显示隐藏
    screenPage () {
      this.screenShow = !this.screenShow
    },
    show (value) {
      this.searchShow = value
    },
    loadData (parameter) {
      return new Promise(resolve => {
        var result = {}
        // this.list = caseData
        // this.list.forEach(item => {
        //   var dsrs = []
        //   item.dsrs.forEach(dsr => {
        //     dsrs.push(dsr.name)
        //   })
        //   item.dsrDesc = dsrs.join()
        // })
        result.Total = 0
        return resolve(result)
      })
    },
    // 去详情
    goTodetail () {
      this.$router.push('/eventDetail')
    },
    go () {
      this.$router.push('/ClosingReport')
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less">
.center {
  padding: 0 35%;
}
.careBox {
  border: 1px solid #bbb;
  padding: 12px;
  margin-bottom: 12px;
  .careTop {
    display: flex;
    justify-content: space-between;
  }
}
.van-popup__close-icon {
  right: 30px;
  top: 20px;
}
</style>
