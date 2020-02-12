define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "RepaymentDate",
                    display: "还款日期",
                    type: "datetime",
                    name_text: "还款日期",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "日期"
                },
                {
                    name: "Supplier",
                    display: "供应商",
                    type: "ref",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    name: "Amount",
                    display: "还款金额",
                    type: "curreny",
                    name_text: "还款金额",
                    width: "200",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "货币"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "600",
                dialogHeight: "400",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "RepaymentDate",
                startField: "RepaymentDate",
                endField: "RepaymentDate"
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
                        popupselect_url: "web/main/?model=crm_supplier&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 供应商",
                        many2many: true
                    },
                    name: "Supplier",
                    name_text: "供应商",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "100",
                    type_text: "弹出&自动完成",
                    textField: "Supplier_textfield"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            type: "list",
            filterFields: [{
                display: "供应商",
                name: "Supplier",
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
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=crm_supplier&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 供应商",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "还款日期",
                name: "RepaymentDate",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "还款金额",
                name: "Amount",
                editor: {
                    type: "number"
                },
                type: "number"
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
                display: "SupplierID",
                name: "SupplierID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            addins: {}
        },
        dataset: 'web/dataset?model=purchase_repayment&viewname=list'
    };
    exports.options.model = {
        name: 'purchase_repayment',
        title: '供应商还款'
    };

    exports.service = function service(page) {

};

    return exports;
});