'use strict';
define(["jquery", "views_parts_toolbar"], function ($, boneTmpl) {
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
    pbc.web.views.kanban = function (p1__3354_SHARP_) {
        pbc.web.views.kanban.base.constructor.call(this, p1__3354_SHARP_);
    };
    pbc.web.views.kanban.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            boneTmpl(that);
            that.kanban_init();
            pbc.web.views.kanban.base.render.call(this);
            that.kanban_render();
            that.trigger("pageLoaded");
        },
        kanban_init: function () {
            var C = this;
            var opts = this.options;
            var src = opts.userdata.rights;
            var topicTitle = opts.model.title;
            var slug = opts.model.name;
            var branchesReferences = {
                items: []
            };
            if (src && src.fun) {
                if (src.fun.enabledAdd) {
                    branchesReferences.items.push({
                        text: "创建",
                        id: "add",
                        cls: "ne-btn-blue"
                    });
                }
            }
            this.options = opts = $.extend({
                viewType: "kanban",
                actions: {
                    viewForm: "/pages/" + opts.model.name + "/form.w",
                    getTemplate: "/web/template/kanban",
                    getList: "/web/listdata",
                    del: "/web/delete/"
                },
                formViewName: opts.common.formViewName,
                tabId: slug + "-" + opts.viewName,
                titleAdd: "新增 " + topicTitle,
                titleEdit: "编辑 " + topicTitle,
                toolbar: branchesReferences
            }, opts);
        },
        kanban_render: function () {
            var self = this;
            var o = this.options;
            self.jelement = $(o.renderTo);
            self.jelement.html(_emptyTable());
            self.initToolpanel();
            self.bind("add", function () {
                self.add();
            });
            if (o.kanban && !o.kanban.delayLoad) {
                self.kanban_reload();
            }
        },
        kanban_reload: function (isolateWrites) {
            var self = this;
            var $scope = this.options;
            self.jkanban = self.jelement.find(".mainpanel:first").addClass("kanbanpanel");
            if (!$scope.kanban) {
                return;
            }
            var data = {
                model: $scope.model.name
            };
            if ($scope.kanban.usePager) {
                data.SortName = $scope.kanban.sortName || "CreateDate";
                data.SortOrder = $scope.kanban.sortOrder || "desc";
                data.PageIndex = self.currentPageIndex = isolateWrites || $scope.kanban.pageIndex || 1;
                data.PageSize = $scope.kanban.pageSize || 20;
                data.Condition = self.getCurrentCondition();
            } else {
                data.filter = self.getCurrentCondition();
            }
            if (typeof $scope.kanban.template == "string") { /** @type {string} */
                data.template = $scope.kanban.template;
                pbc.ajax({
                    url: $scope.actions.getTemplate,
                    data: data,
                    success: function (e) {
                        if (e.statusCode == "2") {
                            pbc.tipsInTop(2, e.message);
                            return;
                        } else {
                            if (e.statusCode == "3") {
                                pbc.showError(e.message);
                                return;
                            }
                        }
                        self.jkanban.html("");
                        self.jkanban.append(e.data);
                        if ($scope.kanban.usePager) {
                            var $slidestomove = self.createPager_kanban(e.total);
                            $slidestomove.appendTo(self.jkanban);
                            self.jkanban.css("paddingBottom", "40px");
                        }
                        self.jkanban.append('<div class="clear"></div>');
                        self.jkanban.find("a").click(function () {
                            var _td_h = $(this).attr("data-id");
                            if (!_td_h) {
                                return;
                            }
                            var filePath = $scope.actions.viewForm; /** @type {string} */
                            filePath = filePath + (filePath.indexOf("?") == -1 ? "?" : ":"); /** @type {string} */
                            filePath = filePath + ("id=" + _td_h);
                            self.kanban_open(filePath);
                        });
                        self.jkanban.find("input.configcode").remove();
                        self.jkanban.find("img").each(function () {
                            var path = $(this).attr("src");
                            if (path) {
                                $(this).attr("src", pbc.toUrl(path));
                            } else {
                                $(this).attr("src", pbc.toUrl("Contents/img/default.png"));
                            }
                        });
                        $('<div class="clear"></div>').appendTo(self.jkanban);
                        self.trigger("kanbanloaded", self.jkanban);
                    }
                });
            } else {
                pbc.ajax({
                    url: $scope.actions.getList,
                    data: data,
                    success: function (results) {
                        if (results.statusCode == "2") {
                            pbc.tipsInTop(2, results.message);
                            return;
                        } else {
                            if (results.statusCode == "3") {
                                pbc.showError(results.message);
                                return;
                            }
                        }
                        self.jkanban.html("");
                        if (!results || !results.length) {
                            return;
                        } /** @type {!Array} */
                        var G = []; /** @type {!Object} */
                        self.data = results;
                        if ($scope.kanban.template && $scope.kanban.template.content) {
                            var resumePlaylistParsingFn = $scope.kanban.template.content; /** @type {number} */
                            var i = 0;
                            for (; i < results.length; i++) {
                                var data = results[i];
                                var n = $.isFunction(resumePlaylistParsingFn) ? resumePlaylistParsingFn() : resumePlaylistParsingFn.toString();
                                var $dropdown = $(pbc.templateRender(n, data, $scope.kanban.template.render));
                                if ($scope.kanban.template.callback) {
                                    $scope.kanban.template.callback($dropdown);
                                }
                                self.jkanban.append($dropdown);
                            }
                            self.trigger("kanbanloaded", self.jkanban);
                            return;
                        }
                    }
                });
            }
        },
        kanban_open: function (downloadFilePath) {
            var buttons = this;
            var opt = this.options;
            buttons.showFormView({
                action: "edit",
                viewName: opt.formViewName,
                url: downloadFilePath
            });
        },
        createPager_kanban: function (pos) {
            pos = pos || 0;
            var presenter = this;
            var opt = this.options; /** @type {!Array} */
            var outChance = [];
            outChance.push("            <div class='l-panel-bbar-inner'>");
            outChance.push("                <div class='l-bar-group  l-bar-message'><span class='l-bar-text'></span></div>");
            outChance.push("            <div class='l-bar-group l-bar-selectpagesize'></div>");
            outChance.push("                <div class='l-bar-separator'></div>");
            outChance.push("                <div class='l-bar-group'>");
            outChance.push("                    <div class='l-bar-button l-bar-btnfirst'><span></span></div>");
            outChance.push("                    <div class='l-bar-button l-bar-btnprev'><span></span></div>");
            outChance.push("                </div>");
            outChance.push("                <div class='l-bar-separator'></div>");
            outChance.push("                <div class='l-bar-group'><span class='pcontrol'> <input type='text' size='4' value='1' style='width:20px' maxlength='3' /> / <span class='totalpage'>></span></span></div>");
            outChance.push("                <div class='l-bar-separator'></div>");
            outChance.push("                <div class='l-bar-group'>");
            outChance.push("                     <div class='l-bar-button l-bar-btnnext'><span></span></div>");
            outChance.push("                    <div class='l-bar-button l-bar-btnlast'><span></span></div>");
            outChance.push("                </div>");
            outChance.push("                <div class='l-bar-separator'></div>");
            outChance.push("                <div class='l-bar-group'>");
            outChance.push("                     <div class='l-bar-button l-bar-btnload'><span></span></div>");
            outChance.push("                </div>");
            outChance.push("                <div class='l-bar-separator'></div>");
            outChance.push("                <div class='l-clear'></div>");
            var spacing = opt.kanban.pageSize || 20; /** @type {number} */
            var i = pos ? Math.ceil(pos / spacing) : 0;
            var form = $("<div class='l-panel-bar ne-footer' style='position: fixed;padding:0;width:100%;bottom: 0px;'></div>").html(outChance.join(""));
            presenter.currentPageIndex = presenter.currentPageIndex || 1;
            if (presenter.currentPageIndex == 1) {
                $(".l-bar-btnfirst span", form).addClass("l-disabled");
                $(".l-bar-btnprev span", form).addClass("l-disabled");
            } else {
                $(".l-bar-btnfirst span", form).removeClass("l-disabled");
                $(".l-bar-btnprev span", form).removeClass("l-disabled");
            }
            if (presenter.currentPageIndex == i) {
                $(".l-bar-btnlast span", form).addClass("l-disabled");
                $(".l-bar-btnnext span", form).addClass("l-disabled");
            } else {
                $(".l-bar-btnlast span", form).removeClass("l-disabled");
                $(".l-bar-btnnext span", form).removeClass("l-disabled");
            }
            $("span.pcontrol :text", form).blur(function (canCreateDiscussions) { /** @type {number} */
                var value = parseInt(this.value);
                if (value > i) { /** @type {number} */
                    value = i; /** @type {number} */
                    this.value = i;
                }
                if (value < 1) { /** @type {number} */
                    value = 1; /** @type {number} */
                    this.value = 1;
                }
                presenter.kanban_reload(value);
            }).val(presenter.currentPageIndex || 1);
            $(".l-bar-btnfirst", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == 1) {
                    return;
                }
                presenter.kanban_reload(1);
            });
            $(".l-bar-btnprev", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == 1) {
                    return;
                }
                presenter.kanban_reload(presenter.currentPageIndex - 1);
            });
            $(".l-bar-btnlast", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == i) {
                    return;
                }
                presenter.kanban_reload(i);
            });
            $(".l-bar-btnnext", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == i) {
                    return;
                }
                presenter.kanban_reload(presenter.currentPageIndex + 1);
            });
            $("div.l-bar-button", form).hover(function () {
                $(this).addClass("l-bar-button-over");
            }, function () {
                $(this).removeClass("l-bar-button-over");
            });
            $(".l-bar-btnload", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                presenter.kanban_reload(presenter.currentPageIndex);
            });
            $(".totalpage", form).html(i);
            return form;
        }
    });
    return pbc.web.views.kanban;
});