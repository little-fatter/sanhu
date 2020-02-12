<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="我的待办" content="8个任务" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="本周任务平均处理时间" content="32分钟" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="本周完成任务数" content="24个"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="标准列表">

      <div slot="extra">
        <a-radio-group>
          <a-radio-button>全部</a-radio-button>
          <a-radio-button>进行中</a-radio-button>
          <a-radio-button>等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus">添加</a-button>
      </div>

      <a-list size="large" :pagination="{showSizeChanger: true, showQuickJumper: true, pageSize: 5, total: 50}">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title+"."+item.avatar }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a>编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>{{ item.startAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>

    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'

const rootPath = process.env.BASE_URL

const data = []
data.push({
  title: 'Vue',
  avatar: rootPath + '/img/vue.png',
  description: '一套易于上手的构建用户界面的渐进式前端框架',
  owner: '周星星',
  startAt: '2019-04-01 22:44',
  progress: {
    value: 90
  }
})
data.push({
  title: 'Ant Design',
  avatar: rootPath + '/img/AntDesign.png',
  description: '生命就像一盒巧克力，结果往往出人意料',
  owner: '周星星',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 66
  }
})
data.push({
  title: 'Angular',
  avatar: '~@/assets/img/angular.png',
  description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  owner: '周星星',
  startAt: '2019-04-01 22:44',
  progress: {
    value: 54
  }
})

data.push({
  title: 'React',
  avatar: '~@/assets/img/react.svg',
  description: '以前是最好的，但是不代表以后就是最好的',
  owner: '周星星',
  startAt: '2018-07-26 22:44',
  progress: {
    value: 30
  }
})
data.push({
  title: 'Bootstrap',
  avatar: '~@/assets/img/Bootstrap.png',
  description: '那时候我只会想自己想要什么，从不想自己拥有什么',
  owner: '周星星',
  startAt: '2018-07-26 22:44',
  progress: {
    status: 'exception',
    value: 100
  }
})

export default {
  name: 'StandardList',
  components: {
    HeadInfo
  },
  data () {
    return {
      data
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
