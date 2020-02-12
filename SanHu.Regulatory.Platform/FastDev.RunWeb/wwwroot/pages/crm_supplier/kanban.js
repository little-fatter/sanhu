define([],
function() {

    var exports = {
        type: 'kanban',
        options: {
            list: {
                columns: [{
                    name: "QQ",
                    display: "QQ",
                    type: "string"
                },
                {
                    name: "Phone",
                    display: "手机",
                    type: "string"
                },
                {
                    name: "SupplierName",
                    display: "供应商名称",
                    type: "string"
                },
                {
                    name: "SupplierNo",
                    display: "供应商编号",
                    type: "string"
                },
                {
                    name: "SupplierCategory",
                    display: "供应商类别",
                    type: "ref"
                },
                {
                    name: "Contracts",
                    display: "供应商联系人",
                    type: "ref"
                }]
            },
            common: {
                viewType: "kanban",
                viewtype: "list",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 1,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formShowType: "",
                formShowPosition: "",
                dialogWidth: "900",
                dialogHeight: "700"
            },
            link: {},
            kanban: {
                template: "<div class=\"kanban-item\"><input class=\"configcode\" type=\"hidden\" data-config=\"eyJpbWFnZUZpZWxkIjoiU3VwcGxpZXJJbWFnZSIsInRpdGxlRmllbGQiOiJTdXBwbGllck5hbWUiLCJ0ZXh0RmllbGRzIjoiUVE7UGhvbmU7QWRkcmVzcyIsImVtYWlsRmllbGRzIjoiIiwibGlua0ZpZWxkcyI6IiJ9\"/><div class=\"kanaban-imagepanel\"><a class=\"kanaban-action\" data-id=\"{ID}\"><img class=\"kanaban-image\" src=\"{SupplierImage}\"/></a></div><div class=\"kanban-details\"><h4><a data-id=\"{ID}\">{SupplierName}</a><a></a></h4><div style=\"{QQ:visual}\">QQ：{QQ}</div><div style=\"{Phone:visual}\">手机：{Phone}</div><div style=\"{Address:visual}\">地址：{Address}</div></div></div>"
            },
            calendar: {
                titleField: "QQ",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {}
        },
        dataset: 'web/dataset?model=crm_supplier&viewname=kanban'
    };
    exports.options.model = {
        name: 'crm_supplier',
        title: '供应商'
    };

    exports.service = {
        "content": "(function ($)\n{\n\n    var api = function ()\n    {\n\n    };\n\n    $.extend(api.prototype,\n    {\n        getHandler: function (name)\n        {\n            if (name == \"toolbarInit\")\n            {\n                return this.toolbarInit;\n            }\n        },\n\n        toolbarInit: function (e)\n        {\n            var page = e.page, viewType = e.viewType, toolbar = e.toolbar;\n            var self = this;\n\n            page.addEvent(\"typeManage\", function ()\n            {\n                $.ligerDialog.open({\n                    title: '供应商类别管理',\n                    url: pbc.toUrl('web/main?mode=crm_supplierType&viewtype=list'),\n                    showMax: false,\n                    showToggle: true,\n                    showMin: false,\n                    isResize: true,\n                    slide: false,\n                    width: 700,\n                    height: 500,\n                    data: {\n                        callback: function (data,e)\n                        {\n                             page.treeFilter && page.treeFilter.reload();\n                        }\n                    }\n                });\n            });\n        },\n         \n\n    });\n\n\n    pbc.web.modeApi.crm_supplier = new api();\n\n})(jQuery);\n"
    };

    return exports;
});