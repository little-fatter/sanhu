function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "FieldName",
                label: "字段名",
                editor: {
                    type: "text"
                },
                type: "text",
                type_text: "单行",
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
                newline: false,
                name: "FieldTitle",
                label: "字段标题",
                editor: {
                    type: "text"
                },
                type: "text",
                type_text: "单行",
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
                newline: 1,
                name: "FieldType",
                label: "字段类型",
                editor: {
                    type: "text",
                    data: [{
                        id: "string",
                        text: "文本"
                    },
                    {
                        id: "boolean",
                        text: "是否类型"
                    },
                    {
                        id: "datetime",
                        text: "日期"
                    },
                    {
                        id: "integer",
                        text: "整数类型"
                    },
                    {
                        id: "text",
                        text: "长文本"
                    },
                    {
                        id: "selection",
                        text: "数据选项"
                    },
                    {
                        id: "many2one",
                        text: "单引用(多对一)"
                    },
                    {
                        id: "many2many",
                        text: "多引用(多对多)"
                    },
                    {
                        id: "one2many",
                        text: "子模型(一对多)"
                    }],
                    value: "string",
                    textField: "",
                    url: "",
                    valueField: ""
                },
                type: "select",
                type_text: "单选下拉框",
                name_text: "字段类型",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0,
                validate: {
                    required: 1
                }
            },
            {
                newline: false,
                name: "FieldLength",
                label: "字段长度",
                editor: {
                    type: "int"
                },
                type: "int",
                type_text: "整数"
            },
            {
                newline: 1,
                name: "IsRequired",
                label: "必填",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox",
                type_text: "复选框",
                name_text: "必填",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            },
            {
                newline: 0,
                name: "IsReadonly",
                label: "只读",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox",
                type_text: "复选框",
                name_text: "只读",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            },
            {
                newline: true,
                name: "IsSearchField",
                label: "可搜索",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox",
                type_text: "复选框"
            },
            {
                newline: 0,
                name: "IsTextField",
                label: "是否显示字段",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox",
                type_text: "复选框",
                name_text: "IsTextField",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            },
            {
                newline: true,
                name: "IsFormField",
                label: "只在表单使用",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox",
                type_text: "复选框"
            },
            {
                newline: 1,
                name: "RelationModel",
                label: "关联模型",
                editor: {
                    type: "text",
                    data: [],
                    value: "",
                    textField: "ModelTitle",
                    url: "/web/listdata?model=core_model",
                    valueField: "ModelName"
                },
                type: "select",
                type_text: "单选下拉框",
                name_text: "关联模型",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            },
            {
                newline: false,
                name: "RelationField",
                label: "关联模型字段",
                editor: {
                    type: "text"
                },
                type: "text",
                type_text: "单行",
                name_text: "关联模型字段",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            },
            {
                name: "SourceFilter",
                type: "modeFilterCreator",
                label: "来源数据过滤",
                editor: {},
                newline: 1,
                type_text: {
                    0 : "m",
                    1 : "o",
                    2 : "d",
                    3 : "e",
                    4 : "F",
                    5 : "i",
                    6 : "l",
                    7 : "t",
                    8 : "e",
                    9 : "r",
                    10 : "C",
                    11 : "r",
                    12 : "e",
                    13 : "a",
                    14 : "t",
                    15 : "o",
                    16 : "r"
                },
                name_text: "来源过滤",
                width: "",
                labelAlign: "",
                rightToken: "",
                fieldExtend: "{\"editor\":{\"isJson\":true}}",
                readonly: 0,
                hideLabel: 0,
                hideSpace: 0,
                hideInAdd: 0
            },
            {
                newline: true,
                name: "SeqNo",
                label: "排序",
                editor: {
                    type: "int"
                },
                type: "int",
                type_text: "整数",
                width: "",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            },
            {
                name: "FieldSelection",
                type: "selectionCreator",
                label: "选项",
                editor: {},
                newline: true,
                type_text: {
                    0 : "s",
                    1 : "e",
                    2 : "l",
                    3 : "e",
                    4 : "c",
                    5 : "t",
                    6 : "i",
                    7 : "o",
                    8 : "n",
                    9 : "C",
                    10 : "r",
                    11 : "e",
                    12 : "a",
                    13 : "t",
                    14 : "o",
                    15 : "r"
                },
                name_text: "选项",
                width: "300",
                labelAlign: "",
                rightToken: "",
                hideLabel: 0,
                hideSpace: 0
            }]
        },
        link: {
            scripts: "",
            styles: "",
            controls: "selectionCreator,modeFilterCreator"
        }
    };
    return options;
}