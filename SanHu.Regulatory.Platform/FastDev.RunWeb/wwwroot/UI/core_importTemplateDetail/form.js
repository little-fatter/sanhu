function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "FieldName",
                label: "字段", 
                type: "text" 
            },
            {
                newline: 1,
                name: "Title",
                label: "显示标题",
                editor: {
                    type: "text"
                },
                type: "text",
                type_text: "单行",
                name_text: "显示标题",
                width: "",
                labelAlign: "",
                rightToken: "：",
                editorExtend: "",
                readonly: 0,
                hideLabel: 0,
                hideSpace: 0,
                hideInAdd: 0
            },
            {
                name: "radiolist",
                type: "radiolist",
                label: "对齐方式",
                editor: {
                    data: [{
                        id: "left",
                        text: "左对齐"
                    },
                    {
                        id: "center",
                        text: "居中对齐"
                    },
                    {
                        id: "right",
                        text: "右对齐"
                    }],
                    rowSize: "0",
                    value: "center",
                    textField: "",
                    url: "",
                    valueField: ""
                },
                newline: 1,
                type_text: "单选框列表",
                width: "",
                labelAlign: "",
                rightToken: "：",
                editorExtend: "",
                readonly: 0,
                hideLabel: 0,
                hideSpace: 0,
                hideInAdd: 0
            },
            {
                name: "XlsColumn",
                type: "text",
                label: "列名",
                editor: {},
                newline: 1,
                type_text: "单行",
                name_text: "列名",
                width: "60",
                labelAlign: "",
                rightToken: "：",
                editorExtend: "",
                readonly: 0,
                hideLabel: 0,
                hideSpace: 0,
                hideInAdd: 0
            },
            {
                name: "Width",
                type: "text",
                label: "宽度",
                editor: {},
                newline: false,
                type_text: "单行",
                width: "60",
                labelAlign: "",
                rightToken: "：",
                editorExtend: "",
                readonly: 0,
                hideLabel: 0,
                hideSpace: 0,
                hideInAdd: 0,
                name_text: "宽度"
            },
            {
                newline: 1,
                name: "Format",
                label: "格式化",
                editor: {
                    type: "text"
                },
                type: "text",
                type_text: "单行",
                name_text: "格式化",
                width: "260",
                labelAlign: "",
                rightToken: "：",
                editorExtend: "",
                readonly: 0,
                hideLabel: 0,
                hideSpace: 0,
                hideInAdd: 0,
                fieldExtend: ""
            }],
            inputWidth: "320",
            labelWidth: "90",
            space: "40",
            labelAlign: "left",
            align: "left",
            widescreen: 0
        }
    };
    return options;
}