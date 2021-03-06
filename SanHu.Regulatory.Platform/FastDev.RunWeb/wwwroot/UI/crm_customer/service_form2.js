﻿function service(page)
{
    
    page.bind('beforeShowForm', function (e)
    {

        var page = e.page;
        var op = e.options;

        var field = pbc.web.helper.first(op.fields, function (a) { return a.name == "Province"; });
        if (field != null)
        {
            field.editor = field.editor || {};
            field.editor.selectBoxWidth = 400;
            field.editor.selectBoxHeight = 300;
            field.editor.tree = field.editor.tree || {};
            field.editor.tree.url = "/web/treedata";
            field.editor.tree.checkbox = false;
            field.editor.tree.parms = {
                enabled: 1,
                sourceModel: "base_area",
                parentField: "ParentID",
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
        }




    });
    
    page.bind('beforeShowForm', function (e)
    {

        var page = e.page;
        var op = e.options;

        var fieldProvince = pbc.web.helper.first(op.fields, function (a) { return a.name == "Province"; });
        var fieldCity = pbc.web.helper.first(op.fields, function (a) { return a.name == "City"; });
        if (fieldProvince == null || fieldCity == null) return;


        fieldProvince.editor.parms = {
            model: "base_area",
            filter: {
                rules: [
                    { field: 'Type', op: 'equal', value: 'province' }
                ]
            }
        };
        fieldCity.editor.parms = {
            model: "base_area",
            filter: {
                rules: [
                    { field: 'Type', op: 'equal', value: 'none' }
                ]
            }
        };

        fieldProvince.editor.onSelected = function (value)
        { 
            if (!value) return;
            var combo = page.form.getEditor("City");
            if (!combo) return;
            combo.set('parms', {
                model: "base_area",
                filter: {
                    rules: [
                        { field: 'ParentID', op: 'equal', value: value }
                    ]
                }
            });
             
            combo.reload();
        }; 



    });
    

    page.bind('afterShowForm', function (e)
    {
        var p = page.options;

         
        if (page.formData && page.formData.Province)
        {
            var combo = page.form.getEditor("City");
            if (!combo) return;
            combo.set('parms', {
                model: "base_area",
                filter: {
                    rules: [
                        { field: 'ParentID', op: 'equal', value: page.formData.Province[0] }
                    ]
                }
            });
            combo.reload();

        }


    });
}
