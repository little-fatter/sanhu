function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "ProductnNme",
                label: "产品名称",
                editor: {
                    type: "text"
                },
                type: "text",
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                }
            },
            {
                newline: false,
                name: "ProductType",
                label: "产品类别",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_prodctType"
                    },
                    valueField: "ID",
                    textField: "Typename",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select"
            },
            {
                newline: 1,
                name: "model",
                label: "型号",
                editor: {
                    type: "text"
                },
                type: "text",
                width: ""
            },
            {
                newline: true,
                name: "specification",
                label: "规格",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "brand",
                label: "品牌",
                editor: {
                    url: "/web/dicitems/Brand",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    textField: "Title",
                    many2one: true,
                    type: "ref_select",
                    select_updatematch_source: "",
                    select_updatematch_target: ""
                },
                type: "ref_select"
            },
            {
                newline: 1,
                name: "color",
                label: "颜色",
                editor: {
                    type: "text"
                },
                type: "text",
                width: ""
            },
            {
                newline: true,
                name: "unit",
                label: "单位",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "price",
                label: "价格",
                editor: {
                    type: "float"
                },
                type: "float"
            },
            {
                newline: 1,
                name: "ProductPic",
                label: "产品图片",
                editor: {
                    isInputMode: 0,
                    imgWidth: "150",
                    imgHeight: "150",
                    extensions: "jpg,gif,png"
                },
                type: "fileUploader",
                width: ""
            }]
        },
        common: {
            saveCallbackType: "toClose"
        },
        link: {},
        type: "form"
    };
    return options;
}