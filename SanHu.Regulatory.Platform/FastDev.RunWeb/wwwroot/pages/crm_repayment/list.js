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
                    name: "Amount",
                    display: "还款金额",
                    type: "curreny",
                    name_text: "还款金额",
                    width: "200",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "货币"
                },
                {
                    name: "Customer",
                    display: "客户",
                    type: "ref",
                    name_text: "客户",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
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
                    label: "客户",
                    type: "select",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            mode: "crm_customer"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            mode: "crm_customer"
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
                        many2many: true,
                        autocomplete: true,
                        delayLoad: true
                    },
                    name: "Customer",
                    name_text: "客户",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "120",
                    type_text: "弹出&自动完成",
                    textField: "Customer_textfield"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            type: "list",
            filterFields: [{
                display: "客户",
                name: "Customer",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customer"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_customer"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "CustomerName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=crm_customer&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户",
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
                display: "CustomerID",
                name: "CustomerID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            addins: {}
        },
        dataset: 'web/dataset?model=crm_repayment&viewname=list'
    };
    exports.options.model = {
        name: 'crm_repayment',
        title: '客户还款'
    };

    exports.service = function service(page) {

};

    return exports;
});