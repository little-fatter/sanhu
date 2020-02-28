<template>
  <div class="SceneInvestigationDetail">
    <van-cell-group>
      <van-cell title="交办时间：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="期望完成时间：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="协办人：" value="张三"></van-cell>
      <van-cell is-link style="background-color:#DFDDDD;">事件信息</van-cell>
      <van-cell title="事发地点：">
        澄江县xxx路 |
        <!-- <van-icon name="location-o" color="#1989FA" /> -->
        <!-- <svg
          t="1582606241109"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4767"
          width="20"
          height="20"
        >
          <path
            d="M907.8 164.9L544.2 892.1c-6.4 13.3-17.2 19.8-32.4 19.8-1.9 0-4.8-0.4-8.5-1.2-8.3-1.9-15.1-6.2-20.2-12.8-5.1-6.5-7.6-14.1-7.6-22.5V548.3H148.3c-8.3 0-15.7-2.5-22.5-7.6-6.5-5.1-10.9-11.8-12.8-20.2-1.9-8.3-1.2-16.2 2.3-23.9 3.5-7.5 8.8-13.3 16.5-17.1L859 115.9c4.9-2.7 10.4-4 16.5-4 10.3 0 18.7 3.6 25.5 10.8 5.7 5.2 9.2 11.8 10.5 19.6 1.3 8 0.1 15.4-3.7 22.6z"
            p-id="4768"
            fill="#1296db"
          />
        </svg> -->
        1.3km
      </van-cell>
      <van-cell title="上报时间：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="上报来源：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="上报人：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="事件类型：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="事件描述：">
        <p style="text-align:left;">事件描述事件描述事件描述述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述事件描述</p>
      </van-cell>
      <van-cell title="上报来源：" value="2020-02-26 13:52:26"></van-cell>
      <van-cell title="事件类型" :value="eventCheck.eventType" />
      <van-cell title="事发时间" :value="eventCheck.eventTime|dayjs" />
      <van-cell title="事发地点" value="1235" >
      </van-cell>
      <van-cell-group>
        <PartyInfoView></PartyInfoView>
        <!-- 个人
        <div :key="index+'a'" v-for="(item,index) in eventCheck.personnal">
          <van-cell readonly name="partyType" :value="item.partyType" tittle="当事人类型" />
          <van-cell readonly name="name" :value="item.name" tittle="姓名" />
          <van-cell readonly name="sex" :value="item.sex" tittle="性别" />
          <van-cell readonly name="job" :value="item.job" tittle="职业" />
          <van-cell readonly name="id" :value="item.id" tittle="身份证" />
          <van-cell readonly name="address" :value="item.address" tittle="现居住地" />
          <van-cell readonly name="phone" :value="item.phone" tittle="手机号" />
        </div>
        企业
        <div :key="index+'b'" v-for="(item,index) in eventCheck.enterprise">
          <van-cell readonly name="partyType" :value="item.partyType" tittle="当事人类型" />
          <van-cell readonly name="name" :value="item.name" tittle="名称" />
          <van-cell readonly name="corporationName" :value="item.corporationName" tittle="法人姓名" />
          <van-cell readonly name="id" :value="item.id" tittle="身份证" />
          <van-cell readonly name="address" :value="item.address" tittle="地址" />
          <van-cell readonly name="phone" :value="item.phone" tittle="联系电话" />
        </div>-->
      </van-cell-group>
      <van-cell>
        图片：
        <SUpload
          ref="myupload"
          :accept="access"
          :sync2Dingding="false"
          :isOnlyView="true"
          style="margin-left:80px;margin-bottom:5px;"
        ></SUpload>
      </van-cell>
      <van-cell>
        附件：
        <SUpload
          style="margin-left:80px;margin-bottom:5px;"
          ref="myupload"
          :accept="access"
          :sync2Dingding="false"
          :isOnlyView="true"
        ></SUpload>
      </van-cell>
      <van-cell
        readonly
        name
        v-model="eventCheck.dealResult"
        type="textarea"
        autosize
        title="处理结论"
      ></van-cell>
      <van-cell readonly name="dealType" :value="eventCheck.dealType" title="处理决定" />
      <van-cell readonly name="needTailAfter" :value="eventCheck.needTailAfter" title="是否涉嫌犯罪" />
      <van-cell>
        <van-button type="info" @click="returnSubmitForm" native-type="submit" size="large">返回</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import PartyInfoView from '../../components/business/PartyInfoView'
import SUpload from '../../components/file/StandardUploadFile'
export default {
  name: '',
  components: {
    SUpload,
    PartyInfoView
  },
  props: {},
  data () {
    return {
      access: '',
      eventCheck: {
        eventType: '非法捕捞',
        eventTime: new Date(),
        eventAddress: '成都市',
        // party: [
        //   //当事人信息
        //   {
        //     partyType: "个人",
        //     name: "小貂蝉",
        //     sex: "女",
        //     job: "前端工程师",
        //     id: "5113026155355X",
        //     address: "成都市武侯区",
        //     phone: 13629091535
        //   },
        //   {
        //     partyType: "企业",
        //     name: "成都实业集团",
        //     corporationName: "张叶星",
        //     id: "5113026155355X",
        //     address: "成都市武侯区",
        //     phone: 13629091535
        //   }
        // ],
        // enterprise: [], //企业
        // personnal: [], //个人
        dealResult:
          '成都市成都市成都市成都市成都市成都市成都市成都市成都市成都市成都市',
        dealType: '处理结论类型',
        needTailAfter: '尚未查询到犯罪记录'
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 筛选当时人类别
    // type() {
    //   this.eventCheck.party.map((item, index) => {
    //     if (item.partyType == "个人") {
    //       this.eventCheck.personnal.push(item);
    //     } else {
    //       this.eventCheck.enterprise.push(item);
    //     }
    //   });
    // },
    returnSubmitForm () {
      this.$router.push('/submitForm')
    }
  },
  created () {
    // this.type();
  },
  mounted () {}
}
</script>
<style lang="less">
</style>
