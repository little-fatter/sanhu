function view() {
    var options = {
        type: "form",
        form: {
            fields: [{
                newline: true,
                name: "Contactname",
                label: "联系人名称",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "phone",
                label: "电话",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: true,
                name: "remark",
                label: "备注",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "Email",
                label: "Email",
                editor: {
                    type: "text"
                },
                type: "text"
            }]
        },
        common: {
            saveCallbackType: "toClose"
        },
        link: {}
    };
    return options;
}