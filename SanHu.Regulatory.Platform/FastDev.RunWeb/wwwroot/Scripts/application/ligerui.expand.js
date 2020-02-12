(function () {
    function getAppUrlParm() {
        return {
            appid: pbc.getAppId()
        }
    }

    //编辑器的定义
    liger.editorCreatorDefaults = {
        getValue: function (editor, editParm) {
            var field = editParm.field || editParm.column;
            if (editor.getValue) {
                var value = editor.getValue();
                //可将提交字段数据改成[id,value]的形式
                if (field && field.editor && field.editor.many2one && editor.getText) {
                    value = [value, editor.getText()];
                }
                //可将提交字段数据改成[[id1,value1],[id2,value2]]的形式
                if (field && field.editor && field.editor.many2many && editor.getText) {
                    var vs = (value || "").split(';');
                    var ts = (editor.getText() || "").split(';');
                    value = [];
                    for (var i = 0; i < vs.length; i++) {
                        value.push([vs[i], ts[i]]);
                    }
                }
                return value;
            }
        },
        setValue: function (editor, value, editParm) {
            var field = editParm.field || editParm.column;
            var ts = [];
            if (editor.setValue) {
                //设置了isRef属性-如果获取到的数据是[id,text]的形式，需要获取[0]
                if (field && field.editor && field.editor.many2one && $.isArray(value)) {
                    ts = [value[1]];
                    value = value[0];
                    editor.setValue(value);
                    if (editor.setText) {
                        editor.setText(ts.join(';'));
                        if (editor.element) {
                            setTimeout(function () {
                                $(editor.element).parents(".l-form:first").find(".l-text-focus").removeClass("l-text-focus");
                            }, 40);
                        }
                    }
                }
                    //设置了isRefMul属性- 获取到[[id1,value1],[id2,value2]]的形式，需要合并为一个完整字符串
                else if (field && field.editor && field.editor.many2many && $.isArray(value)) {
                    var vs = [], ts = [];
                    for (var i = 0; i < value.length; i++) {
                        vs.push(value[i][0]);
                        ts.push(value[i].length > 1 ? value[i][1] : value[i][0]);
                    }
                    value = vs.join(';');
                    editor.setValue(value);
                    if (editor.setText) editor.setText(ts.join(';'));
                } else {
                    editor.setValue(value);
                }
            }
        },
        //从控件获取到文本信息
        getText: function (editor, editParm) {
            var field = editParm.field || editParm.column;
            if (field.editor && (field.editor.many2one || field.editor.many2many)) return;

            if (editor.getText) {
                var text = editor.getText();
                if (text) return text;
            }
        },
        //设置文本信息到控件文本框去
        setText: function (editor, text, editParm) {
            var field = editParm.field || editParm.column;
            if (text && editor.setText) {
                editor.setText(text);
            }
        }
    };

    //默认值定义 
    $.extend($.ligerDefaults.Grid, {
        rowHeight: 30,
        editorTopDiff: 0,                      //编辑器top误差
        editorLeftDiff: 0,                //编辑器left误差
        editorHeightDiff: 0,               //编辑器高度误差
        checkbox: true,
        fixedCellHeight: true,
        alternatingRow: false,
        selectRowButtonOnly: false,
        frozen: false,
        async: true,
        allowHideColumn: false,
        pageSize: 30,
        headerRowHeight: 30,
        allowUnSelectRow: true,
        root: 'Records',                       //数据源字段名
        contentType: "application/json",
        urlParms: getAppUrlParm,
        pageParmName: 'PageIndex',               //页索引参数名，(提交给服务器)
        pagesizeParmName: 'PageSize',        //页记录数参数名，(提交给服务器) 
        sortnameParmName: 'SortName',        //页排序列名(提交给服务器)
        sortorderParmName: 'SortOrder',      //页排序方向(提交给服务器) 
        onError: function (result, b) {
        }
    });

    function showTopLoading(message) {
        try {
            if (top.ne) {
                top.pbc.showLoading(pbc.res.loading);
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    $.extend($.ligerDefaults.ComboBox, {
        selectBoxPosYDiff: -2,
        autocompleteAllowEmpty: true,
        split: ';',
        resize: false,
        detailDataParmName: 'data',
        ajaxContentType: "application/json",
        urlParms: getAppUrlParm,
        keySupport: true,
        setTextBySource: false,
        ajaxBeforeSend: function () {
        },
        ajaxComplete: function () {
        },
        cancelable: false
    });

    $.extend($.ligerDefaults.ListBox, {
        ajaxContentType: "application/json",
        split: ';',
        urlParms: getAppUrlParm
    });
    $.extend($.ligerDefaults.CheckBoxList, {
        ajaxContentType: "application/json",
        split: ';',
        urlParms: getAppUrlParm
    });
    $.extend($.ligerDefaults.RadioList, {
        ajaxContentType: "application/json",
        split: ';',
        urlParms: getAppUrlParm
    });
    $.extend($.ligerDefaults.Drag, {
        clickDelay: 300
    });
    var form_count = 0;
    $.extend($.extend($.ligerDefaults.Form, {
        prefixID: function ($) {
            if ($.form_prefixID) return $.form_prefixID;
            $.form_prefixID = "form" + ++form_count + "_";
            return $.form_prefixID;
        }
    }));
    $.extend($.ligerDefaults.Tree, {
        ajaxContentType: "application/json",
        urlParms: getAppUrlParm
    });

    $.extend($.ligerDefaults.Panel, {
        urlParms: getAppUrlParm
    });

    $.extend($.ligerDefaults.Dialog, {
        layoutMode: 2,
        urlParms: getAppUrlParm,
        width: 380,
        beforeRender: function () {
            var _ = this,
				opts = this.options;
            if (opts && opts.url && (opts.url.indexOf("/web/main") != -1 || /\.w$/.test(opts.url) || /\.w\?*(.*?)$/.test(opts.url))) {
                opts.url = opts.url.indexOf("/web/main") != -1 ? pbc.getNewUrl(opts.url) : opts.url;
                if (opts.data) {
                    opts.openerData = opts.data;
                    delete opts.data
                }
                pbc.openPage(opts, "dialog");
                return false
            }
        }
    });

    $.extend($.ligerDefaults.GridString, {
        errorMessage: '发生错误',
        pageStatMessage: '显示从{from}到{to}，总 {total} 条 。每页显示：{pagesize}',
        pageTextMessage: 'Page',
        loadingMessage: '加载中...',
        findTextMessage: '查找',
        noRecordMessage: '没有符合条件的记录存在',
        isContinueByDataChanged: '数据已经改变,如果继续将丢失数据,是否继续?',
        cancelMessage: '取消',
        saveMessage: '保存',
        applyMessage: '应用',
        draggingMessage: '{count}行'
    });

    $.extend($.ligerui.controls.CheckBox.prototype, {
        _getValue: function () {
            return this.element.checked ? 1 : 0;
        }
    });

    $.extend($.ligerui.controls.Grid.prototype, {
        _setShowAddButton: function (isShow) {
            var $this = this,
                options = this.options;
            if (isShow) {
                var btnTitle = options.addButtonTitle || "创建新数据";
                $("<a class=\"addnewproject\">" + btnTitle + "</a>").appendTo($this.element).click(function () {
                    var rCount = options.defaultRowCount || 1;
                    for (var i = 0; i < rCount; i++) {
                        var row = options.defaultRow;
                        if ($.isFunction(row)) row = row(i);
                        var E = $.extend({}, row);
                        $this.add(E)
                    }
                })
            }
        }
    });
    $.extend(liger.editors,
        {
            "combobox": {
                control: 'ComboBox'
            },
            "select": {
                control: 'ComboBox'
            },
            "checkboxlist": {
                control: 'CheckBoxList',
                body: $('<div></div>'),
                resize: function (editor, width, height, editParm) {
                    editor.set('width', width - 2);
                }
            },
            "radiolist": {
                control: 'RadioList',
                body: $('<div></div>'),
                resize: function (editor, width, height, editParm) {
                    editor.set('width', width - 2);
                }
            },
            "listbox": {
                control: 'ListBox',
                body: $('<div></div>'),
                resize: function (editor, width, height, editParm) {
                    editor.set('width', width - 2);
                }
            },
            "popup": {
                control: 'PopupEdit'
            },
            "popupobj": {
                control: 'PopupEdit',
                getValue: function (o, editParm) {
                    var val = o.getValue();
                    if (!val) return null;
                    return JSON.parse(val);
                },
                setValue: function (o, value, editParm) {
                    o.setValue(JSON.stringify(value));
                },
                setText: function (o, text, editParm) {
                    o.setText(JSON.stringify(text));
                },
                getText: function (o) {
                    var text = o.getText();
                    if (!text) return "";
                    return JSON.parse(text);
                }
            }
        });


    $.extend($.ligerDefaults.FilterString.strings, {

        "notstartwith": "不以..开始",
        "notendwith": "不以..结束",
        "notlike": "不包含"

    });



    //过滤器定义
    $.ligerDefaults.Filter.operators['popupselect'] = $.ligerDefaults.Filter.operators['select'] = ["equal", "notequal", "in", "notin"];
    $.ligerDefaults.Filter.operators['string'] = $.ligerDefaults.Filter.operators['text'] = ["equal", "notequal", "startwith", "endwith", "like", "notstartwith", "notendwith", "notlike"];
    $.ligerDefaults.Filter.operators['number'] = $.ligerDefaults.Filter.operators['int'] = $.ligerDefaults.Filter.operators['float'] =
    $.ligerDefaults.Filter.operators['date'] = $.ligerDefaults.Filter.operators['datepicker'] = ["greater", "greaterorequal", "less", "lessorequal"];


    //表格 格式化
    $.ligerDefaults.Grid.formatters['datetime'] = function (value, column) {
        function getFormatDate(date, dateformat) {
            var g = this, p = this.options;
            if (isNaN(date)) return null;
            var format = dateformat;
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        }
        if (!value) return "";
        // /Date(1328423451489)/
        if (typeof (value) == "string" && /^\/Date/.test(value)) {
            value = value.replace(/^\//, "new ").replace(/\/$/, "");
            eval("value = " + value);
        }
        if (value instanceof Date) {
            var format = column.format || this.options.dateFormat || "yyyy-MM-dd";
            return getFormatDate(value, format);
        }
        else {
            return value.toString();
        }
    }

    $.ligerDefaults.Grid.formatters['fk'] = $.ligerDefaults.Grid.formatters['ref'] = function (value) {
        if ($.isArray(value)) {
            var v = value.length > 1 ? value[1] : value[0];

            if ($.isArray(v)) {
                var vs = [];
                for (var i = 0; i < value.length; i++) {
                    vs.push(value[i].length > 1 ? value[i][1] : value[i][0]);
                }
                return vs.join(',');
            }
            return v;
        }
        return value;
    };

    //扩展 percent 百分比 类型的格式化函数(0到1之间)
    $.ligerDefaults.Grid.formatters['percent'] = function (value, column) {
        if (value < 0) value = 0;
        if (value > 1) value = 1;
        var precision = column.editor.precision || 0;
        return (value * 100).toFixed(precision) + "%";
    };

    //扩展 numberbox 类型的格式化函数
    $.ligerDefaults.Grid.formatters['numberbox'] = function (value, column) {
        var precision = column.editor.precision || 0;
        return value.toFixed(precision);
    };
    //扩展currency类型的格式化函数
    $.ligerDefaults.Grid.formatters['curreny'] =
    $.ligerDefaults.Grid.formatters['currency'] = function (num, column) {
        //num 当前的值
        //column 列信息
        if (!num) return "0.00";
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0.00";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
            num.substring(num.length - (4 * i + 3));
        return "" + (((sign) ? '' : '-') + '' + num + '.' + cents);
    };

    $.ligerDefaults.Grid.formatters['status'] = function (value) {
        var v = value ? value.toLowerCase() : "active";
        var o = { active: '未提交', submitted: '已提交', approved: '已审批' };
        if (o[v]) return o[v];
        return v;
    };

    $.ligerDefaults.Grid.formatters['wfstatus'] = function (value) {
        var v = value ? value.toLowerCase() : "active";


        var o = pbc.web.status_items;

        var content = [''];
        content.push('<span class="column-status column-status-' + v + '">' + (o[v] || v) + '</span>');

        return content.join('');
    };


    $.ligerDefaults.Grid.formatters['netstatus'] = function (value) {
        var v = value ? value.toLowerCase() : "active";


        var o = pbc.web.status_items;
        var text = (o[v] || v);
        if (!v || v == "active") text = "已接单";
        var content = [''];
        content.push('<span class="column-status column-status-' + v + '">' + text + '</span>');

        return content.join('');
    };


    $.ligerDefaults.Grid.formatters['checkbox'] = function (value) {
        return value == 1 ? '<a class="l-checkbox l-checkbox-checked"></a>' : '<a class="l-checkbox"></a>';
    };

    $.ligerDefaults.Grid.formatters['yesno'] = function (value) {
        return value == 1 ? '是' : '否';
    };
    'use strict';
    /**
     * @param {!Object} args
     * @param {?} formatter
     * @return {?}
     */
    liger.exportGrid = function (args, formatter) {
        /**
         * @param {!Object} options
         * @return {?}
         */
        function create(options) {
            var config = {
                display: options.showDisplay || options.display,
                name: options.name,
                width: options.width,
                align: options.align,
                totalType: ""
            };
            if (options.type == "int" || options.type == "curreny" || options.type == "currency") {
                if (options.totalSummary) {
                    /** @type {string} */
                    config.totalType = "C2";
                }
            }
            return config;
        }
        /**
         * @param {!Object} data
         * @return {undefined}
         */
        function init(data) {
            if (data.type != null && data.type.indexOf("date") != -1) {
                $(requiredRenders).each(function (canCreateDiscussions, hoodieStore) {
                    if (hoodieStore[data.name]) {
                        hoodieStore[data.name] = pbc.getFormatDate(hoodieStore[data.name], data.format || "yyyy-MM-dd hh:mm");
                    }
                });
            } else {
                if (data.type && $.ligerDefaults.Grid.formatters[data.type]) {
                    $(requiredRenders).each(function (canCreateDiscussions, attrs) {
                        if (attrs[data.name]) {
                            attrs[data.name] = $.ligerDefaults.Grid.formatters[data.type](attrs[data.name], data);
                        }
                    });
                }
            }
        }
        /**
         * @param {!Object} options
         * @return {undefined}
         */
        function format(options) {
            if (options.type == "int" || options.type == "curreny" || options.type == "currency") {
                if (options.totalSummary) {
                    d[options.name] = d[options.name] || 0;
                    $(requiredRenders).each(function (canCreateDiscussions, constraintDefinitions) {
                        if (constraintDefinitions[options.name]) {
                            d[options.name] += parseFloat(constraintDefinitions[options.name]);
                        }
                    });
                    if (options.type && $.ligerDefaults.Grid.formatters[options.type]) {
                        d[options.name] = $.ligerDefaults.Grid.formatters[options.type](d[options.name], options);
                    }
                }
            }
        }
        var i = args.rows;
        /** @type {!Array} */
        var requiredRenders = [];
        var d = {};
        $(i).each(function () {
            requiredRenders.push($.extend({}, args.formatRecord(this, true)));
        });
        var fields = args.options.columns;
        /** @type {!Array} */
        var value = [];
        /** @type {number} */
        var colCount = 0;
        $(fields).each(function (canCreateDiscussions, a) {
            var A = create(a);
            format(a);
            init(a);
            if (a.columns) {
                /** @type {!Array} */
                A.columns = [];
                $(a.columns).each(function (canCreateDiscussions, data) {
                    if (!data.name) {
                        return;
                    }
                    format(data);
                    init(data);
                    if ($.isFunction(formatter)) {
                        var output = formatter(data);
                        if (output == false) {
                            return;
                        } else {
                            if (output == "TOP") {
                                value.push(create(data));
                                return;
                            }
                        }
                    }
                    A.columns.push(create(data));
                    colCount++;
                });
            } else {
                if (!a.name) {
                    return;
                }
                colCount++;
            }
            if ($.isFunction(formatter) && formatter(a) == false) {
                return;
            }
            if (a.columns && !A.columns.length) {
                return;
            }
            value.push(A);
        });
        if (colCount > 15) {
            $(value).each(function (canCreateDiscussions, table) {
                /** @type {string} */
                table.width = "auto";
                if (table.columns) {
                    $(table.columns).each(function (canCreateDiscussions, oComponentProperties) {
                        /** @type {string} */
                        oComponentProperties.width = "auto";
                    });
                }
            });
        }
        return {
            columns: value,
            totaldata: d,
            listdata: requiredRenders
        };
    };


    liger.setProductEditor = function (editor) {
        $.extend(editor, {
            autocomplete: true,  //自动完成  
            url: '/file/GetExistProductImags'
        });

        editor.selectBoxWidth = 450;
        editor.onbeforeKeyEnter = function () {
            var g = this;
            var overItem = g.selectBox.find("div.productimg-over");
            if (overItem.length) {
                g.selectBox.find("div.productimg").removeClass("productimg-selected");
                overItem.addClass("productimg-selected");
                var name = overItem.find(".name").html();
                var id = overItem.attr("data-id");
                var WarehouseID = overItem.attr("WarehouseID");
                var WarehouseName = overItem.attr("WarehouseName");

                g._changeValue(id, name);
                if (WarehouseID && WarehouseName) {
                    var arr = [];
                    arr.push(WarehouseID);
                    arr.push(WarehouseName);
                    g.selected = {
                        ID: id,
                        ProCode: name,
                        Warehouse: arr
                    };
                }
                g.selectBox.hide();

            }
        };
        editor.selectBoxRender = function (e) {
            var combox = this;
            var oldValue = (combox.getValue() || "") + ",";
            var data = e.data;
            combox.selectBoxInner.html('').css("height", "400px");


            $.extend(combox,
                {
                    upFocus: function () {
                        var g = this, p = this.options;
                        var currentIndex = g.selectBox.find("div.productimg-over").attr("index");
                        if (currentIndex == undefined || currentIndex == "0") {
                            return;
                        }
                        else {
                            currentIndex = parseInt(currentIndex) - 1;
                        }
                        g.selectBox.find("div.productimg-over").removeClass("productimg-over");
                        g.selectBox.find(".productimg[index=" + currentIndex + "]").addClass("productimg-over");

                    },
                    downFocus: function () {
                        var g = this, p = this.options;
                        if (!data) return;
                        var currentIndex = g.selectBox.find("div.productimg-over").attr("index");
                        if (currentIndex == data.length - 1) return;
                        if (currentIndex == undefined) {
                            currentIndex = 0;
                        }
                        else {
                            currentIndex = parseInt(currentIndex) + 1;
                        }
                        g.selectBox.find("div.productimg-over").removeClass("productimg-over");
                        g.selectBox.find(".productimg[index=" + currentIndex + "]").addClass("productimg-over");

                    }
                });

            if (data) {
                $(data).each(function (i, item) {
                    var name = item.text;
                    if (!name) return;
                    var jitem = $('<div class="productimg" style="position: relative; overflow: hidden; width: 100px; height: 100px;"></div>').appendTo(combox.selectBoxInner);
                    jitem.attr({
                        index: i
                    }).attr("data-id", item.id);

                    if (item.data && item.data.Warehouse) {
                        jitem.attr({
                            WarehouseID: item.data.Warehouse[0],
                            WarehouseName: item.data.Warehouse[1]
                        });
                    }
                    var jimg = $('<img style="position: absolute; left: 12px; top: 2px; width: 77px; height: 77px;" />').appendTo(jitem);
                    jimg.attr({
                        src: item.src
                    });
                    var jname = $('<div class="name" style="position: absolute; bottom: 2px; width: 96px; height: 17px;text-align:center"></div>').appendTo(jitem);
                    jname.html(name);

                    jitem.click(function () {
                        var name = $(this).find(".name").html();
                        combox.selectBoxInner.find(".productimg").removeClass("productimg-selected");
                        jitem.addClass("productimg-selected");
                        update(item.id, name, item.data);
                        combox.selectBox.hide();
                    }).hover(function () {
                        if ($(this).hasClass("productimg-selected")) return;
                        $(this).addClass("productimg-over");
                    }, function () {
                        $(this).removeClass("productimg-over");
                    });

                    if (name == oldValue) {
                        jitem.addClass("productimg-selected");
                    }
                });
            }
            function update(id, name, data) {
                combox._changeValue(id, name);
                combox.selected = data;
            }
        };
    }
})();