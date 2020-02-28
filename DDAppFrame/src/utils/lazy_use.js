/**
 *  该文件配置所有使用的Vue第三方组件
 */
import Vue from 'vue'
import VueStorage from 'vue-ls'
import './components/vant_use'
import appConfig from '../config/app.config'
/**  判断权限VUE插件 */
import PermissionHelper from '@/utils/helper/permission'
Vue.use(VueStorage, appConfig.storageOptions)
Vue.use(PermissionHelper)
// 全量加载vant组件
// import Vue from 'vue'
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)
