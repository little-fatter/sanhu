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
	 * @param {?} result
	 * @return {undefined}
	 */
    pbc.web.views.report = function (result) {
        pbc.web.views.report.base.constructor.call(this, result);
    };
    pbc.web.views.report.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            boneTmpl(that);
            that.report_init();
            pbc.web.views.report.base.render.call(this);
            that.report_render();
            that.trigger("pageLoaded");
        },
        report_init: function () {
            var C = this;
            var opts = this.options;
            var topicTitle = opts.model.title;
            var slug = opts.model.name;
            opts.common = opts.common || {};
            var toolbar = {
                items: []
            };
            this.options = opts = $.extend({
                viewType: "report",
                actions: {
                    reportData: "/web/ReportData"
                },
                formViewName: opts.common.formViewName,
                tabId: slug + "-" + opts.viewName,
                titleAdd: "新增 " + topicTitle,
                titleEdit: "编辑 " + topicTitle,
                toolbar: toolbar
            }, opts);
        },
        report_render: function () {
            /**
			 * @param {!NodeList} tr
			 * @return {?}
			 */

            function wrap(tr) {
                if ($.isArray(tr)) { /** @type {number} */
                    var i = 0;
                    for (; i < tr.length; i++) {
                        if (!tr[i]) { /** @type {number} */
                            tr[i] = 0;
                        }
                    }
                }
                return tr;
            }
            var self = this;
            var opts = this.options;
            self.jelement = $(opts.renderTo);
            self.jelement.html(_emptyTable());
            self.initToolpanel();
            if ($(opts.renderTo).is("body")) {
                $("html").addClass("ne-report");
            }
            self.jreport = self.jelement.find(".mainpanel:first").addClass("reportpanel");
            self.jchar = $('<div class="charpanel"></div>').appendTo(self.jreport);
            if (!opts.report) {
                return;
            }
            self.jchar.width(opts.report.width || Math.min($(window).width() - 20, 960)).height(opts.report.height || Math.min($(window).height() - 20 - self.jreport.offset().top, 600));
            self.chart = echarts.init(self.jchar.get(0));
            opts.report.option = opts.report.option || {};
            pbc.ajax({
                url: opts.actions.reportData,
                data: {
                    model: opts.model.name,
                    arg: opts.report
                },
                success: function (res) {
                    if (res.statusCode == "2") {
                        pbc.tipsInTop(2, res.message);
                        return;
                    } else {
                        if (res.statusCode == "3") {
                            pbc.showError(res.message);
                            return;
                        }
                    }
                    var options = res.data || res.data;
                    var params = $.extend(opts.report.option, {
                        title: {
                            text: opts.report.title,
                            subtext: opts.report.subtitle
                        },
                        tooltip: {},
                        legend: {},
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {
                                    show: true
                                },
                                dataView: {
                                    show: true,
                                    readOnly: true
                                },
                                magicType: {
                                    show: true
                                },
                                restore: {
                                    show: true
                                },
                                saveAsImage: {
                                    show: true
                                }
                            }
                        },
                        calculable: true
                    });
                    if (opts.report.legendType == "line" || opts.report.legendType == "bar") {
                        params.title = $.extend({
                            x: "left"
                        }, params.title);
                        params.tooltip = $.extend({
                            trigger: "axis"
                        }, params.tooltip);
                        params.legend = $.extend({
                            data: options.legend
                        }, params.legend);
                        params.toolbox.feature.magicType = $.extend({
                            type: ["line", "bar"]
                        }, params.toolbox.feature.magicType);
                        params.xAxis = params.xAxis || [];
                        if (!params.xAxis.length) {
                            params.xAxis.push({});
                        }
                        params.xAxis[0] = $.extend({
                            type: "category",
                            data: options.axis
                        }, params.xAxis[0]);
                        params.yAxis = params.yAxis || [];
                        if (!params.yAxis.length) {
                            params.yAxis.push({});
                        }
                        params.yAxis[0] = $.extend({
                            type: "value"
                        }, params.yAxis[0]);
                        params.series = params.series || []; /** @type {!Array} */
                        var that = []; /** @type {number} */
                        var i = 0;
                        for (; options.series && i < options.series.length; i++) {
                            var code = options.series[i];
                            var conf = {
                                name: code.name,
                                data: wrap(code.value),
                                type: opts.report.legendType,
                                markPoint: {
                                    data: [{
                                        type: "max",
                                        name: "最大值"
                                    }, {
                                        type: "min",
                                        name: "最小值"
                                    }]
                                },
                                markLine: {
                                    data: [{
                                        type: "average",
                                        name: "平均值"
                                    }]
                                }
                            };
                            var navCommonStyle = pbc.web.helper.first(params.series, function (e) {
                                return e.name == code.name;
                            }) || pbc.web.helper.first(params.series, function (iAntdProps) {
                                return iAntdProps.name == undefined;
                            });
                            if (navCommonStyle != null) {
                                $.extend(conf, navCommonStyle);
                            }
                            that.push(conf);
                        } /** @type {!Array} */
                        params.series = that;
                    } else {
                        if (opts.report.legendType == "pie") {
                            params.title = $.extend({
                                x: "center"
                            }, params.title);
                            params.tooltip = $.extend({
                                trigger: "item",
                                formatter: "{a} <br/>{b} : {c} ({d}%)"
                            }, params.tooltip);
                            params.legend = $.extend({
                                orient: "vertical",
                                x: "left",
                                data: options.legend
                            }, params.legend);
                            params.toolbox.feature.magicType = $.extend({
                                type: ["pie", "funnel"],
                                option: {
                                    funnel: {
                                        x: "25%",
                                        width: "50%",
                                        funnelAlign: "left",
                                        max: 1548
                                    }
                                }
                            }, params.toolbox.feature.magicType);
                            params.series = params.series || [];
                            if (!params.series.length) {
                                params.series.push({});
                            }
                            if (options.series && options.series.length) {
                                options.series[0].value = options.series[0].value || 0;
                            }
                            params.series[0] = $.extend({
                                name: options.legendName,
                                type: "pie",
                                radius: "40%",
                                center: ["50%", "60%"],
                                data: options.series
                            }, params.series[0]);
                        }
                    }
                    pbc.web.log(JSON.stringify(params));
                    self.chart.setOption(params);
                }
            });
        }
    });
    return pbc.web.views.report;
});