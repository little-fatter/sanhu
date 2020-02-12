define([],
function ()
{
	function view()
	{
		return function run(renderTo, pagedata)
		{
			$(renderTo).css({
				margin: 10
			});

			pbc.ajax({
				loading: null,
				url: pbc.toUrl('/web/user_getcurrent'),
				success: function (r)
				{
					show(r.id);
				}
			});

			function show(id)
			{
				var current = pbc.web.current;
				var model = 'core_user';
				var options = $.extend({
					viewType: 'form',
					model: {
						name: model,
						title: '用户'
					},
					showInDialog: true,
					renderTo: renderTo,
					tabOpener: frameElement ? frameElement.tab : null,
					tabId: model + "-custom",
					id: id,
					actions: {
						get: '/web/detaildata/',
						ds: '/web/iddata/',
						save: '/web/save/',
					},
					isView: false,
					form: {
						tab: {
							items: [{
								title: '用户设置',
								fields: [{
									width: 300,
									name: "HomeStyle",
									label: "首页样式",
									type: "select",
									newline: true,
									validate: {
										required: true
									},
									editor: {
										data: [{
											id: 's1',
											text: '传统样式'
										},
                                        {
                                        	id: 's2',
                                        	text: '简约样式'
                                        }]
									}
								}]
							},
                            {
                            	title: '基本资料',
                            	fields: [

                                {
                                	width: 300,
                                	name: "RealName",
                                	label: "姓名",
                                	type: "text",
                                	newline: true,
                                	validate: {
                                		required: true
                                	}
                                },
                                {
                                	width: 300,
                                	name: "Phone",
                                	label: "手机号",
                                	type: "text",
                                	newline: true,
                                	validate: {
                                		required: true
                                	}
                                },
                                {
                                	width: 300,
                                	name: "Email",
                                	label: "邮箱",
                                	type: "text",
                                	newline: true,
                                	validate: {
                                		required: true
                                	}
                                },
                                {
                                	width: 300,
                                	name: "Address",
                                	label: "地址",
                                	type: "text",
                                	newline: true,
                                	validate: {
                                		required: true
                                	}
                                },
                                {
                                	width: 300,
                                	name: "QQ",
                                	label: "QQ",
                                	type: "text",
                                	newline: true,
                                	validate: {
                                		required: true
                                	}
                                }]
                            }]
						}
					}
				},
                {

                });

				options.onSaved = function (result)
				{
					$(renderTo).html('');

					showForm(options);
				};

				showForm(options);

				function showForm(options)
				{
					var loaders = pbc.web.getFormDepends(options.form);
					loaders.push("views_form");

					pbc.web.loader(loaders,
                    function ()
                    {
                    	var page = new pbc.web.view(options);
                    	page.render();
                    });
				}
			}
		};
	}

	var exports = {
		run: view()
	};

	return exports;
});