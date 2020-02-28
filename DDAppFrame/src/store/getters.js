
/**
 * 定义store的getter（可以认为是store的计算属性）
 * 用于快捷访问store中的各种状态
 */
const getters = {
  authcode: state => state.user.authcode, // 获取authcode
  token: state => state.user.token, // token
  avatar: state => state.user.avatar, // 用户图标
  nickname: state => state.user.nickname, // 用户显示名称
  isSuperAdmin: state => state.user.isSuperAdmin,
  permissions: state => state.user.permissions, // 欢迎信息
  userInfo: state => state.user.info, // 用户基本信息
  menus: state => state.userMenu.menus // 用户可操作的菜单
}

export default getters
