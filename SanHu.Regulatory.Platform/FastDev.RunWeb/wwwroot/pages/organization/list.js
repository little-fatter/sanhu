define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Id",
                    display: "Id",
                    type: "string"
                },
                {
                    name: "Name",
                    display: "名称",
                    type: "string",
                    name_text: "Name",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "Level",
                    display: "层级",
                    type: "number",
                    name_text: "Level",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    editorType: ""
                },
                {
                    name: "Remark",
                    display: "Remark",
                    type: "string"
                },
                {
                    name: "Latitude",
                    display: "Latitude",
                    type: "string"
                },
                {
                    name: "Longitude",
                    display: "Longitude",
                    type: "string"
                }],
                title: "",
                url: "",
                usePager: 1,
                checkbox: 0,
                height: "100%",
                sortName: "",
                sortOrder: "",
                downViewEnabled: 0,
                downViewHeight: "",
                downViewReadonly: 1,
                hideOpColumn: 0,
                hideOpEditColumn: 0,
                hideOpDeleteColumn: 0,
                downViewName: "",
                downPageUrl: ""
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
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            treeFilter: {
                enabled: 1,
                header: "组织",
                showInLeft: 0,
                rootText: "全部单位",
                custom: 0,
                url: "/web/TreeData/",
                sourceModel: "organization",
                sourceModel_textfield: "organization",
                parentField: "ParentId",
                textField: "Name",
                sourceModel2: "organization",
                parentField2: "ParentId",
                refSourceField: "Id",
                textField2: "Name",
                sourceModel2_textfield: "organization",
                filterField_textfield: "Id",
                filterField: "Id"
            },
            type: "list",
            filterFields: [{
                display: "Id",
                name: "Id",
                editor: {
                    type: "string"
                },
                type: "string"
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
                display: "ParentId",
                name: "ParentId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "TenantId",
                name: "TenantId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Level",
                name: "Level",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "AreaId",
                name: "AreaId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Remark",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Latitude",
                name: "Latitude",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Longitude",
                name: "Longitude",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=organization&viewname=list'
    };
    exports.options.model = {
        name: 'organization',
        title: 'frameworkorganization'
    };

    exports.service = function service(page) {

};

    return exports;
});