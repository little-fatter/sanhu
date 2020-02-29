<style lang="less" scoped>
.article-wrapper {
  font-family: 'Microsoft YaHei';
  font-size: 14px;
}

.logo {
  margin: 20px;
}

.article-title {
  margin-top: 60px;
  color: #63687B;
  font-size: 24px;
  text-align: center;
}

.article-info {
  margin: 20px;
  color: #A1A6BA;
  text-align: center;
  font-size: 12px;
}

.article-content {
  margin: 0 auto;
  width: 65%;
  border-top: #EBEBEB 1px solid;
  color:#7E87AE;
  padding: 20px;
  line-height:19px;
}
</style>

<template>
  <div class="article-wrapper">
    <div class="logo">
    </div>
    <div class="article-head">
      <div class="article-title">
        {{ article.Title }}
      </div>
      <div class="article-info">
        {{ article.ModifyDate }}
          &nbsp;
          &nbsp;
        {{ article.ModifyUser[1] }}
      </div>
    </div>
    <div class="article-content">
      <div v-html="article.ArticleContent" ></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import getNoticeDetails from '@/api/sampleApi'

export default {
  data () {
    return {
      id: '',
      article: {
        ID: 'd2296e3d-df6c-476d-9bb3-a3b3bb720ca4',
        CreateDate: '2020-02-28 14:11:17',
        CreateUser: ['1057149267036213248', '超级管理员'],
        ModifyDate: '2020-02-28 15:34:57',
        ModifyUser: ['1057149267036213248', '超级管理员'],
        Status: null,
        Title: '玉溪市人民政府2020年森林草原防火命令',
        ArticleCategory: ['161141ac-86f7-4cd4-b6e6-d9bd0c9119ab', '公告'],
        ArticleContent: `<p>各县（市、区）人民政府，市直各委、办、局，各人民团体和企事业单位，中央、省驻玉单位，驻玉军（警）部队：

        <p>近期，全市各地干旱少雨，气温持续偏高，大风天气明显增多，森林草原火险等级逐步攀升。为最大限度遏制森林草原火情火灾发生，确保森林草原资源和人民群众生命财产安全，根据《云南省森林防火条例》和《玉溪市森林防火条例》相关规定，特发布如下命令：</p>
        
        一、每年12月1日至次年6月15日为全市森林草原防火期，3月1日至5月31日为全市森林草原高火险期。
        
        二、森林草原防火区：本市行政区域内城市市区以外的森林、林木、林地和林地边缘500米范围内的其他地类。（县级以上人民政府可以自行确定防火区，并向社会公布）
        
        三、任何单位和个人发现森林草原火情火灾，应立即拨打森林草原火警电话0877—2051861报警。
        
        四、森林草原高火险期内，森林草原防火区禁止一切野外用火。
        
        五、森林草原防火期内，在森林草原防火区禁止下列行为：
        
        （一）吸烟、烧纸、烧香、烧蜂、烧荒、烤火、野炊、使用火把照明、焚烧垃圾、燃放烟花爆竹和孔明灯；
        
        （二）使用烟熏、火攻、电击等方式狩猎；
        
        （三）携带火种、易燃易爆物品以及其他可能引起森林草原火灾的物品进入森林草原防火区；
        
        （四）擅自实施烧除、炼山造林、勘察、开采矿藏和建设工程的野外用火；
        
        （五）擅自进行烧灰积肥、烧秸秆、烧炭等野外农事用火；
        
        （六）其他易引发森林草原火灾的行为。
        
        凡违反以上规定的，县级林业和草原行政主管部门依据《云南省森林防火条例》和《玉溪市森林防火条例》给予相应处罚。构成犯罪的，依法追究刑事责任。
        
        </p>`,
        IsPic: '1',
        ImageUrl: '/framework/images/logos/fwLoginBg.jpg',
        Publisher: 'sdfasdf'

      }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    getNoticeDetails(this.id).then((ret) => {
      if (ret.statusCode) {
        this.article = ret.data
      }
    })
  }
}
</script>
