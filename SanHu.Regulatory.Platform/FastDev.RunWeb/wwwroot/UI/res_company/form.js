function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "CompanyName",
                label: "公司名",
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
                newline: false,
                name: "IdentiyNo",
                label: "执照号",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: true,
                name: "SeqNo",
                label: "排序",
                editor: {
                    type: "int"
                },
                type: "int",
                validate: {
                    required: 1,
                    min: "0",
                    max: "10000"
                }
            },
            {
                newline: false,
                name: "CompanyNo",
                label: "公司编码",
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
                name: "Email",
                label: "Email",
                editor: {
                    type: "text"
                },
                type: "text",
                validate: {
                    required: 0,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "email",
                    equalTo: ""
                }
            },
            {
                newline: false,
                name: "Phone",
                label: "手机号",
                editor: {
                    type: "text"
                },
                type: "text",
                validate: {
                    required: 0,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "cellphone",
                    equalTo: ""
                }
            },
            {
                newline: true,
                name: "Fax",
                label: "传真",
                editor: {
                    type: "text"
                },
                type: "text",
                validate: {
                    required: 0,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "cellphone",
                    equalTo: ""
                }
            },
            {
                newline: false,
                name: "CompanyType",
                label: "公司类型",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: true,
                name: "CompanyAddress",
                label: "公司地址",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                name: "Parent",
                type: "ref_select_tree",
                label: "公司",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_company"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_company"
                    },
                    textField: "text",
                    valueField: "id",
                    tree: {
                        checkbox: false,
                        nodeWidth: 200,
                        url: "/web/treedata",
                        parms: {
                            enabled: 1,
                            sourceModel: "res_company",
                            parentField: "ParentID",
                            textField: "CompanyName",
                            sourceModel2: "",
                            parentField2: "",
                            refSourceField: "",
                            textField2: ""
                        }
                    },
                    many2one: true,
                    triggerToLoad: 0,
                    treeLeafOnly: false
                },
                newline: 1,
                width: ""
            },
            {
                newline: 1,
                name: "Remark",
                label: "备注",
                editor: {
                    type: "text"
                },
                type: "text",
                width: "500"
            }]
        },
        type: "form",
        common: {},
        link: {}
    };
    return options;
}