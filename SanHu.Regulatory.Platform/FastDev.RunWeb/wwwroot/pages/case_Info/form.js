define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "CaseType",
                    label: "案件类型",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "CaseTitle",
                    label: "标题",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "CaseStatus",
                    label: "案件状态",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "ApplicableProcedure",
                    label: "适用程序",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "Title",
                        many2one: true
                    },
                    type: "ref_select",
                    newline: 0
                },
                {
                    name: "CauseOfAction",
                    label: "案由",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "PenaltyDecisionNo",
                    label: "处罚决定书文号",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "PenaltyType",
                    label: "处罚种类",
                    newline: 1,
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "Title",
                        many2one: true
                    },
                    type: "ref_select"
                },
                {
                    name: "CaseRegisterDay",
                    label: "立案日期",
                    editor: {},
                    type: "datepicker",
                    newline: 0
                },
                {
                    name: "CaseCloseDay",
                    label: "结案日期",
                    newline: 1,
                    editor: {},
                    type: "datepicker"
                },
                {
                    name: "Investigators",
                    label: "办案人员",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "OnDocDay",
                    label: "归档日期",
                    newline: 1,
                    editor: {},
                    type: "datepicker"
                },
                {
                    name: "DocRetentionTimes",
                    label: "保存期限",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "DocNo",
                    label: "归档号",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "DocPeople",
                    label: "归档人",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "Relatedevents",
                    label: "关联事件",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "Region",
                    label: "区域",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "Title",
                        many2one: true
                    },
                    type: "ref_select",
                    newline: 0
                },
                {
                    label: "案件执行情况",
                    name: "CaseDescription",
                    newline: 1,
                    editor: {},
                    type: "textarea",
                    width: "",
                    readonlyInEdit: 0
                }],
                tab: null
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