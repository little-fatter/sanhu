'use strict';
define(["jquery"], function ($) {
    /**
	 * @param {?} name
	 * @return {undefined}
	 */
    pbc.web.views.templatePage = function (name) {
        pbc.web.views.templatePage.base.constructor.call(this, name);
    };
    pbc.web.views.templatePage.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            that.templatePage_init();
            pbc.web.views.templatePage.base.render.call(this);
            that.templatePage_render();
            that.trigger("pageLoaded");
        },
        templatePage_init: function () {
            var _ = this;
            var options = this.options;
        },
        enabledDataSource: function () {
            var _ = this;
            var config = this.options;
            if (config.templateBase && config.templateBase.dataSource && config.templateBase.enabledDataSource) {
                var ds = config.templateBase.dataSource;
                if (ds.url) {
                    return true;
                }
            }
            return false;
        },
        templatePage_render: function () {
            var self = this;
            var options = this.options;
            self.jelement = $(options.renderTo);
            require(["/pages/application/templates/" + options.templateName + "/index.js"], function (t) {
                var Show2Template = t.format({
                    renderTo: options.renderTo,
                    data: $.extend(true, {}, options.templateData)
                });
                if (self.enabledDataSource()) {
                    var total_usage_by_social_network = $.extend(true, {}, options.templateBase.dataSource);
                    if (total_usage_by_social_network.url.indexOf("#") != -1) {
                        total_usage_by_social_network.url = total_usage_by_social_network.url.replace(/#(.*?)+#/g, function ($) {
                            if ($.indexOf("q.") != -1) {
                                return self.getQuery($.replace(/#/g, "").replace("q.", "")) || "";
                            }
                            return "";
                        });
                    }
                    pbc.ajax({
                        url: total_usage_by_social_network.url,
                        data: {
                            model: total_usage_by_social_network.model,
                            filter: total_usage_by_social_network.filter
                        },
                        success: function (data) {
                            if (data.statusCode == "2") {
                                pbc.tips({
                                    type: 2,
                                    content: data.message
                                });
                                return;
                            } else {
                                if (data.statusCode == "3") {
                                    pbc.showError(data.message);
                                    return;
                                }
                            }
                            var deletedFilepath = data.data ? data.data : data;
                            options.templateData.data = deletedFilepath;
                            t.run({
                                template: Show2Template,
                                renderTo: options.renderTo,
                                data: options.templateData
                            });
                        }
                    });
                } else {
                    t.run({
                        template: Show2Template,
                        renderTo: options.renderTo,
                        data: options.templateData
                    });
                }
            });
        }
    });
    return pbc.web.views.templatePage;
});