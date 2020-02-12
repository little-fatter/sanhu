define([],
function() {

    var exports = {
        type: 'template',
        options: {
            list: {
                columns: [{
                    name: "OrderDate",
                    display: "单据日期",
                    type: "string"
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
                buttonsShowType: "right",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "OrderDate",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            search: {
                fields: [{
                    label: "供应商",
                    type: "ref_popupselect",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "crm_supplier"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "crm_supplier"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "SupplierName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?mode=crm_supplier&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 供应商",
                        many2many: true
                    },
                    name: "Supplier",
                    name_text: "供应商",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "150",
                    type_text: "弹出&自动完成"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=purchase_order&viewname=template'
    };
    exports.options.model = {
        name: 'purchase_order',
        title: '采购单'
    };

    return exports;
});