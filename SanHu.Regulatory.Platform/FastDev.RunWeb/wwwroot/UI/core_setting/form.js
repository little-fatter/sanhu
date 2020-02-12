function view() {
    var options = {
        form: {
            fields: [{
                newline: 1,
                name: "SettingName",
                label: "配置名",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "SettingName",
                width: "250",
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
                name: "SettingKey",
                label: "配置标示",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "Key",
                width: "250",
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    regexRule_textfield: "(无)",
                    equalTo: "",
                    equalTo_textfield: "(无)"
                },
                readonly: 1
            },
            {
                newline: 1,
                name: "SettingValue",
                label: "值",
                editor: {},
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "Value",
                width: "250"
            }]
        },
        common: {
            viewType: "form",
            saveCallbackType: "toView"
        },
        link: {}
    };
    return options;
}