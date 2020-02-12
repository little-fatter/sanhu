define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "ProductnNme",
                    display: "产品名称",
                    type: "string",
                    name_text: "产品名称",
                    width: "180",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "color",
                    display: "颜色",
                    type: "string",
                    name_text: "颜色",
                    width: "120",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "unit",
                    display: "单位",
                    type: "string",
                    name_text: "单位",
                    width: "120",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
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
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            filterFields: [{
                display: "产品类别",
                name: "ProductType",
                editor: {
                    url: "web/namedata",
                    parms: {
                        model: "res_prodctType"
                    },
                    detailEnabled: true,
                    detailUrl: "web/detaildata",
                    detailParms: {
                        model: "res_prodctType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Typename",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=res_prodctType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 产品类型",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "品牌",
                name: "brand",
                editor: {
                    url: "web/namedata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    detailEnabled: true,
                    detailUrl: "web/detaildata",
                    detailParms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "型号",
                name: "model",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "规格",
                name: "specification",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "产品名称",
                name: "ProductnNme",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "颜色",
                name: "color",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位",
                name: "unit",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "价格",
                name: "price",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "产品图片",
                name: "ProductPic",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProductTypeID",
                name: "ProductTypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "brandID",
                name: "brandID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            search: {
                fields: [{
                    label: "产品名称",
                    type: "text",
                    editor: {},
                    name: "ProductnNme",
                    name_text: "产品名称",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "120"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=res_prodcut&viewname=0102_list'
    };
    exports.options.model = {
        name: 'res_prodcut',
        title: '产品'
    };

    return exports;
});