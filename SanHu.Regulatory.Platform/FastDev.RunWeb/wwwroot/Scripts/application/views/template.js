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
	 * @param {?} datum
	 * @return {undefined}
	 */
    pbc.web.views.template = function (datum) {
        pbc.web.views.template.base.constructor.call(this, datum);
    };
    pbc.web.views.template.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            boneTmpl(that);
            that.template_init();
            pbc.web.views.template.base.render.call(this);
            that.template_render();
            that.trigger("pageLoaded");
        },
        template_init: function () {
            var C = this;
            var opts = this.options;
            var src = opts.userdata.rights;
            var topicTitle = opts.model.title;
            var slug = opts.model.name;
            var branchesReferences = {
                items: []
            };
            if (src && src.fun) {
                if (src.fun.enabledPrint) {
                    branchesReferences.items.push({
                        text: "打印",
                        id: "print",
                        cls: "ne-btn-blue"
                    });
                }
                if (src.fun.enabledExport) {
                    branchesReferences.items.push({
                        text: "导出",
                        id: "export"
                    });
                }
            }
            this.options = opts = $.extend({
                viewType: "template",
                actions: {
                    getTemplate: "/web/template/report",
                    printTemplate: "/web/template/print"
                },
                formViewName: opts.common.formViewName,
                tabId: slug + "-" + opts.viewName,
                toolbar: branchesReferences
            }, opts);
        },
        template_render: function () {
            var self = this;
            var o = this.options;
            self.jelement = $(o.renderTo);
            self.jelement.html(_emptyTable());
            self.initToolpanel();
            self.bind("print", function () {
                self.template_print();
            });
            self.bind("export", function () {
                self.exportExcel();
            });
            self.jtemplate = self.jelement.find(".mainpanel:first").addClass("templatepanel");
            self.template_reload();
        },
        createPager_template: function (pos) {
            pos = pos || 0;
            var presenter = this;
            var options = this.options; /** @type {!Array} */
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
            var spacing = options.template.pageSize || 20; /** @type {number} */
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
                var n = parseInt(this.value);
                if (n > i) { /** @type {number} */
                    n = i; /** @type {number} */
                    this.value = i;
                }
                if (n < 1) { /** @type {number} */
                    n = 1; /** @type {number} */
                    this.value = 1;
                }
                presenter.template_reload(n);
            }).val(presenter.currentPageIndex || 1);
            $(".l-bar-btnfirst", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == 1) {
                    return;
                }
                presenter.template_reload(1);
            });
            $(".l-bar-btnprev", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == 1) {
                    return;
                }
                presenter.template_reload(presenter.currentPageIndex - 1);
            });
            $(".l-bar-btnlast", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == i) {
                    return;
                }
                presenter.template_reload(i);
            });
            $(".l-bar-btnnext", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                if (presenter.currentPageIndex == i) {
                    return;
                }
                presenter.template_reload(presenter.currentPageIndex + 1);
            });
            $("div.l-bar-button", form).hover(function () {
                $(this).addClass("l-bar-button-over");
            }, function () {
                $(this).removeClass("l-bar-button-over");
            });
            $(".l-bar-btnload", form).click(function () {
                presenter.currentPageIndex = presenter.currentPageIndex || 1;
                presenter.template_reload(presenter.currentPageIndex);
            });
            $(".totalpage", form).html(i);
            return form;
        },
        template_reload: function (i) {
            /**
			 * @return {undefined}
			 */

            function update() {
                if (!values) {
                    return;
                }
                var id = values[0].ID;
                var data = {
                    templateId: id
                };
                if (that.template.usePager) {
                    data.SortName = that.template.sortName || "CreateDate";
                    data.SortOrder = that.template.sortOrder || "desc";
                    data.PageIndex = self.currentPageIndex = i || that.template.pageIndex || 1;
                    data.PageSize = that.template.pageSize || 20;
                    data.Condition = self.getCurrentCondition();
                } else {
                    data.filter = self.getCurrentCondition();
                }
                self.templateParm = data;
                pbc.ajax({
                    url: that.actions.getTemplate,
                    data: self.templateParm,
                    success: function (e) {
                        if (e.statusCode == "2") {
                            pbc.tipsInTop(2, e.message);
                        } else {
                            if (e.statusCode == "3") {
                                pbc.showError(e.message);
                            }
                        }
                        var axisWrapperElement = $('<div class="mainform"><div class="reportpanel"></div></div>').appendTo(self.jtemplate);
                        axisWrapperElement.find("div:first").append(e.data);
                        if (that.template.usePager) {
                            var $slidestomove = self.createPager_template(e.total);
                            $slidestomove.appendTo(self.jtemplate);
                            self.jtemplate.css("paddingBottom", "40px");
                        }
                        axisWrapperElement.find("tr.row").each(function () {
                            var $target = $(this);
                            var url = $target.attr("data-url");
                            $target.hover(function () {
                                $(this).addClass("tr-hover");
                            }, function () {
                                $(this).removeClass("tr-hover");
                            });
                            if (!url) {
                                return;
                            }
                            $target.addClass("openable");
                            var A = $target.attr("data-showintab");
                            var tabId = $target.attr("data-tabid");
                            var title = $target.attr("data-title");
                            $target.click(function () {
                                if (A) {
                                    top.openTab({
                                        tabId: tabId,
                                        text: title,
                                        url: pbc.toUrl(url)
                                    });
                                } else {
                                    top.openDialog({
                                        title: title,
                                        url: pbc.toUrl(url)
                                    });
                                }
                            });
                        }); /** @type {number} */
                        var everLeftWidth = Math.min(1200, $(window).width() * 0.9);
                        axisWrapperElement.width(everLeftWidth);
                        self.trigger("template_loaded");
                    }
                });
            }
            var self = this;
            var that = this.options;
            self.jtemplate.html("");
            var options = {
                ModelName: that.model.name
            };
            var value = self.getQueryStringByName("templatename");
            if (value) {
                options.TemplateName = value;
            } else { /** @type {number} */
                options.IsDefault = 1;
            }
            var values;
            pbc.ajax({
                url: pbc.toUrl("/web/listdata/"),
                data: {
                    model: "core_reportTemplate",
                    filter: pbc.createFilter(options)
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
                    values = e;
                    if (self.jaddNewTemplate) {
                        self.jaddNewTemplate.remove();
                    }
                    if (!values || !values.length) {
                        self.jaddNewTemplate = $('<a class="addnewtemplate"></a>');
                        self.jaddNewTemplate.html("未定义模板，请先创建模板").appendTo(self.jtemplate);
                        self.jaddNewTemplate.click(function () {
                            var url = pbc.toUrl("/web/main?model=core_reportTemplate&viewType=form");
                            var append = (new pbc.base64).encode(JSON.stringify({
                                formData: options
                            })); /** @type {string} */
                            url = url + ("&bind=" + append);
                            self.dialog = $.ligerDialog.open({
                                title: "编辑模板",
                                url: url,
                                top: 100,
                                height: 600,
                                width: 1010,
                                showMax: false,
                                showToggle: true,
                                showMin: false,
                                isResize: true,
                                slide: false,
                                data: {
                                    callback: function (pointSizeParam) {
                                        self.template_render();
                                        self.dialog.close();
                                    }
                                }
                            });
                        });
                    } else {
                        update();
                    }
                }
            });
        },
        template_print: function () {
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
                            var icon = store_scrEncounter.getData();
                            load(icon);
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
                        name: "template",
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
			 * @param {!Object} template
			 * @return {undefined}
			 */

            function load(template) {
                var $ = (new pbc.base64).encode(JSON.stringify(networkCacheEntry.templateParm));
                var requestOrUrl = pbc.toUrl("/web/preview?isreport=Y&rnd=") + (new Date).getTime() + "&appid=" + pbc.getAppId();
                pbc.openNew({
                    url: requestOrUrl,
                    parms: {
                        templateId: template.template,
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
    return pbc.web.views.template;
});