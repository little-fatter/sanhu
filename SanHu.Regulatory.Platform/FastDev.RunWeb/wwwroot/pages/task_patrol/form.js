define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "EventDescribe",
                    label: "描述",
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
                    newline: 0,
                    name: "EventType",
                    label: "类型",
                    editor: {
                        data: [],
                        freedesign_source: {
                            model: "res_dictionary",
                            url: "/web/api",
                            filter: {
                                rules: [{
                                    field: "ID",
                                    op: "equal",
                                    value: [["", ""]],
                                    type: "select"
                                }],
                                op: "and"
                            },
                            valueField: "DicCode",
                            textField: "Title"
                        },
                        isTextBoxMode: 0,
                        value: ""
                    },
                    type: "select",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
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
                    newline: false,
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
                    newline: true,
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
                    newline: false,
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
                    newline: true,
                    name: "Needlawenforcement",
                    label: "需要执法",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "checkbox"
                    },
                    type: "checkbox"
                },
                {
                    newline: false,
                    name: "Needtracking",
                    label: "需要跟踪",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "checkbox"
                    },
                    type: "checkbox"
                },
                {
                    newline: true,
                    name: "Associatedforms",
                    label: "关联表单",
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
                    name: "CaseId",
                    type: "text",
                    label: "案件id",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "EventInfoId",
                    type: "text",
                    label: "事件Id",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0,
                    validate: {
                        required: 0,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    name: "TaskId",
                    type: "text",
                    label: "TaskId",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "NextHandler",
                    type: "textarea",
                    label: "下一步用户，逗号分割",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=task_patrol&viewname=form'
    };
    exports.options.model = {
        name: 'task_patrol',
        title: '任务-事件巡查'
    };

    exports.service = function service(page) {

};

    return exports;
});