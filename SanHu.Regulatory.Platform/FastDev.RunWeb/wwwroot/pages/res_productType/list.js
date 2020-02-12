define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                tree: {
                    columnName: "TypeName",
                    idField: "ID",
                    parentIDField: "ParentID"
                },
                columns: [{
                    name: "TypeName",
                    display: "类型名",
                    type: "string",
                    name_text: "类型名",
                    width: "400",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    width: "150",
                    display: "类型编码",
                    name: "Typecode",
                    name_text: "类型编码",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                }]
            },
            common: {
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                formShowType: "dialog",
                formShowPosition: "self",
                saveCallbackType: "toAdd",
                dialogWidth: "400",
                dialogHeight: "300"
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "TypeName",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            filterFields: [{
                display: "父类别",
                name: "Parent",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_productType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_productType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "TypeName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_productType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 物品类别",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "类型名",
                name: "TypeName",
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
                display: "类型编码",
                name: "Typecode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ParentID",
                name: "ParentID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            type: "list",
            addins: {
                items: [{
                    name: "表格扩展",
                    title: "表格扩展(支持表格树配置)",
                    value: {
                        title: "配置表格树",
                        value: {
                            tree: {
                                idField: "ID",
                                parentIDField: "ParentID",
                                columnName: "TypeName"
                            }
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=res_productType&viewname=list'
    };
    exports.options.model = {
        name: 'res_productType',
        title: '物品类别'
    };

    exports.service = function service(page) {

};

    return exports;
});