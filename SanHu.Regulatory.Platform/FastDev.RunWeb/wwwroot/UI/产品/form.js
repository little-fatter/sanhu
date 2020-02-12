function view() {
    var options = {
        type: "form",
        form: {
            fields: [{
                name: "产品名称",
                label: "产品名称",
                newline: 1,
                editor: {},
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
                name: "供应商ID",
                label: "供应商ID",
                editor: {},
                type: "text",
                newline: 0,
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                }
            },
            {
                name: "类别ID",
                label: "类别ID",
                newline: 1,
                editor: {},
                type: "text"
            },
            {
                name: "单位数量",
                label: "单位数量",
                newline: 0,
                editor: {},
                type: "text"
            },
            {
                name: "单价",
                label: "单价",
                newline: 1,
                editor: {},
                type: "text"
            },
            {
                name: "库存量",
                label: "库存量",
                newline: 0,
                editor: {},
                type: "text"
            },
            {
                name: "订购量",
                label: "订购量",
                newline: 1,
                editor: {},
                type: "text"
            },
            {
                name: "再订购量",
                label: "再订购量",
                newline: 0,
                editor: {},
                type: "text"
            },
            {
                name: "中止",
                label: "中止",
                newline: 1,
                editor: {},
                type: "text"
            }],
            tab: null
        },
        common: {
            saveCallbackType: "toClose"
        },
        link: {}
    };
    return options;
}