define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    name: "Customer",
                    type: "ref_popupselect",
                    label: "客户",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "crm_customer"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "crm_customer"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "CustomerName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?model=crm_customer&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 客户",
                        many2one: true
                    },
                    newline: 0,
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: 1,
                    name: "OrderDate",
                    label: "日期",
                    editor: {
                        showHour: 1,
                        showMinute: 1,
                        showSecond: 0,
                        dateFormat: ""
                    },
                    type: "datepicker",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: false,
                    name: "OrderNo",
                    label: "单据编号",
                    editor: {},
                    type: "autoCode",
                    width: ""
                },
                {
                    name: "Price",
                    type: "currency",
                    label: "销售金额 ",
                    editor: {},
                    newline: 1,
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    name: "Payment",
                    type: "currency",
                    label: "本期付款",
                    editor: {},
                    newline: 0,
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    name: "Arrears",
                    type: "currency",
                    label: "本次欠款",
                    editor: {},
                    newline: 0,
                    width: "",
                    readonly: 1
                },
                {
                    newline: false,
                    name: "Details",
                    label: "明细",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "160",
                                type: "ref",
                                align: "left",
                                display: "产品",
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
                                    popupselect_Type: "",
                                    select_updatematch_source: "ProMode;Warehouse;UnitName;ProPrice",
                                    select_updatematch_target: "ProMode;Warehouse;UnitName;UnitPrice"
                                },
                                name: "Products",
                                editorType: "ref_popupselect"
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
                                width: "80",
                                type: "curreny",
                                align: "right",
                                display: "单价",
                                name: "UnitPrice",
                                editor: {
                                    type: "number"
                                }
                            },
                            {
                                display: "总价",
                                width: "80",
                                type: "curreny",
                                align: "right",
                                name: "Price",
                                editorType: ""
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "web/main/?model=sales_orderdetail&viewtype=form",
                        titleEdit: "修改： 销售订单明细",
                        titleAdd: "新增：销售订单明细",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    width: "950",
                    hideLabel: 1
                },
                {
                    newline: true,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        type: "text",
                        nullText: ""
                    },
                    type: "text",
                    width: "800"
                }]
            },
            common: {
                saveCallbackType: "dialog"
            },
            link: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=sales_order&viewname=form'
    };
    exports.options.model = {
        name: 'sales_order',
        title: '销售订单'
    };

    exports.service = function server(page) {
        var isAfterSetData = false;

        var LODOP;

        function hasRights(id) {
            var pageOp = page.options;
            if (pageOp.userdata && pageOp.userdata.rights && pageOp.userdata.rights['fun'] && pageOp.userdata.rights['fun']['extends']) {
                for (var i = 0; i < pageOp.userdata.rights['fun']['extends'].length; i++) {
                    if (pageOp.userdata.rights['fun']['extends'][i].id == id) return true;
                }
            }
            return false;
        }

        page.bind('beforeSave',
        function(e) {
            var form = page.form;
            var grid = form.getEditor("Details");
            if (grid && grid.endEdit) {
                grid.endEdit();
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

        page.bind('beforeShowForm',
        function(e) {

            var page = e.page;
            var op = e.options;
            var fieldPrice = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Price";
            });
            var fieldPayment = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Payment";
            });
            var fieldCustomer = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Customer";
            });
            var field = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Details";
            });
            if (field == null || !field.editor || !field.editor.grid || !field.editor.grid.columns) return;
            var columnProducts = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Products";
            });
            var columnUnit = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Unit";
            });
            var columnUnitPrice = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "UnitPrice";
            });
            var columnQuantity = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Quantity";
            });

            var columnPrice = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Price";
            });
            var columnWarehouse = pbc.web.helper.first(field.editor.grid.columns,
            function(a) {
                return a.name == "Warehouse";
            });

            if (fieldCustomer != null) {
                fieldCustomer.afterContent = "<li style='margin-left:2px;'><a class='ne-btn btnrepayment'>应收款查询</a></li>";
            }

            if (columnProducts != null) {
                columnProducts.display = "产品";
            }
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

            if (columnPrice != null) {
                columnPrice.totalSummary = {
                    render: function(suminf, column, cell) {
                        return '<b style="line-height: 28px;">' + pbc.getCurrency(suminf.sum) + '</b>';
                    },
                    align: 'right'
                };
            }

        });

        page.bind('afterShowForm',
        function(e) {
            var page = e.page;
            var form = page.form;
            $(".mainform:first", page.jelement).width(1000);

            $(".mainform .btnrepayment", page.jelement).click(function() {

                var customerEditor = form.getEditor("Customer");
                var customerName = customerEditor.getText();
                if (!customerName) return;
                var searchBind = {
                    CustomerName: customerName
                };

                searchBind = new pbc.base64().encode(JSON.stringify(searchBind));
                top.openTab('/web/main?model=v_arrears&viewtype=list&searchbind=' + searchBind, 'v_arrears', '客户总欠款')

            });

            $("[formName=Price]", page.jelement).attr("readonly", true);
            if (!page.formData) {
                var date = new Date();

                var dateStr = $.ligerDefaults.Grid.formatters['datetime'](date, {
                    format: "yyyy-MM-dd hh:mm"
                });
                $("[formName=OrderDate]", page.jelement).val(dateStr);

                var grid = form.getEditor("Details");
                if (grid && grid.set) {
                    var rows = [];
                    for (var i = 0; i < 4; i++) {
                        rows.push({});
                    }
                    grid.set('data', {
                        Records: rows,
                        Total: 4
                    });
                }
            }
            setTimeout(function() {
                isAfterSetData = true;
            },
            50);
            if (page.formData && page.formData.Status == "approved") {
                var bg = $('<div class="approvedbg"></div>').appendTo($(".formpanel:first"));

                form.setVisible("ArrearsHistory", false);
            }
            if (page.formData && page.formData.Status == "void") {
                var bg = $('<div class="voidbg"></div>').appendTo($(".formpanel:first"));

                form.setVisible("ArrearsHistory", false);
            }

        });

        page.bind('toolbarInit',
        function(e) {
            var toolbar = e.toolbar;
            var page = e.page;
            var pageOp = page.options;

            toolbar.items = toolbar.items || [];

            if (page.formData && (page.formData.Status == "approved" || page.formData.Status == "void")) {
                toolbar.items.splice(0, 1);

            } else {
                if (hasRights("approved")) {
                    toolbar.items.push({
                        text: '保存并审批',
                        id: 'approved'
                    });

                }
                if (hasRights("printorder")) {
                    toolbar.items.push({
                        text: '保存并打印',
                        id: 'printorder'
                    });
                }

                page.addEvent("approved",
                function() {
                    page.form_save(function(result) {
                        if (result.statusCode == "2") {
                            top.pbc.tips(2, result.message);
                            return;
                        } else if (result.statusCode == "3") {
                            pbc.showError(result.message);
                            return;
                        }
                        function onSave() {
                            if (!result.id) return;
                            pbc.ajax({
                                url: '/web/api/approved',
                                data: {
                                    context: result.id,
                                    model: 'sales_order'
                                },
                                success: function(r) {

                                    if (r.statusCode == "1") {
                                        top.pbc.tips(1, '审批成功');

                                        new pbc.web.init({
                                            viewType: 'form',
                                            model: page.getQueryStringByName("model"),
                                            viewName: pageOp.viewName || page.getQueryStringByName("viewName"),
                                            formContext: result.id,
                                            renderTo: pageOp.renderTo,
                                            isView: false,
                                            onLoaded: page._clearBody
                                        }).run();
                                    } else if (r.statusCode == "2") {
                                        top.pbc.tips(2, r.message);
                                    } else if (r.statusCode == "3") {
                                        pbc.showError(r.message);
                                    }
                                }
                            });
                        }
                        if (page.callback) {
                            page.callback();
                        }
                        onSave();
                    });
                });

                page.addEvent("printorder",
                function() {

                    function previewprint(id) {

                        var templates = [];
                        pbc.ajax({
                            url: pbc.toUrl('web/listdata/'),
                            data: {
                                model: 'core_printTemplate',
                                filter: pbc.createFilter({
                                    ModelName: 'sales_order'
                                })
                            },
                            success: function(data) {
                                if (data.statusCode == "2") {
                                    pbc.tipsInTop(2, data.message);
                                    return;
                                } else if (data.statusCode == "3") {
                                    pbc.showError(data.message);
                                    return;
                                }
                                templates = data;
                                if (!templates || !templates.length) {
                                    pbc.tipsInTop(2, "打印模板未定义！");
                                } else {
                                    openNew(templates[0]);
                                }
                            }
                        });

                        function openNew(data) {
                            pbc.openNew({
                                url: pbc.toUrl('web/preview?rnd=') + new Date().getTime() + "&appid=" + pbc.getAppId(),
                                parms: {
                                    templateId: data.ID,
                                    context: id
                                }
                            });
                        }
                    }
                    page.form_save(function(result) {
                        if (result.statusCode == "2") {
                            top.pbc.tips(2, result.message);
                            return;
                        } else if (result.statusCode == "3") {
                            pbc.showError(result.message);
                            return;
                        }
                        function onSave() {
                            if (!result.id) return;
                            pbc.web.setCurrent({
                                id: result.id
                            });
                            new pbc.web.init({
                                viewType: 'form',
                                isView: false,
                                onLoaded: page._clearBody
                            }).run();
                            previewprint(result.id);
                        }
                        if (page.callback) {
                            page.callback();
                        }
                        onSave();
                    });

                });
            }

        });
    };

    return exports;
});