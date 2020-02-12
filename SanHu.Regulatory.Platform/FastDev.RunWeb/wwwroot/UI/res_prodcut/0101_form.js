function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
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
                newline: false,
                name: "model",
                label: "型号",
                editor: {
                    type: "text"
                },
                type: "text"
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
                    url: "/web/listdata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    textField: "Title",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select"
            },
            {
                newline: true,
                name: "ProductnNme",
                label: "产品名称",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "color",
                label: "颜色",
                editor: {
                    type: "text"
                },
                type: "text"
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
                newline: true,
                name: "ProductPic",
                label: "产品图片",
                editor: {
                    type: "text"
                },
                type: "text"
            }]
        },
        common: {
            saveCallbackType: "toView"
        }
    };
    return options;
}