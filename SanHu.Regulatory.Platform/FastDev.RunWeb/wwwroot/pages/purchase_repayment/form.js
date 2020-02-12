define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: 1,
                    name: "Supplier",
                    label: "供应商",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            mode: "crm_supplier"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            mode: "crm_supplier"
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
                    type: "ref_popupselect",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: 1,
                    name: "RepaymentDate",
                    label: "还款日期",
                    editor: {
                        type: "datepicker",
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
                    newline: 1,
                    name: "Amount",
                    label: "还款金额",
                    editor: {
                        type: "float"
                    },
                    type: "float",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        height: "40"
                    },
                    type: "textarea",
                    width: ""
                }],
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=purchase_repayment&viewname=form'
    };
    exports.options.model = {
        name: 'purchase_repayment',
        title: '供应商还款'
    };

    exports.service = function server(page) {
        function changeNumMoneyToChinese(money) {
            var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
            var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
            var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
            var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
            var cnInteger = "整"; //整数金额时后面跟的字符
            var cnIntLast = "元"; //整型完以后的单位
            var maxNum = 999999999999999.9999; //最大处理的数字
            var IntegerNum; //金额整数部分
            var DecimalNum; //金额小数部分
            var ChineseStr = ""; //输出的中文金额字符串
            var parts; //分离金额后用的数组，预定义
            if (money == "") {
                return "";
            }
            money = parseFloat(money);
            if (money >= maxNum) {
                alert('超出最大处理数字');
                return "";
            }
            if (money == 0) {
                ChineseStr = cnNums[0] + cnIntLast + cnInteger;
                return ChineseStr;
            }
            money = money.toString(); //转换为字符串
            if (money.indexOf(".") == -1) {
                IntegerNum = money;
                DecimalNum = '';
            } else {
                parts = money.split(".");
                IntegerNum = parts[0];
                DecimalNum = parts[1].substr(0, 4);
            }
            if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
                var zeroCount = 0;
                var IntLen = IntegerNum.length;
                for (var i = 0; i < IntLen; i++) {
                    var n = IntegerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == "0") {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            ChineseStr += cnNums[0];
                        }
                        zeroCount = 0; //归零
                        ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        ChineseStr += cnIntUnits[q];
                    }
                }
                ChineseStr += cnIntLast;
                //整型部分处理完毕
            }
            if (DecimalNum != '') { //小数部分
                var decLen = DecimalNum.length;
                for (var i = 0; i < decLen; i++) {
                    var n = DecimalNum.substr(i, 1);
                    if (n != '0') {
                        ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (ChineseStr == '') {
                ChineseStr += cnNums[0] + cnIntLast + cnInteger;
            } else if (DecimalNum == '') {
                ChineseStr += cnInteger;
            }
            return ChineseStr;
        }

        var isAfterSetData = false;

        page.bind('beforeSave',
        function(e) {
            var form = page.form;
        });

        page.bind('beforeShowForm',
        function(e) {

            var page = e.page;
            var op = e.options;
            var field = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Amount";
            });

        });

        page.bind('pageLoad',
        function(e) {
            var p = page.options;

            p.toSave = function(postdata, callback) {
                var amount = $.ligerDefaults.Grid.formatters['currency'](postdata.Amount);

                var message = "将汇款" + amount + "(" + changeNumMoneyToChinese(amount) + ")给" + postdata.Supplier[1];
                $.ligerDialog.confirm(message + ',确定吗?',
                function(y) {
                    if (y) {
                        callback();
                    }

                });
            };

            p.onSaved2 = function() {
                top.pbc.tips(1, '保存成功');
                pbc.web.setCurrent({
                    id: null
                });
                new pbc.web.init({
                    viewType: 'form',
                    isView: false,
                    onLoaded: page._clearBody
                }).run();

            }

            page.bind('afterShowForm',
            function(e) {
                var form = page.form;
                $("[formName=Amount]", page.jelement).keyup(function() {
                    var value = $(this).val();
                    value = changeNumMoneyToChinese(value);

                    $("[formName=AmountRMB]", page.jelement).val(value);
                });
                $("[formName=AmountRMB]", page.jelement).attr("readonly", true).addClass("l-text-field-number");

                if (page.formData) {
                    var value = page.formData.Amount;
                    value = changeNumMoneyToChinese(value);
                    $("[formName=AmountRMB]", page.jelement).val(value);
                }
            });

        });
    };

    return exports;
});