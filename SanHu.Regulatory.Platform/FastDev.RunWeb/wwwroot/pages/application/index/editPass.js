define([
    "jquery"
],
    function ($)
    { 
        function showEditPassWin()
        {
            var jform = $("<div style='margin:9px;'></div>");
            var win = $.ligerDialog.open({
                target: jform,
                isHidden: true,
                title: '修改密码确认',
                top: 100,
                width: 420,
                height: 'auto',
                buttons: [
                    {
                        text: '确定', cls: 'l-dialog-btn-highlight',
                        onclick: function ()
                        {
                            var data = form.getData();
                            if (!data.oldpassword || !data.password1 || !data.password2)
                            {
                                pbc.showError("密码不能为空");
                                return;
                            }
                            if (data.password1 != data.password2)
                            {
                                pbc.showError("两次密码输入不一致");
                                return;
                            }
                            pbc.ajax({
                                url: pbc.toUrl('web/user_changepassword'),
                                data: data,
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

                                    pbc.showSuccess("修改密码成功");
                                    win.close();
                                }

                            });
                        }
                    },
                    {
                        text: '取消',
                        onclick: function ()
                        {
                            win.close();
                        }
                    }
                ]
            });

            var form = jform.ligerForm({
                labelWidth: 'auto',
                fields: [
                    {
                        name: 'oldpassword',
                        label: '密码',
                        type: 'password',
                        labelWidth: 80,
                        width: 255,
                        editor: {
                        }
                    },
                     {
                         name: 'password1',
                         label: '密码',
                         type: 'password',
                         labelWidth: 80,
                         width: 255,
                         editor: {
                         }
                     },
                     {
                         name: 'password2',
                         label: '确认密码',
                         type: 'password',
                         labelWidth: 80,
                         width: 255,
                         editor: {
                         }
                     }
                ]
            });
        }
         

        return {
            run: showEditPassWin
        };
    });