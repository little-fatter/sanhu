function view() {
    var options = {
        search: {
            conditions: [{
                newline: false,
                name: "Title",
                operator: "contains",
                type: "text",
                label: "标题" 
            }]
        },
        list: {
            checkbox:false,
            columns: [{
                name: "Title",
                type: "string",
                display: "标题",
                name_text: "标题",
                width: "500",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                width: "150",
                display: "状态",
                name: "Status",
                name_text: " - 状态 - ",
                align: "left",
                align_textfield: "左对齐",
                type: "wfstatus",
                type_text: "工作流状态"
            }],
            title: "",
            usePager: 0,
            height: "100%"
        },
        common: {
            showList: 0,
            hideToolbar: 1,
            showCalendar: 0,
            showKanban: 0
        },
        kanban: {},
        calendar: {
            titleField: "Title",
            startField: "CompleteTime",
            endField: "CompleteTime"
        },
        link: {},
        report: {},
        filterFields: [{
            display: "指定人",
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
            display: "链接",
            name: "Link",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "关联对象",
            name: "RefTable",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "备注",
            name: "Remark",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "关联对象ID",
            name: "RefRecordID",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "完成时间",
            name: "CompleteTime",
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
        }]
    };
    return options;
}