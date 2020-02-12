function view() {
    var options = {
        form: {
            fields: [{
                newline: false,
                name: "WarehouseName",
                label: "仓库名称",
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
                newline: true,
                name: "WarehouseNo",
                label: "仓库编号",
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
                name: "Manager",
                type: "ref_popupselect",
                label: "仓库管理员",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_employee"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "EmpName",
                    many2one: true,
                    css: "combobox-selector",
                    popupselect_ismul: false,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?mode=res_employee&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 员工"
                },
                newline: 1,
                width: "",
                rightToken: "："
            },
            {
                newline: true,
                name: "IsEnabled",
                label: "是否启用",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            }]
        },
        link: {},
        common: {},
        type: "form"
    };
    return options;
}