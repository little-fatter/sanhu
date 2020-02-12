define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Title",
                    display: "标题",
                    type: "string"
                },
                {
                    width: "150",
                    display: "账号类型",
                    name: "AccountType",
                    name_text: "类型",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "ref",
                    type_text: "引用类型"
                },
                {
                    name: "SortNo",
                    display: "排序",
                    type: "number"
                },
                {
                    name: "Store",
                    display: "门店",
                    type: "ref"
                },
                {
                    name: "AccountNo",
                    display: "账号",
                    type: "string"
                },
                {
                    name: "AccountMan",
                    display: "开户人",
                    type: "string"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "hide",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "门店",
                name: "Store",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_store"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_store"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "WarehouseName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_store&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 门店",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "类型",
                name: "AccountType",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_accountType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_accountType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_accountType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 资金账号类型",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "标题",
                name: "Title",
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
                display: "排序",
                name: "SortNo",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "账号",
                name: "AccountNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "开户人",
                name: "AccountMan",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "StoreID",
                name: "StoreID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "AccountTypeID",
                name: "AccountTypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            search: {
                fields: [{
                    label: "标题",
                    type: "text",
                    editor: {},
                    name: "Title",
                    name_text: "标题",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "100"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            addins: {}
        },
        dataset: 'web/dataset?model=res_account&viewname=list'
    };
    exports.options.model = {
        name: 'res_account',
        title: '资金账号'
    };

    exports.service = function service(page) {

};

    return exports;
});