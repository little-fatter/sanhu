define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Title",
                    display: "标题",
                    type: "string",
                    name_text: "标题",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "DicCode",
                    display: "代码标示",
                    type: "string",
                    name_text: "代码标示",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "Remarks",
                    display: "备注",
                    type: "string",
                    name_text: "备注",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                }],
                title: "",
                usePager: 1,
                height: "100%",
                downViewEnabled: 1,
                downViewHeight: "300",
                downViewName: "form_list",
                checkbox: 0,
                sortName: "CreateDate",
                sortOrder: "asc"
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
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                openParm: ""
            },
            filterFields: [{
                display: "标题",
                name: "Title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "代码标示",
                name: "DicCode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=res_dictionary&viewname=list'
    };
    exports.options.model = {
        name: 'res_dictionary',
        title: '字典'
    };

    return exports;
});