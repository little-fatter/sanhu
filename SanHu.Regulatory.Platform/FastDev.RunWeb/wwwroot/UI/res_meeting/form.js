function view() {
    var options = {
        form: {
            fields: [{
                newline: 1,
                name: "Conferencetitle",
                label: "会议标题",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "会议标题",
                width: "500"
            },
            {
                newline: 1,
                name: "sponsor",
                label: "发起人",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_employee"
                    },
                    valueField: "ID",
                    textField: "EmpName",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select",
                type_textfield: "下拉框",
                name_textfield: "发起人",
                width: ""
            },
            {
                newline: true,
                name: "starttime",
                label: "开始时间",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: false,
                name: "endtime",
                label: "结束时间",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: 1,
                name: "conferencecontent",
                label: "会议内容",
                editor: {
                    height: "80"
                },
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "会议内容",
                width: "580"
            }]
        },
        common: {
            saveCallbackType: "toView"
        },
        link: {}
    };
    return options;
}