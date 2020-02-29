define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "FormNumber",
                    display: "表单编号",
                    type: "string"
                },
                {
                    name: "FormName",
                    display: "表单名称",
                    type: "string"
                },
                {
                    name: "Party",
                    display: "当事人",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "地址",
                    type: "string"
                },
                {
                    name: " lawexecutor1",
                    display: "执法人1",
                    type: "string"
                },
                {
                    name: "lawexecutor2",
                    display: "执法人2",
                    type: "string"
                },
                {
                    name: "lawexecutor1Num",
                    display: "执法人1编号",
                    type: "string"
                },
                {
                    name: "lawexecutor2Num",
                    display: "执法人2编号",
                    type: "string"
                },
                {
                    name: "Time",
                    display: "时间",
                    type: "datetime"
                },
                {
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
                hideToolbar: 0,
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
                display: "表单编号",
                name: "FormNumber",
                editor: {
                    type: "string"
                },
                type: "string"
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
                display: "当事人",
                name: "Party",
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
                display: "执法人1",
                name: " lawexecutor1",
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
                display: "时间",
                name: "Time",
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
        dataset: 'web/dataset?model=from_inventory&viewname=list'
    };
    exports.options.model = {
        name: 'from_inventory',
        title: '没收物品清单'
    };

    exports.service = function service(page) {

};

    return exports;
});