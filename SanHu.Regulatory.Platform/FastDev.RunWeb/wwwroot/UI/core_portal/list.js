function view() {
    var options = {
        search: {
            fields: [
                {
                    label: "标题",
                    type: "text",
                    name: "Title",
                    operator: "like",
                    width: "150"
                }
            ],
            inputWidth: "",
            labelWidth: "70",
            space: "",
            labelAlign: "left"
        },
        list: {
            columns: [{
                name: "Title",
                display: "标题",
                type: "string"
            },
            {
                name: "RowNumber",
                display: "行数",
                type: "number"
            },
            {
                name: "ColumNumber",
                display: "列数",
                type: "number"
            }]
        },
        common: {
            hideViewSwitch: 1,
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "",
            formShowType: "",
            formShowPosition: "",
            dialogWidth: "700",
            dialogHeight: "500",
            openParm: ""
        }
    };
    return options;
}