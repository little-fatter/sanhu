define([],
function ()
{
	function view()
	{
		var options = { 
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
								url : '/web/user_homestyles'
							}
						}, {
							width: 300,
							name: "MyPic",
							label: "头像",
							"editor": {
								"isInputMode": 0,
								"imgWidth": "",
								"imgHeight": "",
								"extensions": "jpg,png,gif"
							},
							"type": "fileUploader",
							newline: true,
							validate: {
								required: true
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
			},
			common: {
				saveCallbackType: 'toEdit',
				formCls : 'mainform-nonbox'
			},
			link: {},
			type: "form"
		};
		return options;
	}

	var exports = {
		type: 'form',
		options: view(),
		dataset: 'web/dataset?model=core_user&viewname=form'
	};
	exports.options.model = {
		name: 'core_user',
		title: '用户'
	};

	exports.service = function service(page)
	{

	};

	return exports;
});