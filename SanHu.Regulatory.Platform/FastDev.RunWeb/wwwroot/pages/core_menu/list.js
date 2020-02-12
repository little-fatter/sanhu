define([],
function() {
    function view() {
        var options = {
            search: {
                fields: [{
                    label: "模型名",
                    type: "text",
                    name: "ModelName",
                    name_text: "模型名",
                    operator: "like",
                    width: "150"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            list: {
                sortName: "SeqNo",
                height: "100%",
                allowUnSelectRow: true,
                rownumbers: false,
                usePager: false,
                heightDiff: -10,
                parms: {
                    model: "core_menu"
                },
                url: "/web/PagedData/",
                columns: [{
                    display: "菜单名",
                    align: "left",
                    name: "MenuName",
                    width: 300
                },
                {
                    display: "分组",
                    align: "left",
                    name: "MenuGroup",
                    width: 150
                },
                {
                    display: "排序",
                    align: "left",
                    name: "SeqNo",
                    width: 150
                },
                {
                    display: "分组排序",
                    align: "left",
                    name: "MenuGroupSeqNo",
                    width: 150
                },
                {
                    display: "设计时可见",
                    align: "center",
                    name: "ShowInDesign",
                    type: "checkbox",
                    width: 150
                }],
                alternatingRow: false,
                tree: {
                    columnName: "MenuName",
                    idField: "ID",
                    parentIDField: "ParentID"
                }
            },
            filterFields: [{
                display: "父菜单",
                name: "Parent",
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
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "MenuName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=core_menu&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 菜单",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "可视",
                name: "IsVisible",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "仅设计时可见",
                name: "ShowInDesign",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "是否叶节点",
                name: "IsLeaf",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "SeqNo",
                name: "SeqNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "MenuGroupSeqNo",
                name: "MenuGroupSeqNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "链接地址",
                name: "MenuUrl",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "链接绑定参数",
                name: "MenuUrlBind",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "菜单名称",
                name: "MenuName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "菜单编码",
                name: "MenuNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "菜单分组",
                name: "MenuGroup",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "菜单图标",
                name: "MenuIcon",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ParentID",
                name: "ParentID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            common: {
                depends: ["fileSelector"],
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formShowType: "tab",
                formShowPosition: "",
                dialogWidth: "700",
                dialogHeight: "500",
                openParm: ""
            },
            link: {},
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
                    }
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
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_menu&viewname=list'
    };
    exports.options.model = {
        name: 'core_menu',
        title: '菜单'
    };

    return exports;
});