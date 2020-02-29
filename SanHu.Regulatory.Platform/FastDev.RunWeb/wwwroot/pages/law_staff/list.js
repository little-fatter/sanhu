define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CaseId",
                    display: "案件Id",
                    type: "string"
                },
                {
                    name: "EventInfoId",
                    display: "事件id",
                    type: "string"
                },
                {
                    name: "PreviousformID",
                    display: "上一个表单id",
                    type: "string"
                },
                {
                    name: "AssociatedobjectID",
                    display: "关联表单Id",
                    type: "string"
                },
                {
                    name: "UserId",
                    display: "用户Id",
                    type: "ref"
                },
                {
                    name: "Username",
                    display: "用户姓名",
                    type: "string"
                },
                {
                    name: "Associatedobjecttype",
                    display: "关联对象",
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
                display: "用户Id",
                name: "UserId",
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
                    textField: "Name",
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
                display: "案件Id",
                name: "CaseId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件id",
                name: "EventInfoId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "上一个表单id",
                name: "PreviousformID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联表单Id",
                name: "AssociatedobjectID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "用户姓名",
                name: "Username",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联对象",
                name: "Associatedobjecttype",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "UserIdID",
                name: "UserIdID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=law_staff&viewname=list'
    };
    exports.options.model = {
        name: 'law_staff',
        title: '执法检查人员'
    };

    exports.service = function service(page) {

};

    return exports;
});