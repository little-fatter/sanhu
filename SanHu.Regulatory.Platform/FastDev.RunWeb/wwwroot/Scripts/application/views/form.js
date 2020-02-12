'use strict';
define(["jquery", "text!/pages/application/templates/views_form.html", "views_parts_buttons"], function ($, usersLayoutTemplate, saveNotifs) {
    /**
	 * @param {?} op
	 * @param {!Object} options
	 * @return {?}
	 */

    function exec(op, options) {
        /**
		 * @param {!NodeList} q
		 * @return {?}
		 */

        function $(q) { /** @type {number} */
            var i = 0;
            for (; i < q.length; i++) {
                var obj = q[i];
                if (obj.name == op) {
                    return obj;
                }
            }
            return null;
        }
        var match = $(options.fields);
        if (match) {
            return match;
        }
        if (options.tab && options.tab.items) { /** @type {number} */
            var i = 0;
            for (; i < options.tab.items.length; i++) {
                match = $(options.tab.items[i].fields);
                if (match) {
                    return match;
                }
            }
        }
        return null;
    }
    /**
	 * @param {?} callback
	 * @return {undefined}
	 */
    pbc.web.views.form = function (callback) {
        pbc.web.views.form.base.constructor.call(this, callback);
    };
    pbc.web.views.form.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            that.form_init();
            pbc.web.views.form.base.render.call(this);
            that.form_render();
            that.trigger("pageLoaded");
        },
        form_init: function () {
            var table = this;
            var opts = this.options;
            var topicTitle = opts.model.title;
            var slug = opts.model.name; /** @type {boolean} */
            var isV = opts.isView ? true : false;
            this.options = opts = $.extend({
                viewType: "form",
                tabId: slug + "-" + opts.viewName,
                id: table.getQuery("id"),
                actions: {
                    get: "/web/detaildata/",
                    ds: "/web/iddata/",
                    save: "/web/save/",
                    del: "web/delete/"
                },
                isView: isV
            }, opts);
        },
        _clearBody: function () {
            var A = this;
            var o = this.options;
            $(o.renderTo).html("");
        },
        form_back: function () {
            var _ = this;
            var options = this.options;
            _.form_clear();
        },
        form_clear: function (canCreateDiscussions) {
            var str = this;
            var options = this.options;
            str.form_load("CLEAR");
        },
        form_render: function () {
            var self = this;
            var options = this.options;
            var highlightedColumn = self.dialogOpener || self.tabOpener;
            options.common = options.common || {}; /** @type {null} */
            var config = null;
            if (options.renderTo && highlightedColumn) {
                config = options.renderTo.openerData;
            }
            if (config) {
                self.callback = config.callback; /** @type {boolean} */
                self.hideSuccessDialog = config.hideSuccessDialog ? true : false; /** @type {boolean} */
                self.localType = config.localType ? true : false;
                self.initFormData = config.formData;
                self.formValidate = config.formValidate;
                self.formTabid = config.tabid;
                self.openerPage = config.openerPage;
            }
            self.jelement = $(options.renderTo);
            self.jelement.addClass("ne-view-form");
            self.jelement.html(usersLayoutTemplate);
            self.initToolpanel();
            self.jform = self.jelement.find(".formpanel:first");
            if (options.renderTo.dialog) {
                $(options.renderTo).addClass("ne-formindialog");
            }
            if (options.renderTo.tabOpener) {
                $(options.renderTo).addClass("ne-formintab");
            }
            if (!options.showInDialog || self.enabledFlow()) {
                if (options.formWidth) {
                    self.jelement.find("form.mainform").width(options.formWidth);
                } else { /** @type {number} */
                    var everLeftWidth = Math.min(1200, $(window).width() * 0.9);
                    self.jelement.find("form.mainform").width(everLeftWidth);
                }
            }
            if (options.common.formCls) {
                self.jelement.find("form.mainform").addClass(options.common.formCls);
            }
            if (options.enctype) {
                $("form:first", self.jelement).attr("enctype", options.enctype);
            }
            if (options.hideButtons) {
                $(".check-btns", self.jelement).hide();
            }
            if (options.onSaved) {
                self.callback = options.onSaved;
            }
            self.form_load();
            self.rebind("back", function () {
                self.form_back();
            });
            self.rebind("edit", function () {
                self.form_edit();
            });
            self.rebind("add", function () {
                self.form_add();
            });
            self.rebind("save", function () {
                self.form_save();
            });
            self.rebind("cancel", function () {
                if (options.cancel) {
                    options.cancel();
                } else {
                    self.form_cancel();
                }
            });
            self.rebind("deleteCurrent", function () {
                self.deleteCurrent();
            });
        },
        initToolpanel: function () {
            var self = this;
            var options = this.options;
            self.jtoolpanel = self.jelement.find(".toolpanelinner:first");
            var view = options.common || {};
            if (view.hideToolbar) {
                $(".toolpanel", self.jelement).hide();
                return;
            }
            self.jtoolbar = self.jtoolpanel.find(".toolbar:first");
            setTimeout(function () {
                self.jtoolpanel.append('<div class="clear"></div>');
            }, 20);
        },
        form_render_header: function () {
            var scope = this;
            var options = this.options; /** @type {null} */
            var groupFigures = null;
            if (scope.enabledFlow()) {
                groupFigures = pbc.web.wfstatus;
            }
            if (groupFigures) {
                scope.jelement.find("div.formheader").remove();
                var indicator = $('<div class="formheader"></div>').insertBefore(scope.jelement.find(".mainpanel:first"));
                var icon = $('<ul class="statusbar"></ul>').appendTo(indicator); /** @type {number} */
                var i = 0;
                for (; i < groupFigures.length; i++) {
                    var link = $("<li></li>").appendTo(icon);
                    link.append('<div class="label">' + groupFigures[i].text + "</div>");
                    if (i == 0) {
                        link.addClass("first");
                    }
                    if (scope.formData && scope.formData.Status && groupFigures[i].id.toLowerCase() == scope.formData.Status.toLowerCase()) {
                        link.addClass("selected");
                    }
                    if (i == groupFigures.length - 1) {
                        link.addClass("last");
                    } else {
                        link.append('<div class="arrow"></div>');
                    }
                }
                icon.find("li.selected").prev("li:first").addClass("selectedprev");
            }
        },
        form_showPrevNext: function () {
            var self = this;
            var m = this.options;
            return;
            var params = {};
            if (self.current && self.current.existFilter()) {
                params.filter = self.current.filter;
            }
            pbc.ajax({
                loading: false,
                url: m.actions.ds,
                data: JSON.stringify(params),
                contentType: "application/json",
                success: function (result) {
                    if (!result || !result.length) {
                        return;
                    }
                    if (!self.pagerGroup) {
                        self.pagerGroup = $('<div class="pagerbtns right"><a class="pagerbtn pagerbtn-prev" data-id="prev" title="上一条数据"><i class="ui-icon ui-icon-triangle-1-w"></i></a><a class="pagerbtn pagerbtn-next" data-id="next" title="下一条数据"><i class="ui-icon ui-icon-triangle-1-e"></i></a></div>');
                        self.jtoolbar.after(self.pagerGroup);
                        self.pagerMessage = $('<div class="pagermessage right"><span></span></div>').insertAfter(self.pagerGroup);
                        var str = $.inArray(m.id, result);
                        self.pagerMessage.find("span").html(str + 1 + "/" + result.length);
                        self.pagerGroup.find("a").bind("click", function () {
                            /**
							 * @param {!Object} res
							 * @return {undefined}
							 */

                            function complete(res) { /** @type {!Object} */
                                m.id = res;
                                self.render();
                            }
                            var PN533 = $(this).attr("data-id");
                            var str = $.inArray(m.id, result);
                            if (str == -1) {
                                complete(PN533 == "prev" ? result[0] : result[result.length - 1]);
                            } else {
                                if (PN533 == "prev") {
                                    if (str == 0) {
                                        pbc.tipsInTop(2, "已经是第一条数据了");
                                        return;
                                    }
                                    complete(result[str - 1]);
                                } else {
                                    if (str == result.length - 1) {
                                        pbc.tipsInTop(2, "已经是最后一条数据了");
                                        return;
                                    }
                                    complete(result[str + 1]);
                                }
                            }
                        });
                    }
                }
            });
        },
        form_toolbarinit: function () {
            var self = this;
            var opts = this.options;
            var params = opts.dataset;
            if (!opts.toolbar) {
                var ret = {
                    items: [{
                        text: "保存",
                        id: "save",
                        cls: "ne-btn-blue"
                    }]
                };
                var data = {
                    items: [{
                        text: "编辑",
                        id: "edit",
                        cls: "ne-btn-blue"
                    }]
                }; /** @type {({items: !Array})} */
                var value = opts.isView ? data : ret;
                var format = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == pbc.web.status.completed.toLowerCase();
                var DEFAULT_FORMAT = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == pbc.web.status.submitted.toLowerCase();
                var fmt = format || DEFAULT_FORMAT;
                if (opts.isView && params) {
                    var query = params.rights;
                    if (query && query.fun) {
                        if (!query.fun.enabledEdit) {
                            value = {
                                items: []
                            };
                        }
                    }
                }
                if (self.enabledFlow()) {
                    if (opts.id) { /** @type {string} */
                        ret.items[0].text = "暂存";
                        if (fmt) {
                            ret.items.splice(0, 1);
                        }
                        if (DEFAULT_FORMAT) {
                            value.items.push({
                                text: "转下一步",
                                id: "workflow_advance"
                            });
                            value.items.push({
                                text: "回退",
                                id: "workflow_back"
                            });
                        } else {
                            if (format) { } else {
                                value.items.push({
                                    text: "转下一步",
                                    id: "workflow_advance"
                                });
                                value.items.push({
                                    text: "回退",
                                    id: "workflow_back"
                                });
                            }
                        }
                        self.rebind("workflow_advance", function () {
                            pbc.web.loader("wf", function () {
                                self.workflow_advance();
                            });
                        });
                        self.rebind("workflow_back", function () {
                            pbc.web.loader("wf", function () {
                                self.workflow_back();
                            });
                        });
                    }
                    value.items.push({
                        text: "流程图",
                        id: "workflow_log"
                    });
                    self.rebind("workflow_log", function () {
                        pbc.web.loader("wf", function () {
                            self.workflow_log();
                        });
                    });
                }
                if (opts.id && self.getQueryStringByName("showDelete") == "Y") {
                    value.items.push({
                        text: "删除",
                        id: "deleteCurrent"
                    });
                }
                if (!opts.showInTab) {
                    if (opts.isView) {
                        value.items.push({
                            text: "创建",
                            id: "add"
                        });
                    } else {
                        value.items.push({
                            text: "放弃",
                            id: "cancel"
                        });
                        if (self.enabledFlow()) {
                            if (fmt) { /** @type {string} */
                                value.items[value.items.length - 1].text = "关闭";
                            }
                        }
                    }
                }
                if (value.items.length) { /** @type {string} */
                    value.items[0].cls = "ne-btn-blue";
                }
                if (!opts.showInDialog && !opts.showInTab) {
                    value.items.push({
                        text: "返回",
                        id: "back"
                    });
                } /** @type {({items: !Array})} */
                opts.toolbar = value;
            }
            saveNotifs(self);
            if (!opts.showInDialog) {
                self.jform.after(self.jtoolbar);
                self.jtoolbar.after('<div class="clear"></div>');
                $(".toolpanel", self.jelement).hide();
            }
        },
        form_load: function (type) {
            /**
			 * @param {?} cbfscopy
			 * @return {undefined}
			 */

            function copy(cbfscopy) {
                self.form.setData(cbfscopy);
                var i;
                for (i in self.form.editors) {
                    var opts = self.form.editors[i].control;
                    if (opts && $.isFunction(opts.formatValue)) {
                        opts.formatValue();
                    }
                }
            }
            /**
			 * @param {?} B
			 * @param {?} id
			 * @return {?}
			 */

            function filter(B, id) { /** @type {!Array} */
                var outArr = [];
                $(B).each(function () {
                    if ($.inArray(this.name, id) > -1) {
                        return;
                    }
                    outArr.push(this);
                });
                return outArr;
            }
            /**
			 * @return {undefined}
			 */

            function init() {
                /**
				 * @param {!Object} config
				 * @return {undefined}
				 */

                function merge(config) { /** @type {number} */
                    var i = 0;
                    for (; config.fields && i < config.fields.length; i++) {
                        if (config.fields[i].readonlyInEdit) { /** @type {boolean} */
                            config.fields[i].readonly = true;
                        }
                    }
                }
                var resized = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == pbc.web.status.completed.toLowerCase();
                var adjustHeight = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == "approved";
                var isUnlimited = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == "void";
                var DEFAULT_RECONNECT_TIME_INCREASE = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == "running";
                var screenSmallerThanEditor = self.formData && self.formData.Status && self.formData.Status.toLowerCase() == pbc.web.status.submitted.toLowerCase();
                var reconnectTimeIncrease = resized || screenSmallerThanEditor || adjustHeight || isUnlimited || DEFAULT_RECONNECT_TIME_INCREASE;
                var options = $.extend({
                    validate: pbc.getDefaultValidate(),
                    showInvalid: function (data) {
                        toastr.warning(data);
                    }
                }, that.form, {
                    readonly: that.isView ? true : false
                });
                if (reconnectTimeIncrease) { /** @type {boolean} */
                    options.readonly = true;
                }
                if (that.bind && that.bind.formFields && that.bind.formFields.length) {
                    $(that.bind.formFields).each(function () {
                        var name = this.name;
                        var filterExpressions = this.sourceFilter;
                        var navCommonStyle = this.parm;
                        var url = this.url;
                        var child = exec(name, options);
                        if (!child || !child.editor) {
                            return;
                        }
                        child.editor.parms = child.editor.parms || {};
                        if (url) {
                            child.editor.url = url;
                        }
                        if (navCommonStyle) {
                            $.extend(child.editor.parms, navCommonStyle);
                        }
                        child.editor.parms.filter = filterExpressions;
                    });
                }
                var field = name ? name.field.disableFields : [];
                if (field && field.length) {
                    options.fields = filter(options.fields, field);
                    if (options.tab && options.tab.items) {
                        $(options.tab.items).each(function () {
                            this.fields = filter(this.fields, field);
                        });
                    }
                }
                if (that.id) {
                    self.form_showPrevNext();
                }
                if (data.actions) {
                    $(data.actions).each(function (canCreateDiscussions, acct) {
                        /**
						 * @param {!Object} e
						 * @return {undefined}
						 */

                        function callback(e) { /** @type {*} */
                            var options = JSON.parse(acct.content);
                            var updatedFilter = pbc.prevFilter(options.source.filter, e.record);
                            pbc.ajax({
                                url: pbc.toUrl(options.source.url),
                                data: {
                                    model: options.source.model,
                                    filter: updatedFilter
                                },
                                success: function (data) {
                                    if (data && data.data) {
                                        var where = {};
                                        $(options.pair).each(function (canCreateDiscussions, p) {
                                            if (!p.sourceValue || !p.targetField) {
                                                return;
                                            }
                                            where[p.targetField] = pbc.getExpressionValue({
                                                data: data.data,
                                                exp: p.sourceValue
                                            });
                                        });
                                        delete where[options.fieldName];
                                        e.grid.update(e.record, where);
                                    }
                                    if (options.isClear && data && !data.data) {
                                        var query = {}; /** @type {string} */
                                        query[options.fieldName] = "";
                                        e.grid.update(e.record, query);
                                    }
                                }
                            });
                        } /** @type {*} */
                        var group = JSON.parse(acct.content);
                        if (acct.type == "B2") {
                            var e = exec(group.detailField, options);
                            if (!e) {
                                return;
                            }
                            $(e.editor.grid.columns).each(function (canCreateDiscussions, g) {
                                if (g.name == group.fieldName) {
                                    /**
									 * @param {!Object} e
									 * @return {undefined}
									 */
                                    g.editor.onChanged = function (e) {
                                        if (!e.column.name) {
                                            return;
                                        }
                                        if (e.old && e.value == e.old[e.column.name]) {
                                            return;
                                        }
                                        callback(e);
                                    };
                                }
                            });
                        }
                    });
                }
                if (that.id) {
                    merge(options);
                    if (options.tab && options.tab.items) {
                        $(options.tab.items).each(function () {
                            merge(this);
                        });
                    }
                }
                self.trigger("beforeShowForm", {
                    page: self,
                    options: options
                });
                if (self.enabledFlow() && self.formData && self.formData.Status == "Completed") { /** @type {boolean} */
                    options.readonly = true;
                }
                options.freedesignpage = self;
                self.form = self.jform.ligerForm(options); /** @type {!Array} */
                self.form.saveQueue = [];
                setTimeout(function () {
                    if ($.fn.qtip) {
                        $("a.help", self.jform).qtip();
                    }
                }, 100);
                if (data.actions) {
                    $(data.actions).each(function (canCreateDiscussions, acct) {
                        /**
						 * @return {undefined}
						 */

                        function update() { /** @type {*} */
                            var $scope = JSON.parse(acct.content);
                            var item = self.form.getData();
                            if ($scope.condition && pbc.getExpressionValue({
                                data: item,
                                exp: $scope.condition
                            }) != true) {
                                return;
                            }
                            if ($scope.isVisible) {
                                self.form.setVisible([$scope.targetField], true);
                            }
                            if ($scope.isInvisible) {
                                self.form.setVisible([$scope.targetField], false);
                            }
                            if ($scope.isEnabled) {
                                self.form.getEditor($scope.targetField).set("readonly", false);
                            }
                            if ($scope.isReadonly) {
                                self.form.getEditor($scope.targetField).set("readonly", true);
                            }
                            if ($scope.isChangeSource) {
                                var _ = self.form.getEditor($scope.targetField);
                                _.set("parms", {
                                    model: $scope.source.model,
                                    filter: pbc.prevFilter($scope.source.filter, item)
                                });
                                _.set("url", pbc.toUrl($scope.source.url));
                            }
                        }
                        /**
						 * @return {undefined}
						 */

                        function getPage() { /** @type {*} */
                            var options = JSON.parse(acct.content);
                            var i = self.form.getData();
                            pbc.ajax({
                                url: pbc.toUrl(options.source.url),
                                data: {
                                    model: options.source.model,
                                    filter: pbc.prevFilter(options.source.filter, i)
                                },
                                success: function (data) {
                                    if (data && data.data) {
                                        var d = {};
                                        $(options.pair).each(function (canCreateDiscussions, p) {
                                            if (!p.sourceValue || !p.targetField) {
                                                return;
                                            }
                                            d[p.targetField] = pbc.getExpressionValue({
                                                data: data.data,
                                                exp: p.sourceValue
                                            });
                                        });
                                        delete d[options.fieldName];
                                        self.form.setData(d);
                                    }
                                    if (options.isClear && data && !data.data) {
                                        var query = {}; /** @type {string} */
                                        query[options.fieldName] = "";
                                        self.form.setData(query);
                                    }
                                }
                            });
                        } /** @type {*} */
                        var that = JSON.parse(acct.content);
                        if (acct.type == "A1" || acct.type == "B1") {
                            var _ = self.form.getEditor(that.fieldName);
                            if (!_) {
                                return;
                            } /** @type {!Array} */
                            var requiredRenders = [];
                            if (_.type == "TextBox") {
                                requiredRenders.push("blur");
                            } else {
                                if (_.type == "ComboBox") {
                                    requiredRenders.push("blur");
                                    requiredRenders.push(_.get("isTextBoxMode") ? "changeText" : "selected");
                                }
                            }
                            $(requiredRenders).each(function (canCreateDiscussions, periodicRender) {
                                _.bind(periodicRender, function (inSelectOnClick) {
                                    if (!inSelectOnClick) {
                                        return;
                                    }
                                    if ($(self.element).attr("data-last") && $(self.element).attr("data-last") == inSelectOnClick) {
                                        return;
                                    }
                                    $(self.element).attr("data-last", inSelectOnClick);
                                    if (acct.type == "A1") {
                                        update();
                                    } else {
                                        getPage();
                                    }
                                });
                            });
                        }
                    });
                }
                self.trigger("afterShowForm", {
                    page: self,
                    form: self.form,
                    options: options
                });
            }
            var self = this;
            var that = this.options;
            var data = that.dataset;
            var name = data ? data.rights : null;
            data = data || {};
            if (type == "CLEAR") { /** @type {null} */
                that.id = null;
                init();
                return;
            }
            if (type) { /** @type {!Object} */
                that.id = type;
            }
            if (self.localType) {
                self.form_toolbarinit();
                self.form_render_header();
                if (that.renderInLoad != false) {
                    init();
                }
                if (self.initFormData) {
                    self.form.setData(self.initFormData);
                }
            } else {
                if (!that.id) {
                    if (that.renderInLoad != false) {
                        self.form_toolbarinit();
                        self.form_render_header();
                        init();
                    }
                    if (that.initData) {
                        setTimeout(function () {
                            copy(that.initData);
                        }, 10);
                    } else {
                        if (that.bind && that.bind.formData) {
                            setTimeout(function () {
                                copy(that.bind.formData);
                            }, 10);
                        } else {
                            if (that.actions.defaultData) {
                                pbc.ajax({
                                    url: that.actions.defaultData,
                                    success: function (data) { /** @type {!Object} */
                                        self.formData = data;
                                        copy(self.formData);
                                    }
                                });
                            }
                        }
                    }
                    return;
                } else {
                    pbc.ajax({
                        url: that.actions.get,
                        data: {
                            model: that.model.name,
                            id: that.id
                        },
                        success: function (e) {
                            if (e.statusCode == "1") {
                                var json = e.data;
                                self.formData = json;
                                if (that.renderInLoad != false) {
                                    self.form_toolbarinit();
                                    self.form_render_header();
                                    init();
                                }
                                copy(self.formData);
                            } else {
                                if (that.renderInLoad != false) {
                                    init();
                                }
                                pbc.tipsInTop(e.statusCode, e.message);
                            }
                        }
                    });
                }
            }
        },
        form_close: function () {
            var ws = this;
            var options = this.options;
            if (ws.dialogOpener) {
                ws.dialogOpener.close();
            } else {
                if (ws.formTabid) {
                    pbc.removeTab(ws.formTabid);
                }
            }
        },
        form_save: function (_) {
            /**
			 * @return {undefined}
			 */

             var self = this;
            var options = this.options;
            if (self.trigger("beforeSave") == false) {
                return;
            }
            if (!self.form.valid()) {
                self.form.showInvalid();
                return;
            }
            var params = self.form.getData();
            var data = $.extend({}, self.initFormData, self.formData, params);
            if (options.bind && options.bind.formPostData) {
                $.extend(data, options.bind.formPostData);
            } else {
                if (options.formPostData) {
                    $.extend(data, options.formPostData);
                }
            }
            if (options.submitDataAttribute) {
                var file = {};
                file[options.submitDataAttribute] = data;
                data = file;
            } /** @type {null} */
            var merge = null;
            if (typeof self.formValidate == "function") { /** @type {!Function} */
                merge = self.formValidate;
            } else {
                if (options.formCheck) {
                    merge = options.formCheck;
                } else {
                    if (self.hasBind("formCheck")) {
                        merge = self.events["formcheck"][0];
                    }
                }
            }
            if (merge) {
                var addOptions = {
                    page: self,
                    form: self.form,
                    formData: data
                };
                var opts = merge(addOptions);
                if (opts && opts.valid === false) {
                    pbc.tipsInTop({
                        type: 2,
                        top: options.tipTop,
                        content: opts.message
                    });
                    return;
                }
            }
            self.trigger("formSubmit", data);
            if (options.toSave) {
                options.toSave(data, function () {
                    activate();
                });
                return;
            }
            self.trigger("toSave", [data, function () {
                activate();
            }]);
            if (self.localType) {
                if (self.callback) {
                    self.callback.call(self, data);
                }
                return;
            }
            if (options.actions.check) {
                pbc.ajax({
                    url: options.actions.check,
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    loading: pbc.res.checking,
                    success: function (e) {
                        if (e.statusCode == "1") {
                            if (options.checkSussess) {
                                options.checkSussess(e, activate);
                            } else {
                                activate();
                            }
                        } else {
                            if (e.statusCode == "2") {
                                pbc.tipsInTop(2, e.message);
                            } else {
                                if (e.statusCode == "3") {
                                    pbc.showError(e.message);
                                }
                            }
                        }
                    }
                });
            } else {
                activate();
            }
            function activate() {
                /**
				 * @return {undefined}
				 */

                function animate() {
                    if (self.formTabid) {
                        var originalBaseURL = getTabTitle(self.formTabid);
                        if (originalBaseURL) {
                            setTabTitle(self.formTabid, originalBaseURL.replace("编辑 ", "新增 ").replace("修改 ", "新增 "));
                        }
                    } else {
                        if (self.dialogOpener) {
                            originalBaseURL = $(self.dialogOpener.element).find(".l-dialog-title").html();
                            if (originalBaseURL) {
                                $(self.dialogOpener.element).find(".l-dialog-title").html(originalBaseURL.replace("编辑 ", "新增 ").replace("修改 ", "新增 "));
                            }
                        }
                    }
                }
                /**
				 * @return {undefined}
				 */

                function next() {
                    if (j >= self.form.saveQueue.length) {
                        init();
                    } else {
                        var namespace = self.form.saveQueue[j];
                        if (!$.isFunction(namespace)) {
                            j++;
                            next();
                        } else {
                            namespace(data, function () {
                                j++;
                                next();
                            });
                        }
                    }
                }
                /**
				 * @return {undefined}
				 */

                function init() {
                    $.extend(settings, {
                        data: {
                            data: data,
                            model: options.model.name,
                            method: options.id ? "update" : "create"
                        }
                    });
                    if (self.saveParm) {
                        $.extend(settings.data, self.saveParm);
                    }
                    pbc.ajax(settings);
                }
                self.trigger("formSubmit", data);
                data.ID = options.id;
                if (!data.ID && self.enabledFlow()) {
                    data.Status = pbc.web.status.active;
                }
                var settings = {
                    url: options.actions.save,
                    success: function (e) {
                        pbc.hideLoading();
                        pbc.hideLoadingInTop();
                        self.trigger("afterSave", e);
                        if (_) {
                            _(e);
                            return;
                        } else {
                            if (self.hasBind("saveSuccess")) {
                                self.trigger("saveSuccess", e);
                                return;
                            }
                        }
                        if (e.statusCode == "1") {
                            if (e.ID || e.id) {
                                data.ID = e.ID || e.id;
                                options.id = data.ID;
                            }
                            var panelSettings = options.common || {};
                            panelSettings.saveCallbackType = panelSettings.saveCallbackType || "dialog";
                            var error = pbc.res.saveSuccess.replace("#message#", e.message || "");
                            if (!self.hideSuccessDialog && !options.hideSuccessDialog) {
                                toastr.success(error);
                            }
                            if (self.callback) {
                                self.callback(data, {
                                    result: e
                                });
                            } else {
                                if (self.openerPage && self.openerPage.reload) {
                                    self.openerPage.reload();
                                }
                                switch (panelSettings.saveCallbackType) {
                                    case "toView":
                                        /** @type {null} */
                                        options.toolbar = null; /** @type {boolean} */
                                        options.isView = true;
                                        self.form_render();
                                        return;
                                    case "toAdd":
                                        /** @type {boolean} */
                                        options.isView = false;
                                        animate();
                                        self.form_render();
                                        return;
                                    case "toEdit":
                                        /** @type {boolean} */
                                        options.isView = false;
                                        self.form_render();
                                        return;
                                    case "toClose":
                                        self.form_close();
                                        return;
                                    case "dialogOK":
                                        var rejectingServer = $.ligerDialog.open({
                                            title: "提示",
                                            content: '<div style="margin:10px;">数据保存成功！<div>',
                                            width: 320,
                                            top: 200,
                                            buttons: [{
                                                text: "关闭",
                                                onclick: function () {
                                                    rejectingServer.close();
                                                }
                                            }]
                                        });
                                        return;
                                    case "dialog":
                                        /** @type {!Array} */
                                        var items = [{
                                            text: "新增",
                                            cls: "l-dialog-btn-highlight",
                                            onclick: function () {
                                                animate(); /** @type {boolean} */
                                                options.isView = false;
                                                self.form_render();
                                                rejectingServer.close();
                                            }
                                        }, {
                                            text: "编辑",
                                            onclick: function () { /** @type {boolean} */
                                                options.isView = false;
                                                self.form_render();
                                                rejectingServer.close();
                                            }
                                        }];
                                        items.push({
                                            text: "关闭",
                                            onclick: function () {
                                                self.form_close();
                                                rejectingServer.close();
                                            }
                                        });
                                        rejectingServer = $.ligerDialog.open({
                                            title: "保存成功",
                                            content: '<div style="margin:6px;">请选择接下来的操作<div>',
                                            width: 320,
                                            buttons: items
                                        });
                                        return;
                                }
                            }
                            return;
                        } else {
                            if (e.statusCode == "2") {
                                pbc.tipsInTop(2, e.message);
                            } else {
                                if (e.statusCode == "3") {
                                    pbc.showError(e.message);
                                }
                            }
                        }
                    },
                    loading: options.hideLoading ? null : pbc.res.saving
                };
                var I = self.jelement.find("form.mainform"); /** @type {number} */
                var j = 0;
                if (self.form.saveQueue.length) {
                    next();
                } else {
                    init();
                }
            }

        },
        form_onSaved: function () {
            var A = this;
            var options = this.options;
            var _ = options.common || {};
            if (options.saveCallbackType) { }
        },
        form_cancel: function () {
            var Mixology = this;
            var opts = this.options;
            if (Mixology.dialogOpener) {
                Mixology.dialogOpener.close();
            } else {
                if (!opts.isView) { /** @type {null} */
                    opts.id = null;
                    Mixology.form_clear();
                    return;
                }
            }
        },
        form_edit: function () {
            var _ = this;
            var opts = this.options;
            if (opts.isView) { /** @type {null} */
                opts.toolbar = null; /** @type {boolean} */
                opts.isView = false;
                _.form_load();
                return;
            }
        },
        form_add: function () {
            var _ = this;
            var opts = this.options;
            if (opts.isView) { /** @type {null} */
                opts.toolbar = null; /** @type {boolean} */
                opts.isView = false; /** @type {null} */
                opts.id = null;
                _.form_load();
                return;
            }
        },
        deleteCurrent: function () {
            var self = this;
            var opts = this.options;
            if (!opts.id) {
                return;
            }
            $.ligerDialog.confirm(pbc.res.confirmDel, function (canCreateDiscussions) {
                var url = opts.actions.del;
                if ($.isFunction(url)) {
                    url = url();
                }
                url = pbc.resolveUrl(url);
                if (!canCreateDiscussions) {
                    return;
                }
                pbc.ajax({
                    url: url,
                    data: {
                        arg: [opts.id],
                        model: opts.model.name
                    },
                    success: function (e) {
                        if (e.statusCode == "1") {
                            pbc.tipsInTop(1, pbc.res.delSuccess);
                            self.trigger("afterDelete");
                            if (self.callback) {
                                self.callback("deleted");
                            } else {
                                if (opts.dialogOpener) {
                                    opts.dialogOpener.close();
                                }
                                if (opts.tabOpener) {
                                    opts.tabOpener.removeTabItem(opts.tabIdIndex);
                                }
                            }
                        } else {
                            if (e.statusCode == "2") {
                                pbc.tipsInTop(2, e.message);
                            } else {
                                if (e.statusCode == "3") {
                                    pbc.showError(e.message);
                                }
                            }
                        }
                    }
                });
            });
        }
    });
    return pbc.web.views.form;
});