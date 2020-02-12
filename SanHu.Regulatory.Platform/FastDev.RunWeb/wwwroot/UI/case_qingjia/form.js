function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "title",
                label: "标题",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                newline: false,
                name: "Leavedays",
                label: "请假天数",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                newline: 1,
                name: "starttime",
                label: "开始时间",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                width: ""
            },
            {
                newline: 0,
                name: "Endtime",
                label: "结束时间",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                width: ""
            },
            {
                name: "Leavetype",
                type: "ref_select",
                label: "请假类型",
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
                    many2one: true
                },
                newline: 1,
                width: ""
            },
            {
                newline: 1,
                name: "remarks",
                label: "备注",
                editor: {},
                type: "textarea",
                width: "500"
            }]
        },
        common: {
            saveCallbackType: "toView"
        },
        link: {},
        type: "form"
    };
    return options;
}