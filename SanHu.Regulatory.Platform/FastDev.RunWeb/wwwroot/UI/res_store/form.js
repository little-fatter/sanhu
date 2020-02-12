function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "WarehouseName",
                label: "仓库名",
                editor: {
                    type: "text"
                },
                type: "text",
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                }
            },
            {
                newline: 1,
                name: "WarehouseManager",
                label: "仓库管理员",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_employee"
                    },
                    valueField: "ID",
                    textField: "EmpName",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select",
                width: ""
            },
            {
                newline: 1,
                name: "Remark",
                label: "备注",
                editor: {
                    readonly: true,
                    defaultImgUrl: '',
                    width: 200,
                    height : 200
                },
                type: "image",
                width: ""
            }]
        },
        common: {
            saveCallbackType: "toView"
        },
        link: {},
        type: "form"
    };
    return options;
}