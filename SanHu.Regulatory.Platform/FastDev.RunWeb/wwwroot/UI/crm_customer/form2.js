function view() {
    var options = {
        type: "form",
        form: {
            fields: [{
                name: "CustomerName",
                label: "客户名称",
                newline: 1,
                editor: {},
                type: "text"
            },
            {
                label: "客户省份",
                name: "Province",
                newline: 1,
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "base_area"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "base_area"
                    },
                    textField: "text",
                    valueField: "id",
                    tree: {
                        checkbox: false,
                        nodeWidth: 200,
                        url: "/web/treedata",
                        parms: {
                            enabled: 1,
                            sourceModel: "base_area",
                            parentField: "ParentID",
                            textField: "Title",
                            sourceModel2: "",
                            parentField2: "",
                            refSourceField: "",
                            textField2: ""
                        }
                    },
                    many2one: true
                },
                type: "ref_select_tree",
                width: ""
            },
            {
                name: "City",
                label: "客户城市",
                newline: 1,
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "base_area"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "base_area"
                    },
                    textField: "Title",
                    valueField: "ID",
                    many2one: true
                },
                type: "ref_select_tree",
                width: ""
            }],
            tab: null
        },
        common: {
            saveCallbackType: "toClose"
        },
        link: {}
    };
    return options;
}