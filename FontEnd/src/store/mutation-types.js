/**
 * 定义mutation(实时动作)类型
 * 主要用于作用缓存的Key值
 */

/** 设置ACCESS_TOKEN类型 */
export const ACCESS_TOKEN = 'Access-Token'
/** 是否传递当前用户给外部模块 */
export const IsDeliveryCurrentUser = 'IsDelivery_CurrentUser'
/** 控制是否显示侧边菜单类型 */
export const SIDEBAR_TYPE = 'SIDEBAR_TYPE'
/** 控制导航皮肤 */
export const DEFAULT_THEME = 'DEFAULT_THEME'
/** 控制导航模式类型 */
export const DEFAULT_LAYOUT_MODE = 'DEFAULT_LAYOUT_MODE'
/** 控制默认主题色类型 */
export const DEFAULT_COLOR = 'DEFAULT_COLOR'
/** 控制是否固定Header类型 */
export const DEFAULT_FIXED_HEADER = 'DEFAULT_FIXED_HEADER'
/** 控制是否固定侧边菜单类型 */
export const DEFAULT_FIXED_SIDEMENU = 'DEFAULT_FIXED_SIDEMENU'
/** 控制下滑时是否隐藏Header类型 */
export const DEFAULT_FIXED_HEADER_HIDDEN = 'DEFAULT_FIXED_HEADER_HIDDEN'
/** 控制是否是多页模式 */
export const DEFAULT_MULTI_TAB = 'DEFAULT_MULTI_TAB'
