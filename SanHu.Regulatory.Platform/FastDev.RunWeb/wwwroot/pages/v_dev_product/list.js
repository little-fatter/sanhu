define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Productname",
                    display: "产品名",
                    type: "string"
                },
                {
                    name: "UnitPrice",
                    display: "单价",
                    type: "number"
                },
                {
                    name: "Specifications",
                    display: "规格",
                    type: "string"
                },
                {
                    name: "Producttypename",
                    display: "产品类型名",
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
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            filterFields: [{
                display: "产品名",
                name: "Productname",
                editor: {
                    type: "string"
                },
                type: "string"
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
                display: "规格",
                name: "Specifications",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "产品图片",
                name: "Productimage",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "产品附件",
                name: "Productaccessories",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "产品类型名",
                name: "Producttypename",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "产品描述",
                name: "Productdescription",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "型号",
                name: "Model",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "品牌",
                name: "Brand",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            search: {
                fields: [{
                    label: "产品名",
                    type: "text",
                    editor: {},
                    name: "Productname",
                    name_text: "产品名",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "100"
                },
                {
                    label: "产品类型名",
                    newline: false,
                    labelWidth: "auto",
                    type: "text",
                    editor: {},
                    name: "Producttypename",
                    name_text: "产品类型名",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "100"
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
        dataset: 'web/dataset?model=v_dev_product&viewname=list'
    };
    exports.options.model = {
        name: 'v_dev_product',
        title: 'v_dev_product'
    };

    return exports;
});