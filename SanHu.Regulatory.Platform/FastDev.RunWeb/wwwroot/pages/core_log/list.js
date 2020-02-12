define([],
function() {
    function view() {
        var options = {
            list: {
                sortName: 'CreateDate',
                sortOrder: 'desc',
                columns: [{
                    name: "Title",
                    width: 500,
                    display: "标题",
                    align: 'left',
                    type: "string"
                },
                {
                    name: "Logtime",
                    display: "日期时间",
                    format: 'yyyy-MM-dd hh:mm',
                    type: "datetime"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "User",
                name: "User",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "core_user"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "core_user"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "RealName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=core_user&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 用户",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "标题",
                name: "Title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "内容",
                name: "Logcontent",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "日志类型",
                name: "Logtype",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "StackTrace",
                name: "StackTrace",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "OperatorIP",
                name: "OperatorIP",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Systempath",
                name: "Systempath",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "日期时间",
                name: "Logtime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "UserID",
                name: "UserID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_log&viewname=list'
    };
    exports.options.model = {
        name: 'core_log',
        title: '系统日志'
    };

    exports.service = function service(page) {

};

    return exports;
});