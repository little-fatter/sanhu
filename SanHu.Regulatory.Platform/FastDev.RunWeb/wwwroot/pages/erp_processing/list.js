define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "ProcessingNo",
                    display: "加工单编号",
                    type: "string",
                    name_text: "加工单编号",
                    width: "150",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "OldProduct",
                    display: "原料产品",
                    type: "ref",
                    name_text: "原料产品",
                    width: "120",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    name: "NewProduct",
                    display: "成品",
                    type: "ref",
                    name_text: "成品",
                    width: "120",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    name: "OldWeight",
                    display: "原重量",
                    type: "float",
                    name_text: "原重量",
                    width: "120",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "数值类型"
                },
                {
                    name: "NewWeight",
                    display: "新重量",
                    type: "float",
                    name_text: "新重量",
                    width: "120",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "数值类型"
                },
                {
                    name: "NewMValue",
                    display: "新米数",
                    type: "float",
                    name_text: "新米数",
                    width: "120",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "数值类型"
                },
                {
                    width: "100",
                    display: "出码率",
                    name: "Rate",
                    name_text: "出码率",
                    align: "right",
                    align_textfield: "右对齐",
                    type: "float",
                    type_text: "数值类型"
                },
                {
                    width: "150",
                    display: "状态",
                    name: "Status",
                    name_text: " - 状态 - ",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "wfstatus",
                    type_text: "工作流状态"
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
                titleField: "OldProduct",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            search: {
                fields: [{
                    width: "100",
                    label: "日期",
                    labelWidth: "40",
                    editor: {},
                    name: "OrderDate",
                    operator: "greaterorequal",
                    type: "datepicker"
                },
                {
                    rightToken: " ",
                    newline: false,
                    width: "100",
                    label: "至",
                    labelWidth: "20",
                    editor: {},
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
        dataset: 'web/dataset?model=erp_processing&viewname=list'
    };
    exports.options.model = {
        name: 'erp_processing',
        title: '外加工'
    };

    return exports;
});