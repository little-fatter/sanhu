function service(page)
{
    page.bind('toSave', function (data, save)
    { 
        pbc.ajax({
            loading: null,
            url: pbc.toUrl('/web/namedata'),
            data: {
                model: 'crm_customer',
                filter: {
                    rules: [
                        { field: 'Telephone', op: 'equal', value: data.Telephone },
                         { field: 'CreateUserID', op: 'equal', value: page.options.userdata.CurrentUserID }
                    ]
                }
            },
            success: function (r)
            {
                if (r && r.length) //找到数据 
                {
                    pbc.showError("手机号码+当前操作员 重复");
                    return;
                } else
                {
                    save();
                }
                

            }
        });

    });

    page.bind('beforeShowForm', function (e)
    {

        var page = e.page;
        var op = e.options;

        var field = pbc.web.helper.first(op.fields, function (a) { return a.name == "Clientarea"; });
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
                rules: [
                    { field: 'ParentID', op: 'isnull' }
                ]
            },
            fields: "Type",
            sourceModel2: "",
            parentField2: "",
            refSourceField: "",
            textField2: ""
        };
        field.editor.tree.isLeaf = function (data)
        {
            if (!data) return false;
            return data.Type == "district";
        };
        field.editor.tree.delay = function (e)
        {
            var data = e.data;
            if (!data) return false;
            if (data.Type != "district")
            {
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
    
    
}
