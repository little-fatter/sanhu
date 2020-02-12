define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "OrderNo",
                    display: "编号",
                    type: "string",
                    width: "190",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "OrderDate",
                    display: "日期",
                    type: "date",
                    name_text: "单据日期",
                    width: "180",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "日期"
                },
                {
                    width: "150",
                    display: "状态",
                    name: "Status",
                    name_text: " - 状态 - ",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "wfstatus"
                }]
            },
            common: {
                viewType: "list",
                formShowType: "tab",
                formShowPosition: "self",
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
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Customer",
                startField: "OrderDate",
                endField: "OrderDate"
            },
            report: {},
            search: {
                fields: [{
                    width: "140",
                    label: "日期",
                    labelWidth: "40",
                    editor: {
                        showHour: 1,
                        showMinute: 1,
                        showSecond: 0,
                        dateFormat: ""
                    },
                    name: "OrderDate",
                    operator: "greaterorequal",
                    type: "datepicker"
                },
                {
                    rightToken: " ",
                    newline: false,
                    width: "140",
                    label: "至",
                    labelWidth: "20",
                    editor: {
                        showHour: 1,
                        showMinute: 1,
                        showSecond: 0,
                        dateFormat: ""
                    },
                    name: "OrderDate",
                    operator: "lessorequal",
                    type: "datepicker",
                    operator_textfield: "小于或等于"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=stock_in&viewname=list'
    };
    exports.options.model = {
        name: 'stock_in',
        title: '入库单'
    };

    return exports;
});