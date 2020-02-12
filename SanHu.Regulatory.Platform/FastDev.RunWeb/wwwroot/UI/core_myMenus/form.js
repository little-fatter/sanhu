function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "MenuName",
                label: "菜单名",
                editor: {
                    type: "text"
                },
                type: "text",
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
                newline: true,
                name: "Menu",
                label: "链接",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "core_menu"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "core_menu"
                    },
                    textField: "text",
                    valueField: "id",
                    tree: {
                        checkbox: false,
                        nodeWidth: 200,
                        url: "/web/treedata",
                        parms: {
                            enabled: 1,
                            sourceModel: "core_menu",
                            parentField: "ParentID",
                            textField: "",
                            sourceModel2: "",
                            parentField2: "",
                            refSourceField: "",
                            textField2: ""
                        }
                    },
                    many2one: true,
                    triggerToLoad: 0
                },
                type: "ref_select_tree",
                type_textfield: "下拉框-树",
                name_textfield: "菜单",
                width: "",
                validate: {
                    required: 1
                }
            },
            {
                newline: 1,
                name: "SortNo",
                label: "排序",
                editor: {
                    type: "int"
                },
                type: "int",
                type_textfield: "整数",
                name_textfield: "排序",
                width: "",
                validate: {
                    required: 1,
                    min: "0",
                    max: "10000"
                }
            },
            {
                newline: 1,
                name: "Remark",
                label: "备注",
                editor: {
                    height: "60"
                },
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "备注",
                width: ""
            }],
            inputWidth: "380",
            labelWidth: "90",
            space: "40",
            labelAlign: "left",
            align: "left",
            widescreen: 0
        },
        common: {
            saveCallbackType: "dialog"
        },
        link: {}
    };
    return options;
}