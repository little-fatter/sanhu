define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "WorkflowtaskID",
                    type: "text",
                    label: "工作流TaskId",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonly: 1,
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "TaskType",
                    label: "任务类型",
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
                    name: "EventInfoId",
                    label: "事件ID",
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
                    newline: 1,
                    name: "MainHandler",
                    label: "主办人员",
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
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 0,
                    name: "CoOrganizer",
                    label: "协办人员",
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
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "WorkAddress",
                    label: "工作地址",
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
                    type: "text",
                    width: "500",
                    readonlyInEdit: 0
                },
                {
                    name: "IsRootTask",
                    type: "checkbox",
                    label: "是否手动创建",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: false,
                    name: "TaskContent",
                    label: "任务描述",
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
                    name: "InitiationTime",
                    type: "datepicker",
                    label: "发起时间",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "ExpectedCompletionTime",
                    type: "datepicker",
                    label: "期望完成时间",
                    editor: {},
                    newline: 0,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "AssignUsers",
                    label: "任务执行人",
                    editor: {},
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "RefTable",
                    type: "text",
                    label: "关联模型",
                    editor: {},
                    newline: 0,
                    width: "",
                    readonlyInEdit: 0,
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    name: "FormPreparation",
                    type: "textarea",
                    label: "新表必填",
                    editor: {},
                    newline: 1,
                    width: "500",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=work_task&viewname=form'
    };
    exports.options.model = {
        name: 'work_task',
        title: '任务'
    };

    exports.service = function service(page) {

};

    return exports;
});