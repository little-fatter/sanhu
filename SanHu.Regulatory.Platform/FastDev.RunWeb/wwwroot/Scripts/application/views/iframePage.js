'use strict';
define(["jquery", "views_parts_toolbar", "views_parts_tree"], function ($, boneTmpl, saveNotifs) {
    /**
     * @return {?}
     */
    function _emptyTable() {
        /** @type {!Array} */
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
    pbc.web.views.iframePage = function (p1__3354_SHARP_) {
        pbc.web.views.iframePage.base.constructor.call(this, p1__3354_SHARP_);
    };
    pbc.web.views.iframePage.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            boneTmpl(that);
            that.iframePage_init();
            pbc.web.views.iframePage.base.render.call(this);
            that.iframePage_render();
            that.trigger("pageLoaded");
        },
        iframePage_init: function () {
        },
        iframePage_render: function () {
            var self = this;
            var o = this.options;
            var $freezer = self.dialogOpener || self.tabOpener;
            /** @type {null} */
            var G = null;
            if (o.renderTo && $freezer) {
                G = o.renderTo.openerData;
            }
            if ($(o.renderTo).parent().is(".l-dialog-content")) {
                $(o.renderTo).parent().css("overflow", "hidden");
            }
            self.jelement = $(o.renderTo);
            self.jelement.html(_emptyTable());
            self.jelement.parent().css("overflow", "hidden");
            var $attachTo = self.jelement.find(".mainpanel");
            $attachTo.height($(window).height() - $attachTo.offset().top - 10);
            self.initToolpanel();
            if (o.iframePage && o.iframePage.url) {
                self.jiframe = $("<iframe frameborder='0'></iframe>").appendTo($attachTo);
                var classesLine = o.name ? o.name : "freedesignpage" + (new Date).getTime();
                self.jiframe.attr("name", classesLine);
                self.jiframe.attr("id", classesLine);
                self.reloadIframe(o.iframePage.url);
            }
            if (o.treeFilter) {
                saveNotifs(self);
            }
        },
        reloadIframe: function (i) {
            var self = this;
            var options = this.options;
            setTimeout(function () {
                var ghostSpan = $("<div class='l-dialog-loading' style='display:block;'></div>");
                if (self.jelement.find(".mainpanel").find(".l-dialog-loading:first").length == 0) {
                    ghostSpan.appendTo(self.jelement.find(".mainpanel"));
                }
                self.jiframe.attr("src", i).bind("load.page", function () {
                    if (ghostSpan) {
                        ghostSpan.remove();
                    }
                    self.trigger("loaded");
                });
            }, 0);
        },
        iframePage_reload: function () {
            var gfx = this;
            var options = this.options;
            if (!gfx.jiframe) {
                return;
            }
            var fbMainFrame = gfx.jiframe[0];
            if (!fbMainFrame) {
                return;
            }
            var artistTrack = gfx.getCurrentTreeCondition();
            if (artistTrack) {
                gfx.grid.setParm("TreeCondition", artistTrack);
            }
            var req_group = gfx.getCurrentCondition();
            if (fbMainFrame.contentWindow && $.isFunction(fbMainFrame.contentWindow.f_reload)) {
                fbMainFrame.contentWindow.f_reload(req_group);
            } else {
                pbc.ajax({
                    loading: null,
                    url: "/web/saveTempVariable",
                    data: {
                        data: JSON.stringify(req_group)
                    },
                    success: function (person) {
                        if (person && person.id) {
                            var b = options.iframePage.url;
                            /** @type {string} */
                            b = b + (b.indexOf("?") == -1 ? "?" : "&");
                            /** @type {string} */
                            b = b + ("variableid=" + person.id);
                            gfx.reloadIframe(b);
                        }
                    }
                });
            }
        }
    });
    pbc.web.views.iframePage.prototype.iframePage_search = pbc.web.views.iframePage.prototype.iframePage_reload;
    return pbc.web.views.iframePage;
});
