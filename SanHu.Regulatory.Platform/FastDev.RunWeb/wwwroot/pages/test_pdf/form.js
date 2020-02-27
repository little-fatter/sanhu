define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "NewField1",
                    label: "字段1",
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
                    name: "NewField2",
                    label: "字段2",
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
                    name: "NewField3",
                    label: "字段3",
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
                    name: "NewField4",
                    label: "字段4",
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
            toolbar: {
                items: [
                    {
                        text: '打印',
                        id: 'myprint',
                        cls: 'ne-btn-blue'
                    }]
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
                            Name: 'pdf打印'   // 准确找到哪一个打印模板
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
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=test_pdf&viewname=form'
    };
    exports.options.model = {
        name: 'test_pdf',
        title: '测试pdf'
    };

    exports.service = function service(page) {

};

    return exports;
});