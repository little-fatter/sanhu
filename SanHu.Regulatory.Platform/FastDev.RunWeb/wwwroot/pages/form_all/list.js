define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "OriginatorID",
                    display: "发起人",
                    type: "string"
                },
                {
                    name: "InitiationTime",
                    display: "发起时间",
                    type: "datetime"
                },
                {
                    name: "CompletionTime",
                    display: "完成时间",
                    type: "datetime"
                },
                {
                    name: "FormName",
                    display: "表单名称",
                    type: "string"
                },
                {
                    name: "ContentValidity",
                    display: "内容简介",
                    type: "string"
                },
                {
                    name: "Department",
                    display: "部门",
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
                },
                {
                    name: "CaseID",
                    display: "案件id",
                    type: "string"
                },
                {
                    name: "TaskID",
                    display: "任务id",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 1,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
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
            },
            {
                display: "案件id",
                name: "CaseID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "任务id",
                name: "TaskID",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=form_all&viewname=list'
    };
    exports.options.model = {
        name: 'form_all',
        title: '全部表单'
    };

    exports.service = function service(page) {

};

    return exports;
});