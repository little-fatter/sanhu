define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: false,
                    name: "WarehouseName",
                    label: "仓库名称",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: true,
                    name: "WarehouseNo",
                    label: "仓库编号",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    name: "Manager",
                    type: "ref_popupselect",
                    label: "仓库管理员",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "core_user"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "core_user"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "RealName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "/web/main/?model=core_user&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 用户",
                        many2one: true
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "IsEnabled",
                    label: "是否启用",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox"
                }]
            },
            link: {},
            common: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=stock_warehouse&viewname=form'
    };
    exports.options.model = {
        name: 'stock_warehouse',
        title: '仓库'
    };

    exports.service = function service(page) {

        page.bind('afterShowForm',
        function(e) {
            var page = e.page;
            var form = page.form;

            var jpanel = $('<div></div>').insertBefore($(".l-panel-bwarp", form.element).parent());

            var jbtn = $('<a class="ne-btn ne-btn-blue">选择数据</a>').appendTo(jpanel);

            jbtn.click(function() {
                var dialog = null;

                var fieldName = "orderdetails"; //子模型字段名
                var modelName = "res_prodcut"; //目标模型
                var textField = "ProductnNme"; //目标模型标题字段名
                var viewname = "list"; //视图名
                var dialogTitle = "选择窗口标题"; //选择窗口标题

                var options = {
                    url: "web/main/?model=" + modelName + "&viewtype=list&viewname=" + viewname,
                    top: 100,
                    width: 800,
                    height: 500,
                    title: dialogTitle,
                    data: {
                        selectorType: true,
                        singleMode: false,
                        isGridEditor: true,
                        //是否属于表格编辑器
                        filter: [],
                        valueField: "ID",
                        textField: textField,
                        callback: function(selecteds) {
                            var data = [];
                            for (var i = 0; i < selecteds.length; i++) {
                                data.push({
                                    product: [selecteds[i]["ID"], selecteds[i][textField]]
                                });
                            }

                            page.form.getEditor(fieldName).addRows(data);

                            setTimeout(function() {
                                dialog && dialog.close();
                            },
                            50);
                        }
                    }
                };
                pbc.preOptions(options,
                function() {
                    dialog = $.ligerDialog.open(options);
                });
            });

        });

    };

    return exports;
});