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
                    width: "",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: 0,
                    name: "OrderDate",
                    label: "日期",
                    editor: {
                        type: "text",
                        showHour: 0,
                        showMinute: 0,
                        showSecond: 0,
                        dateFormat: "yy-mm-dd"
                    },
                    type: "datepicker",
                    width: "200"
                },
                {
                    name: "Supplier",
                    type: "ref_popupselect",
                    label: "供应商",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "crm_supplier"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "crm_supplier"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "SupplierName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?model=crm_supplier&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 供应商",
                        many2one: true
                    },
                    newline: 1,
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    name: "Price",
                    type: "currency",
                    label: "采购价",
                    editor: {},
                    newline: 0,
                    width: ""
                },
                {
                    name: "Payment",
                    type: "currency",
                    label: "本次付款",
                    editor: {},
                    newline: 1,
                    width: ""
                },
                {
                    newline: false,
                    name: "Details",
                    label: "明细",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "150",
                                type: "ref",
                                align: "left",
                                name: "Products",
                                name_text: "产品",
                                type_text: "引用类型",
                                editorType: "ref_popupselect",
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
                                    popupselect_Type: "popupselect",
                                    select_updatematch_source: "ProMode;Warehouse;UnitName",
                                    select_updatematch_target: "ProMode;Warehouse;UnitName"
                                },
                                display: "产品"
                            },
                            {
                                display: "仓库",
                                width: "150",
                                type: "ref",
                                align: "left",
                                name: "Warehouse",
                                editorType: "ref_select",
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
                                }
                            },
                            {
                                display: "单价",
                                width: "100",
                                type: "curreny",
                                align: "right",
                                name: "UnitPrice",
                                editorType: "currency",
                                editor: {
                                    type: "currency"
                                }
                            },
                            {
                                display: "采购价",
                                width: "100",
                                type: "curreny",
                                align: "right",
                                name: "Price"
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
                                editorType: "text"
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "web/main/?model=purchase_orderdetail&viewtype=form",
                        titleEdit: "修改： 采购单明细",
                        titleAdd: "新增：采购单明细",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    width: "1060",
                    hideLabel: 1
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
                    width: "970",
                    fieldExtend: "{\"style\":\"margin:2px;\"}"
                }]
            },
            common: {
                saveCallbackType: "toEdit"
            },
            link: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=purchase_order&viewname=form'
    };
    exports.options.model = {
        name: 'purchase_order',
        title: '采购单'
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
            var columnUnitPrice = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "UnitPrice";
            });
            var columnQuantity = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Quantity";
            });
            var columnWarehouse = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Warehouse";
            });
            var columnPrice = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Price";
            });

            if (columnProducts != null && columnProducts.editor) {
                columnProducts.totalSummary = {
                    render: function(suminf, column, cell) {
                        return '<b style="line-height: 28px;">合计：</b>';
                    },
                    align: 'right'
                };

            }
            if (columnUnitPrice != null && columnUnitPrice.editor) {
                columnUnitPrice.editor.onChanged = function(e) {
                    var textbox = this;
                    var grid = textbox.get('host_grid');
                    var rowdata = textbox.get('host_grid_row');
                    updatePrice(grid, rowdata);

                };

            }
            if (columnQuantity != null && columnQuantity.editor) {
                columnQuantity.editor.onChanged = function(e) {
                    var textbox = this;
                    var grid = textbox.get('host_grid');
                    var rowdata = textbox.get('host_grid_row');
                    updatePrice(grid, rowdata);
                };
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
            if (columnPrice != null) {
                columnPrice.totalSummary = {
                    render: function(suminf, column, cell) {
                        return '<b style="line-height: 28px;">' + pbc.getCurrency(suminf.sum) + '</b>';
                    },
                    align: 'right'
                };
            }
            function updatePrice(grid, rowdata) {
                if (page.formData) {
                    if (!isAfterSetData) return;
                }
                var value = rowdata.Quantity || 0;
                grid.update(rowdata, {
                    Price: parseInt(value) * parseFloat(rowdata.UnitPrice || 0)
                });
                grid.updateTotalSummary();

                var priceEditor = page.form.getEditor("Price");
                if (priceEditor) {
                    var price = 0;
                    $(grid.rows).each(function() {
                        price += this.Price || 0;
                    });
                    priceEditor.setValue(price);
                }
            }

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

            if (page.formData && (page.formData.Status == "approved" || page.formData.Status == "void")) {
                toolbar.items.splice(0, 1);

            }
        });

    };

    return exports;
});