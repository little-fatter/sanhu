function view()
{ 
    var options = {
        form: {
            fields: [{
                newline: 1,
                name: "Title",
                label: "标题",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "标题",
                width: "550",
                fieldExtend: "{\"style\":\"margin-bottom:10px\"}"
            },
            {
                newline: 1,
                name: "Width",
                label: "宽度",
                editor: {},
                type: "text",
                name_textfield: "宽度",
                width: "50",
                labelWidth: "auto",
                type_textfield: "单行"
            },
            {
                newline: 0,
                name: "Height",
                label: "高度",
                editor: {},
                type: "text",
                name_textfield: "高度",
                width: "50",
                labelWidth: "auto",
                type_textfield: "单行"
            },
            {
                newline: 0,
                name: "RowNumber",
                label: "行数",
                editor: {
                    type: "float"
                },
                type: "float",
                name_textfield: "行数",
                width: "50",
                labelWidth: "auto"
            },
            {
                newline: 0,
                name: "ColumnNumber",
                label: "列数",
                editor: {
                    type: "float"
                },
                type: "float",
                name_textfield: "列数",
                width: "50",
                labelWidth: "auto"
            },
            {
                name: "PanelNumber",
                type: "number",
                label: "排序",
                editor: {},
                newline: 0,
                type_textfield: "数值",
                name_textfield: "排序",
                width: "60",
                labelWidth: "auto"
            },
              {
                  label: '链接',
                  name: 'Link',
                  type: 'select', width: "550",
                  fieldExtend: "{\"style\":\"margin-top:10px\"}",
                  editor: {
                      isTextBoxMode: true,
                      css: "combobox-selector" 
                  }
              },
                {
                    label: '数据过滤',
                    name: 'LinkBind',
                    type: 'select', width: "550",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector" 
                    }
                }

            ]
        },
        common: {
            viewType: "form",
            saveCallbackType: "toView"
        },
        link: {}
    };
    return options;
}