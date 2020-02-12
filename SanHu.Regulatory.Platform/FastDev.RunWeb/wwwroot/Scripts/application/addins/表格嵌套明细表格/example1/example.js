{ 
    title : "表格展开明细表格",
    value : {
        main_field : "ID",
        detail_grid : {
            usePager: false
        },
        detail_model : "case_orderDetail",
        detail_field : "OrderID",  
        detail_columns : [
            {
                type: "ref",
                align: "left",
                display: "产品",
                name: "product",
            },
            {
                width: "100",
                type: "float",
                align: "left",
                display: "数量",
                name: "Num"
            },
            {
                display: "金额",
                width: "100",
                type: "curreny",
                align: "left",
                name: "Amount"
            }
        ]
    }
}