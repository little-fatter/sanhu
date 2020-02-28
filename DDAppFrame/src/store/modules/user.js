import Vue from 'vue'
import { getToken, getUserPermissions, getUserInfo } from '@/api/userApi.js'
import { ACCESS_TOKEN } from '@/store/mutation-types'
/**
 * 定义store模块：应用用户user
 * 用于获取用户身份相关信息：token及用户基本信息
 */
const user = {
  state: {
    // 认证编号
    authcode: '',
    // token
    token: '',
    // 显示名称
    nickname: '',
    // 头像
    avatar: '',
    // 基本信息
    info: {},
    // 权限
    permissions: [],
    // 是否正在请求登录
    isRequestLogin: false
  },

  mutations: {
    SET_AUTHCODE: (state, authcode) => {
      state.authcode = authcode
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONS: (state, { permissions }) => {
      state.permissions = permissions
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ISREQUESTLOGIN: (state, isRequestLogin) => {
      state.isRequestLogin = isRequestLogin
    }
  },
  actions: {
    // 获取token
    GetAccessToken ({ commit }, { authcode, deviceId, deviceName }) {
      return new Promise((resolve, reject) => {
        getToken(authcode, deviceId, deviceName)
          .then(response => {
            Vue.ls.set(ACCESS_TOKEN, response.Token)
            commit('SET_AUTHCODE', authcode)
            commit('SET_TOKEN', response.Token)
            resolve()
          }).catch(error => {
            reject(error)
          })
      })
    },
    // 获取用户基本信息和权限
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          commit('SET_NICKNAME', response.Name)
          commit('SET_AVATAR', '')
          commit('SET_INFO', {
            userId: response.Id,
            accountId: response.AccountId,
            name: response.Name,
            mobile: response.Mobile,
            sex: response.Sex,
            address: response.Address,
            email: response.Email
          })
          getUserPermissions().then(res => {
            commit('SET_PERMISSIONS', res)
            resolve()
          }).catch(error => {
            reject(error)
          })
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取权限
    GetPermissions ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserPermissions().then(res => {
          commit('SET_PERMISSIONS', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit }) {
      return new Promise((resolve) => {
        commit('SET_AUTHCODE', '')
        commit('SET_TOKEN', '')
        commit('SET_PERMISSIONS', { permissions: [] })
        commit('SET_INFO', null)
        commit('SET_NICKNAME', '')
        commit('SET_ISREQUESTLOGIN', false)
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      })
    },
    // 设置正在登录
    setIsRequestLogin ({ commit }, isRequestLogin) {
      commit('SET_ISREQUESTLOGIN', isRequestLogin)
    }

  }
}

export default user
