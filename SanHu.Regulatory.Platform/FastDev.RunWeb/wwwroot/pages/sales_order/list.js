define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Customer",
                    display: "客户",
                    type: "ref",
                    name_text: "客户",
                    width: "400",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    name: "OrderDate",
                    display: "单据日期",
                    type: "datetime",
                    name_text: "单据日期",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "日期"
                },
                {
                    name: "OrderNo",
                    display: "单据编号",
                    type: "string",
                    name_text: "单据编号",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
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
                dialogWidth: "900",
                dialogHeight: "600",
                showList: 1,
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
                titleField: "Supplier",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {
                title: "销售统计",
                subtitle: "",
                legendType: "pie",
                width: "",
                height: "",
                legendField: "",
                legendFieldType: "",
                legendIncludeDataOnly: 0,
                axisField: "",
                axisFieldType: "",
                valueFieldType: "sum",
                valueField: ""
            },
            search: {
                fields: [{
                    label: "客户",
                    type: "select",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "crm_customer"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "crm_supplier"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "CustomerName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "web/main/?mode=crm_supplier&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 客户",
                        many2many: true,
                        autocomplete: true,
                        delayLoad: true
                    },
                    name: "Supplier",
                    name_text: "客户",
                    operator: "equal",
                    operator_textfield: "等于",
                    width: "150",
                    type_text: "弹出&自动完成",
                    textField: "Supplier_textfield"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            type: "list",
            filterFields: [{
                display: "采购人",
                name: "Purchaser",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_employee"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_employee"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "EmpName",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=res_employee&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 员工",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户",
                name: "Customer",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customer"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
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
                display: "销售员工",
                name: "SalesMan",
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
                display: "单据日期",
                name: "OrderDate",
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
                display: "单据编号",
                name: "OrderNo",
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
                display: "销售价",
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
                display: "PurchaserID",
                name: "PurchaserID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "CustomerID",
                name: "CustomerID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "SalesManID",
                name: "SalesManID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            addins: {}
        },
        dataset: 'web/dataset?model=sales_order&viewname=list'
    };
    exports.options.model = {
        name: 'sales_order',
        title: '销售订单'
    };

    exports.service = function server(page) {
        var events = function() {

};

        var LODOP;

        function getStyle() {
            var h = [];
            h.push('.ne-report-table,.ne-report-detail{width:100%;  }');

            h.push('.ne-report-table,.ne-report-detail,.ne-report-sign{ font-family: tahoma,arial,宋体; font-size:12px; }');
            h.push('.ne-report-detail td { border-bottom-color:#000000;border-bottom-style:solid;border-bottom-width:1px; border-right-color:#000000;border-right-style:solid;border-right-width:1px; }');
            h.push('.ne-report-detail .firsttr td,.ne-report-detail .firstRow td {border-top-color:#000000;border-top-style:solid;border-top-width:1px;}');
            h.push('.ne-report-detail .firstcell {border-left-color:#000000;border-left-style:solid;border-left-width:1px;} ');

            h.push('.line {border-bottom-color:#000000;border-bottom-style:solid;border-bottom-width:1px; }');
            return h.join('');
        }

        function printorder(data) {
            LODOP = getLodop();

            LODOP.PRINT_INITA(0, 0, "210mm", "297mm", "销售单打印");

            for (var i = 0; i < data.length; i++) {
                var pagehtml = data[i];
                LODOP.NewPage();

                var strBodyStyle = "<style>" + getStyle() + "</style>";
                var strFormHtml = strBodyStyle + "<body>" + pagehtml + "</body>";

                LODOP.ADD_PRINT_HTM(30, 10, "200mm", "280mm", strFormHtml);

            }
            LODOP.PRINT();
        }

        $.extend(events, {
            getHandler: function(name) {
                if (name == "toolbarInit") {
                    return this.toolbarInit;
                }
            },

            toolbarInit: function(e) {
                var page = e.page,
                viewType = e.viewType,
                toolbar = e.toolbar;
                var self = this;

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
                                model: 'sales_order'
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

                page.addEvent("void",
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
                    $.ligerDialog.confirm('确定要作废?',
                    function(yes) {
                        if (!yes) return;
                        pbc.ajax({
                            url: '/web/api/void',
                            data: {
                                context: id,
                                model: 'sales_order'
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
                                model: 'sales_order'
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

                page.addEvent("printorder",
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

                    if (!top.SYS.IsSetPrint) {
                        pbc.showError("打印控件未安装,请<a href='http://www.lodop.net/uploads/file/sample/install_lodop32.zip' target='_blank'>点击安装</a>");
                        return;
                    }

                    pbc.ajax({
                        url: '/web/GetPrintConents',
                        data: {
                            context: id,
                            model: 'sales_order'
                        },
                        success: function(r) {
                            if (r.statusCode == "2") {
                                top.pbc.tips(2, r.message);
                                return;
                            } else if (r.statusCode == "3") {
                                pbc.showError(r.message);
                                return;
                            }
                            printorder(r.Data);
                        }
                    });
                });

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