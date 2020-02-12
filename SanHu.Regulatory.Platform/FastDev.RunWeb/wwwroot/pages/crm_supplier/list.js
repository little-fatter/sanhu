define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "SupplierName",
                    display: "供应商名称",
                    type: "string"
                },
                {
                    name: "SupplierNo",
                    display: "供应商编号",
                    type: "string"
                },
                {
                    name: "Remark",
                    display: "备注",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "地址",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
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
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "供应商类别",
                name: "SupplierCategory",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_supplierType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_supplierType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "TypeName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=crm_supplierType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 供应商类别",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "QQ",
                name: "QQ",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "手机",
                name: "Phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "供应商图像",
                name: "SupplierImage",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "供应商名称",
                name: "SupplierName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "供应商编号",
                name: "SupplierNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "SupplierCategoryID",
                name: "SupplierCategoryID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=crm_supplier&viewname=list'
    };
    exports.options.model = {
        name: 'crm_supplier',
        title: '供应商'
    };

    exports.service = function service(page) {

};

    return exports;
});