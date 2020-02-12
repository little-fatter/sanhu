define([],
function() {
    function view() {
        var options = {
            form: {
                inputWidth: 300,
                fields: [{
                    label: "模型名",
                    type: "ref_popupselect",
                    editor: {
                        isTextBoxMode: true,
                        url: "web/namedata",
                        parms: {
                            model: "crm_customer"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "ModelName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?model=core_model&viewtype=list",
                        popupselect_width: "900",
                        popupselect_height: "600",
                        popupselect_title: "选择： 模型"
                    },
                    name: "ModelName",
                    validate: {
                        required: true
                    }
                },
                {
                    newline: 1,
                    name: "ViewType",
                    label: "视图类型",
                    editor: {
                        data: [{
                            id: 'list',
                            text: '列表'
                        },
                        {
                            id: 'calendar',
                            text: '日历'
                        },
                        {
                            id: 'report',
                            text: '图表'
                        },
                        {
                            id: 'kanban',
                            text: '看板'
                        },
                        {
                            id: 'template',
                            text: '自定义模板'
                        },
                        {
                            id: 'form',
                            text: '表单'
                        }]
                    },
                    validate: {
                        required: true
                    },

                    type: "select"
                },
                {
                    newline: 1,
                    name: "ViewName",
                    label: "视图名",
                    type: "text"
                }]
            },
            link: {
                scripts: "",
                styles: "",
                controls: ""
            },
            actions: {
                get: 'web/detaildata',
                save: 'web/save'
            }
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_menu&viewname=form_geturl'
    };
    exports.options.model = {
        name: 'core_menu',
        title: '菜单'
    };

    return exports;
});