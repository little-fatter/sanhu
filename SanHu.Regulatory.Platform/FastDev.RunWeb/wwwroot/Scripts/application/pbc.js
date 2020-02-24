'use strict';
(function ($) {
    /**
	 * @return {undefined}
	 */

    function initValidate() { /** @type {!Array} */
        pbc.validateRules = [{
            name: "email",
            title: "电子邮件",
            message: "必须输入正确格式的电子邮件",
            isSystem: true
        }, {
            name: "url",
            title: "网址格式",
            message: "必须输入正确格式的网址",
            isSystem: true
        }, {
            name: "dateISO",
            title: "日期格式",
            message: "必须输入正确格式的日期(ISO)",
            isSystem: true
        }, {
            name: "number",
            title: "数字(负数，小数)",
            message: "必须输入合法的数字(负数，小数)",
            isSystem: true
        }, {
            name: "digits",
            title: "整数",
            message: "必须输入整数",
            isSystem: true
        }, {
            name: "creditcard",
            title: "信用卡号",
            message: "必须输入合法的信用卡号",
            isSystem: true
        }, {
            name: "alnum",
            rule: "^[a-zA-Z0-9]+$",
            title: "数字+英文字母",
            message: "只能包括英文字母和数字"
        }, {
            name: "cellphone",
            rule: "^[1]\\d{10}$",
            title: "手机号码",
            message: "请正确填写手机号码"
        }, {
            name: "telephone",
            rule: "^(\\d{3,4}-?)?\\d{7,9}$",
            title: "电话号码",
            message: "请正确填写电话号码"
        }, {
            name: "zipcode",
            rule: "^[0-9]{6}$",
            title: "邮政编码",
            message: "请正确填写邮政编码"
        }, {
            name: "chcharacter",
            rule: "^[一-龥]+$",
            title: "汉字",
            message: "请输入汉字"
        }, {
            name: "qq",
            rule: "^[1-9][0-9]{4,}$",
            title: "QQ",
            message: "请输入正确的QQ"
        }, {
            name: "username",
            rule: "^[a-zA-Z][a-zA-Z0-9_]+$",
            title: "用户名格式",
            message: "用户名格式不正确"
        }, {
            name: "standardname",
            rule: "^[a-zA-Z][a-zA-Z0-9_]+$",
            title: "字母开头,数字+下划线",
            message: "格式输入不正确,必须字母开头,只能包括字母、数字或下划线"
        }, {
            name: "standardname3",
            rule: "[a-zA-Z0-9_]+",
            title: "字母+数字+下划线",
            message: "格式输入不正确,只能包括字母、数字或下划线"
        }, {
            name: "standardname2",
            rule: "^[a-zA-Z][a-zA-Z0-9_.]+",
            title: "字母+数字+下划线+点号",
            message: "格式输入不正确,必须字母开头,只能包括字母、数字、下划线或点号"
        }];
        /**
		 * @param {?} delItem
		 * @return {?}
		 */
        pbc.getValidateRule = function (delItem) { /** @type {number} */
            var index = 0;
            for (; index < pbc.validateRules.length; index++) {
                var item = pbc.validateRules[index];
                if (item.name == delItem) {
                    return item;
                }
            }
            return null;
        };
        /**
		 * @return {?}
		 */
        pbc.getDefaultValidate = function () {
            return {
                errorPlacement: function (error, element) {
                    if (!$(error).html()) {
                        return;
                    }
                    if (!element.attr("id")) { /** @type {number} */
                        var elementID = (new Date).getTime();
                        element.attr("id", elementID);
                        error.attr("for", elementID);
                    }
                    if (element.hasClass("l-textarea")) {
                        element.addClass("l-textarea-invalid");
                    } else {
                        if (element.hasClass("l-text-field")) {
                            element.parent().addClass("l-text-invalid");
                        }
                    }
                    var nirXml = $(error).html();
                    $(element).qtip({
                        content: nirXml,
                        position: {
                            my: "top center",
                            at: "bottom center"
                        }
                    });
                },
                success: function (parent) {
                    var label_for = parent.attr("for");
                    if (!label_for) {
                        return;
                    }
                    var element = $("#" + label_for);
                    if (element.hasClass("l-textarea")) {
                        element.removeClass("l-textarea-invalid");
                    } else {
                        element.parent().removeClass("l-text-invalid");
                    }
                    setTimeout(function () {
                        $(element).qtip("destroy");
                    }, 1);
                }
            };
        };
    }
    /**
	 * @param {!Object} merge_view
	 * @return {undefined}
	 */

    function ref_grid_edit_callback(merge_view) {
        if (!merge_view.editor) {
            return;
        } /** @type {string} */
        merge_view.editor.modeType = "editgrid";
    }
    /**
	 * @param {!Object} value
	 * @param {number} property
	 * @param {?} decorators
	 * @return {undefined}
	 */

    function select_updatematch_callback(value, property, decorators) {
        if (!value.editor) {
            return;
        }
        var reverseIsSingle = value.editor.select_updatematch_source;
        var reverseValue = value.editor.select_updatematch_target;
        if (reverseIsSingle && reverseValue) {
            var fieldArry = reverseIsSingle.split(";");
            var modelArr = reverseValue.split(";");
            /**
			 * @param {?} callback
			 * @param {?} name
			 * @param {?} event
			 * @return {undefined}
			 */
            value.editor.onSelected = function (callback, name, event) {
                /**
				 * @param {?} obj
				 * @return {?}
				 */

                function require(obj) {
                    var val = {}; /** @type {number} */
                    var i = 0;
                    for (; i < fieldArry.length && i < modelArr.length; i++) {
                        var level = obj[fieldArry[i]];
                        var rawDevice = modelArr[i];
                        val[modelArr[i]] = level;
                    }
                    return val;
                }
                if (!callback || !event) {
                    return;
                }
                if (decorators) {
                    var node = liger.lastEditGrid;
                    if (!node) {
                        return;
                    }
                    var hash = require(event);
                    node.endEdit();
                    node.update(node.lastEditRow, hash);
                } else {
                    var that = window.preview_page || window.freedesign_page;
                    if (!that || !that.form) {
                        return;
                    }
                    hash = require(event);
                    that.form.setData(hash);
                }
            };
        }
    }
    /**
	 * @param {!Object} value
	 * @param {number} dec
	 * @param {?} dsep
	 * @return {undefined}
	 */

    function listbox_callback(value, dec, dsep) {
        if (!(value.editor == value.editor)) {
            ({});
        } /** @type {boolean} */
        value.editor.isMultiSelect = true; /** @type {boolean} */
        value.editor.isShowCheckBox = true;
    }
    /**
	 * @param {?} s
	 * @param {boolean} wlhash
	 * @return {?}
	 */

    function createPopupClick(s, wlhash) {
        var me = $.extend({}, s);
        return function () {
            /**
			 * @param {string} data
			 * @return {undefined}
			 */

            function save(data) {
                /**
				 * @param {!Object} i
				 * @return {?}
				 */

                function doSaveProject(i) {
                    return pbc.createUpdateData(i, selector, options);
                }
                var reverseIsSingle = me.select_updatematch_source;
                var reverseValue = me.select_updatematch_target;
                var navCommonStyle = me.popupselect_default; /** @type {!Array} */
                var selector = []; /** @type {!Array} */
                var options = [];
                if (reverseIsSingle && reverseValue) {
                    selector = reverseIsSingle.split(";");
                    options = reverseValue.split(";");
                }
                if (!data || !data.length) {
                    return;
                }
                if (wlhash) {
                    var self = liger.lastEditGrid;
                    if (!self) {
                        return;
                    }
                    if (err) {
                        self.endEdit();
                        var highestPrioColumn = self.lastEditRow["__index"];
                        var array = self.rows;
                        var index = highestPrioColumn; /** @type {number} */
                        var i = 0;
                        for (; index < array.length; index++ , i++) {
                            if (i < data.length) {
                                var node = doSaveProject(data[i]);
                                if (D) {
                                    node[field.name] = data[i][me.valueField];
                                } else { /** @type {!Array} */
                                    node[field.name] = [data[i][me.valueField], data[i][me.textField]];
                                }
                                if (navCommonStyle) {
                                    $.extend(node, navCommonStyle);
                                }
                                $.extend(array[index], node);
                            }
                        }
                        for (; i < data.length; i++) {
                            node = doSaveProject(data[i]);
                            if (D) {
                                node[field.name] = data[i][me.valueField];
                            } else { /** @type {!Array} */
                                node[field.name] = [data[i][me.valueField], data[i][me.textField]];
                            }
                            if (navCommonStyle) {
                                $.extend(node, navCommonStyle);
                            }
                            self._addData($.extend({}, node));
                        }
                        self.reRender();
                    } else {
                        node = doSaveProject(data[0]);
                        self.endEdit();
                        self.update(self.lastEditRow, node);
                    }
                } else {
                    var coreTree = that.get("host_form");
                    if (coreTree) {
                        node = doSaveProject(data[0]);
                        coreTree.setData(node);
                    }
                }
            }
            var that = this; /** @type {null} */
            var typeaheadValues = null;
            var requestOrUrl = $.isFunction(me.popupselect_url) ? me.popupselect_url.call(that) : me.popupselect_url;
            if (requestOrUrl === false) {
                return;
            }
            var torrent_title = $.isFunction(me.popupselect_title) ? me.popupselect_title.call(that) : me.popupselect_title; /** @type {null} */
            var ongoingMessage = null;
            var message = that.getValue();
            if (message) {
                var crossfilterable_layers = message.split(";");
                var expRecords = that.getText().split(";"); /** @type {!Array} */
                message = []; /** @type {number} */
                var layer_i = 0;
                for (; layer_i < crossfilterable_layers.length; layer_i++) {
                    message.push([crossfilterable_layers[layer_i], expRecords[layer_i]]);
                } /** @type {!Array} */
                ongoingMessage = message;
            } /** @type {boolean} */
            var D = that.get("isTextBoxMode") ? true : false; /** @type {boolean} */
            var err = false;
            var A = $.isFunction(me.popupselect_ismul) ? me.popupselect_ismul.call(that) : me.popupselect_ismul;
            if (A) { /** @type {boolean} */
                err = true;
            }
            var I = $.isFunction(me.popupselect_parms) ? me.popupselect_parms.call(that) : me.popupselect_parms;
            var data = {
                url: requestOrUrl,
                top: 50,
                width: me.popupselect_width,
                height: me.popupselect_height,
                title: torrent_title,
                data: {
                    selectorType: true,
                    singleMode: !err,
                    parms: I,
                    isGridEditor: wlhash,
                    filter: [],
                    selectorInitData: ongoingMessage,
                    valueField: me.valueField || "ID",
                    textField: me.textField,
                    callback: function (data) { /** @type {!Array} */
                        var drilldownLevelLabels = []; /** @type {!Array} */
                        var responseGroup = []; /** @type {number} */
                        var i = 0;
                        for (; i < data.length; i++) {
                            drilldownLevelLabels.push(data[i][me.valueField]);
                            responseGroup.push(data[i][me.textField]);
                            if (!err) {
                                break;
                            }
                        }
                        that.selected = err ? data : data.length ? data[0] : null;
                        that._changeValue(drilldownLevelLabels.join(","), responseGroup.join(","), true);
                        save(data);
                        setTimeout(function () {
                            if (typeaheadValues) {
                                typeaheadValues.close();
                            }
                        }, 50);
                    }
                }
            };
            if (me.popupselect_dialog) {
                $.extend(data, me.popupselect_dialog);
            }
            typeaheadValues = $.ligerDialog.open(data);
        };
    }
    /**
	 * @param {!Object} element
	 * @param {number} y
	 * @param {boolean} zoomAware
	 * @return {undefined}
	 */

    function popupselect_callback(element, y, zoomAware) {
        if (!(element.editor == element.editor)) {
            ({});
        }
        element.editor.popupselect_type = element.editor.popupselect_type || "popupselect"; /** @type {boolean} */
        var onBindElement = y == "ref_popupselect_mul";
        if (element.editor.popupselect_type == "popupselect" || element.editor.popupselect_type == "select") { /** @type {boolean} */
            element.editor.autocomplete = true; /** @type {boolean} */
            element.editor.delayLoad = true;
            if (onBindElement) { /** @type {boolean} */
                element.editor.isMultiSelect = false; /** @type {boolean} */
                element.editor.isShowCheckBox = false;
            }
        } else { /** @type {boolean} */
            element.editor.delayLoad = true; /** @type {null} */
            element.editor.url = null;
        }
        if (element.editor.popupselect_type == "popupselect" || element.editor.popupselect_type == "popup") {
            element.editor.onButtonClick = element.editor.onButtonClick ||
                function () {
                    /**
                     * @param {string} data
                     * @return {undefined}
                     */

                    function render(data) {
                        /**
                         * @param {!Object} selector
                         * @param {number} options
                         * @return {?}
                         */

                        function jQuery(selector, options) {
                            var ret = {}; /** @type {number} */
                            var i = 0;
                            for (; i < attributes.length && i < a.length; i++) {
                                var tmp = pbc.getExpValue(selector, attributes[i], options);
                                var c1 = a[i];
                                ret[a[i]] = tmp;
                            }
                            return ret;
                        }
                        var reverseIsSingle = element.editor.select_updatematch_source;
                        var reverseValue = element.editor.select_updatematch_target;
                        var navCommonStyle = element.editor.popupselect_default; /** @type {!Array} */
                        var attributes = []; /** @type {!Array} */
                        var a = [];
                        if (reverseIsSingle && reverseValue) {
                            attributes = reverseIsSingle.split(";");
                            a = reverseValue.split(";");
                        }
                        if (!data || !data.length) {
                            return;
                        }
                        if (zoomAware) {
                            var options = liger.lastEditGrid;
                            if (!options) {
                                return;
                            }
                            if (element.editor.popupselect_ismul) {
                                options.endEdit();
                                var firstDisplayed = options.lastEditRow["__index"];
                                var rows = options.rows;
                                var i = firstDisplayed; /** @type {number} */
                                var j = 0;
                                for (; i < rows.length; i++ , j++) {
                                    if (j < data.length) {
                                        var result = jQuery(data[j], j);
                                        if (F) {
                                            result[element.name] = data[j][element.editor.valueField];
                                        } else { /** @type {!Array} */
                                            result[element.name] = [data[j][element.editor.valueField], data[j][element.editor.textField]];
                                        }
                                        if (navCommonStyle) {
                                            $.extend(result, navCommonStyle);
                                        }
                                        $.extend(rows[i], result);
                                    }
                                }
                                for (; j < data.length; j++) {
                                    result = jQuery(data[j], j);
                                    if (F) {
                                        result[element.name] = data[j][element.editor.valueField];
                                    } else { /** @type {!Array} */
                                        result[element.name] = [data[j][element.editor.valueField], data[j][element.editor.textField]];
                                    }
                                    if (navCommonStyle) {
                                        $.extend(result, navCommonStyle);
                                    }
                                    options._addData($.extend({}, result));
                                }
                                options.reRender();
                            } else {
                                result = jQuery(data[0], 0);
                                options.endEdit();
                                options.update(options.lastEditRow, result);
                            }
                        } else {
                            var that = window.preview_page || window.freedesign_page;
                            if (!that || !that.form) {
                                return;
                            }
                            result = jQuery(data[0]);
                            that.form.setData(result);
                        }
                    }
                    var that = this; /** @type {null} */
                    var sslServer = null;
                    var requestOrUrl = $.isFunction(element.editor.popupselect_url) ? element.editor.popupselect_url.call(that) : element.editor.popupselect_url;
                    if (requestOrUrl === false) {
                        return;
                    } /** @type {null} */
                    var ongoingMessage = null;
                    var message = that.getValue();
                    if (message) {
                        var spheres = message.split(";");
                        var matmul_exprgenF = that.getText().split(";"); /** @type {!Array} */
                        message = []; /** @type {number} */
                        var iter_sph = 0;
                        for (; iter_sph < spheres.length; iter_sph++) {
                            message.push([spheres[iter_sph], matmul_exprgenF[iter_sph]]);
                        } /** @type {!Array} */
                        ongoingMessage = message;
                    } /** @type {boolean} */
                    var F = that.get("isTextBoxMode") ? true : false;
                    var options = {
                        url: requestOrUrl,
                        top: 100,
                        width: element.editor.popupselect_width,
                        height: element.editor.popupselect_height,
                        title: element.editor.popupselect_title,
                        openerData: {
                            selectorType: true,
                            singleMode: onBindElement ? false : zoomAware && element.editor.popupselect_ismul ? false : true,
                            isGridEditor: zoomAware,
                            filter: [],
                            selectorInitData: ongoingMessage,
                            valueField: element.editor.valueField || "ID",
                            textField: element.editor.textField,
                            callback: function (el) { /** @type {!Array} */
                                var kv = []; /** @type {!Array} */
                                var drilldownLevelLabels = []; /** @type {number} */
                                var i = 0;
                                for (; i < el.length; i++) {
                                    kv.push(pbc.getExpValue(el[i], element.editor.valueField));
                                    drilldownLevelLabels.push(pbc.getExpValue(el[i], element.editor.textField));
                                    if (!onBindElement) {
                                        break;
                                    }
                                }
                                that.selected = onBindElement ? el : el.length ? el[0] : null;
                                if (F) {
                                    if (kv.length) {
                                        that._changeValue(kv[0], kv[0], true);
                                    }
                                } else {
                                    that._changeValue(kv.join(";"), drilldownLevelLabels.join(";"), true);
                                }
                                if (!onBindElement) {
                                    render(el);
                                }
                                setTimeout(function () {
                                    if (sslServer) {
                                        sslServer.close();
                                    }
                                }, 50);
                            }
                        }
                    };
                    pbc.preOptions(options, function () {
                        sslServer = pbc.openPage(options, "dialog");
                    });
                    return false;
                };
        }
    }
    /**
	 * @param {string} id
	 * @return {?}
	 */

    function isUrlKey(id) {
        if (typeof id != "string") {
            return false;
        }
        if (id == "url") {
            return true;
        }
        if (endWith(id, "Url")) {
            return true;
        }
        return false;
    }
    /**
	 * @param {string} svg_current
	 * @return {?}
	 */

    function lowerCaseString(svg_current) {
        return svg_current.substring(0, 1).toLowerCase() + svg_current.substr(1);
    }
    /**
	 * @param {string} s
	 * @param {string} suffix
	 * @return {?}
	 */

    function endWith(s, suffix) {
        if (suffix == null || suffix == "" || s.length == 0 || suffix.length > s.length) {
            return false;
        }
        if (s.substring(s.length - suffix.length) == suffix) {
            return true;
        } else {
            return false;
        }
        return true;
    }
    try { /** @type {boolean} */
        var enabledTop = top ? true : false;
    } catch (e) {
        top = window;
    }
    window.pbc = window.pbc || {};
    $.extend(pbc, {
        page: {},
        urlRoot: "/",
        res: {
            search: "搜索",
            saving: "保存中...",
            loading: "正在加载中...",
            checking: "验证中...",
            saveSuccess: "保存成功 #message#",
            saveFalid: "保存失败:#message#",
            save: "保存",
            close: "关闭",
            ok: "确定",
            pleaseSelect: "请选择行",
            cancel: "取消",
            confirmDel: "确定删除吗?",
            confirmSubmit: "确定提交吗?",
            submitSuccess: "提交成功",
            approveSuccess: "审批成功",
            revokeSuccess: "撤销成功",
            delSuccess: "删除成功"
        },
        editors: {},
        defaults: {},
        uploaderTag: 0
    });
    if (window.FreeDesign && window.FreeDesign.config) {
        if (window.FreeDesign.config.root) {
            pbc.urlRoot = window.FreeDesign.config.root;
        }
        if (window.FreeDesign.config.domain) {
            pbc.domain = window.FreeDesign.config.domain;
        }
    }
    /**
	 * @param {!Object} base
	 * @param {?} prototype
	 * @return {?}
	 */
    Function.prototype.freedesignExtend = function (base, prototype) {
        if (typeof base != "function") {
            return this;
        }
        this.base = base.prototype; /** @type {!Object} */
        this.base.constructor = base;
        /**
		 * @return {undefined}
		 */
        var F = function () { };
        F.prototype = base.prototype;
        this.prototype = new F; /** @type {!Function} */
        this.prototype.constructor = this;
        if (prototype) {
            $.extend(this.prototype, prototype);
        }
    };
    initValidate();
    /**
	 * @param {string} text
	 * @return {?}
	 */
    pbc.deserialize = function (text) {
        try { /** @type {null} */
            var o = null;
            eval("o = " + text);
            return o;
        } catch (e) {
            return null;
        }
    };
    /**
	 * @param {!Object} value
	 * @return {?}
	 */
    pbc.serialize = function (value) {
        /**
		 * @param {number} n
		 * @return {?}
		 */
        var pad = function (n) {
            return n < 10 ? "0" + n : n;
        };
        var deletedHashes = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }; /** @type {!RegExp} */
        var multiple_slash_re = /[\\"]/g;
        /**
		 * @param {string} path
		 * @return {?}
		 */
        var serialize = function (path) { /** @type {number} */
            multiple_slash_re.lastIndex = 0;
            return multiple_slash_re.test(path) ? '"' + path.replace(multiple_slash_re, function (hash) {
                var obj = deletedHashes[hash];
                return typeof obj === "string" ? obj : "\\u" + ("0000" + hash.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + path + '"';
        };
        if (value === null) {
            return "null";
        } /** @type {string} */
        var type = typeof value;
        if (type === "undefined") {
            return undefined;
        }
        if (type === "function") {
            return value.toString();
        }
        if (type === "string") {
            return serialize(value);
        }
        if (type === "number" || type === "boolean") {
            return "" + value;
        }
        if (type === "object") {
            if (typeof value.toJSON === "function") {
                return pbc.serialize(value.toJSON());
            }
            if (value.constructor === Date) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + pad(this.getUTCMonth() + 1) + "-" + pad(this.getUTCDate()) + "T" + pad(this.getUTCHours()) + ":" + pad(this.getUTCMinutes()) + ":" + pad(this.getUTCSeconds()) + "Z" : null;
            } /** @type {!Array} */
            var ret = [];
            if (value.constructor === Array) { /** @type {number} */
                var i = 0;
                var valueLength = value.length;
                for (; i < valueLength; i++) {
                    ret.push(pbc.serialize(value[i]) || "null");
                }
                return "[" + ret.join(",") + "]";
            }
            var s;
            var n;
            var key;
            for (key in value) { /** @type {string} */
                type = typeof key;
                if (type === "number") { /** @type {string} */
                    s = '"' + key + '"';
                } else {
                    if (type === "string") {
                        s = serialize(key);
                    } else {
                        continue;
                    }
                } /** @type {string} */
                type = typeof value[key];
                if (type === "undefined") {
                    continue;
                }
                n = pbc.serialize(value[key]);
                ret.push(s + ":" + n);
            }
            return "{" + ret.join(",") + "}";
        }
    };
    /**
	 * @return {?}
	 */
    pbc.getExpressionInit = function () { /** @type {!Array} */
        var drilldownLevelLabels = [];
        drilldownLevelLabels.push("function iff(a,b,c){ return  a?b:c; }");
        drilldownLevelLabels.push("function sum(data,exp){   ");
        drilldownLevelLabels.push("var sum = 0;");
        drilldownLevelLabels.push("for (var i = 0; data && i < data.length; i++)");
        drilldownLevelLabels.push("{");
        drilldownLevelLabels.push("    var item = data[i];");
        drilldownLevelLabels.push("    var itemValue = HG.getExpValue(item, 'exp:' + exp, i);");
        drilldownLevelLabels.push(" if (itemValue)");
        drilldownLevelLabels.push("{");
        drilldownLevelLabels.push("   sum += parseFloat(itemValue);");
        drilldownLevelLabels.push(" }");
        drilldownLevelLabels.push("}");
        drilldownLevelLabels.push("   return sum;");
        drilldownLevelLabels.push(" }");
        drilldownLevelLabels.push("function cint(a){ return parseInt(a);}");
        drilldownLevelLabels.push("function cfloat(a) { return parseFloat(a); }");
        drilldownLevelLabels.push("function number(a) { return parseFloat(a); }");
        return drilldownLevelLabels.join(" ");
    };
    /**
	 * @param {!Object} e
	 * @return {?}
	 */
    pbc.getExpressionValue = function (e) {
        try {
            var exp = e.exp;
            var data = e.data; /** @type {null} */
            var fn = null; /** @type {string} */
            var evalStr = "fn = function(data){ " + pbc.getExpressionInit() + " return " + exp + "}";
            eval(evalStr);
            return fn(data);
        } catch (e) {
            return "";
        }
    };
    /**
	 * @param {?} text
	 * @return {?}
	 */
    pbc.formatJSCode = function (text) {
        return jsl.format.formatJson(text);
    };
    pbc.cookies = function () {
        /**
		 * @return {undefined}
		 */
        var fn = function () { };
        /**
		 * @param {string} type
		 * @return {?}
		 */
        fn.prototype.get = function (type) { /** @type {string} */
            var displayName = ""; /** @type {string} */
            var key = type + "=";
            if (document.cookie.length > 0) { /** @type {number} */
                offset = document.cookie.indexOf(key);
                if (offset != -1) { /** @type {number} */
                    offset = offset + key.length; /** @type {number} */
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) { /** @type {number} */
                        end = document.cookie.length;
                    } /** @type {string} */
                    displayName = decodeURIComponent(document.cookie.substring(offset, end));
                }
            }
            return displayName;
        };
        /**
		 * @param {string} val
		 * @param {!Object} source
		 * @param {number} width
		 * @return {undefined}
		 */
        fn.prototype.set = function (val, source, width) { /** @type {string} */
            var expires = ""; /** @type {number} */
            var whatToScale = 1;
            if (width != null) { /** @type {number} */
                whatToScale = width;
            } /** @type {!Date} */
            expires = new Date((new Date).getTime() + whatToScale * 86400000); /** @type {string} */
            expires = "; expires=" + expires.toGMTString(); /** @type {string} */
            document.cookie = val + "=" + encodeURIComponent(source) + ";path=/" + expires;
        };
        /**
		 * @param {string} cookieName
		 * @return {undefined}
		 */
        fn.prototype.remvoe = function (cookieName) { /** @type {string} */
            var expires = ""; /** @type {!Date} */
            expires = new Date((new Date).getTime() - 1); /** @type {string} */
            expires = "; expires=" + expires.toGMTString(); /** @type {string} */
            document.cookie = cookieName + "=" + escape("") + ";path=/" + expires;
        };
        return new fn;
    }();
    /**
	 * @param {!Object} num
	 * @return {?}
	 */
    pbc.getCurrency = function (num) {
        if (!num) {
            return "0.00";
        }
        num = num.toString().replace(/\$|,/g, "");
        if (isNaN(num)) { /** @type {string} */
            num = "0.00";
        } /** @type {boolean} */
        sign = num == (num = Math.abs(num)); /** @type {number} */
        num = Math.floor(num * 100 + 0.50000000001); /** @type {number} */
        cents = num % 100; /** @type {string} */
        num = Math.floor(num / 100).toString();
        if (cents < 10) { /** @type {string} */
            cents = "0" + cents;
        } /** @type {number} */
        var i = 0;
        for (; i < Math.floor((num.length - (1 + i)) / 3); i++) { /** @type {string} */
            num = num.substring(0, num.length - (4 * i + 3)) + "," + num.substring(num.length - (4 * i + 3));
        }
        return "" + ((sign ? "" : "-") + "" + num + "." + cents);
    };
    /**
	 * @param {!Object} config
	 * @return {undefined}
	 */
    pbc.tip = function (config) {
        if (pbc.wintip) {
            pbc.wintip.set("content", config);
            pbc.wintip.show();
        } else {
            pbc.wintip = $.ligerDialog.tip({
                content: config
            });
        }
        setTimeout(function () {
            pbc.wintip.hide();
        }, 4000);
    };
    /**
	 * @param {?} n
	 * @param {?} data
	 * @param {?} callback
	 * @return {undefined}
	 */
    pbc.showConfirm = function (n, data, callback) {
        /**
		 * @return {undefined}
		 */

        function confirm() {
            $("#model_confim").modal("show");
            $("#model_confim .mtitle").text(n);
            $("#model_confim .mcontent").text(data);
            $("#model_confim .btnok").unbind("click");
            $("#model_confim .btnok").bind("click", function () {
                if (callback) {
                    callback();
                }
                $("#model_confim").modal("hide");
            });
        }
        if (!$("body #model_confim").length) {
            require(["text!js/templates/model_confim.html"], function (payloadParamName) {
                $("body").append(payloadParamName);
                confirm();
            });
        } else {
            confirm();
        }
    };
    /**
	 * @param {?} data
	 * @param {?} title
	 * @param {?} fn
	 * @return {undefined}
	 */
    pbc.showAlert = function (data, title, fn) {
        /**
		 * @return {undefined}
		 */

        function show() {
            $("#model_alert").modal("show");
            $("#model_alert .mtitle").text(data);
            $("#model_alert .mcontent").text(title);
            $("#model_alert .btnok").unbind("click");
            $("#model_alert .btnok").bind("click", function () {
                if (fn) {
                    fn();
                }
                $("#model_alert").modal("hide");
            });
        }
        if (!$("body #model_alert").length) {
            require(["text!js/templates/model_alert.html"], function (payloadParamName) {
                $("body").append(payloadParamName);
                show();
            });
        } else {
            show();
        }
    }; /** @type {boolean} */
    /**
	 * @return {?}
	 */
    pbc.getDefaultValidate = function () {
        return {
            errorPlacement: function (error, element) {
                if (!$(error).html()) {
                    return;
                }
                if (!element.attr("id")) { /** @type {number} */
                    var elementID = (new Date).getTime();
                    element.attr("id", elementID);
                    error.attr("for", elementID);
                }
                if (console && console.log) {
                    console.log("error " + element.attr("name"));
                }
                if (element.hasClass("l-textarea")) {
                    element.addClass("l-textarea-invalid");
                } else {
                    if (element.hasClass("l-text-field")) {
                        element.parent().addClass("l-text-invalid");
                    }
                }
                var nirXml = $(error).html();
                $(element).qtip({
                    content: nirXml,
                    position: {
                        my: "top center",
                        at: "bottom center"
                    }
                });
            },
            success: function (label, status) {
                var label_for = label.attr("for");
                if (!label_for) {
                    return;
                }
                var element = $("#" + label_for);
                if (element.hasClass("l-textarea")) {
                    element.removeClass("l-textarea-invalid");
                } else {
                    element.parent().removeClass("l-text-invalid");
                }
                setTimeout(function () {
                    $(element).qtip("destroy");
                }, 1);
            }
        };
    };
    /**
	 * @param {?} value
	 * @param {!Object} year
	 * @return {undefined}
	 */
    pbc.prevLoadImage = function (value, year) {
        var mainWord;
        for (mainWord in year) {
            $("<img />").attr("src", value + year[mainWord]);
        }
    };
    /**
	 * @return {undefined}
	 */
    pbc.mask = function () {
        var $parentDiv = $("<div class='ne-mask'></div>").show().appendTo("body");
        if ($parentDiv.height() < 300) {
            $parentDiv.height($(window).height());
        }
    };
    /**
	 * @return {undefined}
	 */
    pbc.unmask = function () {
        $("body > .ne-mask").remove();
    };
    /**
	 * @param {!Object} message
	 * @param {number} options
	 * @return {undefined}
	 */
    pbc.showLoading = function (message, options) {
        message = message || pbc.res.loading;
        if (options == 2) {
            $("body").append("<div class='jloading'>" + message + "</div>");
        } else {
            pbc.mask();
            var $img = $("<div class='sloading'>" + message + "</div>").show().appendTo("body");
            $img.css("marginLeft", -1 * $img.width() * 0.5);
        }
    };
    /**
	 * @param {?} options
	 * @return {undefined}
	 */
    pbc.hideLoading = function (options) {
        pbc.unmask();
        if ($("body > div.sloading").length) {
            $("body > div.sloading").remove();
            return;
        } else {
            $("body > div.jloading").remove();
        }
    }; /** @type {function(string): ?} */
    pbc.resolveUrl = pbc.toUrl = pbc.url = function (value) {
        if (value && value.indexOf("http://") == 0) {
            return value;
        }
        if (value && value.indexOf(pbc.urlRoot) != 0) {
            if (value.indexOf("/") == 0) {
                value = value.substr(1);
            }
            value = pbc.urlRoot + value;
        }
        return value;
    };
    /**
	 * @param {string} data
	 * @param {string} options
	 * @return {undefined}
	 */
    pbc.showSuccess = function (data, options) {
        if (typeof data == "function" || arguments.length == 0) { /** @type {string} */
            options = data; /** @type {string} */
            data = "操作成功!";
        }
        $.ligerDialog.success(data, "提示信息", options);
    };
    /**
	 * @param {string} message
	 * @param {string} title
	 * @return {undefined}
	 */
    pbc.showError = function (message, title) {
        if (typeof message == "function" || arguments.length == 0) { /** @type {string} */
            title = message; /** @type {string} */
            message = "操作失败!";
        }
        if (window.toastr && toastr.error) {
            toastr.error(message, title);
        } else {
            $.ligerDialog.error(message, "提示信息", title);
        }
    };
    /**
	 * @return {?}
	 */
    pbc.getGuid = function () {
        /**
		 * @return {?}
		 */
        var S4 = function () {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
        };
        return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
    };
    /**
	 * @param {!Object} authorsStr
	 * @return {undefined}
	 */
    pbc.prevDialogImage = function (authorsStr) {
        authorsStr = authorsStr || "";
    };
    /**
	 * @return {?}
	 */
    pbc.getAppId = function () {
        try {
            var appId = (window.FreeDesign || top.FreeDesign || {}).appId || pbc.getQueryStringByName("appid") || window.NEAppID;
            if (!appId) {
                return "";
            }
            return appId;
        } catch ($) {
            appId = (window.FreeDesign || {}).appId || pbc.getQueryStringByName("appid") || window.NEAppID;
            if (!appId) {
                return "";
            }
            return appId;
        }
    };
    /**
	 * @param {!Object} url
	 * @return {?}
	 */
    pbc.getAppUrl = function (url) {
        url = url || "";
        if (url.indexOf("appid=") > -1) {
            return url;
        }
        var upgd = pbc.getAppId();
        if (!upgd) {
            return url;
        } /** @type {string} */
        url = url + ((url.indexOf("?") == -1 ? "?" : "&") + "appid=" + upgd);
        return url;
    };
    /**
	 * @param {!Object} options
	 * @return {undefined}
	 */
    pbc.ajax = function (options) {
        /**
		 * @param {!Object} thing
		 * @return {undefined}
		 */

        function complete(thing) {
            $.ligerDialog.open({
                cls: "l-dialog-waittingdialog",
                type: "none",
                content: thing,
                height: 150,
                top: 220,
                modal: true,
                allowClose: false
            });
        }
        /**
		 * @param {?} newRangeElements
		 * @return {undefined}
		 */

        function change(newRangeElements) {
            $.ligerDialog.open({
                cls: "l-dialog-waittingdialog",
                type: "none",
                content: loadinghtml,
                height: 150,
                top: 220,
                modal: true,
                allowClose: false
            });
        }
        options.url = pbc.getAppUrl(options.url);
        options = $.extend({
            loading: "正在处理中..."
        }, options);
        var settings = $.extend({
            cache: false,
            async: true,
            dataType: "json",
            type: "post",
            contentType: "application/json",
            beforeSend: function () {
                if (options.loading) {
                    try {
                        top.pbc.showLoading(options.loading);
                    } catch ($) {
                        pbc.showLoading(options.loading);
                    }
                }
            },
            complete: function () {
                if (options.loading) {
                    try {
                        top.pbc.hideLoading();
                    } catch ($) { }
                    pbc.hideLoading();
                }
            },
            success: function (bufDesc) { },
            error: function (eventName, callback) { }
        }, options);
        if (!settings.url) {
            return;
        }
        if (settings.contentType == "application/json" && typeof settings.data != "string") { /** @type {string} */
            settings.data = JSON.stringify(settings.data);
        }
        $.ajax(settings);
    };
    pbc.defaults.tips = {
        renderTo: "body",
        type: 0,
        autoClose: true,
        time: undefined,
        top: 15,
        onClose: null,
        onShow: null
    };
    /**
	 * @param {number} options
	 * @return {undefined}
	 */
    pbc.tips = function (options) {
        /**
		 * @return {undefined}
		 */

        function on() {
            if (o.width) {
                wrapper.css("width", o.width);
            }
            var B = wrapper.outerHeight();
            var C = $(window).height();
            var toolbarHeight = $(window).scrollTop();
            var editorWithToolbarHeight = parseInt(o.top) + toolbarHeight;
            wrapper.css({
                position: useAbsolutePositioning ? "absolute" : "fixed",
                left: "50%",
                top: editorWithToolbarHeight,
                zIndex: "9999",
                marginLeft: -wrapper.outerWidth() / 2
            });
            window.setTimeout(function () {
                wrapper.show().css({
                    marginLeft: -wrapper.outerWidth() / 2
                });
            }, 180);
            if (useAbsolutePositioning) {
                $(window).bind("resize scroll", function () {
                    var cssPosition = $(window).scrollTop() + parseInt(o.top);
                    wrapper.css("top", cssPosition);
                });
            }
        }
        /**
		 * @return {undefined}
		 */

        function start() {
            wrapper.fadeOut(200, function () {
                $(this).remove();
                if (o.onClose) {
                    o.onClose();
                }
            });
        } /** @type {boolean} */
        var meta_db = !!window.ActiveXObject; /** @type {boolean} */
        var useAbsolutePositioning = meta_db && !window.XMLHttpRequest; /** @type {boolean} */
        var is_remote = meta_db && !!document.documentMode; /** @type {boolean} */
        var C = meta_db && !useAbsolutePositioning && !is_remote;
        if (typeof options == "string" || typeof options == "number") {
            if (arguments.length == 1) {
                options = {
                    content: arguments[0]
                };
            } else {
                if (arguments.length >= 2) {
                    options = {
                        type: arguments[0],
                        content: arguments[1]
                    };
                }
            }
        }
        var o = $.extend({}, pbc.defaults.tips, options);
        var wrapper = $('<div class="ne-tips"><i></i><span class="close"></span></div>').append(o.content);
        var _btnUp = wrapper.find(".close"); /** @type {!Array} */
        var alignClasses = ["ne-tips-success", "ne-tips-warning", "ne-tips-error"];
        if (alignClasses[parseInt(o.type) - 1]) {
            wrapper.addClass(alignClasses[parseInt(o.type) - 1]);
        } else {
            wrapper.addClass(alignClasses[0]);
        }
        wrapper.appendTo("body").hide();
        on();
        if (o.onShow) {
            o.onShow();
        }
        _btnUp.bind("click", function () {
            start();
        });
        if (o.autoClose) { /** @type {number} */
            var renewTokenIn = o.time || o.type == 1 ? 3000 : 2000;
            window.setTimeout(function () {
                start();
            }, renewTokenIn);
        }
    };
    /**
	 * @param {number} content
	 * @param {string} time
	 * @param {?} withoutAnimation
	 * @return {undefined}
	 */
    pbc.tipsInTop = function (content, time, withoutAnimation) {
        try {
            if (!top.pbc) {
                return;
            }
            top.pbc.tips(content, time, withoutAnimation);
        } catch (B) { }
    };
    /**
	 * @return {undefined}
	 */
    pbc.hideLoadingInTop = function () {
        try {
            if (top.pbc) {
                top.pbc.hideLoading();
            }
        } catch ($) { }
    };
    /**
	 * @param {string} date
	 * @param {string} dateformat
	 * @return {?}
	 */
    pbc.getFormatDate = function (date, dateformat) {
        try {
            dateformat = dateformat || "yyyy-MM-dd";
            if (typeof date == "string" && /^\/Date/.test(date)) { /** @type {string} */
                date = date.replace(/^\//, "new ").replace(/\/$/, "");
                eval("date = " + date);
            } else {
                if (typeof date == "string" && getIsDateTime(date)) {
                    var nSateStr = date.replace(/-/g, "/");
                    date = new Date(nSateStr);
                }
            }
            if (isNaN(date)) {
                return null;
            } /** @type {string} */
            var format = dateformat;
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds()
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            var k;
            for (k in o) {
                if ((new RegExp("(" + k + ")")).test(format)) {
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        } catch (e) {
            return date;
        }
    };
    /**
	 * @param {?} data
	 * @return {undefined}
	 */
    pbc.pager = function (data) {
        /**
		 * @return {undefined}
		 */

        function pager() { }
        /**
		 * @return {undefined}
		 */

        function link() {
            /**
			 * @return {?}
			 */

            function formatter() { /** @type {!Array} */
                var outChance = [];
                outChance.push('<div class="l-panel-bar">');
                outChance.push('    <div class="l-panel-bbar-inner">         ');
                outChance.push('        <div class="l-bar-group  l-bar-message"><span class="l-bar-text"></span></div>           ');
                outChance.push('        <div class="l-bar-separator" style="margin-left:0px;"></div>               ');
                outChance.push('        <div class="l-bar-group">                    ');
                outChance.push('            <div class="l-bar-button l-bar-btnfirst"><span></span></div>               ');
                outChance.push('            <div class="l-bar-button l-bar-btnprev"><span></span></div>                </div>         ');
                outChance.push('            <div class="l-bar-separator"></div>                ');
                outChance.push('            <div class="l-bar-group" style="padding-top: 2px;"><span class="pcontrol"> <input type="text" size="4" value="1" style="width:20px" maxlength="3"> / <span>1</span></span></div>        ');
                outChance.push('            <div class="l-bar-separator"></div>                ');
                outChance.push('            <div class="l-bar-group">                     ');
                outChance.push('            <div class="l-bar-button l-bar-btnnext"><span class=""></span></div>                    ');
                outChance.push('            <div class="l-bar-button l-bar-btnlast"><span class=""></span></div></div>       ');
                outChance.push('            <div class="l-bar-separator"></div>                ');
                outChance.push('            <div class="l-bar-group">                     ');
                outChance.push('            <div class="l-bar-button l-bar-btnload"><span class=""></span></div></div>     ');
                outChance.push('            <div class="l-bar-separator"></div>                ');
                outChance.push('            <div class="l-clear"></div></div></div>');
                return outChance.join("");
            }
            /**
			 * @return {undefined}
			 */

            function showSelectMenus() { /** @type {number} */
                var r1 = parseInt((options.pageindex - 1) * options.pagesize) + 1; /** @type {number} */
                var r2 = parseInt(r1) + parseInt(options.pagesize) - 1;
                if (!options.total) { /** @type {number} */
                    options.total = 0;
                }
                if (options.total < r2) {
                    r2 = options.total;
                }
                if (!options.total) { /** @type {number} */
                    r1 = r2 = 0;
                }
                if (r1 < 0) { /** @type {number} */
                    r1 = 0;
                }
                if (r2 < 0) { /** @type {number} */
                    r2 = 0;
                }
                var stat = options.pageStatMessage;
                stat = stat.replace(/{from}/, r1);
                stat = stat.replace(/{to}/, r2);
                stat = stat.replace(/{total}/, options.total);
                stat = stat.replace(/{pagesize}/, options.pagesize);
                ret.html(stat);
                if (options.pageindex == 1) {
                    $("span", t).addClass("l-disabled");
                    $("span", selections_holder).addClass("l-disabled");
                } else {
                    if (options.pageindex > value && value > 0) {
                        $("span", t).removeClass("l-disabled");
                        $("span", selections_holder).removeClass("l-disabled");
                    }
                }
                if (options.pageindex == value) {
                    $("span", p).addClass("l-disabled");
                    $("span", whapp_list_html).addClass("l-disabled");
                } else {
                    if (options.pageindex < value && value > 0) {
                        $("span", p).removeClass("l-disabled");
                        $("span", whapp_list_html).removeClass("l-disabled");
                    }
                }
                label.html(value);
                current.val(options.pageindex);
                $("div.l-bar-button", text).hover(function () {
                    $(this).addClass("l-bar-button-over");
                }, function () {
                    $(this).removeClass("l-bar-button-over");
                });
            }
            /**
			 * @return {undefined}
			 */

            function link() {
                current.change(function () { /** @type {number} */
                    var value = parseInt(this.value);
                    update(value);
                });
                t.click(function () {
                    if ($(this).find("span").hasClass("l-disabled")) {
                        return;
                    }
                    update(1);
                });
                selections_holder.click(function () {
                    if ($(this).find("span").hasClass("l-disabled")) {
                        return;
                    }
                    update(options.pageindex * 1 - 1);
                });
                whapp_list_html.click(function () {
                    if ($(this).find("span").hasClass("l-disabled")) {
                        return;
                    }
                    update(options.pageindex * 1 + 1);
                });
                p.click(function () {
                    if ($(this).find("span").hasClass("l-disabled")) {
                        return;
                    }
                    update(value);
                });
                rendered.click(function () {
                    if (options.onReload) {
                        options.onReload(options.pageindex);
                    }
                });
            }
            /**
			 * @param {number} page
			 * @return {undefined}
			 */

            function update(page) {
                if (options.onPage) {
                    options.onPage(page, function (total) { /** @type {number} */
                        options.pageindex = page; /** @type {number} */
                        options.total = total;
                        link();
                    });
                }
            }
            text.html(formatter());
            var ret = $(".l-bar-message:first span:first", text);
            var t = $(".l-bar-btnfirst", text);
            var selections_holder = $(".l-bar-btnprev", text);
            var current = $("input:text", text);
            var whapp_list_html = $(".l-bar-btnnext", text);
            var p = $(".l-bar-btnlast", text);
            var rendered = $(".l-bar-btnload", text);
            var label = $(".pcontrol span", text);
            label = $(".pcontrol span", text);
            showSelectMenus();
            link();
        }
        var options = $.extend({}, {
            renderTo: "#pager",
            pageindex: 1,
            pageStatMessage: "显示{from}到{to}条  总共有{total}条",
            total: 0,
            pagesize: 10,
            onPage: function (page, callback) { },
            onReload: function () { }
        }, data);
        var text = typeof options.renderTo == "string" ? $(options.renderTo) : options.renderTo; /** @type {number} */
        var value = Math.ceil(options.total / options.pagesize);
        text.show();
        link();
    };
    /**
	 * @return {?}
	 */
    pbc.getQueryString = function () { /** @type {(Array<string>|null)} */
        var qs = location.search.match(new RegExp("[?&][^?&]+=[^?&]+", "g"));
        if (qs == null) {
            return "";
        } /** @type {number} */
        var i = 0;
        for (; i < qs.length; i++) { /** @type {string} */
            qs[i] = qs[i].substring(1);
        }
        return qs;
    };
    /**
	 * @param {string} name
	 * @return {?}
	 */
    pbc.getQueryStringByName = function (name) {
        return pbc.getUrlParm(location.search, name);
    };
    /**
	 * @param {string} root
	 * @param {string} one
	 * @return {?}
	 */
    pbc.getUrlParm = function (root, one) {
        if (!root) {
            return "";
        }
        if (root.indexOf("#")) {
            root = root.split("#")[0];
        }
        var expRecords = root.match(new RegExp("[?&]" + one + "=([^&]+)", "i"));
        if (expRecords == null || expRecords.length < 1) {
            return "";
        }
        return expRecords[1];
    };
    /**
	 * @param {!Object} i
	 * @return {?}
	 */
    pbc.getQueryStringByIndex = function (i) {
        if (i == null) {
            return "";
        }
        var lines = getQueryString();
        if (i >= lines.length) {
            return "";
        }
        var str = lines[i];
        var uidPattern = str.indexOf("=") + 1;
        str = str.substring(uidPattern);
        return str;
    };
    /**
	 * @param {string} data
	 * @return {undefined}
	 */
    pbc.showInvalid = function (data) {
        data = data || pbc.validator;
        if (!data) {
            return;
        } /** @type {string} */
        var fsmError = '<div class="invalid">存在' + data.errorList.length + "个字段验证不通过，请检查!</div>";
        $.ligerDialog.error(fsmError);
    };
    /**
	 * @param {!Object} parent
	 * @param {!Object} obj
	 * @return {?}
	 */
    pbc.validate = function (parent, obj) {
        if (typeof parent == "string") {
            parent = $(parent);
        } else {
            if (typeof parent == "object" && parent.NodeType == 1) {
                parent = $(parent);
            }
        }
        obj = $.extend({
            errorPlacement: function (error, element) {
                if (!element.attr("id")) {
                    element.attr("id", (new Date).getTime());
                }
                if (element.hasClass("l-textarea")) {
                    element.addClass("l-textarea-invalid");
                } else {
                    if (element.hasClass("l-text-field")) {
                        element.parent().addClass("l-text-invalid");
                    }
                }
                $(element).removeAttr("title").ligerHideTip();
                $(element).attr("title", error.html()).ligerTip({
                    distanceX: 5,
                    distanceY: -3,
                    auto: true
                });
            },
            success: function (parent) {
                if (!parent.attr("for")) {
                    return;
                }
                var clicked = $("#" + parent.attr("for"));
                if (clicked.hasClass("l-textarea")) {
                    clicked.removeClass("l-textarea-invalid");
                } else {
                    if (clicked.hasClass("l-text-field")) {
                        clicked.parent().removeClass("l-text-invalid");
                    }
                }
                $(clicked).removeAttr("title").ligerHideTip();
            }
        }, obj || {});
        pbc.validator = parent.validate(obj);
        return pbc.validator;
    };
    /**
	 * @param {string} $tab
	 * @return {undefined}
	 */
    pbc.closeCurrentTab = function ($tab) {
        if (!$tab) {
            $tab = $("#framecenter > .l-tab-content > .l-tab-content-item:visible").attr("tabid");
        }
        if (tab) {
            tab.removeTabItem($tab);
        }
    };
    /**
	 * @param {string} options
	 * @param {string} suggestedVariableValueCallback
	 * @return {undefined}
	 */
    pbc.closeAndReloadParent = function (options, suggestedVariableValueCallback) {
        pbc.closeCurrentTab(options);
        var $tab = $("#mainmenu ul.menulist li[menuno=" + suggestedVariableValueCallback + "]");
        var name = $tab.attr("tabid");
        var spreadData = window.frames[name];
        if (tab) {
            tab.selectTabItem(name);
        }
        if (spreadData && spreadData.f_reload) {
            spreadData.f_reload();
        } else {
            if (tab) {
                tab.reload(name);
            }
        }
    };
    /**
	 * @param {?} media
	 * @return {undefined}
	 */
    pbc.closeCurrentDetailPage = function (media) {
        if (parent && parent.homepage) {
            parent.pbc.closeCurrentTab(null);
        } else {
            if (parent) {
                if (media && parent.f_reload) {
                    parent.f_reload();
                }
                parent.pbc.closeDetailPage();
            } else {
                window.close();
            }
        }
    };
    /**
	 * @return {undefined}
	 */
    pbc.closeDetailPage = function () {
        if (window.detailWin) {
            window.detailWin.close();
        }
    }; /** @type {function(?, string, string, string, ?): undefined} */
    pbc.showChildPage = pbc.showDetailPage = function (html, name, format, version, pid) {
        if (top.f_addTab && !pid) {
            top.f_addTab(html, name, format + "/" + version);
        } else {
            pbc.openSubWindow({
                url: version,
                title: name
            });
        }
    };
    pbc.columnRenders = pbc.columnRenders || {};
    /**
	 * @param {!Object} doc
	 * @param {?} canCreateDiscussions
	 * @param {?} isSlidingUp
	 * @param {!Object} engineDiscovery
	 * @return {?}
	 */
    pbc.columnRenders["checkbox"] = function (doc, canCreateDiscussions, isSlidingUp, engineDiscovery) { /** @type {string} */
        var format = '<div class="gridcheckbox chk-icon';
        if (isSlidingUp) { /** @type {string} */
            format = format + " chk-icon-selected";
        } /** @type {string} */
        format = format + '"'; /** @type {string} */
        format = format + (' rowid = "' + doc["__id"] + '"'); /** @type {string} */
        format = format + (' gridid = "' + this.id + '"'); /** @type {string} */
        format = format + (' columnname = "' + engineDiscovery.name + '"'); /** @type {string} */
        format = format + "></div>";
        return format;
    };
    $(document).bind("click.gridcheckbox", function (event) {
        var realNode = event.target || event.srcElement;
        if ($(realNode).is(".gridcheckbox") && $(realNode).attr("gridid")) {
            var me = $.ligerui.get($(realNode).attr("gridid"));
            var record = me.getRow($(realNode).attr("rowid"));
            var name = $(realNode).attr("columnname");
            var value = record[name];
            me.updateCell(name, !value, record);
            me.trigger("afterEdit", [{
                column: {
                    name: name
                },
                record: record,
                oldvalue: value,
                value: !value
            }]);
        }
    });
    /**
	 * @return {undefined}
	 */
    pbc.overrideGridLoading = function () {
        $.extend($.ligerDefaults.Grid, {
            onloading: function () {
                pbc.showLoading("正在加载表格数据中...");
            },
            onloaded: function () {
                pbc.hideLoading();
            }
        });
    };
    /**
	 * @param {?} res
	 * @param {?} pagePath
	 * @return {undefined}
	 */
    pbc.adujestConfig = function (res, pagePath) {
        if (res.Form && res.Form.fields) { /** @type {number} */
            var i = res.Form.fields.length - 1;
            for (; i >= 0; i--) {
                var option = res.Form.fields[i];
                if ($.inArray(option.name, pagePath) != -1) {
                    res.Form.fields.splice(i, 1);
                }
            }
        }
        if (res.Grid && res.Grid.columns) { /** @type {number} */
            i = res.Grid.columns.length - 1;
            for (; i >= 0; i--) {
                var atm = res.Grid.columns[i];
                if ($.inArray(atm.name, pagePath) != -1) {
                    res.Grid.columns.splice(i, 1);
                }
            }
        }
        if (res.Search && res.Search.fields) { /** @type {number} */
            i = res.Search.fields.length - 1;
            for (; i >= 0; i--) {
                option = res.Search.fields[i];
                if ($.inArray(option.name, pagePath) != -1) {
                    res.Search.fields.splice(i, 1);
                }
            }
        }
    };
    /**
	 * @param {!Object} service
	 * @param {?} account
	 * @return {?}
	 */
    pbc.findToolbarItem = function (service, account) {
        if (!service.toolbarManager) {
            return null;
        }
        if (!service.toolbarManager.options.items) {
            return null;
        }
        var result = service.toolbarManager.options.items; /** @type {number} */
        var i = 0;
        var trlen = result.length;
        for (; i < trlen; i++) {
            if (result[i].id == account) {
                return result[i];
            }
        }
        return null;
    };
    /**
	 * @param {!Object} i
	 * @param {?} item
	 * @param {?} getter
	 * @return {undefined}
	 */
    pbc.setGridDoubleClick = function (i, item, getter) {
        getter = getter || toolbarBtnItemClick;
        if (!getter) {
            return;
        }
        i.bind("dblClickRow", function (allOtherOptions) {
            var dataItem = pbc.findToolbarItem(i, item);
            if (!dataItem) {
                return;
            }
            i.select(allOtherOptions);
            getter(dataItem);
        });
    };
    pbc.gridRenders = {
        op: function (a) { /** @type {string} */
            var name = "fcell_" + this.id; /** @type {string} */
            var editViewId = name + "_edit"; /** @type {string} */
            var failureFnName = name + "_del";
            return '<div class="operating"><a class="ne-icon ne-icon-pencil" title="修改" href="javascript:' + editViewId + "('" + a.ID + '\')"></a><a class="ne-icon ne-icon-trash" title="删除" href="javascript:' + failureFnName + "('" + a.ID + "')\"></a></div>";
        },
        checkbox: function (api_get_method, api_set_method, checkbox_id, elem) { /** @type {string} */
            var html = '<div class="chkicon';
            if (checkbox_id) { /** @type {string} */
                html = html + " chkicon-selected";
            } /** @type {string} */
            html = html + '"'; /** @type {string} */
            html = html + (' rowid = "' + api_get_method["__id"] + '"'); /** @type {string} */
            html = html + (' gridid = "' + this.id + '"'); /** @type {string} */
            html = html + (' columnname = "' + elem.name + '"'); /** @type {string} */
            html = html + "></div>";
            return html;
        },
        checkboxEditor: function (doc, req, res, signature) { /** @type {string} */
            var $ = "pbc.fn.checkCell('" + this.id + "','" + doc["__id"] + "','" + signature.name + "')"; /** @type {string} */
            var format = '<a href="javascript:' + $ + '" class="chkicon';
            if (res) { /** @type {string} */
                format = format + " chkicon-selected";
            } /** @type {string} */
            format = format + '"'; /** @type {string} */
            format = format + "></a>";
            return format;
        }
    };
    pbc.fn = {};
    /**
	 * @param {string} person
	 * @param {?} index
	 * @param {?} col
	 * @return {undefined}
	 */
    pbc.fn.checkCell = function (person, index, col) {
        var me = liger.get(person);
        var record = me.getRow(index);
        var value = record[col];
        if (value) {
            $(this).removeClass("chkicon-selected");
        } else {
            $(this).addClass("chkicon-selected");
        }
        me.updateCell(col, !value, record);
    };
    var type_equals = pbc.type_equals = {
        "grid_selector": "grid",
        "grid_edit": "grid",
        "select_mul": "select",
        "ref_select": "select",
        "ref_select_tree": "select",
        "ref_select_mul": "select",
        "ref_select2": "select2",
        "ref_popupselect": "select",
        "ref_popupselect_mul": "select",
        "popupselect": "select",
        "gridselect": "select",
        "dic_radiolist": "radiolist",
        "ref_radiolist": "radiolist",
        "dic_listbox": "listbox",
        "ref_listbox": "listbox",
        "dic_listbox_mul": "listbox",
        "listbox_mul": "listbox",
        "ref_listbox_mul": "listbox",
        "ref_checkboxlist": "checkboxlist",
        "ref_grid_selector": "grid",
        "ref_grid_edit": "grid",
        "ref_grid_popup": "grid"
    };
    var fieldCallbacks = {
        "ref_popupselect": popupselect_callback,
        "ref_popupselect_mul": popupselect_callback,
        "ref_select": select_updatematch_callback,
        "ref_grid_edit": ref_grid_edit_callback,
        "ref_radiolist": select_updatematch_callback,
        "ref_listbox": select_updatematch_callback,
        "dic_listbox_mul": listbox_callback,
        "listbox_mul": listbox_callback,
        "ref_listbox_mul": listbox_callback
    };
    $.extend($.ligerui.controls.ComboBox.prototype, {
        _setIsPopup: function (canCreateDiscussions) {
            if (canCreateDiscussions) {
                this.bind("buttonClick", createPopupClick(this.options, this.host_grid ? true : false));
            }
        }
    });
    /**
	 * @param {!Object} i
	 * @param {!Object} selector
	 * @param {!Object} options
	 * @return {?}
	 */
    pbc.createUpdateData = function (i, selector, options) {
        if (!selector || !options) {
            return null;
        }
        if ($.isArray(i)) { /** @type {!Array} */
            var result = [];
            $(i).each(function () {
                result.push(pbc.createUpdateData(this, selector, options));
            });
            return result;
        }
        if (typeof selector == "string") { /** @type {!Array<string>} */
            selector = selector.split(";");
        }
        if (typeof options == "string") { /** @type {!Array<string>} */
            options = options.split(";");
        }
        var list = {}; /** @type {number} */
        var j = 0;
        for (; j < selector.length && j < options.length; j++) {
            if (selector[j] && options[j]) {
                var error = pbc.getExpValue(i, selector[j], j);
                var _shapeB = options[j];
                list[options[j]] = error;
            }
        }
        return list;
    };
    /**
	 * @param {!Object} data
	 * @param {string} field
	 * @param {number} index
	 * @return {?}
	 */
    pbc.getExpValue = function (data, field, index) {
        if (field.indexOf("exp:") == 0) {
            try { /** @type {null} */
                var fn = null;
                var exp = field.substring(4);
                eval("fn = function(row,data,index){return " + exp + "}");
                return fn(data, data, index);
            } catch (e) {
                return "";
            }
        } else {
            return data[field];
        }
    };
    /**
	 * @param {?} rows
	 * @param {string} exp
	 * @param {?} places
	 * @return {?}
	 */
    pbc.countExpValue = function (rows, exp, places) {
        try { /** @type {null} */
            var fn = null; /** @type {string} */
            var evalStr = "fn = function(rows){ " + (getExpressionInit() || "") + " return " + exp + "}";
            eval(evalStr);
            var result = fn(rows);
            if (places) { /** @type {string} */
                result = parseFloat(result).toFixed(places);
            }
            return result;
        } catch (e) {
            if (places) {
                return parseFloat("0").toFixed(places);
            }
            return "";
        }
    };
    /**
	 * @param {string} num
	 * @return {?}
	 */
    pbc.abc = function (num) {
        return "abcdefghijklmnopqrstuvwxyz"[num];
    };
    /**
	 * @param {string} date
	 * @return {?}
	 */
    pbc.ABC = function (date) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[date];
    };
    /**
	 * @param {!Object} data
	 * @param {string} field
	 * @param {number} index
	 * @return {?}
	 */
    pbc.getExpValue = function (data, field, index) {
        if (field.indexOf("exp:") == 0) {
            try { /** @type {null} */
                var fn = null;
                var exp = field.substring(4);
                eval("fn = function(row,index){return " + exp + "}");
                return fn(data, index);
            } catch (e) {
                return "";
            }
        } else {
            return data[field];
        }
    };
    /**
	 * @param {string} num
	 * @return {?}
	 */
    pbc.abc = function (num) {
        return "abcdefghijklmnopqrstuvwxyz"[num];
    };
    /**
	 * @param {string} date
	 * @return {?}
	 */
    pbc.ABC = function (date) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[date];
    };
    /**
	 * @param {!Object} node
	 * @param {string} dt
	 * @return {?}
	 */
    pbc.prevFilter = function (node, dt) {
        $(node.rules).each(function (canCreateDiscussions, row) {
            var key = row.op;
            if (row.value && /^#(.*?)+#$/.test(row.value)) {
                row.value = pbc.getExpressionValue({
                    data: dt,
                    exp: row.value.substr(1, row.value.length - 2)
                });
            }
            if (row.value && $.isArray(row.value) && row.value.length) {
                if (!(/ID$/.test(row.field) || /Id$/.test(row.field)) || /id$/.test(row.field)) {
                    row.field += "ID";
                }
                if ($.isArray(row.value[0])) { /** @type {!Array} */
                    var val = []; /** @type {number} */
                    var i = 0;
                    for (; i < row.value.length; i++) {
                        var falseySection = row.value[i][0];
                        if (falseySection) {
                            val.push(falseySection);
                        }
                    }
                    row.value = key == "equal" ? val[0] : val.join(";");
                } else {
                    row.value = row.value[0];
                }
            }
        }); /** @type {number} */
        var i = 0;
        for (; node.groups && i < node.groups.length; i++) {
            var n = node.groups[i];
            pbc.prevFilter(n);
        }
        return node;
    };
    /**
	 * @param {!Object} fields
	 * @param {string} proKey
	 * @return {undefined}
	 */
    pbc.preEditor = function (fields, proKey) {
        if (!fields) {
            return;
        } /** @type {number} */
        var i = 0;
        for (; i < fields.length; i++) {
            var field = fields[i];
            if (!field || typeof field != "object") {
                continue;
            } /** @type {null} */
            var callback = null; /** @type {null} */
            var oldEditorType = null;
            if ("editorType" in field && field.editorType) {
                if (type_equals[field.editorType]) {
                    if (fieldCallbacks[field.editorType]) {
                        oldEditorType = field.editorType;
                        callback = fieldCallbacks[field.editorType];
                    }
                    field.editorType = type_equals[field.editorType];
                }
            }
            if (field.fieldExtend) {
                try { /** @type {null} */
                    var fieldExtend = null;
                    eval("fieldExtend = " + field.fieldExtend);
                    if (fieldExtend && fieldExtend.editor) {
                        field.editor = field.editor || {};
                        $.extend(field.editor, fieldExtend.editor);
                    }
                    delete fieldExtend.editor;
                    $.extend(field, fieldExtend);
                } catch (e) { }
            }
            if (field.validate && field.validate.required != 1) {
                delete field.validate.required;
            }
            if (field.editor && field.editor.freedesign_source) {
                field.editor.url = field.editor.freedesign_source.url;
                field.editor.parms = field.editor.parms || {};
                if (field.editor.freedesign_source.filter) {
                    field.editor.parms.filter = field.editor.freedesign_source.filter;
                }
                if (field.editor.freedesign_source.model) {
                    field.editor.parms.model = field.editor.freedesign_source.model;
                }
                if (field.editor.freedesign_source.valueField) {
                    field.editor.valueField = field.editor.freedesign_source.valueField;
                }
                if (field.editor.freedesign_source.textField) {
                    field.editor.textField = field.editor.freedesign_source.textField;
                }
            }
            if (field.editor && field.editor.grid_source) {
                var grid = field.editor.grid || {};
                grid.url = field.editor.grid_source.url;
                grid.parms = grid.parms || {};
                if (field.editor.grid_source.filter) {
                    grid.parms.Condition = field.editor.grid_source.filter;
                }
                if (field.editor.grid_source.model) {
                    grid.parms.model = field.editor.grid_source.model;
                }
                if (field.editor.grid_source.valueField) {
                    field.editor.valueField = field.editor.grid_source.valueField;
                }
                if (field.editor.grid_source.textField) {
                    field.editor.textField = field.editor.grid_source.textField;
                }
                field.editor.grid = grid;
            }
            if (field.editor && field.editor.sourceFilter) {
                if (field.editor.url && field.editor.parms) {
                    field.editor.parms["filter"] = field.editor.sourceFilter;
                }
                if (field.editor.popupselect_url) {
                    var bind = (new pbc.base64).encode(JSON.stringify({
                        filterData: field.editor.sourceFilter
                    }));
                    field.editor.popupselect_url += "&bind=" + bind;
                }
            }
            if (field.editor && field.editor.parms && field.editor.parms.filter) {
                pbc.prevFilter(field.editor.parms.filter);
            }
            if (field.type == "html" && field.editor && field.editor.useVue && !field.editor.render) {
                /**
				 * @param {!Object} options
				 * @return {undefined}
				 */
                field.editor.render = function (options) {
                    var leadModel = this;
                    var recordBatch = leadModel.get("freedesignpage");
                    var bInitP = options.content || "";
                    var maindata3 = recordBatch.formData || {};
                    var childQuery = recordBatch.getQueryObj();
                    $(options.renderTo).html(bInitP);
                    new Vue({
                        el: options.renderTo,
                        data: {
                            data: maindata3,
                            query: childQuery
                        }
                    });
                };
            }
            if (field.type == "render" && field.editor && field.editor.url && !field.editor.render) {
                /**
				 * @param {?} component
				 * @return {undefined}
				 */
                field.editor.render = function (component) {
                    var $ = this;
                    var recordBatch = $.get("freedesignpage");
                    var _ = recordBatch.formData || {};
                    var B = recordBatch.getQueryObj();
                    pbc.openPage({
                        url: field.editor.url,
                        options: {
                            parentFormData: _,
                            parentQuery: B,
                            parentPage: recordBatch
                        }
                    }, component.renderTo);
                };
            }
            if (field.editor && (field.editor.isRef || field.type && field.type.indexOf && (field.type.indexOf("select") > -1 || field.type.indexOf("checkbox") > -1 || field.type.indexOf("listbox") > -1 || field.type.indexOf("radio") > -1) && field.type != "selection")) {
                field.textField = field.textField || field.name + "_textfield";
                field.editor.textField = field.editor.textField || "text";
                field.editor.valueField = field.editor.valueField || "id";
            }
            if ("editor" in field && field.type && proKey == "fields") {
                if (type_equals[field.type]) {
                    if (fieldCallbacks[field.type] && !callback) {
                        oldEditorType = field.type;
                        callback = fieldCallbacks[field.type];
                    }
                    field.type = type_equals[field.type];
                    if (field.editor && field.editor.type) {
                        field.editor.type = field.type;
                    }
                }
            }
            if ("validate" in field && field.validate && proKey == "fields") { /** @type {null} */
                field.validate.equalTo_textfield = null;
                delete field.validate.equalTo_textfield;
                if (!field.validate.equalTo) { /** @type {null} */
                    field.validate.equalTo = null;
                    delete field.validate.equalTo;
                }
                if (field.validate.regexRule != null) {
                    if (!field.validate.regexRule) { /** @type {null} */
                        field.validate.regexRule = null; /** @type {null} */
                        field.validate.regexRule_textfield = null;
                        delete field.validate.regexRule_textfield;
                        delete field.validate.regexRule;
                    } else {
                        var regexRuleName = field.validate.regexRule;
                        var regexRule = pbc.getValidateRule(regexRuleName);
                        if (regexRule) {
                            field.validateMessage = field.validateMessage || {};
                            if (regexRule.isSystem) { /** @type {null} */
                                field.validate.regexRule = null;
                                delete field.validate.regexRule; /** @type {boolean} */
                                field.validate[regexRuleName] = true;
                                field.validateMessage[regexRuleName] = regexRule.message;
                            } else {
                                field.validate.regexRule = regexRule.rule;
                                field.validateMessage.regexRule = regexRule.message;
                            } /** @type {null} */
                            field.validate.regexRule_textfield = null;
                            delete field.validate.regexRule_textfield;
                        }
                    }
                }
                if (field.validate.required) { /** @type {boolean} */
                    field.validate.required = true;
                }
            }
            if ("editor" in field && field.editor && field.editor.type && proKey == "columns") {
                if (type_equals[field.editor.type]) {
                    if (fieldCallbacks[field.editor.type] && !callback) {
                        oldEditorType = field.editor.type;
                        callback = fieldCallbacks[field.editor.type];
                    }
                    field.editor.type = type_equals[field.editor.type];
                }
            }
            if (callback) {
                callback(field, oldEditorType, proKey == "columns");
            }
        }
    };
    /**
	 * @param {!Object} options3
	 * @param {!Function} callback
	 * @return {undefined}
	 */
    pbc.preOptions = function (options3, callback) {
        /**
		 * @param {!Object} o
		 * @param {string} proKey
		 * @return {undefined}
		 */

        function prev(o, proKey) {
            if (!o) {
                return;
            } /** @type {string} */
            var type3 = typeof o;
            if (type3 !== "object") {
                return;
            }
            if (o.constructor === Array) {
                if (proKey == "columns" || proKey == "fields") {
                    pbc.preEditor(o, proKey);
                }
                if (proKey = "items") {
                    $(o).each(function () {
                        prev(this);
                    });
                }
            } else {
                var val;
                var keyType;
                var valType;
                var k;
                for (k in o) {
                    val = o[k]; /** @type {string} */
                    keyType = typeof k; /** @type {string} */
                    valType = typeof val;
                    if (valType == "function") {
                        continue;
                    }
                    if (k === "dialogOpener" || k === "topTab" || k === "tabOpener" || k == "renderTo" || val && val.jQuery) {
                        continue;
                    }
                    if (keyType === "string" && valType === "string") {
                        if (k == "fieldHelpContent" && !("afterContent" in o)) { /** @type {string} */
                            o.afterContent = '<li style="width:40px;"><a href="javascript:void(0)" class="icon icon-question-sign tiplink" title="' + val + '"></a></li>';
                        }
                        if (k == "fieldShowContent" && !("afterContent" in o)) { /** @type {string} */
                            o.afterContent = '<li style="padding:0px 8px;">' + val + "</li>";
                        }
                        if (val.indexOf("eval:") == 0) {
                            var evalStr = val.substr("eval:".length);
                            eval("o[k] =" + evalStr);
                        } else {
                            if ((isUrlKey(k) || proKey === "actions") && valType == "string") {
                                o[k] = pbc.resolveUrl(val);
                            } else {
                                if (val.indexOf("strings:") == 0) {
                                    var stringCode = val.substr("strings:".length);
                                    strings.push({
                                        key: stringCode,
                                        value: null
                                    });
                                }
                            }
                        }
                    }
                    prev(o[k], k);
                }
            }
        }
        /**
		 * @return {?}
		 */

        function getStringKeys() { /** @type {!Array} */
            var drilldownLevelValues = []; /** @type {number} */
            var i = 0;
            for (; i < strings.length; i++) {
                drilldownLevelValues.push(strings[i].key);
            }
            return drilldownLevelValues;
        }
        /**
		 * @param {?} x
		 * @return {?}
		 */

        function getTranslate(x) { /** @type {number} */
            var i = 0;
            for (; i < strings.length; i++) {
                if (strings[i].key == x) {
                    return strings[i].value;
                }
            }
            return null;
        }
        /**
		 * @param {!Object} data
		 * @return {undefined}
		 */

        function replaceTranslate(data) {
            if (!data) {
                return;
            } /** @type {string} */
            var dataType = typeof data;
            if (dataType !== "object") {
                return;
            }
            if (data.constructor === Array) { /** @type {number} */
                var i = 0;
                var tldCount = data.length;
                for (; i < tldCount; i++) {
                    replaceTranslate(data[i]);
                }
            }
            var value;
            var encoding;
            var type;
            var i;
            for (i in data) {
                value = data[i]; /** @type {string} */
                encoding = typeof i; /** @type {string} */
                type = typeof value;
                if (encoding === "string" && type === "string") {
                    if (value.indexOf("strings:") == 0) {
                        var x = value.substr("strings:".length);
                        data[i] = getTranslate(x);
                        continue;
                    }
                }
                replaceTranslate(data[i]);
            }
        }
        var strings = {};
        var translateUrl = pbc.resolveUrl("corestrings/getlist");
        prev(options3);
        if (callback) {
            callback(options3);
        }
        return;
        var ajaxData = {
            Keys: getStringKeys()
        };
        pbc.ajax({
            url: translateUrl,
            contentType: "application/json",
            data: ajaxData,
            success: function (data) { /** @type {string} */
                strings = data;
                replaceTranslate(options3);
                if (callback) {
                    callback(options3);
                }
            }
        });
    };
    /**
	 * @param {!Object} options
	 * @return {undefined}
	 */
    pbc.openFile = function (options) {
        var target = options.url || "";
        var changedTouch = options.parms;
        var method = options.method || "post";
        var isNew = options.isNew;
        var watch = options.check;
        target = pbc.getAppUrl(target);
        var form = $("#openFile_form");
        if (form.length == 0) {
            form = $('<form method="' + method + '" />').attr("id", "openFile_form").hide().appendTo("body");
        } else {
            form.empty();
        }
        form.attr("action", target);
        var k;
        for (k in changedTouch) {
            $('<input type="hidden" />').attr({
                name: k,
                value: changedTouch[k]
            }).appendTo(form);
        }
        if (isNew) {
            form.attr("target", "_blank");
        } else {
            var boxOpt = $("iframe#openFile_iframe");
            if (boxOpt.length == 0) {
                boxOpt = $("<iframe />").attr("id", "openFile_iframe").hide().appendTo("body");
            }
            form.attr("target", "openFile_iframe");
        }
        if (watch && watch() == false) {
            return;
        }
        form.trigger("submit");
    };
    /**
	 * @param {!Object} data
	 * @return {undefined}
	 */
    pbc.downloadFile = function (data) {
        var bInitP = data.url || "";
        var $copy = $("iframe#downloadFile_iframe");
        if ($copy.length == 0) {
            $copy = $("<iframe />").attr("id", "downloadFile_iframe").hide().appendTo("body");
        }
        $copy.attr("src", bInitP);
    };
    /**
	 * @param {!Object} req
	 * @return {undefined}
	 */
    pbc.openNew = function (req) {
        var label = req.url || "";
        var changedTouch = req.parms;
        var affect = req.check;
        var $el = $("#opennew_form");
        if ($el.length == 0) {
            $el = $('<form method="post" />').attr("id", "opennew_form").hide().appendTo("body");
        } else {
            $el.empty();
        }
        for (k in changedTouch) {
            $('<input type="hidden" />').attr({
                name: k,
                value: changedTouch[k]
            }).appendTo($el);
        }
        $el.attr("action", label);
        $el.attr("target", "_blank");
        if (affect && affect() == false) {
            return;
        }
        $el.trigger("submit");
    };
    /**
	 * @param {!Object} config
	 * @return {undefined}
	 */
    pbc.openPrint = function (config) {
        /**
		 * @param {!Object} cmd
		 * @return {undefined}
		 */

        function done(cmd) {
            if (config.callback) { /** @type {string} */
                var text = "/web/preview?templateId=" + cmd.template + "&context=" + config.context;
                if (config.isReport) { /** @type {string} */
                    text = text + "&isreport=Y";
                }
                config.callback(text);
            } else {
                text = pbc.toUrl("/web/preview?rnd=") + (new Date).getTime();
                if (config.isReport) { /** @type {string} */
                    text = text + "&isreport=Y";
                }
                pbc.openNew({
                    url: text,
                    parms: {
                        templateId: cmd.template,
                        context: config.context
                    }
                });
            }
        }
        /**
		 * @return {undefined}
		 */

        function update() {
            var me = $("<div style='margin:9px;'></div>");
            var rejectingServer = $.ligerDialog.open({
                target: me,
                isHidden: true,
                title: "打印确认",
                top: 100,
                width: 420,
                height: "auto",
                buttons: [{
                    text: "确定",
                    cls: "l-dialog-btn-highlight",
                    onclick: function () {
                        var templates = event.getData();
                        if (!templates.template) {
                            pbc.tipsInTop(2, "请选择打印模板！");
                        } else {
                            done(templates);
                            rejectingServer.close();
                        }
                    }
                }, {
                    text: "取消",
                    onclick: function () {
                        rejectingServer.close();
                    }
                }]
            });
            var event = me.ligerForm({
                labelWidth: "auto",
                fields: [{
                    name: "template",
                    label: "打印模板",
                    type: "select",
                    labelWidth: 80,
                    width: 255,
                    editor: {
                        data: people,
                        valueField: "ID",
                        textField: "Name"
                    }
                }]
            });
            setTimeout(function () {
                event.setData({
                    template: people[0].ID
                });
            }, 100);
        } /** @type {!Array} */
        var people = [];
        pbc.ajax({
            url: pbc.toUrl("/web/listdata/"),
            data: {
                model: config.isReport ? "core_reportTemplate" : "core_printTemplate",
                filter: pbc.createFilter({
                    ModelName: config.model
                })
            },
            success: function (data) { /** @type {string} */
                people = data;
                if (!people || !people.length) {
                    pbc.tipsInTop(2, "打印模板未定义！");
                } else {
                    if (config.isNoSelect) {
                        done({
                            template: people[0].ID
                        });
                    } else {
                        update();
                    }
                }
            }
        });
    };
    /**
	 * @param {string} match
	 * @param {?} i
	 * @param {?} done
	 * @return {?}
	 */
    pbc.templateRender = function (match, i, done) {
        return match.replace(/\{([\w\.]*)\}/g, function (canCreateDiscussions, results) {
            var patternLetters = results.split(".");
            var date = i[patternLetters.shift()]; /** @type {number} */
            var flag = 0;
            var numberOfLetters = patternLetters.length;
            for (; flag < numberOfLetters; flag++) {
                date = date[patternLetters[flag]];
            }
            if (done) {
                date = done(results, date);
            }
            return typeof date !== "undefined" && date !== null ? date : "";
        });
    };
    /**
	 * @param {!Object} args
	 * @param {!Object} target
	 * @param {!Object} data
	 * @return {?}
	 */
    pbc.createFilter = function (args, target, data) {
        var obj = {
            rules: [],
            groups: [],
            op: "and"
        };
        if (args) {
            var key;
            for (key in args) {
                obj.rules.push({
                    field: key,
                    value: args[key],
                    op: "equal"
                });
            }
        }
        if (target) {
            for (key in target) {
                obj.rules.push({
                    field: key,
                    value: target[key],
                    op: "notequal"
                });
            }
        }
        if (data) {
            for (key in data) {
                obj.rules.push({
                    field: key,
                    value: data[key],
                    op: "notequal"
                });
            }
        }
        return obj;
    };
    /**
	 * @return {undefined}
	 */
    pbc.unicode = function () {
        /**
		 * @param {string} a
		 * @return {?}
		 */
        this.decode = function (a) { /** @type {!Array} */
            var calIds = []; /** @type {number} */
            var i = 0;
            for (; i < a.length; i++) {
                calIds[i] = ("00" + a.charCodeAt(i).toString(16)).slice(-4);
            }
            return "\\u" + calIds.join("\\u");
        };
        /**
		 * @param {string} format
		 * @return {?}
		 */
        this.encode = function (format) {
            format = format.replace(/\\/g, "%");
            return unescape(format);
        };
    };
    /**
	 * @return {undefined}
	 */
    pbc.base64 = function () { /** @type {string} */
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        /**
		 * @param {string} input
		 * @return {?}
		 */
        this.encode = function (input) { /** @type {string} */
            var output = "";
            var chr1;
            var aStatedRank;
            var chr3;
            var enc1;
            var enc2;
            var enc3;
            var enc4; /** @type {number} */
            var i = 0;
            input = _utf8_encode(input);
            for (; i < input.length;) {
                chr1 = input.charCodeAt(i++);
                aStatedRank = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++); /** @type {number} */
                enc1 = chr1 >> 2; /** @type {number} */
                enc2 = (chr1 & 3) << 4 | aStatedRank >> 4; /** @type {number} */
                enc3 = (aStatedRank & 15) << 2 | chr3 >> 6; /** @type {number} */
                enc4 = chr3 & 63;
                if (isNaN(aStatedRank)) { /** @type {number} */
                    enc3 = enc4 = 64;
                } else {
                    if (isNaN(chr3)) { /** @type {number} */
                        enc4 = 64;
                    }
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
            }
            return output;
        };
        /**
		 * @param {string} value
		 * @return {?}
		 */
        this.decode = function (value) { /** @type {string} */
            var output = "";
            var chr1;
            var chr2;
            var chr3;
            var sextet1;
            var sextet2;
            var B;
            var enc4; /** @type {number} */
            var iValue = 0;
            value = value.replace(/[^A-Za-z0-9\+\/=]/g, "");
            for (; iValue < value.length;) {
                sextet1 = _keyStr.indexOf(value.charAt(iValue++));
                sextet2 = _keyStr.indexOf(value.charAt(iValue++));
                B = _keyStr.indexOf(value.charAt(iValue++));
                enc4 = _keyStr.indexOf(value.charAt(iValue++)); /** @type {number} */
                chr1 = sextet1 << 2 | sextet2 >> 4; /** @type {number} */
                chr2 = (sextet2 & 15) << 4 | B >> 2; /** @type {number} */
                chr3 = (B & 3) << 6 | enc4; /** @type {string} */
                output = output + String.fromCharCode(chr1);
                if (B != 64) { /** @type {string} */
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) { /** @type {string} */
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;
        };
        /**
		 * @param {string} string
		 * @return {?}
		 */
        var _utf8_encode = function (str) {
            var rs = '';
            for (var i of str) {
                var code = i.codePointAt(0);
                if (code < 128) {
                    rs += i;
                } else if (code > 127 && code < 2048) {
                    rs += String.fromCharCode((code >> 6) | 192, (code & 63) | 128);
                } else if (code > 2047 && code < 65536) {
                    rs += String.fromCharCode((code >> 12) | 224, ((code >> 6) & 63) | 128, (code & 63) | 128);
                } else if (code > 65536 && code < 1114112) {
                    rs += String.fromCharCode((code >> 18) | 240, ((code >> 12) & 63) | 128, ((code >> 6) & 63) | 128, (code & 63) | 128);
                }
            }
            return rs;
        };
        /**
		 * @param {string} utftext
		 * @return {?}
		 */
        var _utf8_decode = function (str) { /** @type {string} */
            var rs = '';
            for (var i = 0; i < str.length; i++) {
                var code = str.charCodeAt(i);
                if ((240 & code) == 240) {
                    var code1 = str.charCodeAt(i + 1),
                        code2 = str.charCodeAt(i + 2),
                        code3 = str.charCodeAt(i + 3);
                    rs += String.fromCodePoint(((code & 7) << 18) | ((code1 & 63) << 12) | ((code2 & 63) << 6) | (code3 & 63));
                    i += 3;
                } else if ((224 & code) == 224) {
                    var code1 = str.charCodeAt(i + 1),
                        code2 = str.charCodeAt(i + 2);
                    rs += String.fromCodePoint(((code & 15) << 12) | ((code1 & 63) << 6) | (code2 & 63));
                    i += 2;
                } else if ((192 & code) == 192) {
                    var code1 = str.charCodeAt(i + 1);
                    rs += String.fromCodePoint(((code & 31) << 6) | (code1 & 63));
                    i++;
                } else if ((128 & code) == 0) {
                    rs += String.fromCharCode(code);
                }
            }
            return rs;
        };
    };
})(jQuery);