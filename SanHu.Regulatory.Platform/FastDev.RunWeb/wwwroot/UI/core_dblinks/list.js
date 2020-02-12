function view() {
    var options = {
        list: {
            columns: [{
                name: "DbType",
                display: "DbType",
                type: "string"
            },
            {
                width: "100",
                display: "DbName",
                name: "DbName",
                name_text: "DbName",
                align: "left",
                align_textfield: "左对齐",
                type: "string",
                type_text: "文本型"
            },
            {
                name: "Title",
                display: "Title",
                type: "string"
            },
            {
                name: "DbLink",
                display: "DbLink",
                type: "string"
            },
            {
                name: "Remark",
                display: "Remark",
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
            hideViewSwitch: 0,
            viewNameList: "",
            viewNameCalendar: "",
            viewNameReport: "",
            viewNameKanban: "",
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "left",
            formViewName: "",
            openParm: ""
        },
        type: "list",
        filterFields: [{
            display: "DbType",
            name: "DbType",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "Title",
            name: "Title",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "DbLink",
            name: "DbLink",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "Remark",
            name: "Remark",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "DbName",
            name: "DbName",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}