function view()
{
    var page = null;

    var options = {
        form: {
            fields: [
                  {
                      label: '角色',
                      name: 'MasterID',
                      type: 'ref_select', 
                      newline: true,
                      width: 400,
                      editor: {
                          many2one: true, 
                          valueField: 'ID',
                          textField: 'RoleName',
                          url: "/web/listdata",
                          parms : {
                              model : 'core_role'
                          },
                          onSelected: function (value)
                          {
                              var combo = this;
                              if (!page || !page.form) return;

                              //ajax 来数据填充 ViewContent
                              pbc.ajax({
                                  loading: '正在加载角色授权数据...',
                                  url: 'web/getDataAssign',
                                  data: {
                                      MasterName: "role",
                                      ModelName: "res_company",
                                      MasterID: value
                                  },
                                  success: function (r)
                                  {
                                      if (r.statusCode == "2") //应用级错误
                                      {
                                          pbc.tips({ type: 2, content: r.message });
                                          return;
                                      } else if (r.statusCode == "3") //系统级错误
                                      {
                                          pbc.showError(r.message);
                                          return;
                                      }
                                     
                                      var tree = page.form.getEditor("ValueContent");

                                      tree.value = r.data;
                                      tree.reload();
                                  }
                              });
                          }
                      }
                  },
                  {
                      label: '公司授权',
                      name: 'ValueContent',
                      type: 'treeEditor',
                      newline: true,
                      width: 400,
                      editor: {
                          "checkbox": true,
                          "nodeWidth": 300,
                          height : 300,
                          "url": "/web/treedata",
                          iconClsFieldName: 'iconcss',
                          autoCheckboxEven : false,
                          "parms": {
                              "enabled": 1,
                              "loadDataRights": "N",
                              "sourceModel": "res_company",
                              "parentField": "ParentID",
                              "textField": "CompanyName",
                              "sourceModel2": "",
                              "parentField2": "",
                              "refSourceField": "",
                              "textField2": ""
                          }
                      }
                  }

            ]
        },
        actions: {
            //get: '/web/detaildata/',
           // ds: '/web/iddata/',
            save: '/web/saveDataAssign/',
           // del: 'web/delete/'
        },
        onFormSubmit: function (data)
        {
            data.MasterName = "role";
            data.ModelName = "res_company";

            if (data.MasterID && $.isArray(data.MasterID) && data.MasterID.length)
            {
                data.MasterID = data.MasterID[0];
            } 
        },
        onAfterShowForm: function (e)
        {
            page = e.page;
            $(".treepanel", page.element).css({
                overflow: 'hidden',
                border : '1px solid #DDD'
            });
            $(".mainform .dotitltetip", page.element).remove();
            $(".mainform", page.element).append('<div style="color:red;margin:4px;" class="dotitltetip">不选择任何数据时将移除授权</div>');
        },
        common: {},
        link: {}
    };
    return options;
}