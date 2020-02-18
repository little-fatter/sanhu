define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "CaseType",
                    label: "案件类型",
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
                    name: "CaseTitle",
                    label: "标题",
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
                    name: "CaseStatus",
                    label: "案件状态",
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
                    name: "ApplicableProcedure",
                    label: "适用程序",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select",
                        sourceFilter: {
                            rules: [{
                                field: "DicID",
                                op: "equal",
                                value: "3d19da90-56e4-46c4-9a17-a606f7d3febe",
                                type: "select"
                            }],
                            op: "and"
                        },
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    type: "ref_select"
                },
                {
                    newline: true,
                    name: "CauseOfAction",
                    label: "案由",
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
                    name: "PenaltyDecisionNo",
                    label: "处罚决定书文号",
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
                    name: "PenaltyType",
                    label: "处罚种类",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select",
                        sourceFilter: {
                            rules: [{
                                field: "DicID",
                                op: "equal",
                                value: "6524150d-4ea7-44ce-9255-eda1b8752f55",
                                type: "select"
                            }],
                            op: "and"
                        },
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    type: "ref_select"
                },
                {
                    newline: false,
                    name: "CaseRegisterDay",
                    label: "立案日期",
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
                    name: "CaseCloseDay",
                    label: "结案日期",
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
                    name: "Investigators",
                    label: "办案人员",
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
                    name: "OnDocDay",
                    label: "归档日期",
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
                    name: "DocRetentionTimes",
                    label: "保存期限",
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
                    name: "DocNo",
                    label: "归档号",
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
                    name: "DocPeople",
                    label: "归档人",
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
                    name: "Relatedevents",
                    label: "关联事件",
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
                    name: "Region",
                    label: "区域",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select",
                        sourceFilter: {
                            rules: [{
                                field: "DicID",
                                op: "equal",
                                value: "156ab037-df00-4cf7-b11a-69661cbd00c5",
                                type: "select"
                            }],
                            op: "and"
                        },
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    type: "ref_select"
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_Info&viewname=form'
    };
    exports.options.model = {
        name: 'case_Info',
        title: '案件'
    };

    exports.service = function service(page) {

};

    return exports;
});