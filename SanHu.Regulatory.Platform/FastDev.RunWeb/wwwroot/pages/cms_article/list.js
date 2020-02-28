define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Title",
                    display: "标题",
                    type: "string"
                },
                {
                    name: "ArticleCategory",
                    display: "分类",
                    type: "ref"
                },
                {
                    name: "IsPic",
                    display: "是否轮播",
                    type: "string"
                },
                {
                    name: "ImageUrl",
                    display: "图片地址",
                    type: "string"
                },
                {
                    name: "Publisher",
                    display: "发布者",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "分类",
                name: "ArticleCategory",
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
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
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
                display: "内容",
                name: "ArticleContent",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否轮播",
                name: "IsPic",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "图片地址",
                name: "ImageUrl",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "发布者",
                name: "Publisher",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ArticleCategoryID",
                name: "ArticleCategoryID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=cms_article&viewname=list'
    };
    exports.options.model = {
        name: 'cms_article',
        title: '文章'
    };

    exports.service = function service(page) {

};

    return exports;
});