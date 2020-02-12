define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    width: "150",
                    display: "门店名",
                    name: "WarehouseName",
                    name_text: "门店名",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型"
                },
                {
                    width: "150",
                    display: "门店管理员",
                    name: "WarehouseManager",
                    name_text: "门店管理员",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "ref",
                    type_text: "引用类型"
                },
                {
                    width: "150",
                    display: "备注",
                    name: "Remark",
                    name_text: "备注",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型"
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
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "门店管理员",
                name: "WarehouseManager",
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
                display: "门店名",
                name: "WarehouseName",
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
                display: "标题",
                name: "Title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "排序",
                name: "SortNo",
                editor: {
                    type: "int"
                },
                type: "int"
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
                display: "备注",
                name: "Remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "WarehouseManagerID",
                name: "WarehouseManagerID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            search: {
                fields: [{
                    label: "标题",
                    type: "text",
                    editor: {},
                    name: "Title",
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
            addins: {}
        },
        dataset: 'web/dataset?model=res_store&viewname=list'
    };
    exports.options.model = {
        name: 'res_store',
        title: '门店'
    };

    exports.service = function service(page) {

};

    return exports;
});