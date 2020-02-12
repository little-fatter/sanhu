'use strict';
define(["jquery", "views_parts_toolbar", "views_parts_tree"], function ($, boneTmpl, saveNotifs) {
    /**
	 * @return {?}
	 */

    function _emptyTable() { /** @type {!Array} */
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
	 * @param {?} p1__3354_SHARP_
	 * @return {undefined}
	 */
    pbc.web.views.treePage = function (p1__3354_SHARP_) {
        pbc.web.views.treePage.base.constructor.call(this, p1__3354_SHARP_);
    };
    pbc.web.views.treePage.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            that.treePage_init();
            boneTmpl(that);
            pbc.web.views.treePage.base.render.call(this);
            that.treePage_render();
            that.trigger("pageLoaded");
        },
        treePage_init: function () {
            var li = this;
            var opts = this.options;
            var rights = opts.userdata.rights;
            var topicTitle = opts.model.title;
            var slug = opts.model.name;
            opts.common = opts.common || {};
            this.options = opts = $.extend({
                viewType: "treePage",
                actions: {},
                formViewName: opts.common.formViewName,
                tabId: slug + "-" + opts.viewName,
                toolbar: toolbar
            }, opts);
            if (opts.userdata && opts.userdata.rights && opts.userdata.rights.fun) {
                var fun = opts.userdata.rights.fun;
                opts.toolbar = opts.toolbar || {};
                if (opts.toolbar.items && opts.toolbar.items.length) {
                    return;
                }
                opts.toolbar.items = opts.toolbar.items || [];
                if (fun.enabledAdd) {
                    opts.toolbar.items.push({
                        text: opts.createRes || "创建",
                        id: "add",
                        cls: "ne-btn-blue"
                    });
                }
                if (fun.enabledDel) {
                    opts.toolbar.items.push({
                        text: "删除",
                        id: "del"
                    });
                }
            }
            li.bind("add", function () {
                li.treePage_add();
            });
            li.bind("del", function () {
                li.treePage_del();
            });
        },
        openPage: function (type) {
            var instance = this;
            var request = this.options;
            var i = instance.jelement.find(".mainpanel").get(0);
            var requestOrUrl = request.treeFilter.pageUrl.replace("#data.id#", type || "");
            pbc.openPage({
                url: requestOrUrl
            }, i);
        },
        treePage_add: function () {
            var grid = this;
            var options = this.options;
            grid.openPage();
            var peersResponse = grid.tree.getSelected();
            if (peersResponse && peersResponse.data) {
                grid.tree.cancelSelect(peersResponse.data, false);
                return;
            }
        },
        treePage_del: function () {
            var grid = this;
            var opts = this.options;
            var namedRouteOptions = grid.tree.getSelected();
            if (!namedRouteOptions || !namedRouteOptions.data) {
                pbc.tipsInTop(1, pbc.res.pleaseSelect);
                return;
            }
            var want = namedRouteOptions.data.id;
            $.ligerDialog.confirm(pbc.res.confirmDel, function (canCreateDiscussions) {
                if (!canCreateDiscussions) {
                    return;
                }
                var url = opts.actions.del || "/web/Delete/";
                if ($.isFunction(url)) {
                    url = url();
                }
                pbc.ajax({
                    url: pbc.toUrl(url),
                    data: {
                        arg: want,
                        model: opts.model.name
                    },
                    success: function (e) {
                        grid.trigger("AfterDelete");
                        if (e.statusCode == "1") {
                            pbc.tipsInTop(1, pbc.res.delSuccess);
                            grid.openPage();
                            grid.tree.reload();
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
        },
        treePage_render: function () {
            var self = this;
            var o = this.options;
            self.jelement = $(o.renderTo);
            self.jelement.html(_emptyTable());
            $(o.renderTo).addClass("ne-view");
            self.initToolpanel();
            saveNotifs(self);
            if (o.treeFilter.pageUrl) {
                self.openPage();
            }
        },
        treePage_reload: function () {
            var _ = this;
            var options = this.options;
            _.treePage_add();
        },
        loadPage: function (options) {
            var grid = this;
            var request = this.options;
            if (options && options.id) {
                if (request.treeFilter.pageUrl) {
                    grid.openPage(options.id);
                }
            }
        },
        treePage_print: function () {
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
                            var Plain = store_scrEncounter.getData();
                            load(Plain);
                            rejectingServer.close();
                        }
                    }, {
                        text: "取消",
                        onclick: function () {
                            rejectingServer.close();
                        }
                    }]
                });
                $(create_content_btn).each(function () {
                    this.Title = this.ModelName || this.Title;
                });
                var store_scrEncounter = me.ligerForm({
                    labelWidth: "auto",
                    fields: [{
                        name: "treePage",
                        label: "打印模板",
                        type: "select",
                        labelWidth: 80,
                        width: 255,
                        editor: {
                            data: create_content_btn,
                            valueField: "ID",
                            textField: "Title"
                        }
                    }]
                });
            }
            /**
			 * @param {?} name
			 * @return {undefined}
			 */

            function load(name) {
                var $ = (new pbc.base64).encode(JSON.stringify(networkCacheEntry.treePageParm));
                var requestOrUrl = pbc.toUrl("/web/preview?isreport=Y&rnd=") + (new Date).getTime() + "&appid=" + pbc.getAppId();
                pbc.openNew({
                    url: requestOrUrl,
                    parms: {
                        treePageId: name.treePage,
                        descriptorCode: $
                    }
                });
            }
            var networkCacheEntry = this;
            var options = this.options;
            var create_content_btn;
            pbc.ajax({
                url: pbc.toUrl("/web/listdata/"),
                data: {
                    model: "core_reportTemplate",
                    filter: pbc.createFilter({
                        IsDefault: 1,
                        ModelName: options.model.name
                    })
                },
                success: function (e) {
                    if (e.statusCode == "2") {
                        pbc.tipsInTop(2, e.message);
                        return;
                    } else {
                        if (e.statusCode == "3") {
                            pbc.showError(e.message);
                            return;
                        }
                    } /** @type {!Object} */
                    create_content_btn = e;
                    if (!create_content_btn || !create_content_btn.length) {
                        pbc.tipsInTop(2, "报表模板未定义！");
                    } else {
                        update();
                    }
                }
            });
        }
    });
    return pbc.web.views.treePage;
});