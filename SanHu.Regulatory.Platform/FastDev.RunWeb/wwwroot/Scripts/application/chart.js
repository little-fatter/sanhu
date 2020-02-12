'use strict';
(function ($) {
    /**
	 * @param {!Object} data
	 * @param {string} mode
	 * @return {undefined}
	 */

    function render(data, mode) {
        var $target = $("<div></div>");
        if (mode == "dialog") {
            $.ligerDialog.open({
                target: $target,
                title: "图表分析结果",
                top: 40,
                width: $(window).width() * 0.9,
                heigth: $(window).width() * 0.8
            });
        } else {
            if (mode == "tab") {
                top.openTab({
                    tabid: "chart",
                    text: "图表分析结果",
                    target: $target
                });
            }
        }
        data.target = $target;
        pbc.web.loader("chart", function () {
            pbc.showChart(data);
        });
    }
    $.extend($.ligerui.controls.Grid.prototype, {
        exportChart: function () {
            /**
			 * @param {!Object} input
			 * @return {?}
			 */

            function clamp(input) {
                if (!input) {
                    return false;
                }
                if (input.type == "number" || input.type == "int") {
                    return true;
                }
                return false;
            }
            /**
			 * @return {?}
			 */

            function merge() { /** @type {!Array} */
                var attrs = [];
                $(self.columns).each(function (canCreateDiscussions, item) {
                    if (item.issystem) {
                        return;
                    }
                    var value = {};
                    var i;
                    for (i in item) {
                        if (i == "columnindex") {
                            continue;
                        }
                        if (i == "columnname") {
                            continue;
                        }
                        if (i == "islast") {
                            continue;
                        }
                        if (typeof i === "string" && i.indexOf("_") == 0) {
                            continue;
                        }
                        value[i] = item[i];
                    }
                    attrs.push(value);
                });
                return attrs;
            }
            var self = this;
            if (self.chartDialog) {
                self.chartDialog.show();
                return;
            }
            var tagObj = $('<div style="margin: 10px;"></div>'); /** @type {!Array} */
            var outChance = [];
            outChance.push('<div>选择图表类型：<select class="chartype" style="width:150px">');
            outChance.push('    <option value="area">面积</option>');
            outChance.push(' <option value="bar-y">条形</option>');
            outChance.push(' <option value="bar">柱形</option>');
            outChance.push(' <option value="line">曲线</option>');
            outChance.push(' <option value="pie">饼图</option>');
            outChance.push('  <option value="bar-y-stack">分段条形</option>');
            outChance.push(' <option value="bar-stack">分段柱形</option>');
            outChance.push("</select></div>");
            outChance.push('<div style="margin-top:4px;">选择输出类型：<select class="outtype" style="width:150px">');
            outChance.push('    <option value="dialog">dialog</option>');
            outChance.push(' <option value="tab">Tab</option>');
            outChance.push("</select></div>");
            outChance.push("<fieldset>");
            outChance.push("<legend>选择分析对象（单选）</legend>");
            outChance.push('<div class="content contentA">');
            outChance.push('<div class="listbox"></div>');
            outChance.push("</div>");
            outChance.push("</fieldset>");
            outChance.push("<fieldset>");
            outChance.push("<legend>选择分析指标项（可多选）</legend>");
            outChance.push('<div class="content contentB">');
            outChance.push('<div class="listbox"></div>');
            outChance.push("</div>");
            outChance.push("</fieldset>");
            outChance.push('<div style="clear: both;"></div>');
            tagObj.html(outChance.join(""));
            self.chartDialog = $.ligerDialog.open({
                width: 800,
                height: "auto",
                top: 100,
                target: tagObj,
                title: "图表分析",
                isHide: true,
                isResize: true,
                buttons: [{
                    text: "确定",
                    onclick: function (edge, label) {
                        render({
                            chartType: tagObj.find(".chartype").val(),
                            category: client.getValue(),
                            legend: multiField.getValue(),
                            grid: self,
                            data: self.rows
                        }, tagObj.find(".outtype").val());
                        label.hide();
                    }
                }, {
                    text: "取消",
                    onclick: function (edge, label) {
                        label.hide();
                    }
                }]
            });
            var client = tagObj.find(".contentA .listbox").ligerListBox({
                isShowCheckBox: true,
                isMultiSelect: false,
                width: 400,
                height: 120,
                data: []
            });
            var multiField = tagObj.find(".contentB .listbox").ligerListBox({
                isShowCheckBox: true,
                isMultiSelect: true,
                width: 400,
                height: 120,
                data: []
            });
            var selected = merge(); /** @type {!Array} */
            var cache = []; /** @type {!Array} */
            var item = [];
            $(selected).each(function () {
                if (this.issystem) {
                    return;
                }
                if (clamp(this)) {
                    item.push({
                        id: this.name,
                        text: this.display
                    });
                } else {
                    cache.push({
                        id: this.name,
                        text: this.display
                    });
                }
            });
            client.set("data", cache);
            multiField.set("data", item);
        }
    });
    /**
	 * @param {!Object} data
	 * @return {undefined}
	 */
    pbc.showChart = function (data) {
        /**
		 * @return {?}
		 */

        function getValue() { /** @type {!Array} */
            var list = [];
            var i = data.category;
            var name;
            for (name in data.data) {
                var models = data.data[name];
                var e = models[i];
                if (e == undefined) {
                    continue;
                }
                var x = $.inArray(e, list);
                if (x == -1) {
                    list.push(e);
                }
            }
            return list;
        }
        /**
		 * @param {?} value
		 * @param {?} key
		 * @param {?} val
		 * @return {?}
		 */

        function cb(value, key, val) { /** @type {number} */
            var ret = 0;
            var name;
            for (name in data.data) {
                var result = data.data[name];
                if (result[key] == value) {
                    if (result[val] != null) { /** @type {number} */
                        ret = ret + parseInt(result[val]);
                    }
                }
            }
            return ret;
        }
        /**
		 * @return {?}
		 */

        function handler() {
            var category = data.category;
            var values = getValue();
            var current_season = data.legend.split(";"); /** @type {!Array} */
            var context = []; /** @type {!Array} */
            var tmp = [];
            $(current_season).each(function () {
                var cfg = wd.getColumnByName(this);
                context.push(cfg.display);
                var result = {
                    name: cfg.display,
                    type: "line",
                    stack: "总量",
                    areaStyle: {
                        normal: {}
                    },
                    data: []
                }; /** @type {number} */
                var i = 0;
                for (; i < values.length; i++) {
                    result.data.push(cb(values[i], category, cfg.name));
                }
                tmp.push(result);
            });
            var options = {
                title: {
                    text: "堆叠区域图"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: context
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                xAxis: [{
                    type: "category",
                    boundaryGap: false,
                    data: values
                }],
                yAxis: [{
                    type: "value"
                }],
                series: tmp
            };
            return options;
        }
        /**
		 * @return {?}
		 */

        function update() {
            var circle = data.chartType;
            var category = data.category;
            var values = getValue();
            var current_season = data.legend.split(";"); /** @type {!Array} */
            var context = []; /** @type {!Array} */
            var tmp = [];
            $(current_season).each(function () {
                var cfg = wd.getColumnByName(this);
                context.push(cfg.display);
                var ret = {
                    name: cfg.display,
                    type: "bar",
                    label: {
                        normal: {
                            show: true,
                            position: "insideRight"
                        }
                    },
                    data: []
                };
                if (circle.indexOf("-stack") > -1) { /** @type {string} */
                    ret.stack = "总量";
                } /** @type {number} */
                var i = 0;
                for (; i < values.length; i++) {
                    ret.data.push(cb(values[i], category, cfg.name));
                }
                tmp.push(ret);
            });
            var options = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow"
                    }
                },
                legend: {
                    data: context
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                series: tmp
            };
            if (circle.indexOf("-y") > -1) {
                options.xAxis = {
                    type: "value"
                };
                options.yAxis = {
                    type: "category",
                    data: values
                };
            } else {
                options.yAxis = {
                    type: "value"
                };
                options.xAxis = {
                    type: "category",
                    data: values
                };
            }
            return options;
        }
        /**
		 * @return {?}
		 */

        function render() {
            var dataType = data.chartType;
            var category = data.category;
            var values = getValue();
            var current_season = data.legend.split(";"); /** @type {!Array} */
            var context = []; /** @type {!Array} */
            var barSeries = [];
            $(current_season).each(function () {
                var cfg = wd.getColumnByName(this);
                context.push(cfg.display);
                var data = {
                    name: cfg.display,
                    type: "line",
                    stack: "总量",
                    data: []
                }; /** @type {number} */
                var i = 0;
                for (; i < values.length; i++) {
                    data.data.push(cb(values[i], category, cfg.name));
                }
                barSeries.push(data);
            });
            var option = {
                title: {
                    text: "折线图堆叠"
                },
                tooltip: {
                    trigger: "axis"
                },
                legend: {
                    data: context
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: values
                },
                yAxis: {
                    type: "value"
                },
                series: barSeries
            };
            return option;
        }
        /**
		 * @return {?}
		 */

        function init() {
            var dataType = data.chartType;
            var name = data.category;
            var values = getValue();
            var create_content_btn = data.legend.split(";"); /** @type {!Array} */
            var context = []; /** @type {!Array} */
            var tmp = [];
            $(create_content_btn).each(function (canCreateDiscussions) {
                var cfg = wd.getColumnByName(this);
                context.push(cfg.display);
                var val = {
                    name: cfg.display,
                    type: "pie",
                    data: [],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    }
                };
                if (create_content_btn.length == 1) { /** @type {string} */
                    val.radius = "50%"; /** @type {!Array} */
                    val.center = ["50%", "50%"];
                } else {
                    if (create_content_btn.length == 2) { /** @type {string} */
                        val.radius = "30%"; /** @type {!Array} */
                        val.center = canCreateDiscussions == 0 ? ["20%", "50%"] : ["70%", "50%"];
                    } else {
                        if (create_content_btn.length == 3) { /** @type {string} */
                            val.radius = "30%";
                            if (canCreateDiscussions == 0) { /** @type {!Array} */
                                val.center = ["20%", "30%"];
                            } else {
                                if (canCreateDiscussions == 1) { /** @type {!Array} */
                                    val.center = ["70%", "30%"];
                                } else { /** @type {!Array} */
                                    val.center = ["20%", "70%"];
                                }
                            }
                        } else { /** @type {string} */
                            val.radius = "30%";
                            if (canCreateDiscussions == 0) { /** @type {!Array} */
                                val.center = ["20%", "30%"];
                            } else {
                                if (canCreateDiscussions == 1) { /** @type {!Array} */
                                    val.center = ["70%", "30%"];
                                } else {
                                    if (canCreateDiscussions == 2) { /** @type {!Array} */
                                        val.center = ["20%", "70%"];
                                    } else {
                                        if (canCreateDiscussions == 3) { /** @type {!Array} */
                                            val.center = ["70%", "70%"];
                                        } else {
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } /** @type {number} */
                var i = 0;
                for (; i < values.length; i++) {
                    val.data.push({
                        value: cb(values[i], name, cfg.name),
                        name: values[i]
                    });
                }
                tmp.push(val);
            });
            var options = {
                title: {
                    text: "",
                    subtext: "",
                    x: "center"
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    left: "left",
                    data: values
                },
                series: tmp
            };
            return options;
        }
        var text = data.chartType;
        var params;
        var target = data.target;
        var wd = data.grid;
        if (text == "area") {
            params = handler();
        } else {
            if (text.indexOf("bar") == 0) {
                params = update();
            } else {
                if (text.indexOf("line") == 0) {
                    params = render();
                } else {
                    if (text.indexOf("pie") == 0) {
                        params = init();
                    }
                }
            }
        }
        target.html("");
        var $this = $('<div style="width: 800px;height:500px;"></div>').appendTo(target);
        $this.width($(window).width() * 0.8); /** @type {string} */
        var _id = "chart" + (new Date).getTime();
        $this.attr("id", _id);
        var CSLEDIT_exampleCitations = echarts.init($this.get(0));
        CSLEDIT_exampleCitations.setOption(params);
    };
})(jQuery);