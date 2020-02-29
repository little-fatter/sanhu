import { postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'
import { getQueryConditon } from '../utils/util'
const defaultCondition = { 'rules': [], 'groups': [], 'op': 'and' }

/**
 * 字典表类型编号
 */
export const DictionaryCode = {
    // 事件类型
    EventType: 'EventType',
    // 当事人类型
    Typesofparties: 'Typesofparties',
    // 案件类型
    CaseType: 'CaseType',
    // 案件来源
    Sourceofcase: 'Sourceofcase '
}

/**
 * 通用分页查询接口
 * @param {*} model 模块名称
 * @param {*} PageIndex PageIndex
 * @param {*} PageSize PageSize
 * @param {*} Condition 查询条件
 */
export const getPageDate = (model, PageIndex, PageSize, Condition = defaultCondition) => {
    var url = `${apiConfig.regulatory.getPageDate}?model=${model}&appid=`
    return postHttp({
        url: url,
        data: {
            Condition,
            PageIndex,
            PageSize
        }
    })
}

/**
 * 通用详情查询接口
 * @param {*} model 模块名称
 * @param {*} id id
 */
export const getDetaildata = (model, id) => {
    return postHttp({
        url: apiConfig.regulatory.getDetaildata,
        data: {
            model,
            id
        }
    })
}

/**
 * 根据过滤器获取详情接口
 * @param {*} model 模块名称
 * @param {*} Condition 查询条件
 */
export const getDetialdataByfilter = (model, Condition = defaultCondition) => {
    return postHttp({
        url: apiConfig.regulatory.getDetaildata,
        data: {
            model,
            filter: Condition
        }
    })
}

/**
 * 根据事件ID获取详情接口
 * @param {*} model 模块名称
 * @param {*} eventInfoId 事件ID
 */
export const getDetialdataByEventInfoId = (model, eventInfoId) => {
    var rules = [{
        field: 'EventInfoId',
        op: 'equal',
        value: eventInfoId,
        type: 'string'
    }]
    var conditon = getQueryConditon(rules)
    return getDetialdataByfilter(model, conditon)
}

/**
 * 通用操作接口
 * @param {*} id 操作标识
 * @param {*} model 模块名称
 * @param {*} data 数据对象
 * @param {*} context
 */
export const commonOperateApi = (id, model, data, context = '') => {
    return postHttp({
        url: apiConfig.regulatory.commonOperateApi,
        data: {
            id,
            model,
            data,
            context
        }
    })
}

/**
 * 字典表接口
 * @param {*} context
 */
export const getDictionaryItems = (context) => {
    return postHttp({
        url: apiConfig.regulatory.getDictionaryItems,
        data: {
            model: 'res_dictionary',
            context
        }
    })
}

/**
 * 通用保存接口
 * @param {*} data 数据
 * @param {*} model 模块名称
 * @param {*} method 操作
 */
export const commonSaveApi = (data, model, method = 'create') => { <<
        << << < HEAD
        return postHttp({
            url: apiConfig.regulatory.commonSaveApi,
            data: {
                data,
                model,
                method
            }
        })
    } ===
    === =
    return postHttp({
        url: apiConfig.regulatory.commonSaveApi,
        data: {
            data,
            model,
            method,
            id: 'FINISH'
        }
    })
} >>>
>>> > 426037 d6125c41e6c2459a4cdb7fb47b87838527