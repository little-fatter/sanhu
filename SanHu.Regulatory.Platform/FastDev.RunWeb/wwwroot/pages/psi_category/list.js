define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Name",
                    display: "分类名",
                    type: "string",
                    name_text: "Name",
                    width: "",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: "",
                    exp: ""
                }],
                title: "",
                url: "",
                usePager: 1,
                checkbox: 1,
                height: "100%",
                sortName: "",
                sortOrder: "",
                downViewEnabled: 0,
                downViewHeight: "",
                downViewReadonly: 0,
                hideOpColumn: 1,
                hideOpEditColumn: 0,
                hideOpDeleteColumn: 0,
                downViewName: "",
                downPageUrl: ""
            },
            common: {
                formShowType: "dialog",
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
                buttonsShowType: "hide",
                searchBoxShowType: "selectBox",
                searchAdShowType: "hide",
                formViewName: "",
                openParm: ""
            },
            treeFilter: {
                enabled: 0,
                header: "",
                showInLeft: 0,
                rootText: "",
                filterField: "Name",
                custom: 0,
                url: "",
                sourceModel: "psi_category",
                parentField: "ParentCategoryID",
                textField: "Name",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                sourceModel_textfield: "psi_category",
                filter: {
                    rules: [{
                        field: "ParentCategoryId",
                        op: "equal",
                        value: "0",
                        type: "select"
                    }],
                    op: "and"
                },
                filterField_textfield: "Name"
            },
            type: "list",
            filterFields: [{
                display: "ID",
                name: "ID",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "Name",
                name: "Name",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Icon",
                name: "Icon",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "DisplaySequence",
                name: "DisplaySequence",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ParentCategoryId",
                name: "ParentCategoryId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Depth",
                name: "Depth",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "Path",
                name: "Path",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "RewriteName",
                name: "RewriteName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "HasChildren",
                name: "HasChildren",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "TypeId",
                name: "TypeId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CommisRate",
                name: "CommisRate",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Meta_Title",
                name: "Meta_Title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Meta_Description",
                name: "Meta_Description",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Meta_Keywords",
                name: "Meta_Keywords",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "IsDeleted",
                name: "IsDeleted",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {
                items: [{
                    name: "表格扩展",
                    title: "表格扩展(支持表格树配置)",
                    value: {
                        title: "配置表格树",
                        value: {
                            tree: {
                                idField: "ID",
                                parentIDField: "ParentCategoryId",
                                columnName: "Name"
                            }
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=psi_category&viewname=list'
    };
    exports.options.model = {
        name: 'psi_category',
        title: '产品分类'
    };

    exports.service = function service(page) {

};

    return exports;
});