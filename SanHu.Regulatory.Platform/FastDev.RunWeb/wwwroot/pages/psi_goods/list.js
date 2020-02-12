define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "ID",
                    display: "ID",
                    width: "100",
                    type: "string"
                },
                {
                    name: "ProductCode",
                    display: "产品编码",
                    type: "string",
                    name_text: "ProductCode",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "ProductName",
                    display: "产品名",
                    type: "string",
                    name_text: "ProductName",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "CategoryName",
                    display: "分类",
                    type: "string",
                    name_text: "CategoryName",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "BrandName",
                    display: "品牌",
                    type: "string",
                    name_text: "BrandName",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "ImagePath",
                    display: "图片",
                    type: "string",
                    name_text: "ImagePath",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "MarketPrice",
                    display: "市场价",
                    type: "string",
                    name_text: "MarketPrice",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "MinSalePrice",
                    display: "最低销售价",
                    type: "string",
                    name_text: "MinSalePrice",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "ShortDescription",
                    display: "描述",
                    type: "string",
                    name_text: "ShortDescription",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                }],
                title: "",
                url: "",
                usePager: 1,
                checkbox: 0,
                height: "100%",
                sortName: "",
                sortOrder: "",
                downViewEnabled: 0,
                downViewHeight: "",
                downViewReadonly: 0,
                hideOpColumn: 1,
                hideOpEditColumn: 1,
                hideOpDeleteColumn: 1,
                downViewName: "",
                downPageUrl: ""
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 1,
                hideToolbar: 0,
                hideViewSwitch: 0,
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
                display: "ID",
                name: "ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CategoryId",
                name: "CategoryId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProductName",
                name: "ProductName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProductCode",
                name: "ProductCode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "BrandId",
                name: "BrandId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ShortDescription",
                name: "ShortDescription",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CategoryName",
                name: "CategoryName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "SaleStatus",
                name: "SaleStatus",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "AuditStatus",
                name: "AuditStatus",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "AddedDate",
                name: "AddedDate",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "DisplaySequence",
                name: "DisplaySequence",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ImagePath",
                name: "ImagePath",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "MarketPrice",
                name: "MarketPrice",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "MinSalePrice",
                name: "MinSalePrice",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "HasSKU",
                name: "HasSKU",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "VistiCounts",
                name: "VistiCounts",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "BrandName",
                name: "BrandName",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=psi_goods&viewname=list'
    };
    exports.options.model = {
        name: 'psi_goods',
        title: '产品信息'
    };

    exports.service = function service(page) {

};

    return exports;
});