define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "PileTime",
                    display: "进出库时间",
                    type: "datetime",
                    name_text: "进出库时间",
                    width: "120",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "日期"
                },
                {
                    name: "SerialNumber",
                    display: "流水号",
                    width: "120",
                    type: "string"
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
                    name: "Warehouse",
                    display: "所在仓库",
                    width: "120",
                    type: "ref"
                },
                {
                    name: "DocumentType",
                    display: "单据类型",
                    width: "120",
                    type: "string"
                },
                {
                    name: "DocumentNumber",
                    display: "单据编号",
                    width: "120",
                    type: "string"
                },
                {
                    name: "OperationType",
                    display: "操作类型",
                    width: "120",
                    type: "string"
                },
                {
                    name: "Quantity",
                    align: "right",
                    width: 120,
                    display: "数量",
                    totalSummary: {
                        align: "right"
                    }
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "DocumentNumber",
                startField: "PileTime",
                endField: "PileTime"
            },
            report: {},
            search: {
                fields: [{
                    label: "所在仓库",
                    type: "select",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "stock_warehouse"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
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
                        many2many: true,
                        autocomplete: true,
                        delayLoad: true
                    },
                    name: "Warehouse",
                    name_text: "所在仓库",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "150",
                    type_text: "弹出&自动完成",
                    textField: "Warehouse_textfield"
                },
                {
                    label: "产品",
                    type: "select",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_product"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
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
                        many2many: true,
                        autocomplete: true,
                        delayLoad: true
                    },
                    name: "Product",
                    name_text: "产品",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "150",
                    newline: false,
                    labelAlign: "right",
                    type_text: "弹出&自动完成",
                    textField: "Product_textfield"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            type: "list",
            filterFields: [{
                display: "所在仓库",
                name: "Warehouse",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "stock_warehouse"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "stock_warehouse"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "WarehouseName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=stock_warehouse&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 仓库",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "产品",
                name: "Product",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_product"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_product"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "ProName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_product&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 产品",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "单位",
                name: "Unit",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_productUnit"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_productUnit"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "UnitName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_productUnit&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 单位",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "单据编号",
                name: "DocumentNumber",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "重量",
                name: "Weight",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "单据ID",
                name: "DocumentID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否进库",
                name: "IsInStock",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "流水号",
                name: "SerialNumber",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单据类型",
                name: "DocumentType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "操作类型",
                name: "OperationType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "米数",
                name: "MValue",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "码",
                name: "CodeValue",
                editor: {
                    type: "number"
                },
                type: "number"
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
                display: "进出库时间",
                name: "PileTime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "规格型号",
                name: "ProMode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位名",
                name: "UnitName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "数量",
                name: "Quantity",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "WarehouseID",
                name: "WarehouseID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "ProductID",
                name: "ProductID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "UnitID",
                name: "UnitID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            addins: {}
        },
        dataset: 'web/dataset?model=stock_pileDetail&viewname=list'
    };
    exports.options.model = {
        name: 'stock_pileDetail',
        title: '进出库明细'
    };

    exports.service = function server(page) {
        var fns = {};

        $.extend(fns, {
            toolbarInit: function(e) {
                var page = e.page,
                viewType = e.viewType,
                toolbar = e.toolbar;
                var self = this;

                toolbar.items = [];

                toolbar.items.push({
                    text: '导出',
                    id: 'exportreport'
                });

                if (toolbar && toolbar.items && toolbar.items.length) {
                    toolbar.items[0].cls = "ne-btn-blue";
                }

                page.addEvent("exportreport",
                function() {
                    //ne.openFile({
                    //    url: pbc.toUrl('web/exportgrid?rnd=') + new Date().getTime(),
                    //    parms: {
                    //        modename: "stock_piledetail",
                    //        filterCode: new pbc.base64().encode(JSON.stringify(page.getCurrentCondition()))
                    //    }
                    //});
                    require(["grid_exportExcel"], function () {
                        if (self.grid && self.grid.exportExcel) {
                            self.grid.exportExcel();
                        }
                    });
                });

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

            afterShowSearch: function(e) {
                var page = e.page;
                var form = e.form;

                if (page.getQueryStringByName("searchbind")) {
                    var searchbind = page.getQueryStringByName("searchbind");
                    searchbind = JSON.parse(new pbc.base64().decode(searchbind));

                    if (searchbind) {
                        form.setData(searchbind);

                        setTimeout(function() {
                            var conditions = form.toConditions();
                            page.current.filterSearch = {
                                rules: conditions,
                                op: 'and'
                            };
                            page.list_search();
                        },
                        100);
                    }
                }
            },

            beforeShowList: function(e) {
                var page = e.page;
                var op = e.options;

                if (page.getQueryStringByName("searchbind")) {
                    op.delayLoad = true;
                    op.delayLoadData = true;
                }
                op.checkbox = false;
                op.sortName = "PileTime";
                op.sortOrder = "desc";
                var columnProduct = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "Product";
                });
                var columnDocumentNumber = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "DocumentNumber";
                });
                var columnOperationType = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "OperationType";
                });
                var columnDocumentType = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "DocumentType";
                });

                if (columnDocumentNumber != null) {
                    columnDocumentNumber.render = function(r) {
                        if (!r.DocumentNumber) return "";

                        var model = 'sales_order',
                        title = "查看单据";

                        if (r.DocumentType.indexOf('processing') > -1) {
                            model = 'erp_processing';
                        } else if (r.DocumentType.indexOf('in') > -1) {
                            model = 'stock_in';
                        } else if (r.DocumentType.indexOf('out') > -1) {
                            model = 'stock_out';
                        }
                        var title = r.DocumentNumber;
                        var id = r.DocumentID;
                        var link = '<a class="link" href="javascript:top.openTab(\'/web/main?model=' + model + '&isview=Y&viewtype=form&id=' + id + '\',\'view' + model + '\',\'' + title + '\')">' + title + '</a>';
                        return link;
                    };
                }

                if (columnOperationType != null) {
                    columnOperationType.render = function(r) {
                        if (!r.OperationType) return "";
                        var value = r.OperationType;
                        if (value == "doneprocessing") return "完成加工";
                        if (value == "startprocessing") return "开始加工";
                        if (value == "add") return "新增";
                        if (value == "delete") return "删除";
                        return value == "approved" ? "审批": "反审批";
                    };
                }
                if (columnDocumentType != null) {
                    columnDocumentType.render = function(r) {
                        if (!r.DocumentType) return "";
                        var value = r.DocumentType;

                        switch (value) {
                        case "check_in":
                            return "盘点入库";
                        case "order_in":
                            return "入库";
                        case "order_out":
                            return "出库";
                        case "check_out":
                            return "盘点出库";
                        case "processing":
                            return "外加工";
                        case "purchase_order":
                            return "采购";
                        default:
                            return "销售";
                        }
                    };
                }
            }

        });

        for (var name in fns) {
            var fn = fns[name];
            if ($.isFunction(fn)) {
                page.bind(name, fn);
            }
        }

    };

    return exports;
});