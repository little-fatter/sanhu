define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "EventDescribe",
                    display: "描述",
                    type: "string"
                },
                {
                    name: "EventType",
                    display: "类型",
                    type: "string"
                },
                {
                    name: "IncidentTime",
                    display: "事发时间",
                    type: "datetime"
                },
                {
                    name: "IncidentAddress",
                    display: "事发地址",
                    type: "string"
                },
                {
                    name: "IncidentAddressXY",
                    display: "事发地址坐标",
                    type: "string"
                },
                {
                    name: "Result",
                    display: "结果",
                    type: "string"
                },
                {
                    name: "Needlawenforcement",
                    display: "需要执法",
                    type: "checkbox"
                },
                {
                    name: "Needtracking",
                    display: "需要跟踪",
                    type: "checkbox"
                },
                {
                    name: "Associatedforms",
                    display: "关联表单",
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
                display: "描述",
                name: "EventDescribe",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "类型",
                name: "EventType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事发时间",
                name: "IncidentTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "事发地址",
                name: "IncidentAddress",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事发地址坐标",
                name: "IncidentAddressXY",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "结果",
                name: "Result",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "需要执法",
                name: "Needlawenforcement",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "需要跟踪",
                name: "Needtracking",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "关联表单",
                name: "Associatedforms",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=task_patrol&viewname=list'
    };
    exports.options.model = {
        name: 'task_patrol',
        title: '任务-事件巡查'
    };

    exports.service = function service(page) {

};

    return exports;
});