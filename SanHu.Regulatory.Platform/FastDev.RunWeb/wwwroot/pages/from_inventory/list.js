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
                dialogWidth: 700,
                dialogHeight: 500
            }
        },
        dataset: 'web/dataset?model=from_inventory&viewname=list'
    };
    exports.options.model = {
        name: 'from_inventory',
        title: '没收物品清单'
    };

    return exports;
});