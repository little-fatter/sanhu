define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Reason",
                    display: "原因",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "地址",
                    type: "string"
                },
                {
                    name: "FormState",
                    display: "表单状态",
                    type: "string"
                },
                {
                    name: "NeedNotice",
                    display: "需要通知",
                    type: "checkbox"
                },
                {
                    name: "NeedFine",
                    display: "需要罚款",
                    type: "checkbox"
                },
                {
                    name: "FormID",
                    display: "表单id",
                    type: "string"
                },
                {
                    name: "handler",
                    display: "处理人",
                    type: "string"
                },
                {
                    name: "EventInfoId",
                    display: "事件id",
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
                display: "原因",
                name: "Reason",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人",
                name: "Party",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "检查人1",
                name: "Inspector1",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "检查人2",
                name: "Inspector2",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "记录人",
                name: "NoteTaker",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "检查类别",
                name: "InspectiontType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "检查时间",
                name: "InspectionTime",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "执法人1",
                name: "lawexecutor1",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "执法人2",
                name: "lawexecutor2",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "执法人1编号",
                name: "lawexecutor1Num",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "执法人2编号",
                name: "lawexecutor2Num",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位",
                name: "Company",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "内容",
                name: "Content",
                editor: {
                    type: "string"
                },
                type: "string"
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
        dataset: 'web/dataset?model=from_inspectiontRecord&viewname=list'
    };
    exports.options.model = {
        name: 'from_inspectiontRecord',
        title: '勘验笔录'
    };

    exports.service = function service(page) {

};

    return exports;
});