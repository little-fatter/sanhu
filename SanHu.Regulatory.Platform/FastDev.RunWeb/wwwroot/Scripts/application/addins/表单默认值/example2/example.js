{ 
    title : "包括日期",
    value : {
        isEdit : true,
        data: {
            name : "张三",
            name2 : "#user.CurrentUserLoginName#", 
            doUser : ["#user.CurrentUserID#","#user.CurrentUserLoginName#"],
            addDate : "now()",
            addDate2 : "today()" 
        }
    }
}