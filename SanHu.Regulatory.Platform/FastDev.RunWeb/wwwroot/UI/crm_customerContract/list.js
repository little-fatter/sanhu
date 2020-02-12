function view() {
    var options = {
        list: {
            columns: [{
                name: "Contactname",
                display: "联系人名称",
                type: "string"
            },
            {
                name: "phone",
                display: "电话",
                type: "string"
            },
            {
                name: "remark",
                display: "备注",
                type: "string"
            }]
        },
        common: {
            formShowType: "tab",
            formShowPosition: "top",
            dialogWidth: 700,
            dialogHeight: 500
        },
        type: "list",
        filterFields: [{
            display: "联系人名称",
            name: "Contactname",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "电话",
            name: "phone",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "备注",
            name: "remark",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "Email",
            name: "Email",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "CustomerID",
            name: "CustomerID",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}