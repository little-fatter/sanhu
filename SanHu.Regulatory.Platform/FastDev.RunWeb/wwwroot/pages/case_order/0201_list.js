define([],
function() {
    function view() {
        var options = {
            list: {
                detail: {
                    onShowDetail: function(row, detailPanel, callback) {
                        var grid = document.createElement('div');
                        $(detailPanel).append(grid);
                        $(grid).css('margin', 10).ligerGrid({
                            columns: [{
                                type: "ref",
                                align: "left",
                                display: "产品",
                                name: "product",
                            },
                            {
                                width: "100",
                                type: "float",
                                align: "left",
                                display: "数量",
                                name: "Num"
                            },
                            {
                                display: "金额",
                                width: "100",
                                type: "curreny",
                                align: "left",
                                name: "Amount"
                            }],
                            isScroll: false,
                            showToggleColBtn: false,
                            width: '90%',
                            url: '/web/PagedData/',
                            parms: {
                                model: 'case_orderDetail',
                                Condition: {
                                    rules: [{
                                        field: "OrderID",
                                        op: "equal",
                                        value: row.ID
                                    }]
                                }

                            },
                            showTitle: false,
                            columnWidth: 100,
                            onAfterShowData: callback,
                            frozen: false,
                            usePager: false,
                            checkbox: false
                        });
                    }
                },
                columns: [{
                    name: "Ordertitle",
                    display: "订单标题",
                    type: "string",
                    name_text: "订单标题",
                    width: "350",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "Amount",
                    display: "金额",
                    type: "number",
                    name_text: "金额",
                    width: "150",
                    align: "left",
                    align_textfield: "左对齐"
                },
                {
                    width: "150",
                    display: " - 状态 - ",
                    name: "Status",
                    name_text: " - 状态 - ",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "wfstatus",
                    type_text: "工作流状态"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            filterFields: [{
                display: "客户",
                name: "customer",
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
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=crm_customer&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "订单标题",
                name: "Ordertitle",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "金额",
                name: "Amount",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "本期还款",
                name: "Payment",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "备注",
                name: "remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "订单日期",
                name: "Orderdate",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "customerID",
                name: "customerID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=case_order&viewname=0201_list'
    };
    exports.options.model = {
        name: 'case_order',
        title: '订单'
    };

    exports.service = function service(page) {

        page.bind("approved",
        function() {
            if (page.grid) {
                page.grid.exportChart();
                return;
            }
            var id = "";
            var selecteds = page.getSelecteds();
            if (selecteds && selecteds.length) {
                var ids = [];
                $(selecteds).each(function() {
                    ids.push(this.ID);
                });
                id = ids.join(';');
            } else {
                pbc.tips(2, "请选择数据再操作");
                return;
            }
            $.ligerDialog.confirm('确定要审批吗?',
            function(yes) {
                if (!yes) return;
                pbc.ajax({
                    url: '/web/api/approved',
                    data: {
                        context: id,
                        model: 'case_order'
                    },
                    success: function(r) {
                        if (r.statusCode == "1") {
                            top.pbc.tips(1, '审批成功');
                            page.reload();
                        } else if (r.statusCode == "2") {
                            top.pbc.tips(2, r.message);
                        } else if (r.statusCode == "3") {
                            pbc.showError(r.message);
                        }
                    }
                });
            });

        });

        page.bind("unapproved",
        function() {
            var id = "";
            var selecteds = page.getSelecteds();
            if (selecteds && selecteds.length) {
                var ids = [];
                $(selecteds).each(function() {
                    ids.push(this.ID);
                });
                id = ids.join(';');
            } else {
                pbc.tips(2, "请选择数据再操作");
                return;
            }
            $.ligerDialog.confirm('确定要反审批吗?',
            function(yes) {
                if (!yes) return;
                pbc.ajax({
                    url: '/web/api/unapproved',
                    data: {
                        context: id,
                        model: 'case_order'
                    },
                    success: function(r) {
                        if (r.statusCode == "1") {
                            top.pbc.tips(1, '反审批成功');
                            page.reload();
                        } else if (r.statusCode == "2") {
                            top.pbc.tips(2, r.message);
                        } else if (r.statusCode == "3") {
                            pbc.showError(r.message);
                        }
                    }
                });
            });

        });

        page.bind("void",
        function() {
            var id = "";
            var selecteds = page.getSelecteds();
            if (selecteds && selecteds.length) {
                var ids = [];
                $(selecteds).each(function() {
                    ids.push(this.ID);
                });
                id = ids.join(';');
            } else {
                pbc.tips(2, "请选择数据再操作");
                return;
            }
            $.ligerDialog.confirm('确定要作废吗?',
            function(yes) {
                if (!yes) return;
                pbc.ajax({
                    url: '/web/api/unapproved',
                    data: {
                        context: id,
                        model: 'case_order'
                    },
                    success: function(r) {
                        if (r.statusCode == "1") {
                            top.pbc.tips(1, '作废成功');
                            page.reload();
                        } else if (r.statusCode == "2") {
                            top.pbc.tips(2, r.message);
                        } else if (r.statusCode == "3") {
                            pbc.showError(r.message);
                        }
                    }
                });
            });

        });
    };

    return exports;
});