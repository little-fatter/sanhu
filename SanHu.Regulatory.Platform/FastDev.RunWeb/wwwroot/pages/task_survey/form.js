define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "EventType",
                    label: "类型",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "IncidentTime",
                    label: "事发时间",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "datepicker"
                    },
                    type: "datepicker"
                },
                {
                    newline: true,
                    name: "IncidentAddress",
                    label: "事发地址",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "IncidentAddressXY",
                    label: "事发地址坐标",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "Result",
                    label: "结果",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "ProcessingDecisions",
                    label: "处理决定",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "int"
                    },
                    type: "int"
                },
                {
                    newline: true,
                    name: "ExistCrim",
                    label: "存在犯罪",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "EventID",
                    label: "事件id",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "CaseID",
                    label: "案件id",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    name: "Partys",
                    type: "ref_grid_edit",
                    label: "编辑表格",
                    editor: {
                        grid: {
                            height: 230,
                            defaultRow: {},
                            defaultRowCount: 4,
                            columns: [{
                                width: "100",
                                type: "text",
                                align: "left",
                                editor: {
                                    type: "text"
                                },
                                name: "Name",
                                editorType: "text",
                                display: "姓名"
                            },
                            {
                                width: 100,
                                type: "text",
                                align: "left",
                                display: "当事人类型"
                            },
                            {
                                width: "100",
                                type: "string",
                                align: "left",
                                display: "性别",
                                name: "Gender",
                                editorType: ""
                            },
                            {
                                display: "职业",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "text"
                                },
                                name: "Occupation",
                                editorType: "text"
                            }]
                        },
                        detailUrl: "/web/main/?model=task_surveyParty&viewtype=form",
                        titleEdit: "修改： 勘察当事人",
                        titleAdd: "新增：勘察当事人",
                        modeType: "editgrid",
                        one2many: true,
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    width: "800",
                    hideLabel: 1,
                    hideSpace: 1,
                    newline: 1,
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=task_survey&viewname=form'
    };
    exports.options.model = {
        name: 'task_survey',
        title: '任务-勘察'
    };

    exports.service = function service(page) {

};

    return exports;
});