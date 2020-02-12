define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "UnitName",
                    display: "计量单位名称",
                    type: "string",
                    name_text: "计量单位名称",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "备注",
                    name: "Remark",
                    name_text: "备注",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "500",
                dialogHeight: "350",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "UnitName",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            type: "list",
            filterFields: [{
                display: "计量单位名称",
                name: "UnitName",
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
            addins: {}
        },
        dataset: 'web/dataset?model=res_productUnit&viewname=list'
    };
    exports.options.model = {
        name: 'res_productUnit',
        title: '单位'
    };

    exports.service = function service(page) {

};

    return exports;
});