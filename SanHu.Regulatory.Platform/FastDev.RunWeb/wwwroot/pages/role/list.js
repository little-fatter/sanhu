define([],
	function () {
		function view() {
			var options = {
				search: {
					conditions: []
				},
				list: {
					columns: [{
						name: "Name",
						type: "",
						display: "角色名",
						width: "450"
					}]
				},
				common: {
					hideViewSwitch: 1,
					searchInputShowType: "hide",
					buttonsShowType: "left",
					searchBoxShowType: "left",
					searchAdShowType: "",
					formShowType: "",
					formShowPosition: "",
					dialogWidth: "700",
					dialogHeight: "500",
					openParm: ""
				},
				kanban: {},
				calendar: {
					titleField: "RoleDesc",
					startField: "CreateDate",
					endField: "CreateDate"
				},
				report: {}
			};
			return options;
		}

		var exports = {
			type: 'list',
			options: view(),
			dataset: 'web/dataset?model=role&viewname=list'
		};
		exports.options.model = {
			name: 'role',
			title: '角色'
		};

		exports.service = function server(page) {
			var events = {
				type: 'role'
			};

			$.extend(events, {

				toolbarInit: function (e) {
					var isRole = this.type == "role";
					var page = e.page,
						viewType = e.viewType,
						toolbar = e.toolbar;
					var roleId = null,
						userId = null;

					page.addEvent("rights",
						function () {
							var selecteds = page.getSelecteds();
							if (!selecteds || !selecteds.length) {
								pbc.showError("请先选择角色");
								return;
							}
							debugger;
							roleId = selecteds[0].Id;
							pbc.web.loader(["treeEditor", "grid"],
								function () {
									getModel();
								});
						});

					function getModel() {
						pbc.ajax({
							url: pbc.toUrl('web/rights/get'),
							data: {
								roleId: roleId,
								userId: userId
							},
							success: function (r) {
								if (r.statusCode == "2") {
									top.pbc.tips(2, r.Message);
									return;
								} else if (r.statusCode == "3") {
									pbc.showError(r.Message);
									return;
								}
								var data = r.data;
								show(data);
							}
						});
					}

					function show(data) {
						var jform = $("<div style='margin:5px;'></div>");

						var win = $.ligerDialog.open({
							target: jform,
							isHidden: true,
							title: '设置权限',
							top: 100,
							width: 730,
							height: 'auto',
							buttons: [{
								text: '确定',
								cls: 'l-dialog-btn-highlight',
								onclick: function () {
									save();
									win.close();
								}
							},
							{
								text: '取消',
								onclick: function () {
									win.close();
								}
							}]
						});

						var form = jform.ligerForm({
							labelWidth: 'auto',
							tab: {
								items: [{
									title: '菜单权限',
									fields: [{
										name: 'menuRights',
										width: 600,
										hideLabel: true,
										labelWidth: 120,
										type: 'treeEditor',
										editor: {
											width: 580,
											height: 400,
											url: pbc.toUrl('web/treedata/'),
											btnClickToToggleOnly: false,
											autoCheckboxEven: false,
											nodeWidth: 300,
											checkbox: true,
											parms: {
												sourceModel: 'core_menu',
												parentField: 'ParentID',
												enabled: 1
											},
											isExpand: true
										}
									}]
								},
								{
									title: '功能权限',
									fields: [getFieldDefine('funRights')]
								},
								{
									title: '数据权限',
									fields: [getFieldDefine('dataRights')]
								},
								{
									title: '字段权限',
									fields: [getFieldDefine('fieldRights')]
								}]
							}
						});
						form.setData({
							menuRights: data.menuRights
						});
						jform.find(".addnewproject").remove();
						setGrid("funRights");
						setGrid("dataRights");
						setGrid("fieldRights");

						function save() {
							var formData = form.getData();
							var postData = {
								roleId: roleId,
								userId: userId,
								value: {}
							};
							postData.value.menuRights = formData.menuRights;
							postData.value.funRights = getGridData('funRights');
							postData.value.dataRights = getGridData('dataRights');
							postData.value.fieldRights = getGridData('fieldRights');

							pbc.ajax({
								url: pbc.toUrl('web/rights/save'),
								data: postData,
								success: function (r) {
									if (r.statusCode == "2") {
										top.pbc.tips(2, r.Message);
										return;
									} else if (r.statusCode == "3") {
										pbc.showError(r.Message);
										return;
									}
									pbc.showSuccess("保存成功");
								}
							});
						}

						function getGridData(field) {
							var rows = [];
							var grid = form.getEditor(field);
							if (!grid) return rows;
							var selects = $("select.rulesSelection", grid.element);

							$(grid.rows).each(function () {
								if (this.type == "module") return;
								var row = {
									modelName: this.id,
									rightsValue: null
								};
								if (field == "funRights") {
									var chklist = pbc.web.helper.first(grid.chklist,
										function (a) {
											return a.id == row.modelName;
										}).list;

									row.rightsValue = chklist.getValue();
								} else {
									$(selects).each(function () {
										var id = $(this).attr("data-id");
										if (id == row.modelName) {
											row.rightsValue = this.value;
										}
									});
								}
								rows.push(row);
							});

							return rows;
						}

						function setGrid(field) {
							var grid = form.getEditor(field);
							if (!grid) return;
							var rows = [],
								appendeds = [];

							$(data[field]).each(function (i, o) {
								if (!o.moduleName) return;
								if ($.inArray(o.moduleName, appendeds) == -1) {
									appendeds.push(o.moduleName);
									rows.push({
										id: o.moduleName,
										name: o.moduleTitle,
										type: 'module'
									});
								}
							});
							$(data[field]).each(function (i, o) {
								rows.push({
									id: o.modelName,
									name: o.modelName,
									title: o.modelTitle,
									rules: o.rules,
									rightsValue: o.rightsValue,
									moduleName: o.moduleName
								});
							});
							grid.set('data', {
								Records: rows,
								Total: rows.length
							});

							if (field == "funRights") {
								grid.chklist = [];
								$(".chklist", grid.element).each(function () {
									var rowdata = grid.getRow($(this).attr("rowid"));
									grid.chklist.push({
										id: rowdata.id,
										list: $(this).ligerCheckBoxList({
											data: rowdata.rules,
											rowSize: 4,
											valueField: 'id',
											textField: 'text',
											value: rowdata.rightsValue
										})
									});
								});
							}
						}

						function getFieldDefine(field) {
							var define = {
								name: field,
								width: 680,
								hideLabel: true,
								labelWidth: 120,
								type: 'grid',
								editor: {
									modeType: 'none',
									grid: {
										height: 500,
										fixedCellHeight: false,
										checkbox: false,
										enabledSort: false,
										toolbar: null,
										alternatingRow: false,
										mouseoverRowCssClass: null,
										cssClass: 'rights-grid',
										tree: {
											columnName: 'name',
											parentIDField: 'moduleName',
											idField: 'id'
										},
										columns: [{
											display: '模块',
											align: 'left',
											width: 250,
											render: function (r) {
												return r.title || r.name || "";
											},
											name: 'name'
										},
										{
											display: '权限分配',
											align: 'left',
											width: 400
										}]

									}
								}
							};
							if (field == "funRights") {
								define.editor.grid.columns[1].render = function (rowdata) {
									if (rowdata.type == "module") return "";
									var h = [];
									h.push('<div class="chklist"');
									h.push(' rowid = "' + rowdata['__id'] + '"');
									h.push(' gridid = "' + this.id + '"');
									h.push('></div>');
									return h.join('');
								};
							} else {
								define.editor.grid.columns[1].render = function (rowdata) {
									if (rowdata.type == "module") return "";
									var h = [];
									h.push('<select class="rulesSelection"');
									h.push(' data-id = "' + rowdata.id + '"');
									h.push(">");
									h.push("<option value=''>(空)</option>");
									for (var i = 0; rowdata.rules && i < rowdata.rules.length; i++) {
										h.push("<option");
										h.push(" value='" + rowdata.rules[i].id + "'");
										if (rowdata.rightsValue == rowdata.rules[i].id) {
											h.push(" selected='selected'");
										}
										h.push(">");
										h.push(rowdata.rules[i].text);
										h.push("</option>");
									}
									h.push('</select>');
									return h.join('');
								};
							}
							return define;
						}

					}
				}
			});

			function renderChk(r) {
				if (r.type == "module") return "";
				return '<a class="l-checkbox"></a>';
			}

			for (var name in events) {
				var fn = events[name];
				if ($.isFunction(fn)) {
					page.bind(name, fn);
				}
			}

		};

		return exports;
	});