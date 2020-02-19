define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "Title",
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
                    newline: false,
                    name: "ReportAddress",
                    label: "地址",
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
                    name: "ReportAddressx",
                    label: "地址x",
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
                    name: "ReportAddressy",
                    label: "地址y",
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
                    name: "ReporterName",
                    label: "上报人名称",
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
                    name: "ReporterPhone",
                    label: "上报人手机",
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
                    name: "EventState",
                    label: "事件状态",
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
                                value: "32f05005-199f-497d-9d86-780377c81afa",
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
                    name: "ProcessingResult",
                    label: "处理结果",
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
                    name: "NeedLawEnforcement",
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
                    name: "ReportDescription",
                    label: "上报描述",
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
                    name: "ConfirmEventType",
                    label: "确认事件类型",
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
                                value: "32f05005-199f-497d-9d86-780377c81afa",
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
                    name: "ConfirmLocation",
                    label: "确认地点",
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
                    name: "ReportEventType",
                    label: "上报事件类型",
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
                                value: "707d923c-2ad8-401c-a61d-f48524709dfc",
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
                    name: "ConfirmAddress",
                    label: "确认上报地址",
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
                    name: "ConfirmAddressx",
                    label: "确认上报地址x",
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
                    name: "ConfirmAddressy",
                    label: "确认上报地址y",
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
                    name: "\t ReportTime",
                    label: "上报时间",
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
                    name: "ConfirmTime",
                    label: "确认发生时间",
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
                    name: "NeedTracking",
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
                    newline: false,
                    name: "ConfirmationDescription",
                    label: "确认描述",
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
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=event_info&viewname=form'
    };
    exports.options.model = {
        name: 'event_info',
        title: '事件信息'
    };

    exports.service = function service(page) {

};

    return exports;
});