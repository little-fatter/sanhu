<template>
  <div class="eventDetail">
    <van-cell-group>
      <!-- <van-cell border="none">任务类型：事件巡查</van-cell>
      <van-cell>巡查类型：巡查类型</van-cell>
      <van-cell>交办时间：2020-02-15 12：54：03</van-cell>
      <van-cell>期望完成时间：2020-02-15 12：54：03</van-cell>-->
      <van-cell>
        <van-cell is-link style="background-color:#DFDDDD;">事件信息</van-cell>
      </van-cell>
      <van-cell>
        事发地点： 澄江县xxx路 |
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
      <van-cell>上报时间：{{ reportTime }}</van-cell>
      <van-cell>上报来源：{{ reportType }}</van-cell>
      <van-cell>上报人：{{ reporterName }}</van-cell>
      <van-cell>事件类型：{{ evtTypeDisplayName }}</van-cell>
      <van-cell>
        <p>事件描述：</p>
        <p>{{ remark }}</p>
      </van-cell>
      <van-cell>
        关联表单：
        <span style="display:inline-block;width:60%">
          <svg
            t="1582606760517"
            class="icon"
            viewBox="0 0 1000 1000"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5583"
            width="20"
            height="20"
          >
            <path
              d="M546.133333 520.533333l59.733334-59.733333 21.333333 21.333333 115.2-115.2-119.466667-119.466666-115.2 115.2 4.266667 8.533333-59.733333 59.733333L384 358.4 614.4 128l243.2 243.2-230.4 230.4-81.066667-81.066667z m-115.2-68.266666L371.2 512l-8.533333-8.533333-115.2 115.2 119.466666 119.466666 115.2-115.2-21.333333-21.333333 59.733333-59.733333 81.066667 81.066666L371.2 853.333333 128 614.4 358.4 384l72.533333 68.266667zM571.733333 341.333333l59.733334 59.733334-230.4 230.4L341.333333 571.733333 571.733333 341.333333z"
              fill="#8a8a8a"
              p-id="5584"
            />
          </svg>
          这三提交的表单
        </span>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-form>
        <van-field
          name="desc"
          rows="3"
          autosize
          label="事件描述"
          type="textarea"
          maxlength="200"
          v-model="eventCheck.desc"
          readonly
        />
        <van-field
          name="eventType"
          v-model="eventCheck.eventType"
          label="事件类型"
          readonly
          class="dropdown-menu_noboder"
        >
          <template slot="input">
            <van-dropdown-menu>
              <van-dropdown-item v-model="eventCheck.eventType" disabled :options="eventTypeption" />
            </van-dropdown-menu>
          </template>
        </van-field>
        <van-field
          v-model="eventCheck.eventTime"
          readonly
          clickable
          name="eventTime"
          label="事发时间"
        />
        <!-- <van-calendar :default-date="eventCheck.eventTime" disabled /> -->

        <van-field
          v-model="eventCheck.eventAddress"
          readonly
          name="eventAddress"
          label="事发地点"
        >
          <!-- <van-icon name="location" color="#1E1E1E" slot="right-icon" size="30" /> -->
        </van-field>
        <van-field
          name="dealResult"
          rows="2"
          autosize
          label="处理结果"
          type="textarea"
          maxlength="200"
          v-model="eventCheck.dealResult"
          readonly
        />
        <!-- <van-cell>
          图片：
          <van-image width="100" height="100" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        </van-cell>-->
        <van-cell>
          附件：
          <SUpload
            ref="myupload"
            :accept="access"
            :sync2Dingding="false"
            :isOnlyView="true"
            style="margin-left:80px;margin-bottom:5px;"
          ></SUpload>
        </van-cell>
        <van-field name="dealType" label="是否请求执法人员处理">
          <van-radio-group
            disabled
            direction="horizontal"
            v-model="eventCheck.dealType"
            slot="input"
          >
            <van-radio :name="1" label-disabled>自行处理</van-radio>
            <van-radio :name="2" label-disabled>请求执法</van-radio>
          </van-radio-group>
        </van-field>
        <van-field name="dealType" label="是否需要跟踪整改">
          <van-radio-group
            disabled
            v-model="eventCheck.needTailAfter"
            direction="horizontal"
            slot="input"
          >
            <van-radio :name="1" label-disabled style="margin-right:0.7rem">不需要</van-radio>
            <van-radio :name="2" label-disabled>需要跟踪</van-radio>
          </van-radio-group>
        </van-field>
      </van-form>
      <van-cell>
        <van-button type="info" native-type="submit" @click="returnSubmitForm" size="large">返回</van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SUpload from '../../components/file/StandardUploadFile'
export default {
  name: '',
  components: {
    SUpload
  },
  props: {},
  data () {
    return {
      reportTime: '123',
      reportType: '公众号举报',
      reporterName: '小马哥',
      evtTypeDisplayName: '非法捕捞',
      remark:
        '武汉一名患者的这句话让医生红了双眼，也让无数人泪目。让医生远点，是担心传染，是希望“他们为更多武汉市民护佑生命”。“一个人撑起一片天，一颗心温暖一座城……”很多人这样留言。在这座城市，这些天来，这样的故事每天都在发生。',
      eventCheck: {
        desc:
          '武汉一名患者的这句话让医生红了双眼，也让无数人泪目。让医生远点，是担心传染，是希望“他们为更多武汉市民护佑生命”。“一个人撑起一片天，一颗心温暖一座城……”很多人这样留言。在这座城市，这些天来，这样的故事每天都在发生。',
        eventType: 1,
        eventTime: '2018-12-01',
        eventAddress: '成都市',
        dealResult:
          '武汉一名患者的这句话让医生红了双眼，也让无数人泪目。让医生远点，是担心传染，是希望“他们为更多武汉市民护佑生命”。“一个人撑起一片天，一颗心温暖一座城……”很多人这样留言。',
        dealType: 1,
        needTailAfter: 2
      },
      rejectReason: '',
      eventTypeption: [
        { text: '非法捕捞', value: 1 },
        { text: '非法', value: 2 }
      ],
      access: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    returnSubmitForm () {
      this.$router.go(-1)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less">
</style>
