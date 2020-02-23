define([],
function() {

    var exports = {
        type: 'list',
        options: {
            search: {
                conditions: [{
                    newline: false,
                    name: "Title",
                    operator: "contains",
                    type: "text",
                    label: "标题",
                    syseditor: "#editor,Title,text#"
                }]
            },
            list: {
                columns: [{
                    name: "Title",
                    type: "string",
                    display: "标题",
                    name_text: "标题",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "创建时间 ",
                    name: "CreateDate",
                    name_text: " - 创建时间 - ",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "datetime",
                    type_text: "日期",
                    editorType: ""
                },
                {
                    width: "200",
                    display: "完成时间",
                    name: "CompleteTime",
                    name_text: "完成时间",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "datetime",
                    type_text: "日期",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "备注",
                    name: "Remark",
                    name_text: "备注",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
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
            type: "list",
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
            }],
            addins: {}
        },
        dataset: 'web/dataset?model=core_toDo&viewname=list'
    };
    exports.options.model = {
        name: 'core_toDo',
        title: '待办'
    };

    exports.service = function server(page) {
        page.bind('beforeShowList',
            function (e) {
                var page = e.page,
                    gridOptions = e.options;
                var column = pbc.web.helper.first(gridOptions.columns,
                    function (a) {
                        return a.name == "Title";
                    });
                if (column == null) return;
                column.render = function (r) {
                    return '<a href="javascript:void(0);" data-link="' + r.Link + '" class="todolink">' + r.Title + '</a>';
                };
                gridOptions.onAfterShowData = function () {
                    $("a.todolink", this.element).click(function () {
                        var link = $(this).attr("data-link");
                        top.openTab({
                            text: "代办任务",
                            url: link,
                            tabid: 'core_todo_form',
                            data: {
                                callback: function () {
                                    page.reload();
                                }
                            }
                        });
                    });
                };
            });

    };


    return exports;
});