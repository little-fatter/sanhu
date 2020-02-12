function view() {
    var options = {
        list: {
            columns: [{
                name: "客户ID",
                display: "客户ID",
                type: "string"
            },
            {
                name: "公司名称",
                display: "公司名称",
                type: "string"
            },
            {
                name: "联系人姓名",
                display: "联系人姓名",
                type: "string"
            },
            {
                name: "联系人职务",
                display: "联系人职务",
                type: "string"
            },
            {
                name: "地址",
                display: "地址",
                type: "string"
            },
            {
                name: "城市",
                display: "城市",
                type: "string"
            },
            {
                name: "地区",
                display: "地区",
                type: "string"
            },
            {
                name: "邮政编码",
                display: "邮政编码",
                type: "string"
            },
            {
                name: "国家",
                display: "国家",
                type: "string"
            },
            {
                name: "电话",
                display: "电话",
                type: "string"
            },
            {
                name: "传真",
                display: "传真",
                type: "string"
            }]
        },
        common: {
            formShowType: "tab",
            formShowPosition: "top",
            dialogWidth: 700,
            dialogHeight: 500
        }
    };
    return options;
}