import appConfig from '@/config/app.config'
import { getMainUrl, isNotEmpty } from '../utils/util'
import { getJsApiAuth, getCustomSpace, grantCustomSpace, processinstanceCspacePreview, processinstanceCspaceInfo } from '../api/ddApi'
import { getCurrentUserInfo, getAgentId } from './currentUser.service'
import * as dd from 'dingtalk-jsapi'
/**
 * 获取应用免登授权码
 */
export const ddgetCode = () => {
  return new Promise((resolve, reject) => {
    dd.runtime.permission.requestAuthCode({
      corpId: appConfig.corpId,
      onSuccess: (res) => {
        resolve(res.code)
      },
      onFail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 钉钉jsApi鉴权
 * @param {*} url
 * @param {*} nonceStr
 * @param {*} agentId
 * @param {*} corpId
 */
export const ddJsApiAuth = () => {
  const url = getMainUrl()
  const nonceStr = appConfig.nonceStr
  const agentId = getAgentId()
  const corpId = appConfig.corpId
  return new Promise((resolve, reject) => {
    getJsApiAuth(url, nonceStr, agentId, corpId).then((res) => {
      dd.config({
        agentId: agentId, // 必填，微应用ID
        corpId: corpId, // 必填，企业ID
        timeStamp: res.timeStamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          ...appConfig.ddjsApiList
        ] // 必填，需要使用的jsapi列表，注意：不要带dd。
      })

      dd.error(function (error) {
        console.log('ddjsApi鉴权错误', error)
      })
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * 获取企业下的自定义空间
 * @param {*} domain  企业内部调用时传入，需要为10个字节以内的字符串，仅可包含字母和数字，大小写不敏感
 * 返回 spaceid   获取到的空间id
 */
export const ddgetCustomSpace = (domain) => {
  return new Promise((resolve, reject) => {
    getCustomSpace(domain, getAgentId()).then((res) => {
      resolve(res.Spaceid)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 通用授权给当前用户访问企业自定义空间
 * @param {*} type  权限类型，目前支持上传和下载，上传请传add，下载请传download
 * @param {*} domain  企业内部调用时传入，授权访问该domain的自定义空间
 * @param {*} fileids  授权访问的文件id列表，id之间用英文逗号隔开，如"fileId1,fileId2", type=download时必须传递
 * @param {*} path   授权访问的路径，如授权访问所有文件传"/"，授权访问/doc文件夹传"/doc/"，需要utf-8 urlEncode, type=add时必须传递
 */
export const ddgrantCustomSpace = (type, domain, fileids = '', path = '/') => {
  const userInfo = getCurrentUserInfo()
  return new Promise((resolve, reject) => {
    grantCustomSpace(getAgentId(), type, userInfo.userid, domain, fileids, path).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 通用文件预览接口
 * @param {*} domain 企业内部调用时传入，授权访问该domain的自定义空间
 * @param {*} file  文件结构：{
               spaceId: "232323",
               fileId: "DzzzzzzNqZY",
               fileName: "审批流程.docx",
               fileSize: 1024,
               fileType: "docx"
            },
 */
export const ddfilePreview = (domain, file) => {
  var fileids = file.fileId
  ddgrantCustomSpace('download', domain, fileids).then((res) => {
    dd.biz.cspace.preview({
      corpId: appConfig.corpId,
      spaceId: file.spaceId,
      fileId: file.fileId,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      onSuccess: function () {

      },
      onFail: function (err) {
        console.log('文件预览错误', err)
      }
    })
  })
}

/**
 * 保存文件到钉盘
 *  @param {*} url  文件在第三方服务器上的url地址或通过提交文件上传事务、单步文件上传获取到的media_id
 *  @param {*} 文件保存的名字
 *  返回文件结构：{"data":
                    [
                    {
                    "spaceId": "" //空间id
                    "fileId": "", //文件id
                    "fileName": "", //文件名
                    "fileSize": 111111, //文件大小
                    "fileType": "", //文件类型
                    }
                    ]
                 }
 */
export const ddsaveFile = (url, name) => {
  return new Promise((resolve, reject) => {
    dd.biz.cspace.saveFile({
      corpId: appConfig.corpId,
      url: url, // 文件在第三方服务器地址， 也可为通过服务端接口上传文件得到的media_id，详见参数说明
      name: name,
      onSuccess: function (data) {
        resolve(data)
        /* data结构
               {"data":
                  [
                  {
                  "spaceId": "" //空间id
                  "fileId": "", //文件id
                  "fileName": "", //文件名
                  "fileSize": 111111, //文件大小
                  "fileType": "", //文件类型
                  }
                  ]
               }
               */
      },
      onFail: function (err) {
        console.log('保存文件到钉盘错误', err)
        reject(err)
      }
    })
  })
}

/**
 *  审批流程中授权用户预览附件
 * @param {*} fileId 单个附件ID
 * @param {*} fileIdList 附件id列表，支持批量授权
 * @param {*} processInstanceId  实例id
 * @param {*} userid 用户ID
 */
export const ddprocessinstanceCspacePreview = (fileId, fileIdList, processInstanceId, userid) => {
  return processinstanceCspacePreview(getAgentId(), fileId, fileIdList, processInstanceId, userid)
}

/**
 *  获取审批钉盘空间信息接口
 *  返回审批钉盘空间对应的spaceId
 */
export const ddprocessinstanceCspaceInfo = () => {
  const userInfo = getCurrentUserInfo()
  return new Promise((resolve, reject) => {
    processinstanceCspaceInfo(parseInt(getAgentId()), userInfo.userid).then((res) => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 选人和选部门服务
 * @param {*} startWithDepartmentId  0 表示从企业最上层开始 -1 表示从自己所在部门开始
 * @param {*} title  标题
 * @param {*} multiple 是否多选
 * @param {*} responseUserOnly  true：返回人员信息；false：返回人员和部门信息
 * @param {*} maxUsers  最大可选人数
 */
export const ddcomplexPicker = (startWithDepartmentId = 0, title = '选择人员',
  multiple = false, responseUserOnly = true, maxUsers = 1000) => {
  return new Promise((resolve, reject) => {
    dd.biz.contact.complexPicker({
      title: title, // 标题
      corpId: appConfig.corpId, // 企业的corpId
      multiple: multiple, // 是否多选
      limitTips: '超出了', // 超过限定人数返回提示
      maxUsers: maxUsers, // 最大可选人数
      pickedUsers: [], // 已选用户
      pickedDepartments: [], // 已选部门
      disabledUsers: [], // 不可选用户
      disabledDepartments: [], // 不可选部门
      requiredUsers: [], // 必选用户（不可取消选中状态）
      requiredDepartments: [], // 必选部门（不可取消选中状态）
      appId: getAgentId(), // 微应用的Id
      permissionType: 'GLOBAL', // 可添加权限校验，选人权限，目前只有GLOBAL这个参数
      responseUserOnly: responseUserOnly, // 返回人，或者返回人和部门
      startWithDepartmentId: startWithDepartmentId, // 仅支持0和-1
      onSuccess: function (result) {
        resolve(result)
        /**
          {
              selectedCount:1,                              //选择人数
              users:[{"name":"","avatar":"","userid":""}]，//返回选人的列表，列表中的对象包含name（用户名），avatar（用户头像），emplId（用户工号）三个字段
              departments:[{"id":,"name":"","number":}]//返回已选部门列表，列表中每个对象包含id（部门id）、name（部门名称）、number（部门人数）
          }
          */
      },
      onFail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 根据人员选择的结果返回审批人ID字符串
 * @param {*} result
 */
export const getApproverIds = (result) => {
  var approverIdArray = []
  var approverIds = ''
  if (isNotEmpty(result)) {
    result.users.forEach(item => {
      var userId = item.emplId
      approverIdArray.push(userId)
    })
  }
  approverIds = approverIdArray.join()
  return approverIds
}

/**
 * 钉钉弹出消息
 * @param {*} message 消息内容
 * @param {*} title 标题
 */
export const ddAlert = (message, title = '提示') => {
  dd.device.notification.alert({
    message: message,
    title: title, // 可传空
    buttonName: '收到'
  })
}

// /**
//  * 设置导航栏右侧单个按钮
//  * @param {*} text  显示文本
//  * @param {*} show  控制按钮显示， true 显示， false 隐藏， 默认true
//  * @param {*} control  是否控制点击事件，true 控制，false 不控制， 默认true
//  */
// export const ddsetNavigateSingeRight = (text, show = true, control = true) => {
//   return new Promise((resolve, reject) => {
//     dd.biz.navigation.setRight({
//       show: show, // 控制按钮显示， true 显示， false 隐藏， 默认true
//       control: control, // 是否控制点击事件，true 控制，false 不控制， 默认false
//       text: text, // 控制显示文本，空字符串表示显示默认文本
//       onSuccess: function (result) {
//         resolve(result)
//       },
//       onFail: function (err) {
//         reject(err)
//       }
//     })
//   })
// }

/**
 * 设置导航栏右侧单个按钮
 * @param {*} text  显示文本
 * @param {*} successFun  成功的回调函数
 * @param {*} show  控制按钮显示， true 显示， false 隐藏， 默认true
 * @param {*} control  是否控制点击事件，true 控制，false 不控制， 默认true
 */
export const ddsetNavigateSingeRight = (text, successFun, show = true, control = true) => {
  dd.biz.navigation.setRight({
    show: show, // 控制按钮显示， true 显示， false 隐藏， 默认true
    control: control, // 是否控制点击事件，true 控制，false 不控制， 默认false
    text: text, // 控制显示文本，空字符串表示显示默认文本
    onSuccess: function (result) {
      successFun(result)
    },
    onFail: function (err) {
      ddAlert('刷新失败' + err)
    }
  })
}

/**
 *  设置导航栏右侧多个按钮
 * @param {*} items 是一个JSONArray，每一项包含：id，iconId，text，其中iconId是钉钉预置icon的索引值，非必填
 * @param {*} backgroundColor 下拉菜单背景色
 * @param {*} textColor 下拉菜单文字颜色
 */
export const ddsetNavigateMenuRight = (items, backgroundColor = '#000000', textColor = '#fffff') => {
  return new Promise((resolve, reject) => {
    dd.biz.navigation.setMenu({
      backgroundColor: backgroundColor, // 下拉菜单背景色
      textColor: textColor, // 下拉菜单文字颜色
      items: items, // 多个按钮的属性数组
      onSuccess: function (data) {
        // 点击任意一个按钮将会回调onSuccess，并返回被点击item的id。
        /*
        {"id":"1"}
        */
        resolve(data)
      },
      onFail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 关闭当前页面
 */
export const closePage = () => {
  return new Promise((resolve, reject) => {
    dd.biz.navigation.close({
      onSuccess: function (result) {
        resolve(result)
      },
      onFail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 * 获取当前地理位置信息(单次定位)
 * @param {*} targetAccuracy 期望定位精度半径(单位米)，定位结果尽量满足该参数要求，但是不一定能保证小于该误差，开发者需要读取返回结果的 accuracy 字段校验坐标精度；建议按照业务需求设置定位精度，推荐采用200m，可获得较好的精度和较短的响应时长
 * @param {*} coordinate 1：获取高德坐标；0：获取标准坐标；推荐使用高德坐标；标准坐标没有 address 字段
 * @param {*} withReGeocode 是否需要带有逆地理编码信息；该功能需要网络请求，请根据自己的业务场景使用
 * @param {*} useCache 是否缓存地理位置信息。默认是true。如果true，客户端会对定位的地理位置信息缓存，在缓存期内 (2分钟) 再次定位会返回旧的定位
 */
export const ddgetMapLocation = (targetAccuracy = 200, coordinate = 1, withReGeocode = false, useCache = true) => {
  return new Promise((resolve, reject) => {
    dd.device.geolocation.get({
      targetAccuracy: targetAccuracy,
      coordinate: coordinate,
      withReGeocode: withReGeocode,
      useCache: useCache, // 默认是true，如果需要频繁获取地理位置，请设置false
      onSuccess: function (result) {
        resolve(result)
        /* 高德坐标 result 结构
          {
              longitude : Number,
              latitude : Number,
              accuracy : Number,
              address : String,
              province : String,
              city : String,
              district : String,
              road : String,
              netType : String,
              operatorType : String,
              errorMessage : String,
              errorCode : Number,
              isWifiEnabled : Boolean,
              isGpsEnabled : Boolean,
              isFromMock : Boolean,
              provider : wifi|lbs|gps,
              isMobileEnabled : Boolean
          }
          */
      },
      onFail: function (err) {
        reject(err)
      }
    })
  })
}

/**
 *  唤起地图页面，根据设备位置或者传入的经纬度搜索POI
 * @param {*} latitude 非必须字段，需要和longitude组合成合法经纬度，高德坐标
 * @param {*} longitude 非必须字段，需要和latitude组合成合法经纬度，高德坐标
 * @param {*} scope 搜索范围，建议不要设置过低，否则可能搜索不到POI
 */
export const ddMapSearch = (latitude, longitude, scope = 500) => {
  return new Promise((resolve, reject) => {
    dd.biz.map.search({
      latitude: latitude, // 纬度
      longitude: longitude, // 经度
      scope: scope, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径

      onSuccess: function (poi) {
        resolve(poi)
        /* result 结构 */
        /* {
              province: 'xxx', // POI所在省会，可能为空
              provinceCode: 'xxx', // POI所在省会编码，可能为空
              city: 'xxx', // POI所在城市，可能为空
              cityCode: 'xxx', // POI所在城市，可能为空
              adName: 'xxx', // POI所在区名称，可能为空
              adCode: 'xxx', // POI所在区编码，可能为空
              distance: 'xxx', // POI与设备位置的距离
              postCode: 'xxx', // POI的邮编，可能为空
              snippet: 'xxx', // POI的街道地址，可能为空
              title: 'xxx', // POI的名称
              latitude: 39.903578, // POI的纬度
              longitude: 116.473565, // POI的经度
          } */
      },
      onFail: function (err) {
        reject(err)
      }
    })
  })
}
