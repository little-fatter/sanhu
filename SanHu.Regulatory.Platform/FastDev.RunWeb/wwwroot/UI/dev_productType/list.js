function view() {
    var options = {
        list: {
            columns: [{
                name: "Typename",
                display: "类型名",
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