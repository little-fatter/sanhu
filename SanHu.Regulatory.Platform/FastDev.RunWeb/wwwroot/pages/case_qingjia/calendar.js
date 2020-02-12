define([],
function() {
    function view() {
        var options = {
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 1,
                showCalendar: 1,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                openParm: ""
            },
            calendar: {
                titleField: "title",
                startField: "starttime",
                endField: "Endtime"
            },
            filterFields: [{
                display: "标题",
                name: "title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "开始时间",
                name: "starttime",
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
                display: "请假天数",
                name: "Leavedays",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "备注",
                name: "remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'calendar',
        options: view(),
        dataset: 'web/dataset?model=case_qingjia&viewname=calendar'
    };
    exports.options.model = {
        name: 'case_qingjia',
        title: '请假单'
    };

    return exports;
});