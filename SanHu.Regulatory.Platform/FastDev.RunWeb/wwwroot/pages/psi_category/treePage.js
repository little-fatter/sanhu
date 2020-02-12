define([],
function() {

    var exports = {
        type: 'treePage',
        options: {
            type: "treePage",
            treeFilter: {
                enabled: 1,
                showInLeft: 1,
                sourceModel: "psi_category",
                pageUrl: "",
                header: "",
                rootText: "",
                sourceModel_textfield: "psi_category",
                textField: "Name",
                parentField: "ParentCategoryID",
                sourceModel2: "psi_category",
                parentField2: "ParentCategoryID",
                refSourceField: "ID",
                textField2: "Name",
                sourceModel2_textfield: "psi_category"
            },
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
            }],
            common: {
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 1,
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
                formShowType: "",
                dialogWidth: "",
                dialogHeight: "",
                openParm: ""
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=psi_category&viewname=treePage'
    };
    exports.options.model = {
        name: 'psi_category',
        title: '产品分类'
    };

    exports.service = function service(page) {

};

    return exports;
});