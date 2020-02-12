define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "CreateUser",
                    display: " - 创建人 - ",
                    type: "string",
                    name_text: " - 创建人 - ",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
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
                display: "请假类型",
                name: "Leavetype",
                editor: {
                    url: "web/namedata",
                    parms: {
                        model: "case_qingjiaType"
                    },
                    detailEnabled: true,
                    detailUrl: "web/detaildata",
                    detailParms: {
                        model: "case_qingjiaType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=case_qingjiaType&viewtype=list",
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
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=case_qingjia&viewname=list_b'
    };
    exports.options.model = {
        name: 'case_qingjia',
        title: '请假单'
    };

    exports.service = function service(page) {

};

    return exports;
});