import { getHttp, postHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

function condition(params = [], pageiIndex = 1, pageSize = 10) {
    return {
        Condition: {
            rules: [],
            groups: [(params.rules && params.rules.length > 0) || (params.groups && params.groups.length > 0) ? params : ''],
            op: 'and'
        },
        PageIndex: pageiIndex,
        PageSize: pageSize,
        SortName: 'ID',
        SortOrder: 'asc'
    }
}
// 案件
export function getcaseinfo(parameter, PageIndex, PageSize) {
    return postHttp({
        url: apiConfig.case_info,
        data: condition(parameter, PageIndex, PageSize)
    })
}
// 任务列表
export function getWorkTaskList(parameter, PageIndex, PageSize) {
    return postHttp({
        url: apiConfig.work_task,
        data: condition(parameter, PageIndex, PageSize)
    })
}

// 表单列表
export function getFormList(parameter, PageIndex, PageSize) {
    return postHttp({
        url: apiConfig.form_all,
        data: condition(parameter, PageIndex, PageSize)
    })
}

// 任务详情
export function getTaskDetails(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'work_task', id: parameter }
    })
}

// 结案报告（个人）
export function getFormAPRPerson(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'from_APRPerson', id: parameter }
    })
}
// 巡检记录表
export function getFromPatrolRecord(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'form_patrolRecord', id: parameter }
    })
}

// 当场处罚决定书
export function getLawPunish(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'law_punishmentInfo', id: parameter }
    })
}

// 结案报告（单位）
export function getFromAPROrg(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'from_APROrg', id: parameter }
    })
}

// 事件详情
export function getEventDetails(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'event_info', id: parameter }
    })
}

// 关联表单
export function getRelateForm(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'form_all', filter: parameter }
    })
}

// 字典
export function getDictionary(parameter) {
    return postHttp({
        url: apiConfig.dictionary,
        data: parameter
    })
}

// 当前用户
export function getUser(parameter) {
    return getHttp({
        url: apiConfig.userId,
        params: {
            ...parameter
        }
    })
}

// 通告详情
export function getNoticeDetails(parameter) {
    return postHttp({
        url: apiConfig.detail,
        data: { model: 'cms_article', id: parameter }
    })
}
var filter = {
        ModelName: 'core_printTemplate',
        Name: 'pdf打印'
    }
    // 打印预览
export function printPreview(parameter) {
    return postHttp({
        url: apiConfig.print,
        data: { model: 'core_printTemplate', filter: filter }
    })
}