function view() {
    var options = {
        list: {
            columns: [{
                name: "VariableTitle",
                display: "变量名",
                type: "string"
            },
            {
                name: "VariableName",
                display: "变量标示",
                type: "string"
            },
            {
                name: "VariableValue",
                display: "变量值",
                type: "string"
            },
            {
                name: "VariableExpression",
                display: "变量表达式(SQL)",
                type: "string"
            }]
        },
        common: {
            formShowType: "dialog",
            formShowPosition: "top",
            dialogWidth: "700",
            dialogHeight: "500",
            showList: 0,
            showCalendar: 0,
            showReport: 0,
            showKanban: 0,
            hideToolbar: 0,
            hideViewSwitch: 1,
            viewNameList: "",
            viewNameCalendar: "",
            viewNameReport: "",
            viewNameKanban: "",
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "hide",
            searchAdShowType: "hide",
            formViewName: "",
            openParm: ""
        },
        type: "list",
        filterFields: [{
            display: "变量名",
            name: "VariableTitle",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "变量标示",
            name: "VariableName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "变量值",
            name: "VariableValue",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "变量表达式(SQL)",
            name: "VariableExpression",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "备注",
            name: "Remark",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}