(function ()
{ 
    $.ligerDefaults.Form.editors['fileUploader'] = $.ligerDefaults.Grid.editors['fileUploader'] = {
        create: function (container, editParm,p)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {}, form = this;
            var editorId = field.name + "_" + new Date().getTime();
            var defaultSrc = '/Scripts/editors/file/images/image.png';
            var juploader, jhide;
            if(editor.isInputMode == 1) editor.mode = "input";
            var isReadonly = p.readonly || field.readonly || (field.editor && field.editor.readonly);

            if (editor.mode == "input")
            {
                juploader = $('<div class="l-text fileInputWrap combobox-selector"><input type="text" class="l-text-field"><div class="l-trigger" title="浏览"><div class="l-trigger-icon" ></div></div></div>').appendTo(container);
                juploader.find(".l-trigger-icon").attr("id", editorId);

                jhide = $('<input type="hidden" class="filevalue"  />  ').appendTo(juploader);
                juploader.find(".l-text-field").bind('change', function ()
                {
                    jhide.val(this.value);
                });
                if (isReadonly)
                {
                    juploader.addClass("l-text-readonly");
                    juploader.find(".l-text-field").hide();
                    var jdown = $('<a class="downlink" href="javascript:void(0)"></a>').appendTo(juploader);
                    return {
                        readonly: true,
                        panel: juploader
                    };
                }
            } else
            {
                juploader = $('<div class="uploaderWrap"></div>').appendTo(container);
                jhide = $('<input type="hidden" class="filevalue"  />  ').appendTo(juploader);

                var juploadable = $('<a class="uploadable"></div>').appendTo(juploader);
                var jbtn_del = $('<div class="uploadbtn cancel">删除</div>').appendTo(juploadable);
                var jbtn_edit = $('<div class="uploadbtn edit"></div>').appendTo(juploadable).attr("id", editorId);
                var jpreview = $('<div class="filepreview"><div class="file-title"></div></div>').appendTo(juploader);
                var jimg = $('<img class="imgpreview" />').attr("src", defaultSrc).appendTo(juploader);
                var jpreviewImg = $('<img />').attr("src", defaultSrc).appendTo(jpreview);
             
                 
                var imgWidth = editor.imgWidth || 120;
                var imgHeight = editor.imgHeight || 130;

                jimg.add(juploadable).add(jpreview).width(imgWidth);
                jimg.add(jpreview).height(imgHeight);

                jpreviewImg.width(imgWidth == "auto" ? "auto" : (imgWidth - 14))
                    .height(imgHeight == "auto" ? "auto" : (imgHeight - 25));
            }
            var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
            var webUploaderOp = {
                pick: {
                    id: '#' + editorId,
                    label: '',
                    multiple: false
                },
                accept: {
                    title: '自定义',
                    extensions: editor.extensions || 'gif,jpg,jpeg,bmp,png,pdf,doc,docx,xls,xlsx,ppt,pptx',
                    mimeTypes: '*/*'
                }, 
                auto: false,
                server: editor.url || '/ueditor/upload?action=uploadfile&appid=' + pbc.getAppId(),
                swf: '/Scripts/webuploader/Uploader.swf'
            };
            if (!isChrome)
            {
                webUploaderOp.runtimeOrder = "flash";
            }

            var uploader = WebUploader.create(webUploaderOp);
            if (editor.mode != "input")
            {
                jbtn_del.click(function ()
                {
                    jpreviewImg.attr("src", defaultSrc);
                    jpreview.removeClass("filepreview-hasfile");

                    if (current.selectedFile)
                    {
                        removeFile();
                    } else
                    {
                        jhide.val("");
                        jimg.attr("src", defaultSrc);
                    }
                });
                //下载旧的文件
                jpreviewImg.click(function ()
                {
                    if (current.selectedFile)
                    {
                        return;
                    }
                    var oldsrc = jhide.val();
                    if (!oldsrc)
                    {
                        return;
                    }
                    pbc.openFile({
                        url: pbc.toUrl(oldsrc),
                        method: 'get',
                        isNew: true
                    });
                });
            } else
            {

            }
            var current = {
                jwarp: juploader,
                uploader: uploader,
                upload: function (callback)
                {
                    if (callback)
                    {
                        var postResult = null;
                        uploader.on('uploadSuccess', function (file, e)
                        {
                            postResult = e;
                        });
                        uploader.on('uploadComplete', function (file)
                        {
                            callback(file, postResult);
                        });
                    }
                    uploader.upload();
                }
            };
            current.selectedFile = null;
 
            uploader.on('fileQueued', function (file, e)
            { 
                removeFile(); 
                addFile(file);
            }); 
            uploader.on('fileDequeued', function (file)
            {
                current.selectedFile = null;
            });
            function addFile(file)
            { 
                current.selectedFile = file;
                if (editor.mode != "input")
                {
                    if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|' + file.ext.toLowerCase() + '|') == -1)
                    {
                        juploader.removeClass("uploaderImageWrap");

                        jpreview.addClass("filepreview-hasfile");
                        jpreviewImg.attr("src", "/Scripts/editors/file/fileTypeImages/file-icons-" + pbc.web.helper.getFileIconName(file.ext.toLowerCase()) + ".gif");
                        jpreview.find(".file-title").attr("title", file.name).html(file.name);

                    } else
                    {

                        juploader.addClass("uploaderImageWrap");
                        uploader.makeThumb(file, function (error, src)
                        {
                            if (error || !src)
                            {

                            } else
                            {
                                jimg.attr("src", src);
                            }
                        }, imgWidth, imgHeight);
                    }
                } else
                {
                    juploader.find(".l-text-field").val(file.name);
                }
            }

            function removeFile()
            {
                if (!current.selectedFile) return;
                uploader.removeFile(current.selectedFile); 
                if (editor.mode != "input")
                {
                    juploader.removeClass("uploaderImageWrap");
                    jpreview.removeClass("filepreview-hasfile");
                    var oldsrc = jhide.val();
                    if (oldsrc)
                    {
                        jimg.attr('src', oldsrc);
                    } else
                    {
                        jimg.attr('src', defaultSrc);
                    }
                } else
                {
                    juploader.find(".l-text-field").val('');
                }
            } 
           
            return current;
        },
        getValue: function (o, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {}, form = this;
            if (editor.isInputMode == 1) editor.mode = "input";
            if (o.readonly && o.panel)
            {
                return o.panel.find(".filevalue").val();
            }
            if (o.selectedFile)
            {
                if(!o.savedFn)
                {
                    o.savedFn = function (postData, callback)
                    {
                        o.uploader.on('uploadSuccess', function (file, e)
                        {
                            postData[field.name] = e.url;
                        });
                        o.uploader.on('uploadComplete', function (file, e)
                        {
                            if (callback) callback();
                        });
                        o.uploader.upload();
                    };
                }
                var existSaveFn = false;
                if (!form.saveQueue) form.saveQueue = [];
                for (var i = 0; i < form.saveQueue.length; i++)
                {
                    if (form.saveQueue[i] == o.savedFn)
                    {
                        existSaveFn = true;
                        break;
                    }
                }
                if (!existSaveFn)
                {
                    form.saveQueue.push(o.savedFn);
                }
            }
            return o.jwarp.find(".filevalue").val();
        },
        setValue: function (o, value, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {}, form = this;
            if (o.readonly && o.panel)
            {
                if (value)
                {
                    var fName = getFileName(value);
                    o.panel.find(".filevalue").val(value);
                    o.panel.find(".downlink").html(fName).attr("href", "/" + value).attr("target", "_blank");
                }
                return;
            }
            if (editor.isInputMode == 1) editor.mode = "input";
            if (value)
            {
                var ext = value.replace(/.+\./, "");
               
                if (editor.mode != "input")
                {
                    if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|' + ext.toLowerCase() + '|') == -1)
                    {
                        o.jwarp.find(".filepreview")
                            .addClass("filepreview-hasfile")
                            .find("img")
                            .attr("src", "/Scripts/editors/file/fileTypeImages/file-icons-" + pbc.web.helper.getFileIconName(ext.toLowerCase()) + ".gif");
                        o.jwarp.find(".file-title").attr("title", fName).html(fName);
                    } else
                    {
                        o.jwarp.addClass("uploaderImageWrap");
                        o.jwarp.find("img").attr("src", pbc.toUrl(value));
                    }
                } else
                {
                    o.jwarp.find(".l-text-field").val(value);

                }

                o.jwarp.find(".filevalue").val(value);

            }
        },
        resize: function (o, width, height, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {}, form = this;
            if (o.readonly && o.panel)
            { 
                o.panel.width(width - 2);
                return;
            }
            if (editor.isInputMode == 1) editor.mode = "input";
            if (editor.mode == "input")
            {
                o.jwarp.width(width - 2);
                o.jwarp.find(".l-text-field").width(width - 20);
            }
        }
    };

    function downloadFile(e)
    {
        var url = e.url || ""; 
        var jframe = $('iframe#downloadFile_iframe');
        if (jframe.length == 0)
        {
            jframe = $('<iframe />').attr('id', 'downloadFile_iframe').hide().appendTo('body');
        }
        jframe.attr("src", url);
    };

    function getFileName(o){
        var pos = o.lastIndexOf("\\");
        if (pos == -1) pos = o.lastIndexOf("/");
        return o.substring(pos+1);  
    }
    
})();