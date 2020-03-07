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
                    name: "FormType",
                    display: "表单类型",
                    type: "string"
                },
                {
                    name: "CaseId",
                    display: "案件id",
                    type: "string"
                },
                {
                    name: "evtCode",
                    display: "事件编码",
                    type: "string"
                },
                {
                    name: "evtTypeId",
                    display: "事件类型ID",
                    type: "string"
                },
                {
                    name: "CaseType",
                    display: "案件类型",
                    type: "string"
                },
                {
                    name: "CaseNumber",
                    display: "案件编号",
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
        dataset: 'web/dataset?model=formwith_eventcase&viewname=list'
    };
    exports.options.model = {
        name: 'formwith_eventcase',
        title: '全部表单plus'
    };

    return exports;
});