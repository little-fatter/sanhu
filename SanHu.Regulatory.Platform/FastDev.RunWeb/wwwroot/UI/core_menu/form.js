function view() {
    var options = {
        form: {
            inputWidth: 500,
            fields: [{
                label: "菜单名",
                name: "MenuName",
                type: "text",
                validate: {
                    required: true
                }
            },
            {
                label: "菜单编码",
                name: "MenuNo",
                type: "text",
                validate: {
                    required: true
                }
            },
            {
                label: "链接",
                name: "MenuUrl",
                type: "select",
                editor: {
                    isTextBoxMode: true,
                    css: "combobox-selector"
                }
            },
            {
                label: "菜单分组",
                name: "MenuGroup",
                type: "text"
            },
            {
                label: "菜单图标",
                name: "MenuIcon",
                type: "fileSelector",
                editor: {
                    filePath: "contents/icons/bubbles"
                }
            },
            {
                label: "父菜单",
                name: "Parent",
                textField: "parent_text",
                type: "select",
                editor: {
                    valueField: "id",
                    many2one: true,
                    treeLeafOnly: false,
                    textField: "text",
                    tree: {
                        url: "/web/treedata/",
                        checkbox: false,
                        parms: {
                            sourceModel: "core_menu",
                            parentField: "ParentID",
                            enabled: 1
                        },
                        isExpand: false
                    }
                },
                type_textfield: "单选下拉框"
            },
            {
                label: "数据过滤",
                name: "MenuUrlBind",
                type: "select",
                editor: {
                    isTextBoxMode: true,
                    css: "combobox-selector"
                }
            },
            {
                name: "SeqNo",
                type: "text",
                label: "排序"
            },
            {
                name: "MenuGroupSeqNo",
                type: "text",
                label: "分组排序"
            },
            {
                name: "ShowInDesign",
                type: "checkbox",
                label: "仅设计可见"
            }]
        },
        common: {},
        link: {}
    };
    return options;
}