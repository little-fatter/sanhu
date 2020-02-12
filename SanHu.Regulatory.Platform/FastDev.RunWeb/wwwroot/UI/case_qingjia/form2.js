function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "title",
                label: "标题22",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行"
            },
            {
                newline: false,
                name: "Leavedays",
                label: "请假天数",
                editor: {
                    type: "int"
                },
                type: "int",
                type_textfield: "整数"
            },
            {
                newline: 1,
                name: "remarks",
                label: "备注",
                editor: {},
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "备注",
                width: "500"
            }]
        },
        common: {
            saveCallbackType: "toView"
        },
        toolbar : {
            items: [
                { text: '转下一步', id: 'workflow_advance', cls: 'ne-btn-blue' },
                { text: '回退', id: 'workflow_back' },
                { text: '流程图', id: 'workflow_log' },
                { text: '打印报表', id: 'myprint', cls: 'ne-btn-blue' }
            ]
        },

        //自定义打印按钮
        onmyprint: function ()
        {
            
            var g = this, p = this.options;
             
            var context = p.id; //单据ID
            var templates = [];
            pbc.ajax({
                url: pbc.toUrl('web/listdata/'),
                data: {
                    model: 'core_printTemplate',
                    filter: pbc.createFilter({
                        ModelName: p.model.name,
                        Name : '请假单打印'   // 准确找到哪一个打印模板
                    })
                },
                success: function (data)
                {
                    if (data.statusCode == "2" || data.statusCode == "3")
                    { 
                        pbc.showError(data.message);
                        return;
                    }

                    templates = data;
                    if (!templates || !templates.length)
                    {
                        pbc.showError("打印模板未定义！"); 
                    } else
                    { 
                        pbc.openNew({
                            url: pbc.toUrl('web/preview?rnd=') + new Date().getTime(),
                            parms: {
                                templateId: templates[0].ID,
                                context: context
                            }
                        });
                    }
                }
            });
             
        },
        link: {}
    };
    return options;
}