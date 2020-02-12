function view() {
    var options = {
        type: "form",
        form: {
            fields: [{
                newline: true,
                name: "VariableTitle",
                label: "变量名",
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
                newline: 1,
                name: "VariableName",
                label: "变量标示",
                editor: {
                    type: "text"
                },
                type: "text",
                width: "",
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                }
            },
            {
                newline: true,
                name: "VariableValue",
                label: "变量值",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: 1,
                name: "VariableExpression",
                label: "变量表达式(SQL)",
                editor: {
                    height: "80"
                },
                type: "textarea",
                width: ""
            },
            {
                newline: true,
                name: "Remark",
                label: "备注",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            inputWidth: "260",
            labelWidth: "90",
            space: "40",
            labelAlign: "left",
            align: "left",
            widescreen: 0
        },
        common: {
            saveCallbackType: "toClose"
        },
        link: {}
    };
    return options;
}