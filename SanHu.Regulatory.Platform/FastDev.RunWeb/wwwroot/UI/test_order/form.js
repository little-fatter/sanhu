function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "NewField1",
                label: "字段1",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "NewField2",
                label: "字段2",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: true,
                name: "NewField3",
                label: "字段3",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "NewField4",
                label: "字段4",
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