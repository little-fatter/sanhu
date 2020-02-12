function view() {
    var options = {
        search: {
            conditions: []
        },
        list: {
            columns: [{
                name: "RoleName",
                type: "",
                display: "角色名",
                width: "450"
            }]
        },
        common: {
            hideViewSwitch: 1,
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "",
            formShowType: "",
            formShowPosition: "",
            dialogWidth: "700",
            dialogHeight: "500",
            openParm: ""
        },
        kanban: {},
        calendar: {
            titleField: "RoleDesc",
            startField: "CreateDate",
            endField: "CreateDate"
        },
        report: {}
    };
    return options;
}