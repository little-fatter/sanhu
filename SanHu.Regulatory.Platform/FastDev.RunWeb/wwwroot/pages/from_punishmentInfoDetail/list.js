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
            },
            type: "list",
            filterFields: [{
                display: "清单编号",
                name: "PunishmentInfoNum",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "品名",
                name: "ProductName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "企业",
                name: "Enterprise",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "规格",
                name: "Specifications",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "生产日期",
                name: "DateOfManufacture",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "数量",
                name: "Number",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单价",
                name: "UnitPrice",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "包装",
                name: "Packing",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remarks",
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
        dataset: 'web/dataset?model=from_punishmentInfoDetail&viewname=list'
    };
    exports.options.model = {
        name: 'from_punishmentInfoDetail',
        title: '没收物品清单详情'
    };

    exports.service = function service(page) {

};

    return exports;
});