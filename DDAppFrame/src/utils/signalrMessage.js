import * as signalR from '@aspnet/signalr'

import AppConfig from '../config/app.config'

import { getCurrentUserToken } from '../service/currentUser.service'

/**
 * 建立服务端连接
 * @param {*} connctionCallBack 连接回调函数,连接成功后返回连接对象
 * @param {*} revMsgCallBack 服务端消息接收回调函数
 */
export const setupConnction = (connctionCallBack, revMsgCallBack) => {
  const url = AppConfig.signalrServerUrl
  const token = getCurrentUserToken()
  const connction = new signalR.HubConnectionBuilder()
    .withUrl(url, { accessTokenFactory: () => token })
    .build()
  console.log('connction', connction)
  connction.on('RevMessage', function (res) {
    console.log('RevMessage', res)
    revMsgCallBack({
      isSuccess: true,
      data: res
    })
  })

  connction.on('RevErrMessage', function (res) {
    console.log('RevErrMessage', res)
    revMsgCallBack({
      isSuccess: false,
      data: res
    })
  })

  connction.start().then(() => {
    console.log('连接signalr服务成功')
    connctionCallBack({
      isSuccess: true,
      data: connction
    })
  }).catch(error => {
    console.error('连接signalr服务失败,原因：' + error)
    connctionCallBack({
      isSuccess: false,
      data: null
    })
  })
}

/**
 * 发送消息给单个人
 * @param {*} connction 连接对象
 * @param {*} toUserId  发送人的ID
 * @param {*} message 发送的消息
 */
export const sendToOne = (connection, toUserId, message) => {
  console.info('state', connection.state)
  return new Promise((resolve, reject) => {
    if (connection.state === 1) {
      connection.invoke('imSendToOne', toUserId, message)
      resolve()
    } else {
      reject(new Error('连接已断开,请重新连接'))
    }
  })
}

/**
 * 关闭连接
 * @param {*} connction 连接对象
 */
export const closeConnction = (connction) => {
  return connction.stop()
}
