define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "PatrolTimeBegin",
                    display: "巡查时间起",
                    type: "datetime"
                },
                {
                    name: "PatrolTimeEnd",
                    display: "巡查时间止",
                    type: "datetime"
                },
                {
                    name: "PatrolAddressBegin",
                    display: "巡查地址起",
                    type: "string"
                },
                {
                    name: "PatrolAddressEnd",
                    display: "巡查地址止",
                    type: "string"
                },
                {
                    name: "Situation",
                    display: "情况",
                    type: "string"
                },
                {
                    name: "HandlingOpinions",
                    display: "处理意见",
                    type: "string"
                },
                {
                    name: "Result",
                    display: "结果",
                    type: "string"
                },
                {
                    name: "PatrolPerson",
                    display: "巡查人",
                    type: "string"
                },
                {
                    name: "PatrolLeader",
                    display: "巡查负责人",
                    type: "string"
                },
                {
                    name: "DptLeader",
                    display: "巡查科室负责人",
                    type: "string"
                },
                {
                    name: "FormNumber",
                    display: "表格编号",
                    type: "string"
                },
                {
                    width: "150",
                    display: "发起人",
                    name: "OriginatorID",
                    name_text: "发起人",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "发起时间",
                    name: "Initiationtime",
                    name_text: "发起时间",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
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
                display: "巡查时间起",
                name: "PatrolTimeBegin",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "巡查时间止",
                name: "PatrolTimeEnd",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "巡查地址起",
                name: "PatrolAddressBegin",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "巡查地址止",
                name: "PatrolAddressEnd",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "情况",
                name: "Situation",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处理意见",
                name: "HandlingOpinions",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "结果",
                name: "Result",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "巡查人",
                name: "PatrolPerson",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "巡查负责人",
                name: "PatrolLeader",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "巡查科室负责人",
                name: "DptLeader",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "表格编号",
                name: "FormNumber",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "发起人",
                name: "OriginatorID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "发起时间",
                name: "Initiationtime",
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
                display: "案件id",
                name: "CaseId",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=form_patrolRecord&viewname=list'
    };
    exports.options.model = {
        name: 'form_patrolRecord',
        title: '巡查记录表'
    };

    exports.service = function service(page) {

};

    return exports;
});