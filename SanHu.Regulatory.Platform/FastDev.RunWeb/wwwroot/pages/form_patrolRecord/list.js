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