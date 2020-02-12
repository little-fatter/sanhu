function view() {
    var options = {
        form: {
            fields: [{
                newline: 0,
                name: "DeptName",
                label: "部门名称",
                editor: {
                    type: "text"
                },
                type: "text",
                width: "",
                exp: ""
            },
            {
                newline: true,
                name: "Company",
                label: "公司",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_company"
                    },
                    valueField: "ID",
                    textField: "CompanyName",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select"
            },
            {
                newline: 1,
                name: "Remarks",
                label: "备注",
                editor: {
                    type: "text"
                },
                type: "textarea",
                width: ""
            }],
            inputWidth: "280",
            labelWidth: "90",
            space: "40",
            labelAlign: "left",
            align: "left",
            widescreen: 0
        },
        link: {},
        common: {},
        type: "form"
    };
    return options;
}