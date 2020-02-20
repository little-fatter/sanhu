define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "attach_type",
                    label: "附件类型",
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
                    newline: false,
                    name: "url",
                    label: "附件地址",
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
                    newline: true,
                    name: "thumbnail",
                    label: "缩略图地址",
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
                    newline: false,
                    name: "CorrelationID",
                    label: "关联id",
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
                    newline: true,
                    name: "Remark",
                    label: "备注",
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
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            toolbar: {
                items: [
                    { text: '打印报表', id: 'myprint', cls: 'ne-btn-blue' }
                ]
            },
            //自定义打印按钮
            onmyprint: function () {
                var g = this, p = this.options;
                var context = p.id; //单据ID
                var templates = [];
                pbc.ajax({
                    url: pbc.toUrl('web/listdata/'),
                    data: {
                        model: 'core_printTemplate',
                        filter: pbc.createFilter({
                            ModelName: p.model.name,
                            Name: '附件打印'   // 准确找到哪一个打印模板
                        })
                    },
                    success: function (data) {
                        if (data.statusCode == "2" || data.statusCode == "3") {
                            pbc.showError(data.message);
                            return;
                        }

                        templates = data;
                        if (!templates || !templates.length) {
                            pbc.showError("打印模板未定义！");
                        } else {
                            pbc.openNew({
                                url: pbc.toUrl('web/preview?rnd=') + new Date().getTime(),
                                parms: {
                                    templateId: templates[0].ID,
                                    context: context
                                }
                            });
                        }
                    }
                });

            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=attachment&viewname=form'
    };
    exports.options.model = {
        name: 'attachment',
        title: '附件'
    };

    exports.service = function service(page) {

};

    return exports;
});