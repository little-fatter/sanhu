define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "TypeName",
                    width: 150,
                    display: "类别名",
                    type: "string"
                },
                {
                    name: "Title",
                    width: 150,
                    display: "标题",
                    type: "string"
                }]
            },
            common: {
                showList: 1,
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
                formShowType: "",
                dialogWidth: "",
                dialogHeight: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "父类别",
                name: "Parent",
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
                    textField: "Title",
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
                display: "标题",
                name: "Title",
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
                display: "类别名",
                name: "TypeName",
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
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=crm_customerType&viewname=list'
    };
    exports.options.model = {
        name: 'crm_customerType',
        title: '客户类别'
    };

    exports.service = function service(page) {

};

    return exports;
});