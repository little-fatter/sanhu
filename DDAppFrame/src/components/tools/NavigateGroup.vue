<template>
  <div class="workplace-navigate">
    <div class="workplace-navigate-nogroup" v-if="!isNeedGroupForNavigate">
      <div class="navigate-grid">
        <div class="navigate-grid-item" v-for="(navItem, index) in navigateList" :key="index">
          <div class="navigate-grid-item-content">
            <router-link :to="navItem.path">
              <img :src="navItem.icon">
              <span class="navigate-grid-item-name">{{ navItem.name }}</span>
            </router-link>
            <div class="navigate-grid-item-info" v-if="navItem.info">{{ navItem.info }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="Workplace-navigate-group">
      <van-panel
        v-for="(navigate, index) in navigateList"
        :key="index"
        :title="navigate.group"
      >
        <div class="navigate-grid">
          <div class="navigate-grid-item" v-for="(navItem, cindex) in navigate.items" :key="cindex">
            <div class="navigate-grid-item-content">
              <router-link :to="navItem.path">
                <img :src="navItem.icon">
                <span class="navigate-grid-item-name">{{ navItem.name }}</span>
              </router-link>
              <div class="navigate-grid-item-info" v-if="navItem.info">{{ navItem.info }}</div>
            </div>
          </div>
        </div>
      </van-panel>
    </div>
  </div>
</template>

<script>
import { getChildMenusForHomePage } from '../../utils/helper/menu.helper'
import { isEmpty, isNotEmpty } from '../../utils/util'
const OtherGroupName = '其他'
export default {
  name: 'NavigateGroup',

  data () {
    return {
      navigateList: [],
      isNeedGroupForNavigate: false
    }
  },
  computed: {
    childMenusForHomePage: function () {
      return getChildMenusForHomePage()
    }
  },
  created () {
    this.setNavigateList(this.childMenusForHomePage)
  },
  methods: {
    setNavigateList (menus) {
      console.log('menus', menus)
      const emptyUrlMenu = menus.find(item => isEmpty(item.menuUrl))
      if (isEmpty(emptyUrlMenu)) {
        this.isNeedGroupForNavigate = false
        for (const menu of menus) {
          const navigateItem = {
            ...this.getNavigateItem(menu)
          }
          this.navigateList.push(navigateItem)
        }
      } else {
        this.isNeedGroupForNavigate = true
        const emptyUrlMenus = menus.filter(item => isEmpty(item.menuUrl))
        const noEmptyUrlMenus = menus.filter(item => !isEmpty(item.menuUrl))

        const navigateListByEmpty = this.getNavigateList(emptyUrlMenus)
        const navigateListByNoEmpty = this.getNavigateList(noEmptyUrlMenus, false)

        this.navigateList = [
          ...navigateListByEmpty,
          ...navigateListByNoEmpty
        ]
      }
    },
    getNavigateList (menus, isEmpty = true) {
      const tempNavigateList = []
      if (isNotEmpty(menus) && menus.length > 0) {
        if (isEmpty) {
          for (const menu of menus) {
            const navigateItem = {
              group: menu.menuName,
              items: []
            }
            if (menu.children) {
              for (const childMenu of menu.children) {
                const item = this.getNavigateItem(childMenu)
                navigateItem.items.push(item)
              }
              tempNavigateList.push(navigateItem)
            }
          }
        } else {
          const navigateItem = {
            group: OtherGroupName,
            items: []
          }
          for (const menu of menus) {
            const item = this.getNavigateItem(menu)
            navigateItem.items.push(item)
          }
          tempNavigateList.push(navigateItem)
        }
      }
      return tempNavigateList
    },
    getNavigateItem (menu) {
      const navigateItem = {
        id: menu.menuId,
        name: menu.menuName,
        path: menu.menuUrl,
        icon: menu.menuIcon,
        info: null
      }
      return navigateItem
    },
    /**
     * 更新导航项的info信息
     * itemInfoArray是更新项数组，每项包含{menuId:'',info:''} 其中menuId对于菜单的Id，info是需要提示消息个数，如'8'
     */
    updateNavigateItemInfo (itemInfoArray) {
      if (itemInfoArray && itemInfoArray.length > 0) {
        for (const item of itemInfoArray) {
          if (!this.isNeedGroupForNavigate) {
            const navigateItem = this.navigateList.find(n => n.id === item.menuId)
            if (navigateItem) {
              navigateItem.info = item.info
            }
          } else {
            for (const itemGroup of this.navigateList) {
              const navigateItem = itemGroup.items.find(n => n.id === item.menuId)
              if (navigateItem) {
                navigateItem.info = item.info
                break
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import url('../../assets/css/mixin.less');
.workplace-navigate
{

  .navigate-grid {
      box-sizing: border-box;
      font-size: 12px;
  }

  .van-cell-group
  {
    margin-bottom: 20px;
  }

  .van-panel__header
  {
     color: #222328
  }

  .navigate-grid-item {
      display: inline-block;
      box-sizing: border-box;
      width: 25%;
      text-align: center;
      & > .navigate-grid-item-content {
        padding-top: 10px;
        padding-bottom: 10px;
        position: relative;
        .navigate-grid-item-info
        {
            position: absolute;
            right: 16px;
            top: 0px;
            color: #fff;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            box-sizing: border-box;
            min-width: 25px;
            min-height: 25px;
            line-height: 25px;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: #f44;
            -webkit-transform: translateX(50%);
            transform: translateX(50%);
            -webkit-transform-origin: 100%;
            transform-origin: 100%;
        }
      }
      img {
        display: inline-block;
        .px2rem(width, 50);
      }

     .navigate-grid-item-name {
       display: block;
       color: #64697B;
       font-size:14px;
     }

  }

}

</style>
