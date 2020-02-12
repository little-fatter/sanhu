function view() {
    var options = {
        list: {
            columns: [{
                name: "Contactname",
                display: "联系人名称",
                type: "string"
            },
            {
                name: "phone",
                display: "电话",
                type: "string"
            },
            {
                name: "remark",
                display: "备注",
                type: "string"
            }]
        },
        common: {
            "showList": 0,
            "showCalendar": 0,
            "showReport": 0,
            "showKanban": 0,
            "hideToolbar": 0,
            "hideViewSwitch": 0,
            "viewNameList": "",
            "viewNameCalendar": "",
            "viewNameReport": "",
            "viewNameKanban": "",
            "searchInputShowType": "hide",
            "buttonsShowType": "left",
            "searchBoxShowType": "left",
            "searchAdShowType": "hide",
            "formViewName": "",
            "formShowType": "tab",
            "formShowPosition": "",
            "dialogWidth": "",
            "dialogHeight": "",
            "openParm": ""
        },
        toolbar : {
            items : [
                   { text: '创建', id: 'add', cls: 'ne-btn-blue' }
            ],
        },
        type: "list",
        filterFields: [ ],
        link: {}
    };
    return options;
}