define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Classname",
                    display: "等级名",
                    type: "string",
                    name_text: "等级名",
                    width: "320",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                }]
            },
            common: {
                viewType: "list"
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Classname",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {}
        },
        dataset: 'web/dataset?model=crm_customerlevel&viewname=list'
    };
    exports.options.model = {
        name: 'crm_customerlevel',
        title: '客户等级'
    };

    return exports;
});