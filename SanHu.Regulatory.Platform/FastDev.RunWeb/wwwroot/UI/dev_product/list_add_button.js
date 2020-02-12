function view() {
    var options = {
        list: {
            columns: [{
                name: "Productname",
                display: "产品名",
                type: "string"
            },
            {
                name: "Specifications",
                display: "规格",
                type: "string"
            },
            {
                name: "UnitPrice",
                display: "单价",
                type: "number"
            },
            {
                name: "Model",
                display: "型号",
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