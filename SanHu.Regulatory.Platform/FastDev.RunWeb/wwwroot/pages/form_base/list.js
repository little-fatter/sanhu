define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Originator",
                    display: "发起人",
                    type: "ref"
                },
                {
                    name: "InitiationTime",
                    display: "发起时间",
                    type: "datetime"
                },
                {
                    name: "CompletionTime",
                    display: "完成时间",
                    type: "datetime"
                },
                {
                    name: "FormName",
                    display: "表单名称",
                    type: "string"
                },
                {
                    name: "ContentValidity",
                    display: "内容简介",
                    type: "string"
                },
                {
                    name: "Department",
                    display: "部门",
                    type: "string"
                },
                {
                    name: "FormState",
                    display: "表单状态",
                    type: "string"
                },
                {
                    name: "NeedNotice",
                    display: "需要通知",
                    type: "checkbox"
                },
                {
                    name: "NeedFine",
                    display: "需要罚款",
                    type: "checkbox"
                },
                {
                    name: "FormID",
                    display: "表单id",
                    type: "string"
                },
                {
                    name: "handler",
                    display: "处理人",
                    type: "string"
                },
                {
                    name: "EventInfoId",
                    display: "事件id",
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
                display: "发起人",
                name: "Originator",
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
                display: "发起时间",
                name: "InitiationTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "完成时间",
                name: "CompletionTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "表单名称",
                name: "FormName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "内容简介",
                name: "ContentValidity",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "部门",
                name: "Department",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "表单状态",
                name: "FormState",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "需要通知",
                name: "NeedNotice",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "需要罚款",
                name: "NeedFine",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "表单id",
                name: "FormID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处理人",
                name: "handler",
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
                display: "OriginatorID",
                name: "OriginatorID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=form_base&viewname=list'
    };
    exports.options.model = {
        name: 'form_base',
        title: '表单基础'
    };

    exports.service = function service(page) {

};

    return exports;
});