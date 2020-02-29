define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "Title",
                    label: "标题",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 0,
                    name: "ArticleCategory",
                    label: "分类",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        sourceFilter: {
                            rules: [{
                                field: "DicID",
                                op: "equal",
                                value: "1cc3b197-83c5-4914-8847-047e494cac75",
                                type: "select"
                            }],
                            op: "and"
                        },
                        textField: "Title",
                        many2one: true,
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    type: "ref_select",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "IsPic",
                    label: "是否轮播",
                    editor: {},
                    type: "checkbox",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "ImageUrl",
                    label: "图片地址",
                    editor: {},
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "Publisher",
                    label: "发布者",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "ArticleContent",
                    label: "内容",
                    editor: {},
                    type: "htmlEditor",
                    width: "800",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=cms_article&viewname=form'
    };
    exports.options.model = {
        name: 'cms_article',
        title: '文章'
    };

    exports.service = function service(page) {

};

    return exports;
});