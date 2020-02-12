(function ($)
{
    var currentWin = null;

    $.ligerDefaults.Form.editors['pictureSelector'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {};

            editor.filePath = editor.filePath || "uploads/productimages/"; 
            var form = this;
            var jwrap = $('<div class="pic-preview"><div class="statusBar"></div><ul class="filelist"></ul></div>').appendTo(container);
            var jtrigger = $('<a class="btnbrowse" >浏览</a>').appendTo(jwrap.find(".statusBar"));
            var jfilelist = jwrap.find("ul.filelist");
            var jhide = $('<input type="hidden" class="filevalue"  />  ').appendTo(jwrap);

            $("#fileBrowerWin").remove();
            if (currentWin)
            {
                currentWin.close();
            }

            jtrigger.click(function ()
            { 
                var jform = $("<div style='margin:9px;' id='#fileBrowerWin'></div>");
                var win = currentWin = $.ligerDialog.open({
                    target: jform,
                    isHidden: false,
                    title: '选择文件',
                    top: 100,
                    width: 800,
                    height: 'auto',
                    buttons: [
                        {
                            text: '确定', cls: 'l-dialog-btn-highlight',
                            onclick: function ()
                            {
                                var tabId = o.tab.getSelectedTabItemID();
                                switch (tabId)
                                {
                                    case 'upload':
                                        list = o.uploadFile.getInsertList();
                                        var count = o.uploadFile.getQueueCount();
                                        if (count)
                                        {
                                            $('.info', '#queueList').html('<span style="color:red;">' + '还有2个未上传文件'.replace(/[\d]/, count) + '</span>');
                                            return false;
                                        }
                                        break;
                                    case 'online':
                                        list = o.onlineFile.getInsertList();
                                        break;
                                } 
                                if (!list || !list.length)
                                {
                                    //jhide.val('');
                                } else
                                {
                                    var urls = (jhide.val() || "").split(';');
                                    $(list).each(function ()
                                    {
                                        var ext = this.title.replace(/.+\./, ""); 
                                        var jitem = $('<li><p class="imgWrap"><img src=""></p><p class="progress"><span></span></p><div class="file-panel" style="height: 30px; overflow: hidden;"><span class="cancel">删除</span></div></li>').appendTo(jfilelist);
                                        
                                        jitem.find("img").attr("src", this.url).attr("data-url", this.url);
                                        jitem.find(".cancel").click(function ()
                                        {
                                            $(this).parents("li:first").remove();
                                            urls = [];
                                            jfilelist.find("img").each(function ()
                                            {
                                                urls.push($(this).attr("data-url")); 
                                            });

                                            jhide.val(urls.join(';'));
                                        });
                                        urls.push(this.url);
                                    });
                                    jhide.val(urls.join(';'));
                                }
                                win.close();
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
                var o = new pictureSelector({
                    renderTo: jform,
                    filePath: editor.filePath
                });
                o.render();

            });

            return jwrap;
        },
        getValue: function (editor, editParm)
        {
            return editor.find(".filevalue").val();
        },
        setValue: function (editor, value, editParm)
        {
            if (value)
            {  
                var jfilelist = editor.find("ul.filelist");
                var jhide = editor.find(".filevalue");
                var urls = [];
                $(value.split(';')).each(function ()
                { 
                    var jitem = $('<li><p class="imgWrap"><img src=""></p><p class="progress"><span></span></p><div class="file-panel" style="height: 30px; overflow: hidden;"><span class="cancel">删除</span></div></li>').appendTo(jfilelist);

                    var url = this.toString();
                    if (url.indexOf('/res/') != -1)
                    {
                        url = "http://www." + pbc.domain + url;
                    }
                    jitem.find("img").attr("src", url).attr("data-url", url);
                    jitem.find(".cancel").click(function ()
                    {
                        $(this).parents("li:first").remove();
                        urls = [];
                        jfilelist.find("img").each(function ()
                        {
                            urls.push($(this).attr("data-url"));
                        });

                        jhide.val(urls.join(';'));
                    });
                    urls.push(url);
                });
                jhide.val(urls.join(';'));
            }
        },
        resize: function (editor, width, height, editParm)
        {
            editor.width(width - 2);

        }
    };


    function createLink(url)
    {
        var jlink = $('<a class="filetaglink" href="javascript:void()" title="点击下载"></a>');
        jlink.click(function ()
        {
            pbc.downloadFile({
                url: $(this).attr("data-url")
            });
        }).attr("data-url", url);
        return jlink;
    }

    var CONFIG = {
        "handlerUrl": "/ueditor/upload?appid=" + pbc.getAppId() + "&action=",
        "fileActionName": "uploadfile", /* controller里,执行上传文件的action名称 */
        "fileFieldName": "upfile", /* 提交的文件表单名称 */
        "filePathFormat": "uploads/file/{yyyy}{mm}{dd}/{time}{rand:6}", /* 上传保存路径,可以自定义保存路径和文件名格式 */
        "fileUrlPrefix": "/", /* 文件访问路径前缀 */
        "fileMaxSize": 51200000 * 100, /* 上传大小限制，单位B，默认50MB */
        "fileAllowFiles": [
            ".png", ".jpg", ".jpeg", ".gif", ".bmp",
            ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
            ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
            ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
            ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
        ],

        /* 列出指定目录下的文件 */
        "fileManagerActionName": "listfile", /* 执行文件管理的action名称 */
        "fileManagerListPath": "uploads/file", /* 指定要列出文件的目录 */
        "fileManagerUrlPrefix": "/", /* 文件访问路径前缀 */
        "fileManagerListSize": 20, /* 每次列出文件数量 */
        "fileManagerAllowFiles": [
            ".png", ".jpg", ".jpeg", ".gif", ".bmp",
            ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
            ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
            ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
            ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
        ] /* 列出的文件类型 */
    };
    var i18n = {
        'lang_tab_upload': '上传文件',
        'lang_tab_online': '在线文件',
        'uploadSelectFile': '点击选择文件',
        'uploadAddFile': '继续添加',
        'uploadStart': '开始上传',
        'uploadPause': '暂停上传',
        'uploadContinue': '继续上传',
        'uploadRetry': '重试上传',
        'uploadDelete': '删除',
        'uploadTurnLeft': '向左旋转',
        'uploadTurnRight': '向右旋转',
        'uploadPreview': '预览中',
        'updateStatusReady': '选中_个文件，共_KB。',
        'updateStatusConfirm': '已成功上传_个文件，_个文件上传失败',
        'updateStatusFinish': '共_个（_KB），_个上传成功',
        'updateStatusError': '，_张上传失败。',
        'errorExceedSize': '文件大小超出',
        'errorFileType': '文件格式不允许',
        'errorInterrupt': '文件传输中断',
        'errorUploadRetry': '上传失败，请重试',
        'errorHttp': 'http请求错误',
        'errorServerUpload': '服务器返回出错'
    };
    var lang = (function ()
    {
        return i18n;
    })();

    function getOpt(name)
    {
        return CONFIG[name];
    }

    var pictureSelector = function (options)
    {
        var g = this;
        g.options = $.extend({
            renderTo: null,
            showOnline:true
        }, options);
    };

    pbc.editors.pictureSelector = pictureSelector

    $.extend(pictureSelector.prototype, {
        render: function ()
        {
            var g = this, p = this.options;
            g.jupload = $(g.uploadHtml());
           
            g.jtab = $('<div></div>').appendTo(p.renderTo);
            var tab = g.tab = g.jtab.ligerTab({
                height: 380
            });
            tab.addTabItem({
                text: lang.lang_tab_upload,
                target: g.jupload,
                tabid: 'upload',
                showClose: false
            });
            if (p.showOnline)
            {
                g.jonline = $('<div id="online" class="panel"><div id="fileList"><var id="lang_imgLoading"></var></div></div>');
                tab.addTabItem({
                    text: lang.lang_tab_online,
                    target: g.jonline,
                    tabid: 'online',
                    showClose: false
                });
            }
            tab.selectTabItem("upload");

            g.uploadFile = new UploadFile(g.jupload, p.filePath);

            if (p.showOnline)
            {
                g.onlineFile = new OnlineFile(g.jonline.get(0), p.filePath);
            }
        },

        uploadHtml: function ()
        {
            var h = [];
            h.push('<div id="upload" class="panel focus">');
            h.push('            <div id="queueList" class="queueList">');
            h.push('                <div class="statusBar element-invisible">');
            h.push('                   <div class="progress">');
            h.push('                       <span class="text">0%</span>');
            h.push('                        <span class="percentage"></span>');
            h.push('                    </div><div class="info"></div>');
            h.push('                    <div class="btns">');
            h.push('                        <div id="filePickerBtn"></div>');
            h.push('                        <div class="uploadBtn"><var id="lang_start_upload"></var></div>');
            h.push('                    </div>');
            h.push('                </div>');
            h.push('                <div id="dndArea" class="placeholder">');
            h.push('                    <div class="filePickerContainer">');
            h.push('                        <div id="filePickerReady"></div>');
            h.push('                    </div>');
            h.push('               </div>');
            h.push('               <ul class="filelist element-invisible">');
            h.push('                   <li id="filePickerBlock" class="filePickerBlock"></li>');
            h.push('               </ul>');
            h.push('           </div>');
            h.push('      </div>');

            return h.join('');
        }
    });


    var browser = function ()
    {
        var agent = navigator.userAgent.toLowerCase(),
            opera = window.opera,
            browser = {
                ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent),
                opera: (!!opera && opera.version),
                webkit: (agent.indexOf(' applewebkit/') > -1),
                mac: (agent.indexOf('macintosh') > -1),
                quirks: (document.compatMode == 'BackCompat')
            };
        browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie);

        var version = 0;
        if (browser.ie)
        {

            var v1 = agent.match(/(?:msie\s([\w.]+))/);
            var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);
            if (v1 && v2 && v1[1] && v2[1])
            {
                version = Math.max(v1[1] * 1, v2[1] * 1);
            } else if (v1 && v1[1])
            {
                version = v1[1] * 1;
            } else if (v2 && v2[1])
            {
                version = v2[1] * 1;
            } else
            {
                version = 0;
            }
            browser.ie11Compat = document.documentMode == 11;
            browser.ie9Compat = document.documentMode == 9;
            browser.ie8 = !!document.documentMode;
            browser.ie8Compat = document.documentMode == 8;
            browser.ie7Compat = ((version == 7 && !document.documentMode)
                    || document.documentMode == 7);
            browser.ie6Compat = (version < 7 || browser.quirks);
            browser.ie9above = version > 8;
            browser.ie9below = version < 9;
            browser.ie11above = version > 10;
            browser.ie11below = version < 11;
        }
        if (browser.gecko)
        {
            var geckoRelease = agent.match(/rv:([\d\.]+)/);
            if (geckoRelease)
            {
                geckoRelease = geckoRelease[1].split('.');
                version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;
            }
        }
        if (/chrome\/(\d+\.\d)/i.test(agent))
        {
            browser.chrome = +RegExp['\x241'];
        }
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent))
        {
            browser.safari = +(RegExp['\x241'] || RegExp['\x242']);
        }
        if (browser.opera)
            version = parseFloat(opera.version());
        if (browser.webkit)
            version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);
        browser.version = version;
        browser.isCompatible =
            !browser.mobile && (
            (browser.ie && version >= 6) ||
            (browser.gecko && version >= 10801) ||
            (browser.opera && version >= 9.5) ||
            (browser.air && version >= 1) ||
            (browser.webkit && version >= 522) ||
            false);
        return browser;
    }();
    var utils = {
        serializeParam: function (json)
        {
            var strArr = [];
            for (var i in json)
            {
                //忽略默认的几个参数
                if (i == "method" || i == "timeout" || i == "async") continue;
                //传递过来的对象和函数不在提交之列
                if (!((typeof json[i]).toLowerCase() == "function" || (typeof json[i]).toLowerCase() == "object"))
                {
                    strArr.push(encodeURIComponent(i) + "=" + encodeURIComponent(json[i]));
                } else if ($.isArray(json[i]))
                {
                    //支持传数组内容
                    for (var j = 0; j < json[i].length; j++)
                    {
                        strArr.push(encodeURIComponent(i) + "[]=" + encodeURIComponent(json[i][j]));
                    }
                }
            }
            return strArr.join("&");
        },
        formatUrl: function (url)
        {
            var u = url.replace(/&&/g, '&');
            u = u.replace(/\?&/g, '?');
            u = u.replace(/&$/g, '');
            u = u.replace(/&#/g, '#');
            u = u.replace(/&+/g, '&');
            return u;
        }
    };

    /* 上传附件 */
    function UploadFile(jtarget, filePath)
    {
        this.$wrap = jtarget;
        this.filePath = filePath;
        this.init();
    }
    UploadFile.prototype = {
        init: function ()
        {
            this.fileList = [];
            this.initContainer();
            this.initUploader();
        },
        initContainer: function ()
        {
            this.$queue = this.$wrap.find('.filelist');
        },
        /* 初始化容器 */
        initUploader: function ()
        {
            var _this = this,
                $ = jQuery,    // just in case. Make sure it's not an other libaray.
                $wrap = _this.$wrap,
            // 图片容器
                $queue = $wrap.find('.filelist'),
            // 状态栏，包括进度和控制按钮
                $statusBar = $wrap.find('.statusBar'),
            // 文件总体选择信息。
                $info = $statusBar.find('.info'),
            // 上传按钮
                $upload = $wrap.find('.uploadBtn'),
            // 上传按钮
                $filePickerBtn = $wrap.find('.filePickerBtn'),
            // 上传按钮
                $filePickerBlock = $wrap.find('.filePickerBlock'),
            // 没选择文件之前的内容。
                $placeHolder = $wrap.find('.placeholder'),
            // 总体进度条
                $progress = $statusBar.find('.progress').hide(),
            // 添加的文件数量
                fileCount = 0,
            // 添加的文件总大小
                fileSize = 0,
            // 优化retina, 在retina下这个值是2
                ratio = window.devicePixelRatio || 1,
            // 缩略图大小
                thumbnailWidth = 113 * ratio,
                thumbnailHeight = 113 * ratio,
            // 可能有pedding, ready, uploading, confirm, done.
                state = '',
            // 所有文件的进度信息，key为file id
                percentages = {},
                supportTransition = (function ()
                {
                    var s = document.createElement('p').style,
                        r = 'transition' in s ||
                            'WebkitTransition' in s ||
                            'MozTransition' in s ||
                            'msTransition' in s ||
                            'OTransition' in s;
                    s = null;
                    return r;
                })(),
            // WebUploader实例
                uploader,
                actionUrl = getOpt("handlerUrl") + getOpt('fileActionName'),
                fileMaxSize = getOpt('fileMaxSize'),
                acceptExtensions = getOpt('fileAllowFiles').join('').replace(/\./g, ',').replace(/^[,]/, '');

            uploader = _this.uploader = WebUploader.create({
                pick: {
                    id: '#filePickerReady',
                    label: lang.uploadSelectFile
                },
                swf: pbc.toUrl('/Scripts/webuploader/Uploader.swf'),
                server: actionUrl,
                fileVal: getOpt('fileFieldName'),
                duplicate: true,
                fileSingleSizeLimit: fileMaxSize,    // 默认 2 M
                compress: false
            });

            uploader.addButton({
                id: '#filePickerBlock'
            });
            uploader.addButton({
                id: '#filePickerBtn',
                label: lang.uploadAddFile
            });

            setState('pedding');

            // 当有文件添加进来时执行，负责view的创建
            function addFile(file)
            {
                var $li = $('<li id="' + file.id + '">' +
                        '<p class="title">' + file.name + '</p>' +
                        '<p class="imgWrap"></p>' +
                        '<p class="progress"><span></span></p>' +
                        '</li>'),

                    $btns = $('<div class="file-panel">' +
                        '<span class="cancel">' + lang.uploadDelete + '</span>' +
                        '<span class="rotateRight">' + lang.uploadTurnRight + '</span>' +
                        '<span class="rotateLeft">' + lang.uploadTurnLeft + '</span></div>').appendTo($li),
                    $prgress = $li.find('p.progress span'),
                    $wrap = $li.find('p.imgWrap'),
                    $info = $('<p class="error"></p>').hide().appendTo($li),

                    showError = function (code)
                    {
                        switch (code)
                        {
                            case 'exceed_size':
                                text = lang.errorExceedSize;
                                break;
                            case 'interrupt':
                                text = lang.errorInterrupt;
                                break;
                            case 'http':
                                text = lang.errorHttp;
                                break;
                            case 'not_allow_type':
                                text = lang.errorFileType;
                                break;
                            default:
                                text = lang.errorUploadRetry;
                                break;
                        }
                        $info.text(text).show();
                    };

                if (file.getStatus() === 'invalid')
                {
                    showError(file.statusText);
                } else
                {
                    $wrap.text(lang.uploadPreview);
                    if ('|png|jpg|jpeg|bmp|gif|'.indexOf('|' + file.ext.toLowerCase() + '|') == -1)
                    {
                        $wrap.empty().addClass('notimage').append('<i class="file-preview file-type-' + file.ext.toLowerCase() + '"></i>' +
                        '<span class="file-title" title="' + file.name + '">' + file.name + '</span>');
                    } else
                    {
                        if (browser.ie && browser.version <= 7)
                        {
                            $wrap.text(lang.uploadNoPreview);
                        } else
                        {
                            uploader.makeThumb(file, function (error, src)
                            {
                                if (error || !src)
                                {
                                    $wrap.text(lang.uploadNoPreview);
                                } else
                                {
                                    var $img = $('<img src="' + src + '">');
                                    $wrap.empty().append($img);
                                    $img.on('error', function ()
                                    {
                                        $wrap.text(lang.uploadNoPreview);
                                    });
                                }
                            }, thumbnailWidth, thumbnailHeight);
                        }
                    }
                    percentages[file.id] = [file.size, 0];
                    file.rotation = 0;

                    /* 检查文件格式 */
                    if (!file.ext || acceptExtensions.indexOf(file.ext.toLowerCase()) == -1)
                    {
                        showError('not_allow_type');
                        uploader.removeFile(file);
                    }
                }

                file.on('statuschange', function (cur, prev)
                {
                    if (prev === 'progress')
                    {
                        $prgress.hide().width(0);
                    } else if (prev === 'queued')
                    {
                        $li.off('mouseenter mouseleave');
                        $btns.remove();
                    }
                    // 成功
                    if (cur === 'error' || cur === 'invalid')
                    {
                        showError(file.statusText);
                        percentages[file.id][1] = 1;
                    } else if (cur === 'interrupt')
                    {
                        showError('interrupt');
                    } else if (cur === 'queued')
                    {
                        percentages[file.id][1] = 0;
                    } else if (cur === 'progress')
                    {
                        $info.hide();
                        $prgress.css('display', 'block');
                    } else if (cur === 'complete')
                    {
                    }

                    $li.removeClass('state-' + prev).addClass('state-' + cur);
                });

                $li.on('mouseenter', function ()
                {
                    $btns.stop().animate({ height: 30 });
                });
                $li.on('mouseleave', function ()
                {
                    $btns.stop().animate({ height: 0 });
                });

                $btns.on('click', 'span', function ()
                {
                    var index = $(this).index(),
                        deg;
                    switch (index)
                    {
                        case 0:
                            uploader.removeFile(file);
                            updateStatus();
                            return;
                        case 1:
                            file.rotation += 90;
                            break;
                        case 2:
                            file.rotation -= 90;
                            break;
                    }

                    if (supportTransition)
                    {
                        deg = 'rotate(' + file.rotation + 'deg)';
                        $wrap.css({
                            '-webkit-transform': deg,
                            '-mos-transform': deg,
                            '-o-transform': deg,
                            'transform': deg
                        });
                    } else
                    {
                        $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                    }

                });

                $li.insertBefore($filePickerBlock);
            }

            // 负责view的销毁
            function removeFile(file)
            {
                var $li = $('#' + file.id);
                delete percentages[file.id];
                updateTotalProgress();
                $li.off().find('.file-panel').off().end().remove();

            }

            function updateTotalProgress()
            {
                var loaded = 0,
                    total = 0,
                    spans = $progress.children(),
                    percent;

                $.each(percentages, function (k, v)
                {
                    total += v[0];
                    loaded += v[0] * v[1];
                });

                percent = total ? loaded / total : 0;

                spans.eq(0).text(Math.round(percent * 100) + '%');
                spans.eq(1).css('width', Math.round(percent * 100) + '%');
                updateStatus();
            }

            function setState(val, files)
            {

                if (val != state)
                {

                    var stats = uploader.getStats();

                    $upload.removeClass('state-' + state);
                    $upload.addClass('state-' + val);

                    switch (val)
                    {

                        /* 未选择文件 */
                        case 'pedding':
                            $queue.addClass('element-invisible');
                            $statusBar.addClass('element-invisible');
                            $placeHolder.removeClass('element-invisible');
                            $progress.hide(); $info.hide();
                            uploader.refresh();
                            break;

                            /* 可以开始上传 */
                        case 'ready':
                            $placeHolder.addClass('element-invisible');
                            $queue.removeClass('element-invisible');
                            $statusBar.removeClass('element-invisible');
                            $progress.hide(); $info.show();
                            $upload.text(lang.uploadStart);
                            uploader.refresh();
                            break;

                            /* 上传中 */
                        case 'uploading':
                            $progress.show(); $info.hide();
                            $upload.text(lang.uploadPause);
                            break;

                            /* 暂停上传 */
                        case 'paused':
                            $progress.show(); $info.hide();
                            $upload.text(lang.uploadContinue);
                            break;

                        case 'confirm':
                            $progress.show(); $info.hide();
                            $upload.text(lang.uploadStart);

                            stats = uploader.getStats();
                            if (stats.successNum && !stats.uploadFailNum)
                            {
                                setState('finish');
                                return;
                            }
                            break;

                        case 'finish':
                            $progress.hide(); $info.show();
                            if (stats.uploadFailNum)
                            {
                                $upload.text(lang.uploadRetry);
                            } else
                            {
                                $upload.text(lang.uploadStart);
                            }
                            break;
                    }

                    state = val;
                    updateStatus();

                }

                if (!_this.getQueueCount())
                {
                    $upload.addClass('disabled')
                } else
                {
                    $upload.removeClass('disabled')
                }

            }

            function updateStatus()
            {
                var text = '', stats;

                if (state === 'ready')
                {
                    text = lang.updateStatusReady.replace('_', fileCount).replace('_KB', WebUploader.formatSize(fileSize));
                } else if (state === 'confirm')
                {
                    stats = uploader.getStats();
                    if (stats.uploadFailNum)
                    {
                        text = lang.updateStatusConfirm.replace('_', stats.successNum).replace('_', stats.successNum);
                    }
                } else
                {
                    stats = uploader.getStats();
                    text = lang.updateStatusFinish.replace('_', fileCount).
                        replace('_KB', WebUploader.formatSize(fileSize)).
                        replace('_', stats.successNum);

                    if (stats.uploadFailNum)
                    {
                        text += lang.updateStatusError.replace('_', stats.uploadFailNum);
                    }
                }

                $info.html(text);
            }

            uploader.on('fileQueued', function (file)
            {
                fileCount++;
                fileSize += file.size;

                if (fileCount === 1)
                {
                    $placeHolder.addClass('element-invisible');
                    $statusBar.show();
                }

                addFile(file);
            });

            uploader.on('fileDequeued', function (file)
            {
                fileCount--;
                fileSize -= file.size;

                removeFile(file);
                updateTotalProgress();
            });

            uploader.on('filesQueued', function (file)
            {
                if (!uploader.isInProgress() && (state == 'pedding' || state == 'finish' || state == 'confirm' || state == 'ready'))
                {
                    setState('ready');
                }
                updateTotalProgress();
            });

            uploader.on('all', function (type, files)
            {
                switch (type)
                {
                    case 'uploadFinished':
                        setState('confirm', files);
                        break;
                    case 'startUpload':
                        /* 添加额外的GET参数 */
                        var params = '',
                            url = utils.formatUrl(actionUrl + (actionUrl.indexOf('?') == -1 ? '?' : '&') + 'encode=utf-8&' + params);
                        uploader.option('server', url);
                        setState('uploading', files);
                        break;
                    case 'stopUpload':
                        setState('paused', files);
                        break;
                }
            });

            uploader.on('uploadBeforeSend', function (file, data, header)
            {
                //这里可以通过data对象添加POST参数
                header['X_Requested_With'] = 'XMLHttpRequest';
            });

            uploader.on('uploadProgress', function (file, percentage)
            {
                var $li = $('#' + file.id),
                    $percent = $li.find('.progress span');

                $percent.css('width', percentage * 100 + '%');
                percentages[file.id][1] = percentage;
                updateTotalProgress();
            });

            uploader.on('uploadSuccess', function (file, ret)
            {
                var $file = $('#' + file.id);
                try
                {
                    var responseText = (ret._raw || ret),
                        json = JSON.parse(responseText);
                    if (json.state == 'SUCCESS')
                    {
                        _this.fileList.push(json);
                        $file.append('<span class="success"></span>');
                    } else
                    {
                        $file.find('.error').text(json.state).show();
                    }
                } catch (e)
                {
                    $file.find('.error').text(lang.errorServerUpload).show();
                }
            });

            uploader.on('uploadError', function (file, code)
            {
            });
            uploader.on('Error', function (file, code)
            {
            });
            uploader.on('UploadComplete', function (file, ret)
            {
            });

            $upload.on('click', function ()
            {
                if ($(this).hasClass('disabled'))
                {
                    return false;
                }

                if (state === 'ready')
                {
                    uploader.upload();
                } else if (state === 'paused')
                {
                    uploader.upload();
                } else if (state === 'uploading')
                {
                    uploader.stop();
                }
            });

            $upload.addClass('state-' + state);
            updateTotalProgress();
        },
        getQueueCount: function ()
        {
            var file, i, status, readyFile = 0, files = this.uploader.getFiles();
            for (i = 0; file = files[i++];)
            {
                status = file.getStatus();
                if (status == 'inited' || status == 'queued' || status == 'uploading' || status == 'progress') readyFile++;
            }
            return readyFile;
        },
        getInsertList: function ()
        {
            var i, link, data, list = [],
                prefix = getOpt('fileUrlPrefix');
            for (i = 0; i < this.fileList.length; i++)
            {
                data = this.fileList[i];
                link = data.url;
                list.push({
                    title: data.original || link.substr(link.lastIndexOf('/') + 1),
                    url: prefix + link
                });
            }
            return list;
        }
    };


    /* 在线附件 */
    function OnlineFile(target, filePath)
    {
        this.container = target;
        this.filePath = filePath;
        this.init();
    }
    OnlineFile.prototype = {
        init: function ()
        {
            this.initContainer();
            this.initEvents();
            this.initData();
        },
        /* 初始化容器 */
        initContainer: function ()
        {
            this.container.innerHTML = '';
            this.list = document.createElement('ul');
            this.clearFloat = document.createElement('li');

            $(this.list).addClass('list');
            $(this.clearFloat).addClass('clearFloat');

            this.list.appendChild(this.clearFloat);
            this.container.appendChild(this.list);
        },
        /* 初始化滚动事件,滚动到地步自动拉取数据 */
        initEvents: function ()
        {
            var _this = this;

            /* 滚动拉取图片 */
            $("#fileList").on('scroll', function (e)
            {
                var panel = this;
                if (panel.scrollHeight - (panel.offsetHeight + panel.scrollTop) < 10)
                {
                    _this.getFileData();
                }
            });
            /* 选中图片 */
            $("#online .list").on('click', function (e)
            {
                var target = e.target || e.srcElement,
                    li = target.parentNode;
                if (li.tagName.toLowerCase() == 'li')
                {
                    if ($(li).hasClass('selected'))
                    {
                        $(li).removeClass('selected');
                    } else
                    {
                        $(li).addClass('selected');
                    }
                }
            });
        },
        /* 初始化第一次的数据 */
        initData: function ()
        {

            /* 拉取数据需要使用的值 */
            this.state = 0;
            this.listSize = getOpt('fileManagerListSize');
            this.listIndex = 0;
            this.listEnd = false;

            /* 第一次拉取数据 */
            this.getFileData();
        },
        /* 向后台拉取图片列表数据 */
        getFileData: function ()
        {
            var _this = this;

            if (!_this.listEnd && !this.isLoadingData)
            {
                this.isLoadingData = true;
                pbc.ajax({
                    url: getOpt("handlerUrl") + getOpt('fileManagerActionName') + "&filePath=" + encodeURI(_this.filePath),
                    data: {
                        start: this.listIndex,
                        size: this.listSize
                    },
                    contentType: null,
                    method: 'get',
                    success: function (json)
                    {
                        try
                        {
                            if (json.state == 'SUCCESS')
                            {
                                _this.pushData(json.list);
                                _this.listIndex = parseInt(json.start) + parseInt(json.list.length);
                                if (_this.listIndex >= json.total)
                                {
                                    _this.listEnd = true;
                                }
                                _this.isLoadingData = false;
                            }
                        } catch (e)
                        {
                        }
                    },
                    onerror: function ()
                    {
                        _this.isLoadingData = false;
                    }
                });
            }
        },
        /* 添加图片到列表界面上 */
        pushData: function (list)
        {
            var i, item, img, filetype, preview, icon, item_replace, _this = this,
                urlPrefix = getOpt('fileManagerUrlPrefix');
            for (i = 0; i < list.length; i++)
            {
                if (list[i] && list[i].url)
                {
                    item = document.createElement('li');
                    icon = document.createElement('span');
                    item_replace = document.createElement('span');
                    filetype = list[i].url.substr(list[i].url.lastIndexOf('.') + 1);

                    if ("png|jpg|jpeg|gif|bmp".indexOf(filetype) != -1)
                    {
                        preview = document.createElement('img');
                        $(preview).on('load', function (image)
                        {
                            _this.scale(image, image.parentNode.offsetWidth, image.parentNode.offsetHeight);
                        });
                        preview.width = 113;
                        preview.setAttribute('src', urlPrefix + list[i].url + (list[i].url.indexOf('?') == -1 ? '?noCache=' : '&noCache=') + (+new Date()).toString(36));
                    } else
                    {
                        var ic = document.createElement('i'),
                            textSpan = document.createElement('span');
                        textSpan.innerHTML = list[i].url.substr(list[i].url.lastIndexOf('/') + 1);
                        preview = document.createElement('div');
                        preview.appendChild(ic);
                        preview.appendChild(textSpan);
                        $(preview).addClass('file-wrapper');
                        $(textSpan).addClass('file-title');
                        $(ic).addClass('file-type-' + filetype);
                        $(ic).addClass('file-preview');
                    }
                    $(icon).addClass('select-icon');
                    $(item_replace).addClass('item');
                    item.setAttribute('data-url', urlPrefix + list[i].url);
                    if (list[i].original)
                    {
                        item.setAttribute('data-title', list[i].original);
                    }

                    item.appendChild(preview);
                    item.appendChild(icon);
                    item.appendChild(item_replace);
                    this.list.insertBefore(item, this.clearFloat);
                }
            }
        },
        /* 改变图片大小 */
        scale: function (img, w, h, type)
        {
            var ow = img.width,
                oh = img.height;

            if (type == 'justify')
            {
                if (ow >= oh)
                {
                    img.width = w;
                    img.height = h * oh / ow;
                    img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px';
                } else
                {
                    img.width = w * ow / oh;
                    img.height = h;
                    img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px';
                }
            } else
            {
                if (ow >= oh)
                {
                    img.width = w * ow / oh;
                    img.height = h;
                    img.style.marginLeft = '-' + parseInt((img.width - w) / 2) + 'px';
                } else
                {
                    img.width = w;
                    img.height = h * oh / ow;
                    img.style.marginTop = '-' + parseInt((img.height - h) / 2) + 'px';
                }
            }
        },
        getInsertList: function ()
        {
            var i, lis = this.list.children, list = [],
                prefix = getOpt('fileManagerUrlPrefix');

            for (i = 0; i < lis.length; i++)
            {
                if ($(lis[i]).hasClass('selected'))
                {
                    var url = lis[i].getAttribute('data-url');
                    var title = lis[i].getAttribute('data-title') || url.substr(url.lastIndexOf('/') + 1);
                    list.push({
                        title: title,
                        url: url
                    });
                }
            }
            return list;
        }
    };

    function getFileName(o)
    {
        var pos = o.lastIndexOf("\\");
        if (pos == -1) pos = o.lastIndexOf("/");
        return o.substring(pos + 1);
    }
})(jQuery);