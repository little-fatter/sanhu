function view() {
    var options = {
        list: {
            columns: [{
                name: "Conferencetitle",
                display: "会议标题",
                type: "string"
            },
            {
                name: "sponsor",
                display: "发起人",
                type: "ref"
            },
            {
                name: "starttime",
                display: "开始时间",
                type: "datetime"
            }]
        },
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
            viewNameList: "0110_list",
            viewNameCalendar: "0110_calendar",
            viewNameReport: "",
            viewNameKanban: "",
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "left",
            formViewName: "",
            openParm: ""
        },
        filterFields: [{
            display: "发起人",
            name: "sponsor",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "res_employee"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "res_employee"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "EmpName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=res_employee&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 员工",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "会议标题",
            name: "Conferencetitle",
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
            name: "endtime",
            editor: {
                type: "datepicker"
            },
            type: "datepicker"
        },
        {
            display: "会议内容",
            name: "conferencecontent",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "sponsorID",
            name: "sponsorID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {}
    };
    return options;
}