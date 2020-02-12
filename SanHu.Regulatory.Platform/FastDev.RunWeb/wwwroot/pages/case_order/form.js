define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: true,
                    name: "Ordertitle",
                    label: "订单标题",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
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
                    name: "customer",
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
                        popupselect_url: "web/main/?model=crm_customer&viewtype=list&viewname=0105_list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 客户",
                        many2one: true,
                        popupselect_Type: "popupselect",
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    type: "ref_popupselect",
                    type_textfield: "弹出&自动完成",
                    name_textfield: "客户",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: 1,
                    name: "Amount",
                    label: "金额",
                    editor: {},
                    type: "currency",
                    name_textfield: "金额",
                    type_textfield: "货币",
                    width: ""
                },
                {
                    newline: 0,
                    name: "Payment",
                    label: "本期还款",
                    exp: "data.Amount * 1 + data.Amount * 1 ",
                    editor: {},
                    type: "currency",
                    name_textfield: "本期还款",
                    type_textfield: "货币",
                    width: ""
                },
                {
                    newline: true,
                    name: "Orderdate",
                    label: "订单日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker",
                    type_textfield: "日期"
                },
                {
                    newline: 1,
                    name: "remarks",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "备注",
                    width: "590"
                },
                {
                    newline: 1,
                    name: "orderdetails",
                    label: "订单明细",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "150",
                                type: "ref",
                                align: "left",
                                display: "产品",
                                name: "product",
                                name_textfield: "产品",
                                align_textfield: "左对齐",
                                editorType: "ref_popupselect",
                                type_textfield: "引用类型",
                                editor: {
                                    url: "web/namedata",
                                    parms: {
                                        model: "res_prodcut"
                                    },
                                    detailEnabled: true,
                                    detailUrl: "web/detaildata",
                                    detailParms: {
                                        model: "res_prodcut"
                                    },
                                    valueField: "ID",
                                    textField: "ProductnNme",
                                    css: "combobox-selector",
                                    popupselect_ismul: 1,
                                    popupselect_type: "popupselect",
                                    popupselect_url: "web/main/?model=res_prodcut&viewtype=list&viewname=0102_list",
                                    popupselect_width: "1000",
                                    popupselect_height: "700",
                                    popupselect_title: "选择： 产品",
                                    many2one: true,
                                    type: "ref_popupselect",
                                    popupselect_Type: "popupselect",
                                    popupselect_Type_textfield: "弹出+自动完成",
                                    select_updatematch_source: "",
                                    select_updatematch_target: ""
                                },
                                editorType_textfield: "弹出&自动完成"
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
                                type_textfield: "引用类型",
                                editor: {
                                    url: "web/namedata",
                                    parms: {
                                        model: "res_store"
                                    },
                                    detailEnabled: true,
                                    detailUrl: "web/detaildata",
                                    detailParms: {
                                        model: "res_store"
                                    },
                                    valueField: "ID",
                                    textField: "WarehouseName",
                                    many2one: true,
                                    type: "ref_select"
                                },
                                editorType_textfield: "下拉框"
                            },
                            {
                                width: "100",
                                type: "float",
                                align: "left",
                                display: "数量",
                                name: "Num",
                                name_textfield: "数量",
                                align_textfield: "左对齐",
                                type_textfield: "数值类型",
                                editorType: "int",
                                editor: {
                                    type: "int"
                                },
                                editorType_textfield: "整数"
                            },
                            {
                                display: "金额",
                                width: "100",
                                type: "curreny",
                                align: "left",
                                name: "Amount",
                                name_textfield: "金额",
                                align_textfield: "左对齐",
                                type_textfield: "货币",
                                editorType: "textarea",
                                editor: {
                                    type: "textarea",
                                    height: 80
                                }
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "web/main/?model=case_orderDetail&viewtype=form",
                        titleEdit: "修改： 订单明细",
                        titleAdd: "新增：订单明细",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    type_textfield: "编辑表格",
                    name_textfield: "订单明细",
                    width: "690",
                    hideLabel: 1
                }]
            },
            common: {
                saveCallbackType: "dialog"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=case_order&viewname=form'
    };
    exports.options.model = {
        name: 'case_order',
        title: '订单'
    };

    exports.service = function service(page) {

        page.bind('afterShowForm',
        function(e) {
            var page = e.page;
            var form = page.form;

            console.log(page);

            if (page.formData && page.formData.Status == "approved") {
                var bg = $('<div class="approvedbg"></div>').appendTo($(".formpanel:first"));

            }
            if (page.formData && page.formData.Status == "void") {
                var bg = $('<div class="voidbg"></div>').appendTo($(".formpanel:first"));

            }

            var jpanel = $('<div></div>').insertBefore($(".l-panel-bwarp", form.element).parent());

            var jbtn = $('<a class="ne-btn ne-btn-blue">选择数据</a>').appendTo(jpanel);

            jbtn.click(function() {
                var dialog = null;

                var textField = "ProductnNme"; //标题类型字段名
                var options = {
                    url: "web/main/?model=res_prodcut&viewtype=list&viewname=0102_list",
                    top: 100,
                    width: 800,
                    height: 500,
                    title: "选择窗口标题",
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

                            page.form.getEditor("orderdetails").addRows(data);

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