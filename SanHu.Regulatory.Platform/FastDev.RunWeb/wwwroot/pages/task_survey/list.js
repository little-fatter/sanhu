define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
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
                    name: "ProcessingDecisions",
                    display: "处理决定",
                    type: "number"
                },
                {
                    name: "ExistCrim",
                    display: "存在犯罪",
                    type: "string"
                },
                {
                    name: "EventID",
                    display: "事件id",
                    type: "string"
                },
                {
                    name: "CaseID",
                    display: "案件id",
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
                display: "处理决定",
                name: "ProcessingDecisions",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "存在犯罪",
                name: "ExistCrim",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件id",
                name: "EventID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案件id",
                name: "CaseID",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=task_survey&viewname=list'
    };
    exports.options.model = {
        name: 'task_survey',
        title: '任务-勘察'
    };

    exports.service = function service(page) {

};

    return exports;
});