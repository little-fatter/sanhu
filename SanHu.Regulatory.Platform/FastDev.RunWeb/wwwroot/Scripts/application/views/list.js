'use strict';
define(["jquery", "views_parts_toolbar", "views_parts_tree"], function ($, toolbarInit, treeInit) {
    /**
	 * @return {?}
	 */

    function initHtml() { /** @type {!Array} */
        var outChance = [];
        outChance.push('<div class="toolpanel"> ');
        outChance.push('<div class="toolpanelinner"> ');
        outChance.push('     <div class="toolpaneltop"> ');
        outChance.push("     </div> ");
        outChance.push('     <div class="clear"> ');
        outChance.push("     </div> ");
        outChance.push('     <div class="searchbox"> ');
        outChance.push("     </div> ");
        outChance.push('     <div class="toolbar"></div>');
        outChance.push("     </div> ");
        outChance.push("</div> ");
        outChance.push('<div class="mainpanel" style="margin:4px;"></div>');
        return outChance.join("");
    }
    /**
	 * @param {?} marker
	 * @return {undefined}
	 */
    pbc.web.views.list = function (marker) {
        pbc.web.views.list.base.constructor.call(this, marker);
    };
    pbc.web.views.list.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            toolbarInit(that);
            that.list_init();
            pbc.web.views.list.base.render.call(this);
            that.list_render();
            that.trigger("pageLoaded");
        },
        list_init: function () {
            var $rootScope = this;
            var options = this.options;
            var topicTitle = options.model.title;
            var name = options.model.name;
            options.actions = options.actions || {};
            options.list = $.extend({
                sortName: options.idField,
                height: "100%",
                allowUnSelectRow: true,
                rownumbers: true,
                heightDiff: -7,
                url: options.actions.list || "/web/pageddata?model=" + name
            }, options.list);
            if (!options.list.url) {
                options.list.url = options.actions.list || "/web/pageddata?model=" + name;
            }
            this.options = options = $.extend({
                viewType: "list",
                filters: options.filters,
                filterFields: options.filterFields || [],
                treeFilter: options.treeFilter,
                actions: {
                    del: "/web/Delete/",
                    save: "/web/saveList/"
                },
                formUrl: "pages/" + name + "/form.w",
                tabId: name + "-" + options.viewName,
                titleAdd: "新增 " + topicTitle,
                titleEdit: "修改 " + topicTitle,
                titleView: "查看 " + topicTitle,
                toolbar: {
                    items: []
                },
                toolbarSelector: {
                    items: [{
                        text: options.selectRes || "选择",
                        id: "select",
                        cls: "ne-btn-blue"
                    }, {
                        text: options.createRes || "创建",
                        id: "add"
                    }, {
                        text: options.canelRes || "取消",
                        id: "cancel"
                    }]
                },
                toolbarEditList: {
                    items: [{
                        text: "新增",
                        id: "editlist_add"
                    }, {
                        text: "撤销更改",
                        id: "editlist_cancel"
                    }, {
                        text: "保存",
                        id: "editlist_save",
                        cls: "ne-btn-blue"
                    }]
                },
                search: options.search
            }, options);
            if (options.renderTo instanceof jQuery) {
                options.renderTo = options.renderTo.get(0);
            }
            $(options.renderTo).addClass("ne-view");
            if (options.renderTo.dialog) {
                $rootScope.dialogOpener = options.renderTo.dialog;
            } else {
                if (options.renderTo.tab) {
                    $rootScope.tabOpener = options.renderTo.tab;
                }
            }
            if (options.userdata && options.userdata.rights && options.userdata.rights.fun) {
                var n = options.userdata.rights.fun;
                options.toolbar = options.toolbar || {};
                options.toolbar.items = options.toolbar.items || [];
                if (n.enabledAdd) {
                    options.toolbar.items.push({
                        text: options.createRes || "创建",
                        id: "add",
                        cls: "ne-btn-blue"
                    });
                } /** @type {!Array} */
                var tabs = [];
                if (n.enabledDel) {
                    tabs.push({
                        text: "删除",
                        id: "del"
                    });
                }
                if (n.enabledImport) {
                    tabs.push({
                        text: "导入",
                        id: "import"
                    });
                }
                if (n.enabledExport) {
                    tabs.push({
                        text: "导出",
                        id: "export"
                    });
                }
                if (n.enabledPrint) {
                    tabs.push({
                        text: "打印",
                        id: "print"
                    });
                }
                if (n["extends"]) {
                    $(n["extends"]).each(function () {
                        options.toolbar.items.push(this);
                    });
                }
                if (tabs.length > 5) {
                    options.toolbar.items.push({
                        text: "更多",
                        cls: "ne-btn-group",
                        children: tabs
                    });
                } else {
                    $(tabs).each(function () {
                        options.toolbar.items.push(this);
                    });
                }
            }
        },
        list_render: function () {
            var self = this;
            var options = this.options;
            var highlightedColumn = self.dialogOpener || self.tabOpener; /** @type {null} */
            var opts = null;
            if (options.renderTo && highlightedColumn) {
                opts = options.renderTo.openerData;
            }
            if ($(options.renderTo).parent().is(".l-dialog-content")) {
                $(options.renderTo).parent().css("overflow", "hidden");
            }
            if (opts) {
                self.callback = opts.callback;
                if (!opts.selectorType) {
                    self.onDataChanged = opts.callback;
                } else { /** @type {boolean} */
                    self.selectorType = true;
                    self.selectorInitData = opts.selectorInitData;
                    var textField = opts.textField;
                    var block_idx = opts.valueField || "ID"; /** @type {boolean} */
                    self.singleMode = opts.singleMode ? true : false; /** @type {boolean} */
                    self.fromGridEditor = opts.isGridEditor ? true : false; /** @type {!Array} */
                    self.selectedData = []; /** @type {!Array} */
                    self.selectedFullData = [];
                    if (self.selectorInitData) {
                        $(self.selectorInitData).each(function () {
                            if ($.isArray(this) && this.length == 2) {
                                self.selectedData.push(this);
                                var data = {};
                                data[block_idx] = this[0];
                                data[textField] = this[1];
                                self.selectedFullData.push(data);
                            }
                        });
                    }
                    if (options.list) {
                        /**
						 * @param {?} input
						 * @return {?}
						 */
                        options.list.isChecked = function (input) {
                            if (self.singleMode) {
                                return input[options.idField] == self.selectedData[0];
                            } else { /** @type {number} */
                                var key = 0;
                                for (; key < self.selectedData.length; key++) {
                                    if (input[options.idField] == self.selectedData[key][0]) {
                                        return true;
                                    }
                                }
                                return false;
                            }
                        };
                        if (!self.singleMode) {
                            /**
							 * @param {?} $row
							 * @return {?}
							 */
                            var updateRow = function ($row) { /** @type {number} */
                                var row = 0;
                                for (; row < self.selectedData.length; row++) {
                                    if (self.selectedData[row][0] == $row) {
                                        return row;
                                    }
                                }
                                return -1;
                            };
                            /**
							 * @param {string} row
							 * @return {undefined}
							 */
                            var insert = function (row) {
                                var $row = typeof row == "string" ? row : row ? row[options.idField] : null;
                                if (!$row) {
                                    return;
                                }
                                var id = updateRow($row);
                                if (id == -1) {
                                    return;
                                }
                                $plusTabs.find(".column[data-id=" + $row + "]").remove();
                                self.selectedData.splice(id, 1);
                                self.selectedFullData.splice(id, 1);
                            };
                            /**
							 * @param {string} data
							 * @return {undefined}
							 */
                            var update = function (data) {
                                if (updateRow(data[options.idField]) > -1) {
                                    return;
                                } /** @type {!Array} */
                                var settings = [data[options.idField], data[textField]];
                                self.selectedData.push(settings);
                                self.selectedFullData.push(data);
                                init(settings).appendTo($plusTabs);
                            };
                            /**
							 * @param {!Object} settings
							 * @return {?}
							 */
                            var init = function (settings) {
                                var element = $('<div class="column"><div class="header left"></div><div class="icon icon-minus-sign right btnDel"></div><div class="clear"></div></div>').appendTo($plusTabs);
                                element.attr("data-id", settings[0]);
                                element.find(".header").html(settings[1]);
                                element.find(".btnDel").click(function () {
                                    var id = element.attr("data-id"); /** @type {number} */
                                    var i = 0;
                                    for (; i < self.grid.rows.length; i++) {
                                        var item = self.grid.rows[i];
                                        if (item[options.idField] == id) {
                                            self.grid.unselect(item);
                                            insert(item);
                                            return;
                                        }
                                    }
                                    insert(id);
                                });
                                element.ligerDrag({
                                    animate: false,
                                    proxyX: -20,
                                    proxyY: -20,
                                    proxy: function (fn, proxy) {
                                        var p = $("<div class='selectoritems'><div class='column'></div></div>").appendTo("body");
                                        p.find(".column").html(element.html());
                                        return p;
                                    },
                                    onRendered: function () {
                                        this.set("cursor", "pointer");
                                    },
                                    onStartDrag: function (data, event) {
                                        var $realtime = $(event.target);
                                        element.hide();
                                    },
                                    onDrag: function (handler, e) {
                                        this.set("cursor", "move");
                                        var B = e.pageX || e.screenX;
                                        var A = e.pageY || e.screenY;
                                    },
                                    onStopDrag: function (row, event) {
                                        element.show();
                                    }
                                });
                                return element;
                            };
                            var $plusTabs = $('<div class="selectoritems"></div>');
                            $(self.selectedData).each(function () {
                                init(this).appendTo($plusTabs);
                            });
                            /**
							 * @param {?} database2
							 * @param {string} options
							 * @return {undefined}
							 */
                            options.list.onCheckRow = function (database2, options) {
                                if (database2) {
                                    update(options);
                                } else {
                                    insert(options);
                                }
                            };
                            /**
							 * @param {?} trackingPeriod
							 * @param {string} value
							 * @return {undefined}
							 */
                            options.list.onCheckAllRow = function (trackingPeriod, value) {
                                var r = this.rows;
                                if (!r) {
                                    return;
                                } /** @type {number} */
                                var i = 0;
                                for (; i < r.length; i++) {
                                    value = r[i];
                                    if (trackingPeriod) {
                                        update(value);
                                    } else {
                                        insert(value);
                                    }
                                }
                            };
                        }
                    }
                }
            }
            if (options.selectorType) { /** @type {boolean} */
                self.selectorType = true;
            }
            if (self.selectorType) {
                options.toolbar = options.toolbarSelector;
                $.extend(options.list, {
                    checkbox: true,
                    isSingleCheck: self.singleMode
                });
            } else {
                if (options.isEditList) {
                    options.toolbar = options.toolbarEditList;
                    $.extend(options.list, {
                        checkbox: false,
                        enabledEdit: true
                    });
                }
            }
            self.jelement = $(options.renderTo);
            self.jelement.html(initHtml());
            self.initToolpanel();
            var comment = options.userdata ? options.userdata.rights : null; /** @type {boolean} */
            var htmlBlockDelimiter = comment ? true : false;
            self.jgrid = self.jelement.find(".mainpanel:first");
            var data = $.extend(true, {
                delayLoad: true
            }, options.list);
            if (options.list.hideOpColumn) { /** @type {boolean} */
                options.hideOpColumn = true;
            }
            if (!data.downPageUrl && data.downViewName) { /** @type {string} */
                data.downPageUrl = "/pages/" + options.model.name + "/" + data.downViewName + ".w";
                data.downPageHeight = data.downViewHeight;
            }
            data.columns = data.columns || []; /** @type {!Array} */
            var columns = [];
            if (!htmlBlockDelimiter || (self.hasRights("edit") || self.hasRights("del")) && options.hideOpColumn != true) {
                columns.splice(0, 0, {
                    width: 60,
                    display: "操作",
                    render: function (doc) { /** @type {string} */
                        var realKey = "fcell_" + this.id; /** @type {string} */
                        var C = realKey + "_edit('" + doc["__id"] + "')"; /** @type {string} */
                        var A = realKey + "_del('" + doc["__id"] + "')"; /** @type {string} */
                        var ret = '<div class="operating">';
                        if (!htmlBlockDelimiter || comment.fun.enabledEdit) {
                            if (!options.list.hideOpEditColumn) { /** @type {string} */
                                ret = ret + ('<a class="ui-icon ui-icon-pencil" title="修改" href="javascript:' + C + '"></a>');
                            }
                        }
                        if (!htmlBlockDelimiter || comment.fun.enabledDel) {
                            if (!options.list.hideOpDeleteColumn) { /** @type {string} */
                                ret = ret + ('<a class="ui-icon ui-icon-trash" title="删除" href="javascript:' + A + '"></a>');
                            }
                        } /** @type {string} */
                        ret = ret + "</div>";
                        return ret;
                    }
                });
            } /** @type {number} */
            var i = 0;
            for (; i < data.columns.length; i++) {
                var val = data.columns[i];
                if (htmlBlockDelimiter && comment.field && $.inArray(val.name, comment.field.disableFields) > -1) {
                    continue;
                }
                columns.push($.extend(true, {}, val));
            } /** @type {!Array} */
            data.columns = columns;
            if (self.current.existFilter()) { /** @type {boolean} */
                data.delayLoad = true;
            }
            if (data.downPageUrl) {
                data.heightDiff = data.heightDiff || 0; /** @type {number} */
                data.heightDiff = parseInt(data.heightDiff) - data.downPageHeight;
            }
            if (options.rightFormName) {
                data.heightDiff = data.heightDiff || 0; /** @type {number} */
                data.heightDiff = parseInt(data.heightDiff) - 20;
            }
            self.trigger("beforeShowList", {
                page: self,
                options: data
            });
            if (!$(options.renderTo).is("body")) {
                /**
				 * @return {?}
				 */
                data.getContainerHeight = function () {
                    if ($(options.renderTo).parent().is(".l-tab-content-item")) {
                        return $(options.renderTo).parent().height();
                    } else {
                        if ($(options.renderTo).parent().is(".l-dialog-content")) {
                            return $(options.renderTo).parent().height() - 5;
                        } else {
                            return $(options.renderTo).height();
                        }
                    }
                };
                /**
				 * @return {?}
				 */
                data.getContainerOffsetTop = function () {
                    return $(options.renderTo).offset().top;
                };
            }
            data.freedesignpage = self;
            self.grid = self.jgrid.ligerGrid(data);
            if (options.rightPageUrl) {
                /**
				 * @return {undefined}
				 */
                var isMouseOnSelectedMisspelling = function () {
                    var fhTop = item.offset().top;
                    item.height($(window).height() - fhTop - 20);
                };
                $(self.jelement).css({
                    width: options.leftListWidth || "49%",
                    "float": "left"
                }).addClass("ne-leftview").parent().addClass("leftrightview");
                $(self.jelement).parent().find(".ne-rightview").remove();
                var item = $("<div class='ne-rightview'></div>").insertAfter(self.jelement);
                item.width(options.rightPageWidth || "44%");
                setTimeout(function () {
                    isMouseOnSelectedMisspelling();
                }, 100);
                $(window).resize(function () {
                    isMouseOnSelectedMisspelling();
                });
                pbc.openPage({
                    url: options.rightPageUrl
                }, item);
                self.grid.bind("selectRow", function (object) {
                    var self = item.get(0).page;
                    if (object[options.idField] && self) {
                        self.set("hideSuccessDialog", true);
                        self.set("renderInLoad", false);
                        /**
						 * @return {undefined}
						 */
                        self.callback = function () {
                            toastr.success("保存成功");
                            self.reload();
                        };
                        self.form_load(object[options.idField]);
                    }
                });
            }
            if (data.downPageUrl) {
                item = $("<div class='ne-downview'></div>").appendTo(self.jelement);
                setTimeout(function () {
                    item.css({
                        position: "absolute",
                        top: self.jgrid.offset().top + self.jgrid.height() + 5 - $(options.renderTo).offset().top,
                        left: self.jgrid.offset().left - $(options.renderTo).offset().left
                    });
                    pbc.openPage({
                        url: data.downPageUrl,
                        options: {
                            onPageLoaded: function () {
                                item.find(".mainpanel:first").css({
                                    margin: 0,
                                    height: data.downPageHeight - 7,
                                    width: self.jgrid.find(".l-panel-body:first").width()
                                });
                                item.find(".mainpanel .mainform:first").width("auto");
                            }
                        }
                    }, item);
                }, 500);
                self.grid.bind("selectRow", function (object) {
                    var module = item.get(0).page;
                    item.css({
                        top: self.jgrid.offset().top + self.jgrid.height() + 5 - $(options.renderTo).offset().top,
                        left: self.jgrid.offset().left - $(options.renderTo).offset().left
                    });
                    if (object[options.idField] && module) {
                        module.set("hideSuccessDialog", true);
                        module.set("renderInLoad", false);
                        /**
						 * @return {undefined}
						 */
                        module.callback = function () { };
                        module.form_load(object[options.idField]);
                    }
                });
            }
            if (data.delayLoad) {
                if (!data.delayLoadData) {
                    self.list_reload();
                }
            }
            if (!self.grid) {
                return;
            }
            self.grid.bind("checkRow", self.list_onSelect);
            self.grid.bind("checkAllRow", self.list_onSelect); /** @type {string} */
            var name = "fcell_" + self.grid.id; /** @type {string} */
            var shouldHydrateName = name + "_edit"; /** @type {string} */
            var JavaScriptName = name + "_del"; /** @type {string} */
            var lazyFunc = name + "_view"; /** @type {string} */
            var globalClipboardKey = "f_reload";
            /**
			 * @return {undefined}
			 */
            window[shouldHydrateName] = function () {
                self.edit.apply(self, arguments);
            };
            /**
			 * @return {undefined}
			 */
            window[JavaScriptName] = function () {
                self.del.apply(self, arguments);
            };
            /**
			 * @return {undefined}
			 */
            window[lazyFunc] = function () {
                self.dataset.apply(self, arguments);
            };
            /**
			 * @return {undefined}
			 */
            window[globalClipboardKey] = function () {
                self.reload.apply(self, arguments);
            };
            self.bind("add", function () {
                self.add();
            });
            self.bind("print", function () {
                self.list_print();
            });
            self.bind("export", function () {
                self.exportExcel();
            });
            self.bind("import", function () {
                self.importExcel();
            });
            if (!self.selectorType) {
                self.bind("view", function () {
                    self.dataset();
                });
                self.bind("edit", function () {
                    self.edit();
                });
                self.bind("del", function () {
                    self.del();
                });
            } else {
                self.bind("select", function () {
                    self.select();
                });
                self.bind("cancel", function () {
                    self.cancel();
                });
                self.bind("selector_add", function () {
                    self.selector_add();
                });
            }
            if (options.isEditList) {
                self.bind("editlist_add", function () {
                    self.grid.add({});
                });
                self.bind("editlist_cancel", function () {
                    self.grid.rejectChanges();
                });
                self.bind("editlist_save", function () {
                    var record = self.grid;
                    var edgearray = record.getChanges();
                    if (!edgearray || !edgearray.length) {
                        pbc.showError("没有可保存的数据");
                        return;
                    }
                    if (self.trigger("beforeSave") == false) {
                        return;
                    }
                    var diff = {
                        add: [],
                        update: [],
                        del: []
                    }; /** @type {number} */
                    var i = 0;
                    for (; i < edgearray.length; i++) {
                        var e = edgearray[i];
                        if (e.__status == "add") {
                            delete e.__status;
                            diff.add.push(e);
                        }
                        if (e.__status == "update") {
                            delete e.__status;
                            diff.update.push(e);
                        }
                        if (e.__status == "delete") {
                            delete e.__status;
                            diff.del.push(e);
                        }
                    }
                    if (self.trigger("submitSave", diff) == false) {
                        return;
                    }
                    pbc.ajax({
                        url: options.actions.save || "/web/saveList/",
                        loading: "正在保存中...",
                        data: {
                            data: diff,
                            model: options.model.name
                        },
                        success: function (res) {
                            if (res && res.statusCode == "1") {
                                pbc.showSuccess("保存成功");
                                record.reload();
                            } else {
                                if (res) {
                                    pbc.showError(res.message);
                                }
                            }
                        }
                    });
                    if (self.trigger("saved", diff) == false) {
                        return;
                    }
                });
            }
            self.bind("closeDialog", function () {
                if (options.openerData && $.isFunction(options.openerData.close)) {
                    options.openerData.close();
                } else {
                    if (enabledFrameElement) {
                        frameElement.dialog.close();
                    }
                }
            });
            self.trigger("afterShowList", {
                page: self,
                list: self.grid,
                options: data
            });
            if (options.treeFilter) {
                treeInit(self);
            }
        },
        getSelecteds: function () {
            var initializationOpts = this;
            var options = this.options;
            return initializationOpts.grid.getSelecteds();
        },
        list_print: function () {
            /**
			 * @param {!Object} condition
			 * @return {undefined}
			 */

            function conditionHolds(condition) {
                pbc.openNew({
                    url: pbc.toUrl("/web/preview?rnd=") + (new Date).getTime() + "&appid=" + pbc.getAppId(),
                    parms: {
                        templateId: condition.template,
                        context: jsSrc
                    }
                });
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
                            var conditionName = event.getData();
                            if (!conditionName.template) {
                                pbc.tipsInTop(2, "请选择打印模板！");
                            } else {
                                conditionHolds(conditionName);
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
            }
            var C = this;
            var options = this.options;
            var titlefield = C.getSelecteds(); /** @type {string} */
            var jsSrc = "";
            if (titlefield && titlefield.length) { /** @type {!Array} */
                var drilldownLevelLabels = [];
                $(titlefield).each(function () {
                    drilldownLevelLabels.push(this[options.idField]);
                }); /** @type {string} */
                jsSrc = drilldownLevelLabels.join(";");
            } else {
                pbc.tipsInTop(2, "请先选择数据！");
                return;
            } /** @type {!Array} */
            var people = [];
            pbc.ajax({
                url: pbc.toUrl("/web/listdata/"),
                data: {
                    model: "core_printTemplate",
                    filter: pbc.createFilter({
                        ModelName: options.model.name
                    })
                },
                success: function (data) {
                    if (data.statusCode == "2") {
                        pbc.tipsInTop(2, data.message);
                        return;
                    } else {
                        if (data.statusCode == "3") {
                            pbc.showError(data.message);
                            return;
                        }
                    } /** @type {!Object} */
                    people = data;
                    if (!people || !people.length) {
                        pbc.tipsInTop(2, "打印模板未定义！");
                    } else {
                        update();
                    }
                }
            });
        },
        list_reload: function () {
            var Grid = this;
            var options = this.options;
            if (!Grid.grid) {
                return;
            }
            var artistTrack = Grid.getCurrentTreeCondition();
            if (artistTrack) {
                Grid.grid.setParm("TreeCondition", artistTrack);
            }
            Grid.grid.setParm("Condition", Grid.getCurrentCondition());
            Grid.grid.reload();
        },
        list_onSelect: function () {
            var A = this;
            var options = this.options;
            var expRecords = A.getSelecteds();
            if (!expRecords || !expRecords.length) { }
        },
        list_getId: function () {
            var state = this;
            var options = this.options;
            if (!state.grid) {
                return null;
            }
            if (!state.grid.rows) {
                return null;
            }
            if (!state.grid.rows.length) {
                return null;
            }
            return state.grid.rows[0][options.idField];
        },
        selector_add: function () {
            var layoutController = this;
            var opt = this.options;
            layoutController.showFormView({
                action: "add",
                viewName: opt.formViewName,
                openInTop: true
            });
        },
        getReportDataset: function (rule, data) {
            /**
			 * @param {?} data
			 * @param {number} index
			 * @param {!Object} props
			 * @return {?}
			 */

            function getXColumns(data, index, props) {
                /**
				 * @param {!Object} state
				 * @return {undefined}
				 */

                function render(state) {
                    if (data.valueFields == null) {
                        return;
                    }
                    state.columns = state.columns || []; /** @type {number} */
                    var i = 0;
                    for (; i < data.valueFields.length; i++) {
                        var o = data.valueFields[i];
                        var params = {
                            name: "VALUECOLUMN_" + valueColumnIndex++,
                            display: o.display || o.name,
                            totalFn: getTotalFn(o),
                            rowGetter: state.rowGetter
                        };
                        if (o.column) {
                            $.extend(params, o.column);
                        }
                        state.columns.push(params);
                        valueColumns.push(params);
                    }
                }
                var result = data.groupFields[index - 1];
                var formatted_title = result.name;
                var messages = getGroupValues({
                    rows: rows,
                    valueFn: function (value) {
                        return getValueFn(result)(value);
                    },
                    igFn: function (val) {
                        if (index != 1 && props != null && result.isFilterByParent) {
                            var intval = getValueFn(data.groupFields[index - 2])(val);
                            if (intval != props.value) {
                                return true;
                            }
                        }
                    }
                }); /** @type {!Array} */
                var laneStates = []; /** @type {number} */
                var i = 0;
                for (; i < messages.length; i++) {
                    var state = {
                        value: messages[i],
                        display: messages[i],
                        rowGetter: []
                    };
                    state.rowGetter.push({
                        value: state.value,
                        filter: getRowFilter(result)
                    });
                    if (props && props.rowGetter) {
                        $(props.rowGetter).each(function () {
                            state.rowGetter.push(this);
                        });
                    }
                    if (result.asValue) { /** @type {string} */
                        state.name = "VALUECOLUMN_" + valueColumnIndex++;
                        state.totalFn = getTotalFn(data.valueFields[0]);
                        valueColumns.push(state);
                    } else {
                        if (index == data.groupFields.length) {
                            render(state);
                        } else {
                            state.columns = getXColumns(data, index + 1, state);
                        }
                    }
                    laneStates.push(state);
                }
                return laneStates;
            }
            /**
			 * @param {number} i
			 * @param {!Object} current
			 * @return {undefined}
			 */

            function getGroupData(i, current) {
                var name = rule.yColumns[i - 1];
                var n = name.name;
                var filenameFilter = getGroupValues({
                    rows: rows,
                    valueFn: function (value) {
                        return getValueFn(name)(value);
                    },
                    igFn: function (zoomLevel) {
                        if (i != 1 && current != null) {
                            var currentLevel = getValueFn(rule.yColumns[i - 2])(zoomLevel);
                            if (currentLevel != current.value) {
                                return true;
                            }
                        }
                    }
                }); /** @type {!Array} */
                var C = []; /** @type {number} */
                var ii = 0;
                for (; ii < filenameFilter.length; ii++) {
                    var options = {
                        value: filenameFilter[ii]
                    }; /** @type {!Object} */
                    options.parent = current;
                    options.name = n;
                    if (i == rule.yColumns.length) {
                        var callback = getRowFilter(name);
                        options.rows = filterRows(rows, function (identifierPositions) {
                            if (!callback(identifierPositions, options.value)) {
                                return false;
                            }
                            if (options.parent) {
                                var ansData = options.parent.value;
                                if (!getRowFilter(rule.yColumns[i - 2])(identifierPositions, ansData)) {
                                    return false;
                                }
                            }
                            return true;
                        });
                        var data = {};
                        data[name.name] = options.value;
                        if (options.parent) {
                            data[options.parent.name] = options.parent.value;
                            if (options.parent.parent) {
                                data[options.parent.parent.name] = options.parent.parent.value;
                            }
                        }
                        $(valueColumns).each(function (canCreateDiscussions, validation) {
                            var results = filterRows(options.rows, function (filteredLine) { /** @type {number} */
                                var i = 0;
                                for (; i < validation.rowGetter.length; i++) {
                                    var filter = validation.rowGetter[i].filter;
                                    var relation = validation.rowGetter[i].value;
                                    if (!filter(filteredLine, relation)) {
                                        return false;
                                    }
                                }
                                return true;
                            });
                            data[validation.name] = validation.totalFn(results);
                        });
                        outData.push(data);
                    } else {
                        options.chilren = getGroupData(i + 1, options);
                    }
                }
                C;
            }
            /**
			 * @param {!Object} o
			 * @return {?}
			 */

            function getRowFilter(o) {
                if (o.rowFilter) {
                    return o.rowFilter;
                }
                return function (t, type) {
                    var threshold = getValueFn(o)(t);
                    if (threshold == type) {
                        return true;
                    }
                };
            }
            /**
			 * @param {!Object} group
			 * @return {?}
			 */

            function getValueFn(group) {
                if (group.valueFn) {
                    return group.valueFn;
                } else {
                    if (group.exp) {
                        if (group.exp == "year" || group.exp == "month" || group.exp == "date") {
                            return function (row) {
                                var value = row[group.name];
                                if (typeof value == "string") {
                                    if (/^\/Date/.test(value)) { /** @type {string} */
                                        value = value.replace(/^\//, "new ").replace(/\/$/, "");
                                        eval("value = " + value);
                                    } else { /** @type {number} */
                                        value = Date.parse(value);
                                    }
                                }
                                if (group.exp == "year") {
                                    return value.getFullYear();
                                } else {
                                    if (group.exp == "month") {
                                        return value.getMonth() + 1;
                                    } else {
                                        return value.getDate();
                                    }
                                }
                            };
                        }
                    } else {
                        if (group.name) {
                            return function (optimized) {
                                return optimized[group.name];
                            };
                        } else {
                            return function (canCreateDiscussions) {
                                return null;
                            };
                        }
                    }
                }
            }
            /**
			 * @param {!Object} o
			 * @return {?}
			 */

            function getTotalFn(o) {
                if (o.TotalFn) {
                    return o.TotalFn;
                } else {
                    if (o.exp) {
                        return function (items) {
                            if (!items || !items.length) {
                                return 0;
                            } /** @type {number} */
                            var sum = 0;
                            var nShortest = items[0][o.name];
                            var nBF = nShortest; /** @type {number} */
                            var i = 0;
                            for (; i < items.length; i++) {
                                var n = items[i][o.name]; /** @type {number} */
                                n = parseFloat(n);
                                if (!isNaN(n) && n) {
                                    if (n < nShortest) { /** @type {number} */
                                        nShortest = n;
                                    }
                                    if (n > nBF) { /** @type {number} */
                                        nBF = n;
                                    } /** @type {number} */
                                    sum = sum + n;
                                }
                            }
                            if (o.exp == "sum") {
                                return sum;
                            } else {
                                if (o.exp == "avg") {
                                    return sum / items.length;
                                } else {
                                    if (o.exp == "min") {
                                        return nShortest;
                                    } else {
                                        if (o.exp == "max") {
                                            return nBF;
                                        } else {
                                            if (o.exp == "count") {
                                                return items.length;
                                            } else {
                                                return items.length;
                                            }
                                        }
                                    }
                                }
                            }
                        };
                    } else {
                        return function (canCreateDiscussions) {
                            return null;
                        };
                    }
                }
            }
            /**
			 * @param {!Object} cfg
			 * @return {?}
			 */

            function getGroupValues(cfg) {
                var crossfilterable_layers = cfg.rows;
                var block_idx = cfg.name;
                var origTimeout = cfg.igFn;
                var valFn = cfg.valueFn;
                if (!valFn) {
                    /**
					 * @param {?} data
					 * @return {?}
					 */
                    valFn = function (data) {
                        return data[block_idx];
                    };
                } /** @type {!Array} */
                var values = []; /** @type {number} */
                var layer_i = 0;
                for (; layer_i < crossfilterable_layers.length; layer_i++) {
                    var result = valFn(crossfilterable_layers[layer_i]);
                    if (result != null && $.inArray(result, values) == -1) {
                        if (origTimeout != null && origTimeout(crossfilterable_layers[layer_i])) {
                            continue;
                        }
                        values.push(result);
                    }
                }
                return values;
            }
            /**
			 * @param {?} list
			 * @param {!Function} row
			 * @return {?}
			 */

            function filterRows(list, row) { /** @type {!Array} */
                var results = [];
                $(list).each(function () {
                    if (row(this)) {
                        results.push(this);
                    }
                });
                return results;
            } /** @type {!Array} */
            var columns = []; /** @type {number} */
            var valueColumnIndex = 0; /** @type {!Array} */
            var valueColumns = []; /** @type {!Object} */
            var rows = data;
            if (rule.xColumnIsGroup) { /** @type {number} */
                var i = 0;
                for (; i < rule.xColumns.length; i++) {
                    var column = {
                        display: rule.xColumns[i].title,
                        columns: getXColumns(rule.xColumns[i], 1, null)
                    };
                    columns.push(column);
                }
            } else {
                columns = getXColumns(rule.xColumns[0], 1, null);
            } /** @type {!Array} */
            var outFns = []; /** @type {!Array} */
            var outData = []; /** @type {!Array} */
            var outColumns = [];
            var treeData = getGroupData(1);
            $(rule.yColumns).each(function () {
                outColumns.push({
                    name: this.name,
                    display: this.display
                });
            });
            $(columns).each(function () {
                outColumns.push(this);
            });
            return {
                columns: outColumns,
                rows: outData
            };
        }
    });
    pbc.web.views.list.prototype.list_search = pbc.web.views.list.prototype.list_reload;
    return pbc.web.views.list;
});