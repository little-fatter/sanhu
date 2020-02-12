define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "OrderNo",
                    display: "编号",
                    type: "string",
                    width: "250",
                    align: "left"
                },
                {
                    name: "OrderDate",
                    display: "日期",
                    type: "datetime",
                    width: "250",
                    align: "left"
                },
                {
                    width: "150",
                    display: "状态",
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
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                hideSearchInput: 0,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "right",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "OrderDate",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            search: {
                fields: [{
                    label: "供应商",
                    type: "ref_popupselect",
                    name: "Supplier",
                    name_text: "供应商",
                    operator: "equal",
                    operator_textfield: "等于",
                    type_text: "弹出&自动完成",
                    width: "140",
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
                        many2many: true
                    },
                    textField: "Supplier_textfield"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            type: "list",
            filterFields: [{
                display: "供应商",
                name: "Supplier",
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
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=crm_supplier&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 供应商",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "采购人",
                name: "Purchaser",
                editor: {
                    url: "web/namedata",
                    parms: {
                        model: "core_user"
                    },
                    detailEnabled: true,
                    detailUrl: "web/detaildata",
                    detailParms: {
                        model: "core_user"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "RealName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=core_user&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 用户",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "仓库",
                name: "Warehouse",
                editor: {
                    url: "web/namedata",
                    parms: {
                        model: "stock_warehouse"
                    },
                    detailEnabled: true,
                    detailUrl: "web/detaildata",
                    detailParms: {
                        model: "stock_warehouse"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "WarehouseName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=stock_warehouse&viewtype=list",
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
                display: "结算账号",
                name: "Account",
                editor: {
                    url: "web/namedata",
                    parms: {
                        model: "res_account"
                    },
                    detailEnabled: true,
                    detailUrl: "web/detaildata",
                    detailParms: {
                        model: "res_account"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=res_account&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 资金账号",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "单据日期",
                name: "OrderDate",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单据编号",
                name: "OrderNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "交货日期",
                name: "DeliveryDate",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "采购价",
                name: "Price",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "欠款",
                name: "Arrears",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "付款",
                name: "Payment",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "SupplierID",
                name: "SupplierID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "PurchaserID",
                name: "PurchaserID",
                editor: {
                    type: "text"
                },
                type: "text"
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
                display: "AccountID",
                name: "AccountID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            addins: {}
        },
        dataset: 'web/dataset?model=purchase_order&viewname=list'
    };
    exports.options.model = {
        name: 'purchase_order',
        title: '采购单'
    };

    exports.service = function server(page) {
        page.addEvent("approved",
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
            $.ligerDialog.confirm('确定要审批吗?',
            function(yes) {
                if (!yes) return;
                pbc.ajax({
                    url: '/web/api/approved',
                    data: {
                        context: id,
                        model: 'purchase_order'
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

        page.addEvent("unapproved",
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
                        model: 'purchase_order'
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

    };

    return exports;
});