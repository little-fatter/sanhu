define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Inspectionreason",
                    display: "检查事由",
                    type: "string"
                },
                {
                    name: "Incidentlocation",
                    display: "事发地点",
                    type: "string"
                },
                {
                    name: "Inspectiontype",
                    display: "检查类别",
                    type: "ref"
                },
                {
                    name: "Inspectionrecord",
                    display: "勘验记录",
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
                display: "检查类别",
                name: "Inspectiontype",
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
                display: "检查事由",
                name: "Inspectionreason",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事发地点",
                name: "Incidentlocation",
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
                display: "陪同人",
                name: "Companions",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "勘验记录",
                name: "Inspectionrecord",
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
                display: "InspectiontypeID",
                name: "InspectiontypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=form_inquestrecord&viewname=list'
    };
    exports.options.model = {
        name: 'form_inquestrecord',
        title: '勘验记录'
    };

    exports.service = function service(page) {

};

    return exports;
});