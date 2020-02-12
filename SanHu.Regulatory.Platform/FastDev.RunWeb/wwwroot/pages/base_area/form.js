define([],
    function () {

        var exports = {
            type: 'form',
            options: {
                type: "form",
                form: {
                    fields: [{
                        newline: 1,
                        name: "Title",
                        label: "名称",
                        editor: {
                            type: "text"
                        },
                        type: "text",
                        width: "",
                        readonlyInEdit: 0
                    },
                    {
                        newline: false,
                        name: "Type",
                        label: "类型",
                        editor: {
                            type: "text"
                        },
                        type: "text"
                    },
                    {
                        newline: true,
                        name: "Remarks",
                        label: "备注",
                        editor: {
                            type: "text"
                        },
                        type: "text"
                    },
                    {
                        newline: false,
                        name: "Parent",
                        label: "上一级",
                        editor: {
                            url: "web/listdata",
                            parms: {
                                model: "base_area"
                            },
                            valueField: "ID",
                            textField: "Title",
                            many2one: true,
                            type: "ref_select"
                        },
                        type: "ref_select"
                    }]
                },
                common: {
                    saveCallbackType: "toClose"
                },
                link: {},
                addins: {}
            },
            dataset: 'web/dataset?model=base_area&viewname=form'
        };
        exports.options.model = {
            name: 'base_area',
            title: '地区'
        };

        exports.service = function service(page) {

        };

        return exports;
    });