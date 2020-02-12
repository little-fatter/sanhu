define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "ProName",
                    display: "物品名",
                    type: "string",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    name_text: "物品名",
                    editorType: ""
                },
                {
                    width: "120",
                    display: "规格型号",
                    name: "ProMode",
                    name_text: "规格型号",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "120",
                    display: "单位名",
                    name: "UnitName",
                    name_text: "单位名",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "159",
                    display: "物品编号",
                    name: "ProCode",
                    name_text: "物品编号",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "默认仓库",
                    name: "Warehouse",
                    name_text: "默认仓库",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "ref",
                    type_text: "引用类型",
                    editorType: ""
                },
                {
                    width: "120",
                    display: "参考价格",
                    name: "ProPrice",
                    name_text: "参考价格",
                    align: "right",
                    align_textfield: "右对齐",
                    type: "curreny",
                    type_text: "货币",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "产品类别",
                    name: "ProType",
                    name_text: "物品类别",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "ref",
                    type_text: "引用类型"
                }]
            },
            common: {
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formShowType: "tab",
                formShowPosition: "",
                dialogWidth: "700",
                dialogHeight: "600",
                openParm: "",
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                formViewName: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "ProAttachment",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            treeFilter: {
                enabled: 1,
                rootText: "全部",
                filterField: "ProType",
                sourceMode: "res_productType",
                parentField: "ParentID",
                textField: "",
                sourceMode2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                filterField_textfield: "物品类别",
                showInLeft: 1,
                custom: 0,
                url: "",
                sourceModel: "res_productType",
                sourceModel2: "",
                sourceModel_textfield: "res_productType"
            },
            search: {
                fields: [{
                    label: "编号",
                    type: "text",
                    editor: {},
                    name: "ProCode",
                    name_text: "物品编号",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "120"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            filterFields: [{
                display: "物品类别",
                name: "ProType",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_productType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_productType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "TypeName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_productType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 物品类别",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "默认单位",
                name: "DefaultUnit",
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
                display: "默认仓库",
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
                display: "物品附件",
                name: "ProAttachment",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "物品图片",
                name: "ProImage",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "物品编号",
                name: "ProCode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "属性",
                name: "Attribute",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "物品名",
                name: "ProName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "参考价格",
                name: "ProPrice",
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
                display: "物品条码",
                name: "ProBarCode",
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
                display: "商城商品ID",
                name: "MallProductID",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "商城分类ID",
                name: "MallProductCategoryID",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "ProTypeID",
                name: "ProTypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "DefaultUnitID",
                name: "DefaultUnitID",
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
            }],
            type: "list",
            addins: {}
        },
        dataset: 'web/dataset?model=res_product&viewname=list'
    };
    exports.options.model = {
        name: 'res_product',
        title: '产品'
    };

    exports.service = function service(page) {

};

    return exports;
});