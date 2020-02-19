define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "StaffName",
                    display: "姓名",
                    type: "string"
                },
                {
                    name: "Department",
                    display: "部门",
                    type: "ref"
                },
                {
                    name: "IsOnline",
                    display: "是否在线",
                    type: "string"
                },
                {
                    name: "Videocall",
                    display: "视频通话",
                    type: "string"
                },
                {
                    name: "VoiceIntercom",
                    display: "语音对讲",
                    type: "string"
                },
                {
                    name: "PhoneCall",
                    display: "电话直拨",
                    type: "string"
                },
                {
                    name: "refUser",
                    display: "关联用户",
                    type: "ref"
                },
                {
                    name: "Longitude",
                    display: "经度",
                    type: "number"
                },
                {
                    name: "Latitude",
                    display: "纬度",
                    type: "number"
                },
                {
                    name: "LocationDesc",
                    display: "地址描述",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "部门",
                name: "Department",
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
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Id",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=organization&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： frameworkorganization",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "关联用户",
                name: "refUser",
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
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Id",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=user&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： frameworkuser",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "姓名",
                name: "StaffName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否在线",
                name: "IsOnline",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "视频通话",
                name: "Videocall",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "语音对讲",
                name: "VoiceIntercom",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话直拨",
                name: "PhoneCall",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "经度",
                name: "Longitude",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "纬度",
                name: "Latitude",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "地址描述",
                name: "LocationDesc",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "DepartmentID",
                name: "DepartmentID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "refUserID",
                name: "refUserID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=loc_field_staff&viewname=list'
    };
    exports.options.model = {
        name: 'loc_field_staff',
        title: '外勤员工'
    };

    exports.service = function service(page) {

};

    return exports;
});