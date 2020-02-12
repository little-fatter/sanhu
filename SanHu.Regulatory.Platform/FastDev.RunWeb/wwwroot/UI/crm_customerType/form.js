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
                type: "text"
            },
            {
                newline: 1,
                name: "Remarks",
                label: "备注",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "备注",
                width: ""
            }]
        },
        common: {
            saveCallbackType: "toView"
        },
        link: {}
    };
    return options;
}