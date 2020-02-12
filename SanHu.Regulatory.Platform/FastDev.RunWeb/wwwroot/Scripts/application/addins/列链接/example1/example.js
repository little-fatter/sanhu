{ 
    title : "建客户列链接到客户联系人",
	value : {
		displayColumnName : "customerName", //要变成链接的列
        columnName : "customerName", //要变成链接的列
        openPage : {
            renderTo : "dialog",  //可选择 dialog 、 tab 、 或者 jQuery对象/选择字符串
            url : '/pages/crm_customerContracts/list.w', //打开的界面链接
            urlBind : {
                filterData : {
                    CustomerID : '#data.ID#'// 关联关系， CustomerID是目标对象的字段  ， data.ID 是当前行的字段
                }
            },
            title : "联系人",
            width : 800,
            height : 600
        }
    }
}