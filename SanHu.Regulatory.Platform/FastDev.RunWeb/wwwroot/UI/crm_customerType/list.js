function view() {
    var options = {
        list: {
            columns: [{
                name: "Title",
                display: "标题",
                type: "string"
            },
            {
                name: "Remarks",
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
        filterFields: [{
            display: "标题",
            name: "Title",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "备注",
            name: "Remarks",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}