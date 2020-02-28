define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "TaskType",
                    display: "任务类型",
                    type: "string",
                    name_text: "任务类型",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "EventInfoId",
                    display: "事件ID",
                    type: "string"
                },
                {
                    name: "WorkflowtaskID",
                    display: "工作流任务Id",
                    type: "string",
                    name_text: "工作流任务Id",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "MainHandler",
                    display: "主办人员",
                    type: "string"
                },
                {
                    name: "CoOrganizer",
                    display: "协办人员",
                    type: "string"
                },
                {
                    name: "WorkAddress",
                    display: "工作地址",
                    type: "string"
                },
                {
                    name: "TaskContent",
                    display: "任务描述",
                    type: "string"
                },
                {
                    name: "AssignUsers",
                    display: "分配用户",
                    type: "ref"
                },
                {
                    width: "150",
                    display: " 状态 ",
                    name: "Status",
                    name_text: " - 状态 - ",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "wfstatus",
                    type_text: "工作流状态",
                    editorType: ""
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
                searchInputShowType: "right",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "任务执行人",
                name: "AssignUsers",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "user"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "user"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Name",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=user&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： frameworkuser",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "事件ID",
                name: "EventInfoId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "主办人员",
                name: "MainHandler",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "协办人员",
                name: "CoOrganizer",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "工作地址",
                name: "WorkAddress",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "任务描述",
                name: "TaskContent",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "发起时间",
                name: "InitiationTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "期望完成时间",
                name: "ExpectedCompletionTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "任务状态",
                name: "TaskStatus",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "拒绝原因",
                name: "RejectReason",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "任务编号",
                name: "Tasknumber",
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
                display: "完成时间",
                name: "CompleteTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
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
                display: "本地链接",
                name: "LocalLinks",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "远程链接",
                name: "RemoteLinks",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否Root",
                name: "IsRootTask",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "表单准备",
                name: "FormPreparation",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案件id",
                name: "CaseID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "工作流任务Id",
                name: "WorkflowtaskID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "任务类型",
                name: "TaskType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "AssignUsersID",
                name: "AssignUsersID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=work_task&viewname=list'
    };
    exports.options.model = {
        name: 'work_task',
        title: '任务'
    };

    exports.service = function service(page) {

};

    return exports;
});