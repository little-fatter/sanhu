define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "ProductName",
                    display: "品名",
                    type: "string"
                },
                {
                    name: "lawParty",
                    display: "当事人",
                    type: "ref"
                },
                {
                    name: "handler",
                    display: "处理人",
                    type: "string"
                },
                {
                    name: "Packing",
                    display: "包装",
                    type: "string"
                },
                {
                    name: "UnitPrice",
                    display: "单价",
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
                display: "当事人",
                name: "lawParty",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "law_party"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "law_party"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "CaseId",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=law_party&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 当事人",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
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
                display: "案件Id",
                name: "CaseId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联表单类型",
                name: "Associatedobjecttype",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联的id",
                name: "AssociationobjectID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "任务Id",
                name: "TaskId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "lawPartyID",
                name: "lawPartyID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=form_confiscated_item&viewname=list'
    };
    exports.options.model = {
        name: 'form_confiscated_item',
        title: '物品清单'
    };

    exports.service = function service(page) {

};

    return exports;
});