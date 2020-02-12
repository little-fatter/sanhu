import { Menu, Icon, Input } from 'ant-design-vue'
import { isNotEmpty } from '@/utils/util'

const { Item, ItemGroup, SubMenu } = Menu
const { Search } = Input

/**
 * 使用Menu组件实现通用树组件
 */
export default {
  name: 'Tree',
  props: {
    /**
     * 数据源
     * 结构：
     * {
     *    key:1
     *    title:''
     *    icon:
     *    group:true
     *    children
     * }
     */
    dataSource: {
      type: Array,
      required: true
    },
    // 当前展开的 SubMenu 菜单项 key 数组
    openKeys: {
      type: Array,
      default: () => []
    },
    // 是否需要搜索
    search: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localOpenKeys: []
    }
  },
  created () {
    this.localOpenKeys = this.openKeys.slice(0)
  },
  methods: {
    /** MenuItem的新增事件回调函数 */
    handlePlus (item) {
      this.$emit('add', item)
    },
    /** 搜索change事件回调函数 */
    handleSearchByChange (item) {
      this.$emit('searchByChange', item)
    },
    /** 搜索回车事件回调函数 */
    handleSearchByPressEnter (item) {
      this.$emit('searchByPressEnter', item)
    },
    renderSearch () {
      return (
        <Search
          placeholder="请输入"
          style="width: 100%; margin-bottom: 1rem"
          {...{ on: { change: item => this.handleSearchByChange(item), pressEnter: item => this.handleSearchByPressEnter(item) } }}
        />
      )
    },
    renderIcon (icon) {
      return icon && (<Icon type={icon} />) || null
    },
    renderMenuItem (item) {
      return (
        <Item key={item.key}>
          { this.renderIcon(item.icon) }
          { item.title }
          <a class="btn" style="width: 20px;z-index:1300" {...{ on: { click: () => this.handlePlus(item) } }}><a-icon type="plus"/></a>
        </Item>
      )
    },
    renderItem (item) {
      if (!item) {
        return null
      }
      return isNotEmpty(item.children) ? this.renderSubItem(item, item.key) : this.renderMenuItem(item)
    },
    renderItemGroup (item) {
      const childrenItems = item.children.map(o => {
        return this.renderItem(o)
      })

      return (
        <ItemGroup key={item.key}>
          <template slot="title">
            <span> { this.renderIcon(item.icon) } { item.title }</span>
            <a-dropdown>
              <a class="btn"><a-icon type="ellipsis" /></a>
              <a-menu slot="overlay">
                <a-menu-item key="1">新增</a-menu-item>
                <a-menu-item key="2">合并</a-menu-item>
                <a-menu-item key="3">移除</a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          { childrenItems }
        </ItemGroup>
      )
    },
    renderSubItem (item, key) {
      const childrenItems = item.children && item.children.map(o => {
        return this.renderItem(o)
      })

      const title = (
        <span slot="title">
          { this.renderIcon(item.icon) }
          <span>{ item.title }</span>
        </span>
      )

      if (item.group) {
        return this.renderItemGroup(item)
      }
      return (
        <SubMenu key={key}>
          { title }
          { childrenItems }
        </SubMenu>
      )
    }
  },
  render () {
    const { dataSource, search } = this.$props
    const list = dataSource.map(item => {
      return this.renderItem(item)
    })

    return (
      <div class="tree-wrapper">
        { search ? this.renderSearch() : null }
        <Menu mode="inline" class="custom-tree" {...{ on: { click: item => this.$emit('click', item), 'update:openKeys': val => { this.localOpenKeys = val } } }} openKeys={this.localOpenKeys}>
          { list }
        </Menu>
      </div>
    )
  }
}
