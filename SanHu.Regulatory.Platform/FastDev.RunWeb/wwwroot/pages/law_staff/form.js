define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "CaseId",
                    label: "案件Id",
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
                    name: "PreviousformID",
                    label: "上一个表单id",
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
                    name: "AssociatedobjectID",
                    label: "关联表单Id",
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
                    name: "UserId",
                    label: "用户Id",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "user"
                        },
                        valueField: "ID",
                        textField: "Name",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select"
                },
                {
                    newline: false,
                    name: "Username",
                    label: "用户姓名",
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
                    name: "Associatedobjecttype",
                    label: "关联对象",
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
        dataset: 'web/dataset?model=law_staff&viewname=form'
    };
    exports.options.model = {
        name: 'law_staff',
        title: '执法检查人员'
    };

    exports.service = function service(page) {

};

    return exports;
});