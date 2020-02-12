function view() {
    var options = {
        form: {
            fields: [{
                label: "模型名",
                type: "ref_popupselect",
                editor: {
                    isTextBoxMode: true,
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "ModelName",
                    css: "combobox-selector",
                    popupselect_ismul: false,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=core_model&viewtype=list",
                    popupselect_width: "900",
                    popupselect_height: "600",
                    popupselect_title: "选择： 模型"
                },
                name: "ModelName",
                width: "150",
                type_textfield: "弹出&自动完成"
            },
            {
                newline: 0,
                name: "Name",
                type: "text",
                label: "流程名",
                syseditor: "#editor,Name,text#",
                width: "300",
                type_textfield: "单行",
                name_textfield: "流程名"
            },
            {
                name: "Enabled",
                type: "checkbox",
                label: "是否启用",
                editor: {},
                newline: 0,
                type_textfield: "复选框",
                name_textfield: "是否启用",
                width: ""
            }],
            tab: {
                items: [{
                    title: "流程视图",
                    fields: [{
                        newline: 1,
                        name: "ViewData",
                        type: "wfDesgin",
                        label: "视图定义结构",
                        editor: {},
                        width: "eval:$(window).width()*0.98",
                        hideLabel: 1,
                        hideSpace: 1
                    }]
                }]
            },
            inputWidth: "180",
            labelWidth: "90",
            space: "40",
            labelAlign: "left",
            align: "left",
            widescreen: 1
        },
        link: {
            scripts: "",
            links: "",
            styles: "",
            depends: "wfDesgin"
        },
        common: {}
    };
    return options;
}