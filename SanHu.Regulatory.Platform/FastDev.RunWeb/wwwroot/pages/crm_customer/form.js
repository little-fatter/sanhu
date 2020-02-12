define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    name: "CustomerImage",
                    type: "fileUploader",
                    label: " 文件上传",
                    editor: {
                        isInputMode: 0,
                        imgWidth: "100",
                        imgHeight: "100",
                        extensions: "jpg,png,gif"
                    },
                    newline: 1,
                    width: "",
                    hideLabel: 1,
                    hideSpace: 1
                },
                {
                    newline: 0,
                    name: "CustomerName",
                    label: "客户名称",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "2",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    },
                    width: "",
                    fieldExtend: "{style:\"position: absolute;left: 150px; top:10px;\"}"
                },
                {
                    newline: 1,
                    name: "Telephone",
                    label: "电话",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    fieldExtend: "{style:\"position: absolute;left: 150px; top:60px;\"}"
                },
                {
                    newline: 1,
                    name: "CustomerLevel",
                    label: "客户等级",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    width: ""
                },
                {
                    name: "Clientarea",
                    type: "ref_select_tree",
                    label: "客户地区",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "base_area"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "base_area"
                        },
                        textField: "text",
                        valueField: "id",
                        tree: {
                            checkbox: false,
                            nodeWidth: 200,
                            url: "/web/treedata",
                            parms: {
                                enabled: 1,
                                sourceModel: "base_area",
                                parentField: "ParentID",
                                textField: "Title",
                                sourceModel2: "",
                                parentField2: "",
                                refSourceField: "",
                                textField2: ""
                            }
                        },
                        many2one: true,
                        triggerToLoad: 0
                    },
                    newline: 0,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "Industry",
                    label: "所属行业",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_dictionaryItems"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select"
                },
                {
                    newline: 0,
                    name: "CustomerType",
                    label: "客户类别",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "crm_customerType"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Customeraddress",
                    label: "客户地址",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "500"
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    width: "500"
                },
                {
                    newline: 1,
                    name: "Contracts",
                    label: "联系人",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "150",
                                type: "string",
                                align: "left",
                                display: "联系人名称",
                                name: "Contactname",
                                editorType: "text",
                                editor: {
                                    type: "text"
                                }
                            },
                            {
                                width: "150",
                                type: "string",
                                align: "left",
                                display: "电话",
                                name: "phone",
                                editorType: "text",
                                editor: {
                                    type: "text"
                                }
                            },
                            {
                                width: "160",
                                type: "string",
                                align: "left",
                                display: "备注",
                                name: "remark",
                                editorType: "text",
                                editor: {
                                    type: "text"
                                }
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "/web/main/?model=crm_customerContract&viewtype=form",
                        titleEdit: "修改： 客户联系人",
                        titleAdd: "新增：客户联系人",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    width: "600",
                    hideLabel: 1
                }]
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=crm_customer&viewname=form'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    exports.service = function service(page) {
        page.bind('toSave',
        function(data, save) {
            pbc.ajax({
                loading: null,
                url: pbc.toUrl('/web/namedata'),
                data: {
                    model: 'crm_customer',
                    filter: {
                        rules: [{
                            field: 'Telephone',
                            op: 'equal',
                            value: data.Telephone
                        },
                        {
                            field: 'CreateUserID',
                            op: 'equal',
                            value: page.options.userdata.CurrentUserID
                        }]
                    }
                },
                success: function(r) {
                    if (r && r.length) //找到数据 
                    {
                        pbc.showError("手机号码+当前操作员 重复");
                        return;
                    } else {
                        save();
                    }

                }
            });

        });

        page.bind('beforeShowForm',
        function(e) {

            var page = e.page;
            var op = e.options;

            var field = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Clientarea";
            });
            if (field == null) return;
            field.editor = field.editor || {};
            field.editor.selectBoxWidth = 400;
            field.editor.selectBoxHeight = 300;
            field.editor.tree = field.editor.tree || {};
            field.editor.tree.url = "/web/treedata";
            field.editor.tree.parms = {
                enabled: 1,
                sourceModel: "base_area",
                parentField: "",
                textField: "Title",
                filter: {
                    rules: [{
                        field: 'ParentID',
                        op: 'isnull'
                    }]
                },
                fields: "Type",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: ""
            };
            field.editor.tree.isLeaf = function(data) {
                if (!data) return false;
                return data.Type == "district";
            };
            field.editor.tree.delay = function(e) {
                var data = e.data;
                if (!data) return false;
                if (data.Type != "district") {
                    return {
                        url: '/web/treedata',
                        parms: {
                            enabled: 1,
                            sourceModel: "base_area",
                            parentField: "",
                            textField: "Title",
                            filter: pbc.createFilter({
                                ParentID: data.id
                            }),
                            fields: "Type",
                            sourceModel2: "",
                            parentField2: "",
                            refSourceField: "",
                            textField2: ""
                        }
                    }
                }
                return false;
            };

        });

    };

    return exports;
});