define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Product",
                    display: "产品",
                    type: "ref",
                    name_text: "产品",
                    width: "",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型",
                    editorType: ""
                },
                {
                    name: "UnitName",
                    display: "单位名",
                    type: "string"
                },
                {
                    name: "Warehouse",
                    display: "仓库",
                    type: "ref"
                },
                {
                    name: "Quantity",
                    display: "数量",
                    type: "number"
                },
                {
                    name: "UnitPrice",
                    display: "单价",
                    type: "number"
                },
                {
                    name: "Price",
                    display: "价格",
                    type: "number"
                },
                {
                    name: "Remark",
                    display: "备注",
                    type: "string"
                },
                {
                    name: "Weight",
                    display: "重量",
                    type: "number"
                },
                {
                    name: "MValue",
                    display: "体积",
                    type: "number",
                    name_text: "米",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    editorType: ""
                },
                {
                    name: "Unit",
                    display: "单位",
                    type: "ref"
                },
                {
                    name: "ProMode",
                    display: "规格型号",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "产品",
                name: "Product",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_product"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_product"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "ProName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_product&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 产品",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "仓库",
                name: "Warehouse",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "stock_warehouse"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "stock_warehouse"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "WarehouseName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=stock_warehouse&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 仓库",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "单位",
                name: "Unit",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_productUnit"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_productUnit"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "UnitName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_productUnit&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 单位",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "数量",
                name: "Quantity",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "单价",
                name: "UnitPrice",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "价格",
                name: "Price",
                editor: {
                    type: "number"
                },
                type: "number"
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
                display: "OrderID",
                name: "OrderID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "重量",
                name: "Weight",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "米",
                name: "MValue",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "规格型号",
                name: "ProMode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位名",
                name: "UnitName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProductID",
                name: "ProductID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "WarehouseID",
                name: "WarehouseID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "UnitID",
                name: "UnitID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=stock_indetails&viewname=list'
    };
    exports.options.model = {
        name: 'stock_indetails',
        title: '入库单明细'
    };

    exports.service = function service(page) {

};

    return exports;
});