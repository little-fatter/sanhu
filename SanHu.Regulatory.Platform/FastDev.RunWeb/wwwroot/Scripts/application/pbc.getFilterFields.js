'use strict';
define([], function () {
    /**
	 * @param {string} context
	 * @param {?} check
	 * @return {undefined}
	 */
    pbc.getFilterFields = function (context, check) {
        /**
		 * @param {!Object} ctx
		 * @return {undefined}
		 */

        function render(ctx) {
            /**
			 * @param {string} type
			 * @return {?}
			 */

            function getTypeUrl(type) {
                if (type == "many2many") {
                    return "ref_popupselect_mul";
                } else {
                    if (type == "many2one") {
                        return "ref_popupselect";
                    } else {
                        if (type == "one2many") {
                            return "ref_grid_edit";
                        } else {
                            if (type == "boolean") {
                                return "checkbox";
                            } else {
                                if (type == "datetime") {
                                    return "datepicker";
                                } else {
                                    if (type == "float") {
                                        return "number";
                                    } else {
                                        if (type == "integer") {
                                            return "int";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return "string";
            }
            /**
			 * @param {?} value
			 * @param {?} client
			 * @return {?}
			 */

            function push(value, client) {
                var B = this;
                var options = this.options;
                var p = play(client); /** @type {number} */
                var i = 0;
                for (; i < p.length; i++) {
                    if (p[i].name == value) {
                        return p[i];
                    }
                }
                return null;
            }
            /**
			 * @param {?} action
			 * @return {?}
			 */

            function play(action) {
                var A = this;
                var options = this.options;
                if (!action) {
                    return ctx.fields;
                } /** @type {number} */
                var index = 0;
                for (; index < ctx.refModels.length; index++) {
                    if (ctx.refModels[index].name == action) {
                        return ctx.refModels[index].fields;
                    }
                }
                return ctx.fields;
            }
            /**
			 * @param {?} paramName
			 * @return {?}
			 */

            function equal(paramName) {
                var A = this;
                var options = this.options;
                if (!paramName) {
                    return null;
                } /** @type {number} */
                var s = 0;
                for (; s < ctx.refModels.length; s++) {
                    if (ctx.refModels[s].name == paramName) {
                        return ctx.refModels[s];
                    }
                }
                return null;
            }
            /**
			 * @param {?} _
			 * @param {string} view
			 * @return {?}
			 */

            function render(_, view) {
                var E = this;
                var o = this.options;
                var options = {};
                var obj = push(_);
                if (obj == null) {
                    return options;
                }
                var object_t = obj.type;
                var data = equal(obj.relationModel);
                var val = data ? data.name : "";
                var label = data ? data.title : "";
                if (view.indexOf("grid") > -1) {
                    options = {
                        grid: {
                            columns: [],
                            sortName: "ID"
                        },
                        detailUrl: "/web/main/?model=" + val + "&viewtype=form",
                        titleEdit: "修改： " + label,
                        titleAdd: "新增：" + label
                    };
                    if (view.indexOf("select") > -1) { /** @type {string} */
                        options.grid.url = "/web/pageddata/";
                        options.grid.parms = {
                            model: val
                        }; /** @type {string} */
                        options.modeType = "select"; /** @type {string} */
                        options.selectorUrl = "/web/main?model=" + val + "&viewtype=list"; /** @type {string} */
                        options.titleSelect = "选择： " + label;
                    } else {
                        if (view.indexOf("edit") > 0) { /** @type {string} */
                            options.modeType = "editgrid";
                            $.extend(options.grid, {
                                defaultRow: {},
                                height: 230,
                                defaultRowCount: 4
                            });
                        }
                    }
                } else {
                    if (view.indexOf("ref") == 0) {
                        if (view.indexOf("_tree") == -1) {
                            options = {
                                url: "/web/namedata",
                                parms: {
                                    model: val
                                },
                                detailEnabled: false,
                                detailUrl: "/web/detaildata",
                                detailParms: {
                                    model: val
                                },
                                valueField: "ID",
                                sourceFilter: obj.sourceFilter,
                                textField: data ? data.textField : null
                            };
                            if (options.sourceFilter) {
                                options.sourceFilter.model = val;
                            }
                            if (view.indexOf("ref_popupselect") == 0) {
                                $.extend(options, {
                                    css: "combobox-selector",
                                    popupselect_ismul: view == "ref_popupselect_mul",
                                    popupselect_type: "popupselect",
                                    popupselect_url: "/web/main/?model=" + val + "&viewtype=list",
                                    popupselect_width: "1000",
                                    popupselect_height: "700",
                                    popupselect_title: "选择： " + (data ? data.title : "")
                                });
                            } else {
                                if (view.indexOf("select_mul") > 0) {
                                    $.extend(options, {
                                        isMultiSelect: true,
                                        isShowCheckBox: true
                                    });
                                }
                            }
                        } else {
                            options = {
                                url: "/web/namedata",
                                parms: {
                                    model: val
                                },
                                detailEnabled: false,
                                detailUrl: "/web/detaildata",
                                detailParms: {
                                    model: val
                                },
                                textField: "text",
                                valueField: "id",
                                tree: {
                                    checkbox: false,
                                    nodeWidth: 200,
                                    url: "/web/treedata",
                                    parms: {
                                        enabled: 1,
                                        sourceModel: val,
                                        parentField: "ParentID",
                                        textField: data.textField,
                                        sourceModel2: "",
                                        parentField2: "",
                                        refSourceField: "",
                                        textField2: ""
                                    }
                                }
                            };
                        }
                    } else {
                        if ($.inArray(view, ["select", "select_mul", "listbox", "htmlSelect", "listbox_mul", "radiolist", "checkboxlist"]) > -1) {
                            options = {
                                data: []
                            };
                        }
                    }
                }
                if (view.indexOf("ref_popupselect") == -1) {
                    if (options.css) {
                        delete options.css;
                    }
                    if (options.popupselect_type) {
                        delete options.popupselect_type;
                        delete options.popupselect_url;
                        delete options.popupselect_width;
                        delete options.popupselect_height;
                        delete options.popupselect_title;
                    }
                    if (view.indexOf("grid_select") > -1) {
                        if (options.url) {
                            delete options.url;
                            delete options.parms;
                            delete options.valueField;
                            delete options.textField;
                            delete options.isMultiSelect;
                            delete options.isShowCheckBox;
                        }
                    }
                } else {
                    if (options.grid) {
                        delete options.grid;
                    }
                }
                if (object_t == "many2many") { /** @type {boolean} */
                    options.many2many = true;
                } else {
                    if (object_t == "many2one") { /** @type {boolean} */
                        options.many2one = true;
                    } else {
                        if (object_t == "one2many") { /** @type {boolean} */
                            options.one2many = true;
                        }
                    }
                }
                return options;
            } /** @type {!Array} */
            var profilerRecords = []; /** @type {!Array} */
            var files = [];
            files.push({
                display: ctx.model.title,
                name: "ID",
                type: "ref_popupselect_mul",
                editor: {
                    type: "ref_popupselect_mul",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    textField: ctx.model.textField,
                    valueField: "ID",
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=" + ctx.model.name + "&viewtype=list",
                    popupselect_width: "800",
                    popupselect_height: "600",
                    popupselect_title: "选择： " + ctx.model.title,
                    many2many: true
                }
            }); /** @type {number} */
            var idx = 0;
            for (; idx < ctx.fields.length; idx++) {
                var data = ctx.fields[idx];
                var options = {
                    display: data.title,
                    name: data.name
                };
                if (data.type == "one2many") {
                    continue;
                }
                if (data.type == "many2many") {
                    continue;
                }
                var value = getTypeUrl(data.type);
                if (value.indexOf("ref_") > -1) { /** @type {string} */
                    value = "ref_popupselect_mul";
                }
                var result = render(data.name, value);
                if (value.indexOf("ref_") > -1) { /** @type {boolean} */
                    result.one2many = false; /** @type {boolean} */
                    result.many2one = false; /** @type {boolean} */
                    result.many2many = true;
                }
                result["type"] = value;
                options["editor"] = result;
                options["type"] = value;
                if (value.indexOf("ref_") > -1) {
                    files.push(options);
                } else {
                    profilerRecords.push(options);
                }
            } /** @type {number} */
            idx = 0;
            for (; idx < ctx.fields.length; idx++) {
                data = ctx.fields[idx];
                if (data.type == "many2one") {
                    options = {
                        display: data.dbName,
                        name: data.dbName
                    }; /** @type {string} */
                    value = "text";
                    result = {}; /** @type {string} */
                    result["type"] = value;
                    options["editor"] = result; /** @type {string} */
                    options["type"] = value;
                    profilerRecords.push(options);
                }
            } /** @type {!Array} */
            var scenario = [];
            $(files).each(function () {
                scenario.push(this);
            });
            $(profilerRecords).each(function () {
                scenario.push(this);
            });
            if (check) {
                check(scenario);
            }
        }
        pbc.ajax({
            loading: null,
            url: pbc.toUrl("/web/ModelDataset/"),
            data: {
                modelName: context
            },
            success: function (result) {
                if (result.statusCode == "2") {
                    pbc.tips({
                        type: 2,
                        content: result.message
                    });
                    return;
                } else {
                    if (result.statusCode == "3") {
                        pbc.showError(result.message);
                        return;
                    }
                }
                render(result.data);
            }
        });
    };
});