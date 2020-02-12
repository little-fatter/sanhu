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
                name: "NewField3",
                label: "字段3",
                editor: {
                    type: "float"
                },
                type: "float"
            },
            {
                newline: true,
                name: "NewField2",
                label: "字段2",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            }]
        },
        common: {
            saveCallbackType: "toView"
        }
    };
    return options;
}