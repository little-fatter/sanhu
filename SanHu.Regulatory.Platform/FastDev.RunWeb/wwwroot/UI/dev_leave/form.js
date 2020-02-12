function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "Title",
                label: "标题",
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
                newline: true,
                name: "Leavedays",
                label: "请假天数",
                editor: {
                    type: "int"
                },
                type: "int",
                type_textfield: "整数",
                validate: {
                    required: 1,
                    min: "0",
                    max: "10000"
                }
            },
            {
                newline: true,
                name: "Starttime",
                label: "开始时间",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: true,
                name: "Endtime",
                label: "结束时间",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: 1,
                name: "Content",
                label: "内容",
                editor: {
                    height: "60"
                },
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "内容",
                width: ""
            }],
            inputWidth: "280",
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