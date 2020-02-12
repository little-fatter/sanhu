define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CustomerName",
                    display: "客户名称",
                    type: "string",
                    name_text: "客户名称",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "CustomerNo",
                    display: "客户编号",
                    type: "string",
                    name_text: "客户编号",
                    width: "220",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "CustomerCategory",
                    display: "客户类别",
                    type: "ref",
                    name_text: "客户类别",
                    width: "160",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                }]
            },
            common: {
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 1,
                hideToolbar: 0,
                hideViewSwitch: 0,
                formShowType: "tab",
                formShowPosition: "",
                dialogWidth: "800",
                dialogHeight: "700",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {
                template: "<div class=\"kanban-item\"><input class=\"configcode\" type=\"hidden\" data-config=\"eyJpbWFnZUZpZWxkIjoiQ3VzdG9tZXJJbWFnZSIsInRpdGxlRmllbGQiOiJDdXN0b21lck5hbWUiLCJ0ZXh0RmllbGRzIjoiQWRkcmVzcztQaG9uZSIsImVtYWlsRmllbGRzIjoiIiwibGlua0ZpZWxkcyI6IiJ9\"/><div class=\"kanaban-imagepanel\"><a class=\"kanaban-action\" data-id=\"{ID}\"><img class=\"kanaban-image\" src=\"{CustomerImage}\"/></a></div><div class=\"kanban-details\"><h4><a data-id=\"{ID}\">{CustomerName}</a><a></a></h4><div style=\"{Address:visual}\">地址：{Address}</div><div style=\"{Phone:visual}\">手机：{Phone}</div></div></div>"
            },
            calendar: {
                titleField: "CustomerImage",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            treeFilter: {
                enabled: 1,
                rootText: "全部",
                filterField: "CustomerCategory",
                sourceMode: "crm_customerType",
                parentField: "",
                textField: "",
                sourceMode2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                filterField_textfield: "客户类别"
            },
            filterFields: [{
                display: "客户等级",
                name: "Customerlevel",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customerlevel"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_customerlevel"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Classname",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=crm_customerlevel&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户等级",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户类别",
                name: "CustomerCategory",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customerType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_customerType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "TypeName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=crm_customerType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户类别",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户图像",
                name: "CustomerImage",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户编号",
                name: "CustomerNo",
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
                display: "QQ",
                name: "QQ",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户名称",
                name: "CustomerName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "手机",
                name: "Phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CustomerLevelID",
                name: "CustomerLevelID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "CustomerCategoryID",
                name: "CustomerCategoryID",
                editor: {
                    type: "text"
                },
                type: "text"
            }]
        },
        dataset: 'web/dataset?model=crm_customer&viewname=list'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    exports.service = {
        "content": "(function ($)\n{\n\n    var api = function ()\n    {\n\n    };\n\n    $.extend(api.prototype,\n    {\n        getHandler: function (name)\n        {\n            if (name == \"toolbarInit\")\n            {\n                return this.toolbarInit;\n            }\n        },\n\n        toolbarInit: function (e)\n        {\n            var page = e.page, viewType = e.viewType, toolbar = e.toolbar;\n            var self = this;\n\n            page.addEvent(\"typeManage\", function ()\n            {\n                var d = $.ligerDialog.open({\n                    title: '客户类别管理',\n                    url: pbc.toUrl('web/main?mode=crm_customerType&viewtype=list'),\n                    showMax: false,\n                    showToggle: true,\n                    showMin: false,\n                    isResize: true,\n                    slide: false,\n                    width: 700,\n                    height: 500,\n                    data: {\n                        callback: function (data,e)\n                        {\n                             page.treeFilter && page.treeFilter.reload();\n                        },\n                        close : function(){\n                           d.close();\n                        }\n                    }\n                });\n            });\n          \n            page.addEvent(\"levelManage\", function ()\n            {\n                 var d =$.ligerDialog.open({\n                    title: '客户等级管理',\n                    url: pbc.toUrl('web/main?mode=crm_customerlevel&viewtype=list'),\n                    showMax: false,\n                    showToggle: true,\n                    showMin: false,\n                    isResize: true,\n                    slide: false,\n                    width: 700,\n                    height: 500,\n                    data: {\n                        callback: function (data,e)\n                        {\n                             page.treeFilter && page.treeFilter.reload();\n                        },\n                        close : function(){\n                           d.close();\n                        }\n                    }\n                });\n            });\n        },\n         \n\n    });\n\n\n    pbc.web.modeApi.crm_customer = new api();\n\n})(jQuery);\n"
    };

    return exports;
});