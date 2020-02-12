define([],
function() {
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
                    width: "150"
                },
                {
                    newline: false,
                    name: "Title",
                    label: "模板名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_text: "单行"
                },

                {
                    "name": "TemplateFile",
                    "type": "fileUploader",
                    "label": "模板文件",
                    "editor": {
                        "isInputMode": 1,
                        "extensions": "xls,xlsx"
                    },
                    "newline": 1
                },
                {
                    newline: 1,
                    name: "IsDefault",
                    label: "是否默认",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框"
                },
                {
                    newline: 1,
                    name: "Details",
                    label: "明细",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                display: "字段名",
                                width: "200",
                                align: "left",
                                name: "FieldName",
                                editor: {
                                    type: "ref_popupselect",
                                    isTextBoxMode: true,
                                    valueField: "ID",
                                    sourceFilter: null,
                                    textField: "FieldName",
                                    css: "combobox-selector",
                                    select_updatematch_source: 'FieldTitle;exp:pbc.ABC(index)',
                                    select_updatematch_target: 'Title;XlsColumn',
                                    popupselect_ismul: true,
                                    popupselect_type: "popupselect",
                                    popupselect_width: "900",
                                    popupselect_height: "600",
                                    popupselect_title: "选择： 模型字段"
                                }
                            },
                            {
                                width: "150",
                                type: "string",
                                align: "left",
                                name: "Title",
                                name_text: "显示标题",
                                align_textfield: "左对齐",
                                editorType: "text",
                                editorType_textfield: "单行",
                                display: "标题",
                                editor: {
                                    type: "text"
                                },
                                type_text: "文本型"
                            },
                            {
                                display: "列名",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "text"
                                },
                                name: "XlsColumn",
                                name_text: "列名",
                                align_textfield: "左对齐",
                                type_text: "文本型",
                                editorType: "text",
                                editorType_textfield: "单行"
                            },
                            {
                                display: "变量",
                                width: "100",

                                align: "left",
                                type: 'ref_popupselect',
                                editor: {
                                    width: 200,
                                    type: 'ref_popupselect',
                                    css: 'combobox-selector',
                                    textField: 'VariableName',
                                    valueField: 'exp:"{"+row.VariableName +"}"',
                                    isTextBoxMode: true,
                                    popupselect_type: 'popupselect',
                                    popupselect_url: 'web/main/?model=core_variables&viewtype=list',
                                    popupselect_width: '800',
                                    popupselect_height: '600',
                                    popupselect_title: '选择系统变量 '
                                },
                                name: "Variable"
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "/web/main/?model=core_exportTemplateDetail&viewtype=form",
                        titleEdit: "修改： 导入模板明细",
                        titleAdd: "新增：导入模板明细",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 1,
                        detailWidth: "800",
                        detailHeight: "500"
                    },
                    type: "ref_grid_edit",
                    type_text: "编辑表格",
                    name_text: "明细",
                    width: "760",
                    labelAlign: "left",
                    rightToken: "",
                    editorExtend: "",
                    readonly: 0,
                    hideLabel: 1,
                    hideSpace: 0,
                    hideInAdd: 0
                }]
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_importTemplate&viewname=form'
    };
    exports.options.model = {
        name: 'core_importTemplate',
        title: '导入模板'
    };

    exports.service = function server(page) {
        page.bind('beforeShowForm',
        function(e) {

            var page = e.page;
            var op = e.options;

            var field = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Details";
            });
            if (field == null || !field.editor || !field.editor.grid || !field.editor.grid.columns) return;
            var column = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "FieldName";
            });

            if (column != null && column.editor) {
                column.editor.popupselect_url = function() {
                    var combobox = this;

                    var modelName = page.form.getEditor("ModelName").getValue();
                    if (!modelName) return false;

                    var url = "/web/main/?model=core_modelfield&viewtype=list";
                    bindStr = new pbc.base64().encode(JSON.stringify({
                        filterData: {
                            groups: [],
                            op: 'and',
                            rules: [{
                                field: 'ModelName',
                                value: modelName,
                                op: 'equal'
                            }]
                        }
                    }));
                    return url + "&bind=" + bindStr;
                };
            }

        });

    };

    return exports;
});