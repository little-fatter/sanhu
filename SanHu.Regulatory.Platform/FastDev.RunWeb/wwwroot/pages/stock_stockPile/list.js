define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "StoreHouse",
                    display: "所在仓库",
                    type: "ref",
                    name_text: "所在仓库",
                    width: "150",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    name: "Product",
                    display: "产品",
                    width: "120",
                    type: "ref"
                },
                {
                    name: "ProMode",
                    display: "规格型号",
                    width: "120"
                },
                {
                    name: "UnitName",
                    display: "单位",
                    width: "120"
                },
                {
                    name: "Quantity",
                    display: "数量",
                    type: "float",
                    width: "120",
                    align: "right"
                },
                {
                    width: "120",
                    display: "盘点数量",
                    name: "QuantityFinal",
                    align: "right",
                    align_textfield: "右对齐",
                    type: "float",
                    type_text: "数值类型"
                }],
                title: "",
                usePager: 1,
                height: "100%"
            },
            common: {
                viewType: "list",
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "right",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "StoreHouse",
                startField: "FirstEnterDate",
                endField: "FirstEnterDate"
            },
            report: {},
            search: {
                fields: [{
                    label: "所在仓库",
                    type: "ref_popupselect",
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
                        sourceFilter: null,
                        textField: "WarehouseName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?model=stock_warehouse&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 仓库",
                        many2many: true
                    },
                    name: "StoreHouse",
                    name_text: "所在仓库",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "150",
                    type_text: "弹出&自动完成"
                },
                {
                    label: "产品",
                    type: "ref_popupselect",
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
                        sourceFilter: null,
                        textField: "ProName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?model=res_product&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 产品",
                        many2many: true
                    },
                    name: "Product",
                    name_text: "产品",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "150",
                    newline: false,
                    labelAlign: "right",
                    type_text: "弹出&自动完成"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=stock_stockPile&viewname=list'
    };
    exports.options.model = {
        name: 'stock_stockPile',
        title: '库存'
    };

    exports.service = function server(page) {
        var events = {

};

        $.extend(events, {
            getHandler: function(name) {
                if (this[name]) return this[name];
            },
            toolbarInit: function(e) {
                var page = e.page,
                viewType = e.viewType,
                toolbar = e.toolbar;
                var self = this;

                if (toolbar && toolbar.items && toolbar.items.length) {
                    toolbar.items[0].cls = "ne-btn-blue";
                }

                toolbar.items.push({
                    text: '导出',
                    id: 'exportreport'
                });

                page.addEvent("getOrderIn",
                function() {
                    OrderIn(true);
                });

                page.addEvent("getOrderOut",
                function() {

                    OrderIn(false);

                });

                page.addEvent("exportreport",
                function() {
                    //ne.openFile({
                    //    url: pbc.toUrl('web/exportgrid?rnd=') + new Date().getTime(),
                    //    parms: {
                    //        modename: "stock_stockpile",
                    //        filterCode: new pbc.base64().encode(JSON.stringify(page.getCurrentCondition()))
                    //    }
                    //});
                    require(["grid_exportExcel"], function () {
                        if (self.grid && self.grid.exportExcel) {
                            self.grid.exportExcel();
                        }
                    });
                });
                function OrderIn(isIn) {
                    var grid = page.grid;

                    var rows = grid.getData();

                    var details = [];

                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (row.QuantityFinal) {
                            var detail = {
                                ProductID: row.ProductID,
                                Product: row.Product,
                                WarehouseID: row.StoreHouseID,
                                Warehouse: row.StoreHouse
                            };

                            if (isIn) {
                                if (row.QuantityFinal > 0) {
                                    detail.Quantity = row.QuantityFinal || 0;
                                    details.push(detail);
                                }
                            } else {
                                if (row.QuantityFinal < 0 || row.MValueIn < 0) {
                                    detail.Quantity = -1 * (row.QuantityFinal || 0);
                                    details.push(detail);
                                }
                            }
                        }
                    }
                    if (!details.length) {
                        return;
                    }

                    var model = isIn ? "stock_in": "stock_out";
                    var url = pbc.toUrl('web/main?showmvalue=Y&model=' + model + '&viewType=form');

                    var formData = {
                        Details: details
                    };
                    if (isIn) {
                        formData.InType = 'in';
                    } else {
                        formData.OutType = 'out';
                    }

                    var bind = new pbc.base64().encode(JSON.stringify({
                        formData: formData
                    }));
                    url = url + "&bind=" + bind;

                    top.openTab({
                        text: isIn ? "盘盈单": "盘亏单",
                        url: url,
                        tabid: "stock_in_form",
                        data: {
                            callback: function(data, e) {
                                page.grid.reload();
                            }
                        }
                    });
                }
            },

            beforeShowSearch: function(e) {
                var page = e.page;
                var op = e.options;
                var fieldProduct = pbc.web.helper.first(op.fields,
                function(a) {
                    return a.name == "Product";
                });
                if (fieldProduct != null) {
                    fieldProduct.type = "select";

                    liger.setProductEditor(fieldProduct.editor);
                }
            },

            beforeShowList: function(e) {
                var page = e.page;
                var op = e.options;

                op.checkbox = false;
                var columnProduct = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "Product";
                });

                var columnQuantityFinal = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "QuantityFinal";
                });

                op.columns.push({
                    display: '进出库明细',
                    width: 120,
                    render: function(r) {
                        if (!r.StoreHouse || r.StoreHouse.length < 2) return "";
                        if (!r.Product || r.Product.length < 2) return "";

                        var searchBind = {
                            Warehouse: [],
                            Product: []
                        };
                        searchBind.Warehouse.push(r.StoreHouse);
                        searchBind.Product.push(r.Product);

                        searchBind = new pbc.base64().encode(JSON.stringify(searchBind));
                        var link = '<a class="link" href="javascript:top.openTab(\'/web/main?model=stock_piledetail&viewtype=main&searchbind=' + searchBind + '\',\'viewpiledetail\',\'查看进出库明细\')">查看</a>';
                        return link;
                    }

                });

                if (columnQuantityFinal != null) {
                    //columnQuantityFinal.render = function (r, index, result)
                    //{
                    //    if (!result) return "";
                    //    if (result > 0) return "<span>" + result + "</span>";
                    //    else return "<span style='color:red;'>" + result + "</span>";;
                    //} 
                    columnQuantityFinal.totalSummary = {
                        render: function(suminf, column, cell) {
                            return '<b style="line-height: 28px;">' + suminf.sum + '</b>';
                        },
                        align: 'right'
                    };

                    columnQuantityFinal.editor = {
                        type: 'int',
                        onChanged: function(e) {
                            var grid = this.get('host_grid');
                            var rowdata = this.get('host_grid_row');
                        }
                    };
                }

                op.enabledEdit = true;

            }

        });

        for (var name in events) {
            var fn = events[name];
            if ($.isFunction(fn)) {
                page.bind(name, fn);
            }
        }

    };;

    return exports;
});