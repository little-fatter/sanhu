{ 
    title : "建客户列链接到客户表单",
	value : {
		displayColumnName : "customerName", //要变成链接的列
        columnName : "customerName", //要变成链接的列
        openPage : {
            renderTo : "dialog",  //可选择 dialog 、 tab 、 或者 jQuery对象/选择字符串
            url : '/pages/crm_customer/form.w?id=#data.ID#', //打开的界面链接 
			title : "客户信息",
            width : 800,
            height : 600
        }
    }
}