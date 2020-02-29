<script>
import { isNotEmpty } from '../../utils/util'
/**
 * 封装路由router-view组件
 * 主要判断路是否需要使用keep-alive来保持组件状态
 */
export default {
  name: 'RouteView',
  data () {
    return {
      routeName: 'RouteView'
    }
  },
  methods: {
    getContent () {
      return this.$refs.rcontent
    }
  },
  render () {
    const { $route: { meta } } = this
    const inKeep = (
      <keep-alive>
        <router-view ref="rcontent"/>
      </keep-alive>
    )
    const notKeep = (
      <router-view ref="rcontent" />
    )
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
    if (isNotEmpty(meta.keepAlive) && meta.keepAlive) {
      return inKeep
    } else {
      return notKeep
    }
  }
}
</script>
