function view() {
    var options = {
        type: "form",
        form: {
            fields: [{
                newline: 1,
                name: "Title",
                label: "数据库",
                editor: {
                    type: "text"
                },
                type: "text",
                width: ""
            },
            {
                name: "DbName",
                type: "text",
                label: "DbName",
                editor: {},
                newline: 1,
                width: ""
            },
            {
                name: "DbType",
                type: "select",
                label: "数据库类型",
                editor: {
                    data: [{
                        id: "sqlserver2005",
                        text: "Sqlserver"
                    },
                    {
                        id: "SQLite",
                        text: "SQLite"
                    },
                    {
                        id: "MySql",
                        text: "MySql"
                    },
                    {
                        id: "Oracle",
                        text: "Oracle"
                    }],
                    value: "",
                    textField: "",
                    url: "",
                    valueField: ""
                },
                newline: 1,
                width: ""
            },
            {
                newline: 1,
                name: "DbLink",
                label: "链接字符串",
                editor: {
                    height: "60"
                },
                type: "textarea",
                width: ""
            },
            {
                newline: 1,
                name: "Remark",
                label: "备注",
                editor: {
                    height: "50"
                },
                type: "textarea",
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
            saveCallbackType: "toClose"
        },
        link: {}
    };
    return options;
}