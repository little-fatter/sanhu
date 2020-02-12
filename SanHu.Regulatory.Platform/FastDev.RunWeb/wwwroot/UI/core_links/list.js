function view() {
    var options = {
        list: {
            columns: [{
                name: "Title",
                display: "标题",
                type: "string"
            },
            {
                name: "SortNo",
                display: "排序",
                type: "number"
            },
            {
                name: "Url",
                display: "链接",
                type: "string"
            }]
        },
        common: {
            formShowType: "dialog",
            formShowPosition: "top",
            dialogWidth: "900",
            dialogHeight: "800",
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
            display: "标题",
            name: "Title",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "背景色",
            name: "BackgroundColor",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "图标",
            name: "Icon",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "排序",
            name: "SortNo",
            editor: {
                type: "int"
            },
            type: "int"
        },
        {
            display: "链接ID",
            name: "LinkID",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "链接",
            name: "Url",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "链接参数",
            name: "LinkBind",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "ValueSQL",
            name: "ValueSQL",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "ModelName",
            name: "ModelName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "FilterData",
            name: "FilterData",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}