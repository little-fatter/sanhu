define([],
function() {

    var exports = {
        type: 'template',
        options: {
            list: {
                columns: [{
                    name: "Customer",
                    display: "客户",
                    type: "ref"
                }]
            },
            common: {
                viewType: "template",
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "",
                searchBoxShowType: "left",
                searchAdShowType: "left"
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Customer",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {
                title: "销售报表",
                subtitle: "",
                legendType: "pie",
                width: "",
                height: "",
                legendField: "Customer",
                legendFieldType: "ref",
                legendIncludeDataOnly: 0,
                axisField: "OrderDate",
                axisFieldType: "year",
                valueFieldType: "count",
                valueField: "Amount"
            },
            search: {
                fields: [{
                    label: "客户",
                    type: "ref_popupselect",
                    name: "Customer",
                    name_text: "客户",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "200",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "crm_customer"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "crm_customer"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "CustomerName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?mode=crm_customer&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 客户",
                        many2many: true
                    },
                    type_text: "弹出&自动完成"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=sales_order&viewname=template'
    };
    exports.options.model = {
        name: 'sales_order',
        title: '销售订单'
    };

    return exports;
});