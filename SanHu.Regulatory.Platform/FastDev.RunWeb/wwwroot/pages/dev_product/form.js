define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: true,
                    name: "Productname",
                    label: "产品名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        regexRule_textfield: "(无)",
                        equalTo: "",
                        equalTo_textfield: "(无)"
                    }
                },
                {
                    newline: 1,
                    name: "UnitPrice",
                    label: "单价",
                    editor: {},
                    type: "currency",
                    name_textfield: "单价",
                    type_textfield: "货币",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: 1,
                    name: "Specifications",
                    label: "规格",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "规格",
                    width: ""
                },
                {
                    newline: true,
                    name: "Productimage",
                    label: "产品图片",
                    editor: {
                        isInputMode: 0,
                        imgWidth: "",
                        imgHeight: "",
                        extensions: "jpg,png,gif"
                    },
                    type: "fileUploader",
                    type_textfield: "文件上传",
                    name_textfield: "产品图片",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Producttype",
                    label: "产品类型",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "dev_productType"
                        },
                        valueField: "ID",
                        textField: "Typename",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    type_textfield: "下拉框",
                    name_textfield: "产品类型",
                    width: ""
                },
                {
                    newline: true,
                    name: "Model",
                    label: "型号",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行"
                },
                {
                    newline: 0,
                    name: "Brand",
                    label: "品牌",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "品牌",
                    width: "240"
                },
                {
                    newline: 1,
                    name: "Productaccessories",
                    label: "产品附件",
                    editor: {},
                    type: "fileSelector",
                    type_textfield: "文件选择",
                    name_textfield: "产品附件",
                    width: "600"
                },
                {
                    newline: 1,
                    name: "Productdescription",
                    label: "产品描述",
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    type_textfield: "多行",
                    name_textfield: "产品描述",
                    width: "600"
                }],
                inputWidth: "220",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=dev_product&viewname=form'
    };
    exports.options.model = {
        name: 'dev_product',
        title: 'dev_product'
    };

    return exports;
});