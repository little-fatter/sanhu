<template>
  <div>
    <van-search v-model="searchText" show-action placeholder="请输入搜索关键词">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-dropdown-menu class="caseSearch">
      <van-dropdown-item v-model="searchType" :options="searchTypeOptions" @change="searchTypeEvn" />
      <van-dropdown-item v-model="searchFlow" :options="searchFlowOptions" @change="searchFlowEvn" />
      <van-dropdown-item v-model="searchState" :options="searchStateOptions" @change="searchStateEvn"/>
      <van-dropdown-item v-model="searchRegion" :options="searchRegionOptions" @change="searchRegionEvn"/>
    </van-dropdown-menu>
    <div class="case-panel-roll">
      <s-list :dataCallback="loadData" ref="mylist">
        <div
          class="panel_one"
          v-for="(item, index) in caseList"
          :key="item.ID + index"
          @click="goCaseDetails(item.ID)"
        >
          <van-cell :title="item.CauseOfAction" ></van-cell>
          <div class="case-info-img">
            <ImgView :url="item.imgUrl" :wapperClass="imgWaper"></ImgView>
            <div>
              <p>
                <span>当事人：</span>
                <span v-if="item.LawPartys && item.LawPartys.length > 0">
                  <span style="margin-right:0.15rem" v-for="item in item.LawPartys" :key="item.ID">{{ item.Name }}</span>
                </span>
                <span v-else>无数据</span>
              </p>
              <p>
                <span>办案人：</span>
                <span>{{ item.CreatUser ? item.CreatUser : '无数据' }}</span>
              </p>
            </div>
          </div>
          <h4 class="case-tag">
            <van-tag plain>{{ item.CaseNumber }}</van-tag>
            <!-- <van-tag plain>{{ item.ApplicableProcedure[1] }}</van-tag>-->
            <van-tag plain type="primary">简易程序</van-tag>
            <van-tag plain type="success">{{ item.CaseStatus ? item.CaseStatus : `已创建` }}</van-tag>
            <span>{{ item.ModifyDate | dayjs('YYYY-MM-DD') }}</span>
          </h4>
        </div>
      </s-list>
    </div>
  </div>
</template>

<script>
import SList from '../../components/list/SList'
import ImgView from '../../components/file/ImgView'
import { getQueryConditon, getQueryConditonMore, isNotEmpty, isImg, getFileReadUrl, isEmpty } from '../../utils/util' // 引入搜索框判断是否为空,以及搜索规则
import { getPageDate, getDictionaryItems } from '../../api/regulatoryApi' // 引入封装的请求
export default {
  name: 'CaseQuery',
  components: {
    SList,
    ImgView
  },
  data () {
    return {
      url: '',
      imgWaper: 'imgWaper',
      caseList: [], // 案件列表信息
      searchText: '', // 搜索框文字
      searchType: 0,
      searchTypeOptions: [
        { text: '类型', value: 0 } // ItemCode
      ],
      searchFlow: 0,
      searchFlowOptions: [
        { text: '程序', value: 0 } // ID
      ],
      searchState: 0,
      searchStateOptions: [
        { text: '状态', value: 0 } // Title
      ],
      searchRegion: 0,
      searchRegionOptions: [
        { text: '区域', value: 0 } // ID
      ],
      // 查询规则
      rules: [],
      // 交叉查询规则
      groups: []
    }
  },
  methods: {
    // 搜索框
    onSearch () {
      this.caseList = []
      this.$refs.mylist.refresh()
    },
    // 搜索规则判断 自己增加 ===0 ==='0'
    isEmpty (val) {
      return (val === '' || val === 0 || val === '0')
    },
    isNotEmpty (val) {
      return !this.isEmpty(val)
    },
    // 搜索菜单
    getsearchMenu () {
      // 案件类型
      getDictionaryItems('CaseType').then(res => {
        res.map(item => {
          this.searchTypeOptions.push({ text: item.Title, value: item.ItemCode })
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
    // 处理参数
    dealParameterNew (searchText, searchType, searchFlow, searchState, searchRegion) {
      // 搜索框不为空  筛选条件为空
      if (this.isNotEmpty(searchText) && (this.isEmpty(searchType) && this.isEmpty(searchFlow) && this.isEmpty(searchState) && this.isEmpty(searchRegion))) {
        this.rules.splice(0, this.rules.length, this.searchTextPublic(searchText))
        const data = getQueryConditon(this.rules, 'or')
        return data
      } else if (this.isEmpty(searchText) && (this.isNotEmpty(searchType) || this.isNotEmpty(searchFlow) || this.isNotEmpty(searchState) || this.isNotEmpty(searchRegion))) {
        // 搜索框为空  筛选条件不为空
        this.groups.splice(0, this.groups.length, { rules: this.parmsMore(searchType, searchFlow, searchState, searchRegion), op: 'and' })
        const data = getQueryConditonMore(this.rules, 'and', this.groups)
        return data
      } else if (this.isNotEmpty(searchText) && (this.isNotEmpty(searchType) || this.isNotEmpty(searchFlow) || this.isNotEmpty(searchState) || this.isNotEmpty(searchRegion))) {
        // 搜索框不为空  筛选条件不为空
        this.rules.splice(0, this.rules.length, this.searchTextPublic(searchText))
        this.groups.splice(0, this.groups.length, { rules: this.parmsMore(searchType, searchFlow, searchState, searchRegion), op: 'and' })
        const data = getQueryConditonMore(this.rules, 'and', this.groups)
        return data
      } else {
        const data = getQueryConditon([], 'or')
        return data
      }
    },
    // 搜索框 条件
    searchTextPublic (searchText) {
      return (
        {
          field: 'CauseOfAction', // 案由
          op: 'like',
          value: searchText,
          type: 'string'
        },
        {
          field: 'CaseTitle', // 案件标题
          op: 'like',
          value: searchText,
          type: 'string'
        },
        {
          field: 'Investigators', // 办案人员
          op: 'like',
          value: searchText,
          type: 'string'
        },
        {
          field: 'party', // 当事人
          op: 'like',
          value: searchText,
          type: 'string'
        }
        // {
        //   field: 'CaseNumber', // 案件编号
        //   op: 'like',
        //   value: searchText,
        //   type: 'string'
        // }
      )
    },
    // 多重搜索条件处理函数
    parmsMore (searchType, searchFlow, searchState, searchRegion) {
      const parms = [
        {
          field: 'CaseType', // 案件类型
          op: 'equal',
          value: searchType,
          type: 'string'
        },
        {
          field: 'ApplicableProcedureID', //
          value: searchFlow,
          op: 'equal',
          type: 'select'
        },
        {
          field: 'CaseStatus', // 案件状态
          op: 'equal',
          value: searchState,
          type: 'string'
        },
        {
          field: 'RegionID', // 地区区域
          op: 'equal',
          value: searchRegion,
          type: 'select'
        }
      ]
      const parmsIsOk = parms.filter(item => item.value !== 0)
      return parmsIsOk
    },
    // 条件搜索
    searchTypeEvn () {
      // console.log(this.searchType)
      this.onSearch()
    },
    searchFlowEvn () {
      // console.log(this.searchFlow)
      this.onSearch()
    },
    searchStateEvn () {
      // console.log(this.searchState)
      this.onSearch()
    },
    searchRegionEvn () {
      // console.log(this.searchRegion)
      this.onSearch()
    },
    // 初次请求
    loadData (parameter) {
      return getPageDate('case_Info', parameter.pageIndex, parameter.pageSize, this.dealParameterNew(this.searchText, this.searchType, this.searchFlow, this.searchState, this.searchRegion))
        .then(res => {
          if (res.Rows) {
            // console.log(res.Rows)
            res.Rows.forEach(item => {
              item.imgUrl = this.getCaseFile(item).toString()
              this.caseList.push(item)
            })
          }
          return res
        })
    },

    // 图片
    getCaseFile (caseInfo) {
      var img = ''
      if (isNotEmpty(caseInfo.attachments) && caseInfo.attachments.length > 0) {
        for (const attachment of caseInfo.attachments) {
          var fileName = attachment.fileName || attachment.FileName
          var fileCode = attachment.fileCode || attachment.FileCode
          if (isImg(fileName)) {
            img = getFileReadUrl(fileCode)
            break
          }
        }
      }
      if (isEmpty(img) && isNotEmpty(caseInfo.evtFileUrl)) {
        img = caseInfo.evtFileUrl.split(',')[0]
      }
      return img
    },
    // 跳转到案件详情
    goCaseDetails (msg) {
      this.$router.push({ path: 'caseDetails', query: { id: msg } }) // 案件详情id
    }
  },
  created () { // 加载搜索菜单
    this.getsearchMenu()
  },
  mounted () {

  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.case-panel-roll {
  /* background-color: #e2e2e2 !important; */
  background-color: #f3f4f6 !important;
  display: table;
  width: 100%;
  min-height: 90vh;
}

.panel_one {
  /* border-radius: 0.3rem; */
  border-radius: 0rem;
  background-color: #fff;
  /* width: calc(100% - 0.52rem); */
  width: calc(100% - 0rem);
  /* margin-left: 0.26rem;
  margin-right: 0.56rem; */
  margin-bottom: 0.25rem;
  overflow: hidden;
  /* padding: 0 0.26rem 0.26rem 0.26rem; */
  padding: 0 0.3rem 0.26rem 0.3rem;
}

.panel_one .van-cell {
  background-color: #fff;
  padding: 0.22rem 0px !important;
  /* margin-bottom: 0.12rem; */
}

.panel_one .van-cell:not(:last-child)::after {
  border-bottom: 0.02667rem solid transparent;
  left: 0;
}
.panel_one .van-cell__title {
  font-weight: bold;
  font-size: 0.42667rem;
  color: #64697c;
}

.panel_one p {
  margin-top: 0.15rem;
}
.panel_one p span {
  display: inline-block;
  color: #7f87ae;
}
.panel_one p span:first-child {
  margin-right: 0rem;
  color: #7f87ae;
}

.case-tag {
  display: flex;
  justify-content: space-between;
  margin-top: 0.26rem;
  align-items: center;
  margin: 0px;
  padding: 0px;
  margin-top: 0.25rem;
}
.case-tag > span {
  font-size: 0.28rem;
  /*color: #666;*/
}
.case-tag > span:first-child {
  color: #a1a6ba !important;
  margin-right: 0rem !important;
}
.case-tag > span:first-child::after {
  border-color: #a1a6ba !important;
}
.case-tag > span:last-child {
  color: #a1a6ba;
}
.van-search__content {
  border-radius: 100px;
}
/deep/.van-ellipsis {
  color: #64697c !important;
}
.van-cell__title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(100vw - 0.9rem);
  /* width: auto !important; */
}
.case-info-img{
display: flex;
}
.case-info-img div:first-child{
  margin-right: 0.3rem;
}
/deep/.caseSearch .van-cell__title{
  width: 100% !important;;
}
</style>
