function view() {
    var options = {
        list: {
            columns: [{
                name: "Title",
                display: "标题",
                type: "string"
            },
            {
                name: "Personincharge",
                display: "负责人",
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