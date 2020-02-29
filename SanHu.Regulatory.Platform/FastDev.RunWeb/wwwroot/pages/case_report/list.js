define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "TaskId",
                    display: "任务id",
                    type: "string"
                },
                {
                    name: "EventId",
                    display: "事件id",
                    type: "string"
                },
                {
                    name: "CaseId",
                    display: "案件id",
                    type: "string"
                },
                {
                    name: "LawPartyIds",
                    display: "当事人id",
                    type: "string"
                },
                {
                    name: "CaseDetail",
                    display: "案件详情及调查经过",
                    type: "string"
                },
                {
                    name: "PunishmentId",
                    display: "处罚结果",
                    type: "string"
                },
                {
                    name: "ExecuteState",
                    display: "执行情况",
                    type: "string"
                },
                {
                    name: "Url",
                    display: "案件详情连接",
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
        dataset: 'web/dataset?model=case_report&viewname=list'
    };
    exports.options.model = {
        name: 'case_report',
        title: '结案报告'
    };

    return exports;
});