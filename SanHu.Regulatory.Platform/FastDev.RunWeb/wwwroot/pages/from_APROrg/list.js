define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CauseOfAction",
                    display: "案由",
                    type: "string"
                },
                {
                    name: "PartyName",
                    display: "当事人名称",
                    type: "string"
                },
                {
                    name: "Source",
                    display: "来源",
                    type: "string"
                },
                {
                    name: "RegisterTime",
                    display: "立案时间",
                    type: "datetime"
                },
                {
                    name: "CrimeScene",
                    display: "案发地点",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "案由",
                name: "CauseOfAction",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "来源",
                name: "Source",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人名称",
                name: "PartyName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人代表",
                name: "PartyLP",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人电话",
                name: "PartyPhone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人身份证",
                name: "PartyIDCard",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人住址",
                name: "PartyAddress",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "立案时间",
                name: "RegisterTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "案发地点",
                name: "CrimeScene",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案件承办人",
                name: "CaseHandler",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "证件编号",
                name: "CaseHandlerNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "简要案情及调查经过",
                name: "Content",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处罚结果",
                name: "PenaltyResult",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "执行情况",
                name: "ExecuteResult",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "承办人意见",
                name: "CaseHandlerOp",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "承办机构意见",
                name: "CaseOrgOp",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "承办机构负责人",
                name: "CaseOrgLeader",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位负责人意见",
                name: "DeptOp",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位负责人",
                name: "DeptLeader",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "承办人签字时间",
                name: "CaseHandlerTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "承办机构签字时间",
                name: "CaseOrgTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "单位负责人签字时间",
                name: "DeptLeaderTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "填表人员",
                name: "Recorder",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "填表时间",
                name: "RecorderTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "发起人",
                name: "OriginatorID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "发起时间",
                name: "InitiationTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "完成时间",
                name: "CompletionTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "表单名称",
                name: "FormName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "内容简介",
                name: "ContentValidity",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "部门",
                name: "Department",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "表单状态",
                name: "FormState",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "需要通知",
                name: "NeedNotice",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "需要罚款",
                name: "NeedFine",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "表单id",
                name: "FormID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处理人",
                name: "handler",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件id",
                name: "EventInfoId",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=from_APROrg&viewname=list'
    };
    exports.options.model = {
        name: 'from_APROrg',
        title: '行政处罚案件结案报告_单位'
    };

    exports.service = function service(page) {

};

    return exports;
});