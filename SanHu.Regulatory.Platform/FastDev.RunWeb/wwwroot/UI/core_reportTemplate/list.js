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
            columns: [{
                name: "ModelName",
                display: "模型名 ",
                type: "text",
                width: "300",
                align: "left"
            },
            {
                name: "Title",
                display: "模板标题 ",
                type: "text",
                width: "300",
                align: "left"
            },
            {
                width: "150",
                display: "创建时间",
                name: "CreateDate",
                name_text: " - 创建时间 - ",
                align: "left",
                align_textfield: "左对齐",
                type: "datetime",
                type_text: "日期"
            }]
        },
        common: {
            hideViewSwitch: 1,
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "",
            formShowType: "tab",
            formShowPosition: "",
            dialogWidth: "700",
            dialogHeight: "500",
            openParm: "",
            showList: 0,
            showCalendar: 0,
            showReport: 0,
            showKanban: 0,
            hideToolbar: 0,
            viewNameList: "",
            viewNameCalendar: "",
            viewNameReport: "",
            viewNameKanban: "",
            formViewName: ""
        },
        kanban: {},
        calendar: {
            titleField: "Model",
            startField: "CreateDate",
            endField: "CreateDate"
        },
        report: {},
        filterFields: [{
            display: "标题",
            name: "Title",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "是否默认",
            name: "IsDefault",
            editor: {
                type: "checkbox"
            },
            type: "checkbox"
        },
        {
            display: "内容",
            name: "TemplateStyle",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "模板",
            name: "TemplateBody",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "模型名",
            name: "ModelName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "高度",
            name: "Height",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "宽度",
            name: "Width",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "上边距",
            name: "MarginTop",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "下边距",
            name: "MarginBottom",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "左边距",
            name: "MarginLeft",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "右边距",
            name: "MarginRight",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "每页记录数",
            name: "PageSize",
            editor: {
                type: "int"
            },
            type: "int"
        },
        {
            display: "打印纸张",
            name: "PrintPage",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "模板标示",
            name: "TemplateName",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}