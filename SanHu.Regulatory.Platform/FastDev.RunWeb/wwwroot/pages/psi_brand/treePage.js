define([],
function() {

    var exports = {
        type: 'treePage',
        options: {
            type: "treePage",
            treeFilter: {
                enabled: 1,
                showInLeft: 1,
                sourceModel: "psi_brand",
                pageUrl: "/pages/psi_brand/form.w?id=#data.id#",
                header: "品牌",
                rootText: "全部",
                sourceModel_textfield: "psi_brand",
                textField: "Name",
                parentField: "",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                sourceModel2_textfield: "psi_brand"
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
                display: "DisplaySequence",
                name: "DisplaySequence",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Logo",
                name: "Logo",
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
                display: "Description",
                name: "Description",
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
                display: "IsRecommend",
                name: "IsRecommend",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            }],
            common: {
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
                buttonsShowType: "hide",
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
        dataset: 'web/dataset?model=psi_brand&viewname=treePage'
    };
    exports.options.model = {
        name: 'psi_brand',
        title: '产品品牌'
    };

    exports.service = function service(page) {

};

    return exports;
});