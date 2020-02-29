define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Recorder",
                    display: "记录人员",
                    type: "string"
                },
                {
                    name: "Starttime",
                    display: "开始时间",
                    type: "datetime"
                },
                {
                    name: "Endtime",
                    display: "结束时间",
                    type: "datetime"
                },
                {
                    name: "Inquiryrecord",
                    display: "询问记录",
                    type: "string"
                },
                {
                    name: "Objectofinquiry",
                    display: "询问对象",
                    type: "ref"
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
                display: "询问对象",
                name: "Objectofinquiry",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionary"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionary"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionary&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典",
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
                display: "记录人员",
                name: "Recorder",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "开始时间",
                name: "Starttime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "结束时间",
                name: "Endtime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "是否看清执法证件",
                name: "Isseeclearly",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否明白权责义务",
                name: "Isunderstand",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "询问记录",
                name: "Inquiryrecord",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "询问地点",
                name: "Enquiryplace",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案件由来",
                name: "Originofcase",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "任务id",
                name: "TaskId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ObjectofinquiryID",
                name: "ObjectofinquiryID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=form_inquiryrecord&viewname=list'
    };
    exports.options.model = {
        name: 'form_inquiryrecord',
        title: '询问记录'
    };

    exports.service = function service(page) {

};

    return exports;
});