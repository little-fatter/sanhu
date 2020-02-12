define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Remarks",
                    display: "备注",
                    type: "string"
                },
                {
                    name: "TypeName",
                    display: "类别名",
                    type: "string"
                }]
            },
            common: {
                viewType: "list",
                viewtype: "list",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                formShowType: "dialog",
                formShowPosition: "second",
                saveCallbackType: "",
                dialogWidth: "500",
                dialogHeight: "360"
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Remarks",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {}
        },
        dataset: 'web/dataset?model=crm_supplierType&viewname=list'
    };
    exports.options.model = {
        name: 'crm_supplierType',
        title: '供应商类别'
    };

    return exports;
});