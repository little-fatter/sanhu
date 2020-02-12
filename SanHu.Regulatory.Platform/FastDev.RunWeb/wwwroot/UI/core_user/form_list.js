function view() {
    var options = {
        form: {
            fields: [{
                newline: false,
                name: "Phone",
                label: "手机号",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: 1,
                name: "Address",
                label: "地址",
                editor: {
                    height: "80"
                },
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "地址",
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