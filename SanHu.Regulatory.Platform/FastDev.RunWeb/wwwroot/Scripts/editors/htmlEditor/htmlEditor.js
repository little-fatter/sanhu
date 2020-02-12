(function ()
{
    if (pbc.web.designer && pbc.web.designer.editors)
    {
        pbc.web.designer.editors.htmlEditor = {
            propertyFields: [
                {
                    name: 'height',
                    label: '高度',
                    width: 142,
                    group: '扩展',
                    type: 'int'
                },
                {
                    name: 'toolbarHeight',
                    label: '工具条高度',
                    width: 142,
                    group: '扩展',
                    type: 'int'
                },
                {
                    name: 'toolbarType',
                    label: '工具条按钮',
                    width: 142,
                    group: '扩展',
                    type: 'select', editor: {
                        data: [
                            { id: '', text: '默认' },
                            { id: 'full', text: '完整' },
                            { id: 'mini', text: 'Mini' },
                            { id: 'simple', text: '简单' },
                            { id: 'custom', text: 'custom' },
                        ]
                    }
                },
                {
                    name: 'toolbarCustom',
                    label: '工具条自定义',
                    width: 142,
                    group: '扩展',
                    type: 'textarea', editor: { height: 60 ,value:'bold,italic,underline|insertorderedlist,insertunorderedlist,selectall,cleardoc'}
                }
            ]
        };
    }

    $.ligerDefaults.Form.editors['htmlEditor'] = {
        create: function (container, editParm , p )
        {

            var field = editParm.field, editor = field.editor || {};
            var form = this; 
            var editorId = new Date().getTime() + field.name;

            var toolbars = []; 
            var height = parseFloat(editor.height || 400);
            var initialFrameHeight = height - parseFloat(editor.toolbarHeight || 120);
       
            var isReadonly = p.readonly || field.readonly || (field.editor && field.editor.readonly);
            if (isReadonly)
            {
                initialFrameHeight = initialFrameHeight - parseFloat(editor.toolbarHeight || 120);


                var jpanel = $('<div style="padding: 8px;border: 1px solid #d4d4d4;background-color: white;position: relative;overflow: visible;-webkit-border-radius: 4px; -moz-border-radius: 4px;border-radius: 4px;"></div>').appendTo(container);
                jpanel.css({
                    overflowY: "auto",
                    height: height + "px"
                });
                return {
                    readonly : true,
                    panel: jpanel
                }
            }


            $('<script type="text/plain" id="' + editorId + '"></script>').appendTo(container);
            container.css({ 
                overflowY: "auto",
                height : height + "px"
            });

            var toolbarType = editor.toolbarType || "full";

            if (toolbarType == "mini")
            {
                toolbars =[
    ['fullscreen', 'source', 'undo', 'redo', 'bold']
                ];

            }
            else if (toolbarType == "simple")
            {
                toolbars = [
    ['fullscreen', 'source', 'undo', 'redo'],
    ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
                ];
            }
            else if (toolbarType == "custom" && editor.toolbarCustom)
            {
                var arr = editor.toolbarCustom.split('|');
                $(arr).each(function ()
                {
                    toolbars.push(this.split(','));
                });
            }
            else
            {

                toolbars.push(['fullscreen', 'source', 'undo', 'redo',
                    'bold',
                    'italic', //斜体
                    'underline', //下划线
                    'strikethrough', //删除线
                    'justifyleft', //居左对齐
                    'justifyright', //居右对齐
                    'justifycenter', //居中对齐
                    'justifyjustify', //两端对齐
                    'forecolor', //字体颜色
                    'backcolor', //背景色
                    'fontfamily', //字体
                    'fontsize', //字号
                    'paragraph', //段落格式
                    'lineheight',
                    '|',
                    'time', //时间
                    'date', //日期
                    'simpleupload', //单图上传
                    'insertimage', //多图上传
                    'attachment', //附件
                    'link', //超链接
                    'emotion', //表情
                    'spechars', //特殊字符

                ]);
                toolbars.push([
                           'superscript', 'subscript', 'removeformat', 'formatmatch',
                           'autotypeset', 'blockquote', 'pasteplain', '|', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc',
                            '|',
                           'edittd',  //单元格属性
                           'inserttable', //插入表格
                           'insertrow', //前插入行
                           'insertcol', //前插入列
                           'mergeright', //右合并单元格
                           'mergedown', //下合并单元格
                           'deleterow', //删除行
                           'deletecol', //删除列
                           'splittorows', //拆分成行
                           'splittocols', //拆分成列
                           'splittocells', //完全拆分单元格
                           'deletecaption', //删除表格标题
                           'inserttitle', //插入标题
                           'mergecells', //合并多个单元格
                           '|',
                           'scrawl', //涂鸦
                           'music', //音乐 
                           '|',
                           'print', //打印 
                ]);
            }
            //不做任何的过滤
            UE.plugins['defaultfilter'] = function () { };

            var ueOp = null;
            if (isReadonly)
            {
                ueOp = {
                    toolbars: [],
                    autoClearinitialContent: true,
                    wordCount: false,
                    enableAutoSave: false,
                    elementPathEnabled: false,
                    initialFrameHeight: initialFrameHeight,
                    readonly: true,
                    serverUrl: '/dudao/weigui/server/UE/Controller.asp?appid=' + pbc.getAppId()
                };
            }
            else
            {
                ueOp = {
                    toolbars: toolbars,
                    //focus时自动清空初始化时的内容
                    autoClearinitialContent: true,
                    //关闭字数统计
                    wordCount: false,
                    enable: isReadonly ? false : true,
                    //关闭elementPath
                    elementPathEnabled: false,
                    //默认的编辑区域高度
                    initialFrameHeight: initialFrameHeight,
                    //更多其他参数，请参考ueditor.config.js中的配置项
                    serverUrl: '/ueditor/upload?appid=' + pbc.getAppId()
                };
            }
            var ue = UE.getEditor(editorId, ueOp);
            ue.addListener('ready', function (editor)
            {
                $(container).width('auto').addClass("uiedtior-li");
                ue.ueReady = true;
            }); 
            return ue;
        },
        getValue: function (creator, editParm)
        {
            if (creator.readonly)
            {
                return creator.panel.html();
            }
            return creator.getContent();
        },
        setValue: function (creator, value, editParm)
        {
            if (creator.readonly)
            {
                if (value)
                {
                    creator.panel.html(value);
                } else
                {
                    creator.panel.height(24).css({
                        padding: 0, border: "none",
                        borderRadius: "none"
                    }).css("borderBottom", "1px solid #d3d3d3");
                }
                return;
            }
            set();

            function set()
            {
                setTimeout(function ()
                {
                    if (!creator.ueReady) set();
                    setTimeout(function ()
                    {
                        creator.setContent(value);
                    }, 50);
                }, 50);
            }
        },
        resize: function (creator, width, height, editParm)
        {
        }
    };
     
})();