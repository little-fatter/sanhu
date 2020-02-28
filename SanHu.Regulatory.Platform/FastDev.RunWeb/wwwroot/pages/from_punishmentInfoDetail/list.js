define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "PunishmentInfoNum",
                    display: "清单编号",
                    type: "string"
                },
                {
                    name: "ProductName",
                    display: "品名",
                    type: "string"
                },
                {
                    name: "Enterprise",
                    display: "企业",
                    type: "string"
                },
                {
                    name: "Specifications",
                    display: "规格",
                    type: "string"
                },
                {
                    name: "DateOfManufacture",
                    display: "生产日期",
                    type: "string"
                },
                {
                    name: "Number",
                    display: "数量",
                    type: "string"
                },
                {
                    name: "UnitPrice",
                    display: "单价",
                    type: "string"
                },
                {
                    name: "Packing",
                    display: "包装",
                    type: "string"
                },
                {
                    name: "Remarks",
                    display: "备注",
                    type: "string"
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
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            }
        },
        dataset: 'web/dataset?model=from_punishmentInfoDetail&viewname=list'
    };
    exports.options.model = {
        name: 'from_punishmentInfoDetail',
        title: '没收物品清单详情'
    };

    return exports;
});