function view() {
    var options = {
        list: {
            columns: [{
                name: "title",
                display: "标题",
                type: "string"
            },
            {
                name: "Leavedays",
                display: "请假天数",
                type: "number"
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
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "left",
            openParm: ""
        },
        filterFields: [{
            display: "请假类型",
            name: "Leavetype",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "case_qingjiaType"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "case_qingjiaType"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "Title",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=case_qingjiaType&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 请假类型",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
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
        },
        {
            display: "LeavetypeID",
            name: "LeavetypeID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {},
        search: {
            fields: [{
                label: "标题",
                labelWidth: "auto",
                type: "text",
                editor: {},
                name: "title",
                name_text: "标题",
                operator: "like",
                operator_textfield: "包含",
                type_text: "单行",
                width: "100"
            }],
            inputWidth: "",
            labelWidth: "70",
            space: "",
            labelAlign: "left"
        },
        type: "list",
        toolbar: null,
        toolbar2: {}
    };
    return options;
}