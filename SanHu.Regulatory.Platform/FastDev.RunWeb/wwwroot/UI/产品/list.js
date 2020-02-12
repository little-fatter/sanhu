function view() {
    var options = {
        list: {
            columns: [{
                name: "产品ID",
                display: "产品ID",
                type: "string"
            },
            {
                name: "产品名称",
                display: "产品名称",
                type: "string"
            },
            {
                name: "供应商ID",
                display: "供应商ID",
                type: "string"
            },
            {
                name: "类别ID",
                display: "类别ID",
                type: "string"
            },
            {
                name: "单位数量",
                display: "单位数量",
                type: "string"
            },
            {
                name: "单价",
                display: "单价",
                type: "string"
            },
            {
                name: "库存量",
                display: "库存量",
                type: "string"
            },
            {
                name: "订购量",
                display: "订购量",
                type: "string"
            },
            {
                name: "再订购量",
                display: "再订购量",
                type: "string"
            },
            {
                name: "中止",
                display: "中止",
                type: "string"
            }]
        },
        common: {
            formShowType: "tab",
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
            display: "产品ID",
            name: "产品ID",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "产品名称",
            name: "产品名称",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "供应商ID",
            name: "供应商ID",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "类别ID",
            name: "类别ID",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "单位数量",
            name: "单位数量",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "单价",
            name: "单价",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "库存量",
            name: "库存量",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "订购量",
            name: "订购量",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "再订购量",
            name: "再订购量",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "中止",
            name: "中止",
            editor: {
                type: "string"
            },
            type: "string"
        }],
        link: {}
    };
    return options;
}