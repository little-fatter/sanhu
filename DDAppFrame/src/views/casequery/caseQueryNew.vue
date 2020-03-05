<template>
  <div>
    <!-- <van-search v-model=" searchText" placeholder="请输入搜索关键词" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>-->
    <van-search v-model="searchText" show-action placeholder="请输入搜索关键词">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="searchType"
        :options="searchTypeOptions"
        @change="searchTypeEvn "
      />
      <van-dropdown-item
        v-model="searchFlow"
        :options="searchFlowOptions"
        @change="searchFlowEvn "
      />
      <van-dropdown-item
        v-model="searchState"
        :options="searchStateOptions"
        @change="searchStateEvn "
      />
      <van-dropdown-item
        v-model="searchRegion"
        :options="searchRegionOptions"
        @change="searchRegionEvn "
      />
    </van-dropdown-menu>
    <div>
      <div class="case-panel-roll">
        <div class="panel_one">
          <van-cell title="违法使用泡沫制品简易浮动设施载人入湖" size="large" />
          <p>
            <span>当事人</span>
            <span>张三 | 李思</span>
          </p>
          <p>
            <span>办案人</span>
            <span>王花花</span>
          </p>
          <p class="case-tag">
            <van-tag plain>案〔2020〕3206号</van-tag>
            <van-tag plain>简易程序</van-tag>
            <van-tag plain>已创建</van-tag>
            <span>2020/02/11 12:00更新</span>
          </p>
        </div>
        <div class="panel_one">
          <van-cell title="违法使用泡沫制品简易浮动设施载人入湖" size="large" />
          <p>
            <span>当事人</span>
            <span>张三 | 李思</span>
          </p>
          <p>
            <span>办案人</span>
            <span>王花花</span>
          </p>
          <p class="case-tag">
            <van-tag plain>案〔2020〕3206号</van-tag>
            <van-tag plain>简易程序</van-tag>
            <van-tag plain>已创建</van-tag>
            <span>2020/02/11 12:00更新</span>
          </p>
        </div>
        <div class="panel_one">
          <van-cell title="违法使用泡沫制品简易浮动设施载人入湖" size="large" />
          <p>
            <span>当事人</span>
            <span>张三  李思</span>
          </p>
          <p>
            <span>办案人</span>
            <span>王花花</span>
          </p>
          <p class="case-tag">
            <van-tag plain>案〔2020〕3206号</van-tag>
            <van-tag plain>简易程序</van-tag>
            <van-tag plain>已创建</van-tag>
            <span>2020/02/11 12:00更新</span>
          </p>
        </div>
      </div>

      <!--
      <s-list :dataCallback="loadData" ref="mylist" >
        <div
          class="panel_one"
          v-for="item in caseList"
          :key="item.ID"
          @click="goCaseDetails(item.ID)">
          <van-cell :title="item.CauseOfAction" size="large" />
          <p>
            <span>当事人</span>
            <span v-if="item.LawPartys && item.LawPartys.length>0">
              <span v-for="(msg,i) in item.LawPartys" :key="i+'@'">{{ msg.Name }}</span>
            </span>
            <span v-else>
              测试数据
            </span>
          </p>
          <p>
            <span>办案人</span>
            <span>{{ item.Investigators? item.Investigators:'测试数据' }}</span>
          </p>
          <p class="case-tag">
            <van-tag plain>{{ item.CaseNumber }}</van-tag>
            <!-- <van-tag plain>{{ item.ApplicableProcedure[1] }}</van-tag>
      <van-tag plain>简易程序</van-tag>
      <van-tag plain>{{ item.CaseStatus?item.CaseStatus:`已创建` }}</van-tag>
      <span>{{ item.ModifyDate }}更新</span>
      </p>
    </div>
    </s-list>
      -->
    </div>
  </div>
</template>

<script>
import SList from '../../components/list/SList'
import {
  isNotEmpty,
  getQueryConditon,
  getQueryConditonMore
} from '../../utils/util' // 引入搜索框判断是否为空,以及搜索规则
import { getPageDate, getDictionaryItems } from '../../api/regulatoryApi' // 引入封装的请求
export default {
  name: 'CaseQueryNew',
  components: {
    SList
  },
  data () {
    return {
      tips: { type: 'primary', message: '未找到符合条件的信息!' },
      caseList: [], // 案件列表信息
      searchText: '', // 搜索框文字
      searchType: '0',
      searchTypeOptions: [
        { text: '类型', value: '0' } // ItemCode
      ],
      searchFlow: '0',
      searchFlowOptions: [
        { text: '程序', value: '0' } // ID
      ],
      searchState: '0',
      searchStateOptions: [
        { text: '状态', value: '0' } // 中文字符串
      ],
      searchRegion: '0',
      searchRegionOptions: [
        { text: '区域', value: '0' } //
      ]
    }
  },
  methods: {
    // 搜索框
    onSearch () {
      this.list = []
      this.$refs.mylist.refresh()
    },
    // 搜索菜单
    getsearchMenu () {
      // 案件类型
      getDictionaryItems('CaseType').then(res => {
        res.map(item => {
          this.searchTypeOptions.push({
            text: item.Title,
            value: item.ItemCode
          })
        })
      })
      // 案件处理程序
      getDictionaryItems('CaseProcedure').then(res => {
        res.map(item => {
          this.searchFlowOptions.push({ text: item.Title, value: item.ID })
        })
      })
      // 案件处状态
      getDictionaryItems('CaseStatus').then(res => {
        res.map(item => {
          this.searchStateOptions.push({ text: item.Title, value: item.Title })
        })
      })
      // 区域
      getDictionaryItems('Lake').then(res => {
        res.map(item => {
          this.searchRegionOptions.push({ text: item.Title, value: item.ID })
        })
      })
    },
    // 条件搜索
    searchTypeEvn () {
      console.log(this.searchType)
    },
    searchFlowEvn () {
      console.log(this.searchFlow)
    },
    searchStateEvn () {
      console.log(this.searchState)
    },
    searchRegionEvn () {
      console.log(this.searchRegion)
    },
    // 初次请求
    // loadData (parameter) {
    //   var rules = []
    //   if (isNotEmpty(this.searchText)) {
    //     rules = [
    //       {
    //         field: 'CauseOfAction', // 案由
    //         op: 'like',
    //         value: this.searchText,
    //         type: 'string'
    //       }, {
    //         field: 'CaseTitle', // 案件标题
    //         op: 'like',
    //         value: this.searchText,
    //         type: 'string'
    //       }, {
    //         field: 'Investigators', // 办案人员
    //         op: 'like',
    //         value: this.searchText,
    //         type: 'string'
    //       }
    //     ]
    //   }
    //   var conditon = getQueryConditon(rules, 'or')
    //   return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, conditon).then((res) => {
    //     if (res.Rows) {
    //       res.Rows.forEach(item => {
    //         this.caseList.push(item)
    //       })
    //     }
    //     console.log(this.caseList)
    //     return res
    //   })
    // },
    // 跳转到案件详情
    goCaseDetails (msg) {
      this.$router.push({ path: 'caseDetails', query: { id: msg } }) // 案件详情id
    }
  },
  // 生命周期函数
  mounted () {
    // 加载搜索菜单
    this.getsearchMenu()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.case-panel-roll {
  /* background-color: #e2e2e2 !important; */
  background-color: #fff !important;
  display: table;
  width: 100%;
  min-height: 90vh;
}
.panel_one {
  border-radius: 0.3rem;
  background-color: #f9f9f9;
  width: calc(100% - 0.52rem);
  margin-left: 0.26rem;
  margin-right: 0.56rem;
  margin-top: 0.3rem;
  overflow: hidden;
  padding: 0 0.26rem 0.26rem 0.26rem;
}
.panel_one .van-cell {
     background-color: #f9f9f9;
  padding: 0.32rem 0px !important;
}
.panel_one .van-cell:not(:last-child)::after {
  border-bottom: 0.02667rem solid #ddd;
  left: 0;
}
.panel_one p {
  margin-top: 0.24rem;
}
panel_one p span {
  display: inline-block;
}
.panel_one p span:first-child {
  color: #323232;
  margin-right: 0.26rem;
}
.case-tag {
  display: flex;
  justify-content: space-between;
  margin-top: 0.26rem;
}
.case-tag > span:first-child {
  color: #666 !important;
  margin-right: 0rem !important;
}
.case-tag > span {
  font-size: 0.28rem;
  color: #666;
}
.case-tag > span::after {
  border-color: #c5c5c5;
}
</style>
