function view() {
    var options = {
        form: {
            fields: [{
                newline: 1,
                name: "RoleName",
                type: "text",
                label: "角色名",
                syseditor: "#editor,RoleName,text#",
                dictionary: "",
                width: "500",
                textField: "",
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
                newline: 1,
                name: "RoleDesc",
                type: "textarea",
                label: "角色描述",
                syseditor: "#editor,RoleDesc,textarea#",
                dictionary: "",
                width: "500",
                textField: ""
            }]
        },
        common: {},
        link: {}
    };
    return options;
}