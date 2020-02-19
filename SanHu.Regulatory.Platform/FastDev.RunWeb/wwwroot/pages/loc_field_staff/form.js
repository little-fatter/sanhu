define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "StaffName",
                    label: "姓名",
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
                    name: "Department",
                    label: "部门",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "organization"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "organization"
                        },
                        valueField: "Id",
                        sourceFilter: null,
                        textField: "Name",
                        many2one: true
                    },
                    type: "ref_select",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "IsOnline",
                    label: "是否在线",
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
                    name: "Videocall",
                    label: "视频通话",
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
                    name: "VoiceIntercom",
                    label: "语音对讲",
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
                    name: "PhoneCall",
                    label: "电话直拨",
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
                    name: "refUser",
                    label: "关联用户",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "user"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "user"
                        },
                        valueField: "Id",
                        sourceFilter: null,
                        textField: "Name",
                        many2one: true,
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    type: "ref_select",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: false,
                    name: "Longitude",
                    label: "经度",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "float"
                    },
                    type: "float"
                },
                {
                    newline: true,
                    name: "Latitude",
                    label: "纬度",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "float"
                    },
                    type: "float"
                },
                {
                    newline: false,
                    name: "LocationDesc",
                    label: "地址描述",
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
        dataset: 'web/dataset?model=loc_field_staff&viewname=form'
    };
    exports.options.model = {
        name: 'loc_field_staff',
        title: '外勤员工'
    };

    exports.service = function service(page) {

};

    return exports;
});