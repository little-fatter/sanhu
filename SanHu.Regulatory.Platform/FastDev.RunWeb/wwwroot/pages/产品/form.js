define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "产品名称",
                    label: "产品名称",
                    newline: 1,
                    editor: {},
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    name: "供应商ID",
                    label: "供应商ID",
                    editor: {
                        selectBoxWidth: 500,
                        selectBoxHeight: 300,
                        grid: {
                            checkbox: false,
                            usePager: false,
                            columns: [{
                                name: "供应商ID",
                                display: "供应商ID",
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
                                name: "电话",
                                display: "电话",
                                type: "string"
                            }]
                        },
                        grid_source: {
                            model: "供应商",
                            url: "/web/pageddata/",
                            filter: {
                                op: "and"
                            },
                            valueField: "供应商ID",
                            textField: "供应商ID"
                        },
                        isTextBoxMode: 0,
                        value: ""
                    },
                    type: "gridselect",
                    newline: 0,
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    },
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "类别ID",
                    label: "类别ID",
                    newline: 1,
                    editor: {
                        selectBoxWidth: 500,
                        selectBoxHeight: 300,
                        grid: {
                            checkbox: false,
                            usePager: false,
                            columns: [{
                                name: "类别ID",
                                display: "类别ID",
                                type: "string"
                            },
                            {
                                name: "类别名称",
                                display: "类别名称",
                                type: "string"
                            },
                            {
                                name: "说明",
                                display: "说明",
                                type: "string"
                            }]
                        },
                        grid_source: {
                            model: "类别",
                            url: "/web/pageddata/",
                            filter: {
                                op: "and"
                            },
                            valueField: "类别ID",
                            textField: "类别ID"
                        },
                        isTextBoxMode: 0,
                        value: ""
                    },
                    type: "gridselect",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "单位数量",
                    label: "单位数量",
                    newline: 0,
                    editor: {},
                    type: "text"
                },
                {
                    name: "单价",
                    label: "单价",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "库存量",
                    label: "库存量",
                    newline: 0,
                    editor: {},
                    type: "text"
                },
                {
                    name: "订购量",
                    label: "订购量",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "再订购量",
                    label: "再订购量",
                    newline: 0,
                    editor: {},
                    type: "text"
                },
                {
                    name: "中止",
                    label: "中止",
                    newline: 1,
                    editor: {},
                    type: "text"
                }],
                tab: null
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=产品&viewname=form'
    };
    exports.options.model = {
        name: '产品',
        title: 'Northwind_ZH产品'
    };

    exports.service = function service(page) {

};

    return exports;
});