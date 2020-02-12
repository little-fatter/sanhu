define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: 1,
                    name: "OrderNo",
                    label: "编号",
                    editor: {},
                    type: "autoCode",
                    type_textfield: "自动编码",
                    name_textfield: "单据编码",
                    width: ""
                },
                {
                    name: "InType",
                    type: "select",
                    label: "入库类型",
                    editor: {
                        data: [{
                            id: "in",
                            text: "盘点"
                        },
                        {
                            id: "other",
                            text: "入库"
                        }],
                        value: "other",
                        textField: "",
                        url: "",
                        valueField: ""
                    },
                    newline: 0,
                    type_textfield: "单选下拉框",
                    width: "",
                    name_textfield: "入库类型"
                },
                {
                    newline: false,
                    name: "OrderDate",
                    label: "日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker",
                    type_textfield: "日期",
                    name_textfield: "单据日期",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    name: "Details",
                    type: "ref_grid_edit",
                    label: " 编辑表格",
                    editor: {
                        grid: {
                            height: "300",
                            defaultRow: {},
                            defaultRowCount: 4,
                            title: "",
                            columns: [{
                                width: "150",
                                type: "ref",
                                align: "left",
                                name: "Product",
                                name_textfield: "产品",
                                align_textfield: "左对齐",
                                editorType: "ref_popupselect",
                                editorType_textfield: "弹出&自动完成",
                                display: "产品",
                                type_textfield: "引用类型",
                                editor: {
                                    url: "web/namedata",
                                    parms: {
                                        model: "res_product"
                                    },
                                    detailEnabled: false,
                                    detailUrl: "web/detaildata",
                                    detailParms: {
                                        model: "res_product"
                                    },
                                    valueField: "ID",
                                    textField: "ProName",
                                    css: "combobox-selector",
                                    popupselect_ismul: 1,
                                    popupselect_type: "popupselect",
                                    popupselect_url: "web/main/?model=res_product&viewtype=list",
                                    popupselect_width: "1000",
                                    popupselect_height: "700",
                                    popupselect_title: "选择： 产品",
                                    many2one: true,
                                    type: "ref_popupselect",
                                    popupselect_Type: "popup",
                                    popupselect_Type_textfield: "弹出选择",
                                    select_updatematch_source: "ProMode;Warehouse;UnitName",
                                    select_updatematch_target: "ProMode;Warehouse;UnitName"
                                }
                            },
                            {
                                width: "150",
                                type: "ref",
                                align: "left",
                                display: "仓库",
                                name: "Warehouse",
                                name_textfield: "仓库",
                                align_textfield: "左对齐",
                                editorType: "ref_select",
                                editorType_textfield: "下拉框",
                                type_textfield: "引用类型",
                                editor: {
                                    url: "web/namedata",
                                    parms: {
                                        model: "stock_warehouse"
                                    },
                                    detailEnabled: false,
                                    detailUrl: "web/detaildata",
                                    detailParms: {
                                        model: "stock_warehouse"
                                    },
                                    valueField: "ID",
                                    textField: "WarehouseName",
                                    many2one: true,
                                    type: "ref_select"
                                }
                            },
                            {
                                display: "规格型号",
                                width: "100",
                                type: "float",
                                align: "right",
                                name: "ProMode"
                            },
                            {
                                display: "计量单位",
                                width: "100",
                                type: "float",
                                align: "right",
                                name: "UnitName"
                            },
                            {
                                display: "数量",
                                width: "100",
                                type: "int",
                                align: "right",
                                name: "Quantity",
                                editorType: "int",
                                editor: {
                                    type: "int"
                                },
                                name_textfield: "数量",
                                align_textfield: "右对齐",
                                type_textfield: "数值类型",
                                editorType_textfield: "整数"
                            },
                            {
                                display: "备注",
                                width: "150",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "text"
                                },
                                name: "Remarks",
                                name_textfield: "备注",
                                align_textfield: "左对齐",
                                type_textfield: "文本型",
                                editorType: "text",
                                editorType_textfield: "单行"
                            }]
                        },
                        detailUrl: "web/main/?model=stock_indetails&viewtype=form",
                        titleEdit: "修改： 入库单明细",
                        titleAdd: "新增：入库单明细",
                        modeType: "editgrid",
                        one2many: true,
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    width: "910",
                    hideLabel: 1,
                    hideSpace: 1,
                    newline: 1,
                    type_textfield: "编辑表格",
                    name_textfield: "Details"
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        type: "text",
                        nullText: ""
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "备注",
                    width: "820"
                }],
                tab: {
                    items: []
                }
            },
            common: {
                viewType: "form",
                saveCallbackType: "toEdit"
            },
            link: {}
        },
        dataset: 'web/dataset?model=stock_in&viewname=form'
    };
    exports.options.model = {
        name: 'stock_in',
        title: '入库单'
    };

    exports.service = function server(page) {
        var isAfterSetData = false;
        page.bind('beforeShowForm',
        function(e) {
            var page = e.page;
            var op = e.options;
            var field = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Details";
            });
            if (field == null || !field.editor || !field.editor.grid || !field.editor.grid.columns) return;
            var columnProducts = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Product";
            });
            var columnQuantity = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Quantity";
            });
            var columnQuantity = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Quantity";
            });
            var columnWarehouse = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Warehouse";
            });

            if (columnProducts != null && columnProducts.editor) {
                columnProducts.totalSummary = {
                    render: function(suminf, column, cell) {
                        return '<b style="line-height: 28px;">合计：</b>';
                    },
                    align: 'right'
                };

            }

            if (columnQuantity != null && columnQuantity.editor) {
                columnQuantity.totalSummary = {
                    render: function(suminf, column, cell) {
                        return '<b style="line-height: 28px;">' + suminf.sum + '</b>';
                    },
                    align: 'right'
                };
            }

            if (columnWarehouse != null && columnWarehouse.editor) {
                columnWarehouse.editor.parms = {
                    model: "stock_warehouse",
                    filter: pbc.createFilter({
                        IsEnabled: 1
                    })
                };
            }

        });

        page.bind('formSubmit',
        function(data) {
            if (!data || !data.Details) return;
            $(data.Details).each(function() {
                if (!this.Product && !this.Warehouse) {
                    this.Status = "deleted";
                }

            });

        });
        page.bind('afterShowForm',
        function(e) {
            setTimeout(function() {
                isAfterSetData = true;
            },
            50);
            var page = e.page;
            var form = page.form;

            if (!page.formData) {
                var date = new Date();
                var dateStr = $.ligerDefaults.Grid.formatters['datetime'](date, {
                    format: "yyyy-MM-dd hh:mm"
                });
                $("[formName=OrderDate]", page.jelement).val(dateStr);
            }
            if (page.formData && page.formData.Status == "approved") {
                var bg = $('<div class="approvedbg"></div>').appendTo($(".formpanel:first", page.jelement));
                $(".mainform:first", page.jelement).width(1000);
            }
        });

        page.bind('formSubmit',
        function(data) {
            if (!data || !data.Details) return;
            $(data.Details).each(function() {
                if (!this.Product && !this.Warehouse) {
                    this.Status = "deleted";
                }

            });

        });

        page.bind('toolbarInit',
        function(e) {
            var toolbar = e.toolbar;
            var page = e.page;

            toolbar.items = toolbar.items || [];

        });

    };

    return exports;
});