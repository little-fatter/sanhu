

window.pbc = {
    config: {
        singlePage: true,
        root: '/',
        domain: '',
        traceTime: true
    },

    actions: {
        userStatus: "/home/userStatus",
        login: "/home/login",
        home: "/web/home"
    },

    appId: '',

    traceTime: function (str) {
        if (pbc.config.traceTime) {
            if (console && console.log) {
                var o = new Date();
                var timeStr = o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds() + "." + o.getMilliseconds();

                console.log((str || "") + " " + timeStr);
            }
        }
    },

    require: {
        paths: {
            jquery: '/Scripts/jquery/jquery-1.10.2',
            jqueryui: '/Scripts/jquery-ui/ui/minified/jquery-ui.min',
            ligerui: '/Scripts/ligerUI/js/ligerui.all',
            bootstrap: '/Scripts/bootstrap-3.3.7/js/bootstrap.min',
            bootstrap_extend: '/Scripts/bootstrap/inspinia',
            toastr: '/Scripts/toastr/toastr.min',
            qtip: '/Scripts/qtip/jquery.qtip.min',
            vue: '/scripts/vue.min',
            views_parts_excel: '/Scripts/application/views/parts/excel',
            views_parts_buttons: '/Scripts/application/views/parts/buttons',
            views_parts_toolbar: '/Scripts/application/views/parts/toolbar',
            views_parts_tree: '/Scripts/application/views/parts/tree',
            views_list: '/Scripts/application/views/list',
            views_form: '/Scripts/application/views/form',

            views_calendar: '/Scripts/application/views/calendar',
            views_kanban: '/Scripts/application/views/kanban',
            views_template: '/Scripts/application/views/template',
            views_report: '/Scripts/application/views/report',

            views_templatePage: '/Scripts/application/views/templatePage',
            views_treePage: '/Scripts/application/views/treePage',
            views_iframePage: '/Scripts/application/views/iframePage',

            grid_chart: '/Scripts/application/grid_chart',
            grid_printData: '/Scripts/application/grid_printData',
            grid_exportExcel: '/Scripts/application/grid_exportExcel',

            form: '/Scripts/jquery.form',
            validate: '/Scripts/jquery-validation/jquery.validate.min',
            json: '/Scripts/json2',
            calendar: '/Scripts/fullcalendar-3.0.1/fullcalendar.min',
            codemirror: '/Scripts/codemirror-5.42.2/lib/codemirror',
            jsPlumb: '/Scripts/jsPlumb/jquery.jsPlumb-1.4.1-all-min',
            wf: '/Scripts/application/wf',
            wfDesgin: '/Scripts/application/wfDesgin',
            chart: '/Scripts/echarts/echarts-all',
            jqueryTimepicker: '/Scripts/jquery-ui/timepicker',
            webuploader: '/Scripts/webuploader/webuploader.min',
            layer: '/Scripts/layer/layer',
            colpick: '/Scripts/colpick/js/colpick',

            ueditor: '/Scripts/ueditor1_4_3/ueditor.all.min',
            ueditorConfig: '/Scripts/ueditor1_4_3/ueditor.config',
            zeroClipboard: '/Scripts/ueditor1_4_3/third-party/zeroclipboard/ZeroClipboard.min',

            tagsInput: '/Scripts/tagsInput/jquery.tagsinput',
            fakeloader: '/Scripts/fakeLoader/js/fakeLoader.min',
            moment: '/Scripts/fullcalendar-3.0.1/lib/moment.min',
            datepicker: '/Scripts/editors/datepicker/datepicker',
            percent: '/Scripts/editors/percent/percent',
            autoCode: '/Scripts/editors/autoCode/autoCode',
            numberbox: '/Scripts/editors/numberbox/numberbox',
            treeEditor: '/Scripts/editors/treeEditor/treeEditor',
            htmlSelect: '/Scripts/editors/htmlSelect/htmlSelect',
            select2: '/Scripts/editors/htmlSelect/htmlSelect',
            grid: '/Scripts/editors/grid/grid',
            pageTemplate: '/Scripts/editors/pageTemplate/pageTemplate',
            htmlEditor: '/Scripts/editors/htmlEditor/htmlEditor',
            yesno: '/Scripts/editors/yesno/yesno',
            image: '/Scripts/editors/file/image',
            tagsEditor: '/Scripts/editors/tagsEditor/tagsEditor',
            attributeEditor: '/Scripts/editors/attributeEditor/attributeEditor',
            fileUploader: '/Scripts/editors/file/fileUploader',
            fileSelector: '/Scripts/editors/file/fileSelector',
            pictureSelector: '/Scripts/editors/file/pictureSelector',
            selectionCreator: '/Scripts/editors/selectionCreator/selectionCreator',
            modelFilterBuilder: '/Scripts/editors/modelFilterBuilder/modelFilterBuilder',
            modelFilterCreator: '/Scripts/editors/modelFilterCreator/modelFilterCreator',
            selectTreeCreator: '/Scripts/editors/selectTreeCreator/selectTreeCreator',
            addinCreator: '/Scripts/editors/addinCreator/addinCreator',
            codeEdit: '/Scripts/editors/codeEdit/codeEdit',
            colorPicker: '/Scripts/colorpicker/js/colorpicker',
            colorPickerEditor: '/Scripts/editors/colorPickerEditor/colorPickerEditor',
            linkBuilder: '/Scripts/editors/linkBuilder/linkBuilder',
            baiduTemplate: '/Scripts/baiduTemplate',
            arrayOptionEditor: '/Scripts/editors/arrayOptionEditor/arrayOptionEditor',

            home: "/pages/application/index/common",

            home1: "/pages/application/index1/index",
            home2: "/pages/application/index2/index",

            emptypage: "/pages/application/emptyPage/index",

            nicescroll: "/Scripts/jquery-nicescroll/jquery.nicescroll.min"
        },

    },
    hideLoading: function (options) {
        $("body > .ne-mask").remove();
        if ($("body > div.sloading").length) {
            $("body > div.sloading").remove();
            return;
        } else {
            $("body > div.jloading").remove();
        }
    },
    getQueryStringByName: function (name) {
        return pbc.getUrlParm(location.search, name);
    },
    /**
     * @param {string} root
     * @param {string} one
     * @return {?}
     */
    getUrlParm: function (root, one) {
        if (!root) {
            return "";
        }
        if (root.indexOf("#")) {
            root = root.split("#")[0];
        }
        var expRecords = root.match(new RegExp("[?&]" + one + "=([^&]+)", "i"));
        if (expRecords == null || expRecords.length < 1) {
            return "";
        }
        return expRecords[1];
    }
};

requirejs.config({

    baseUrl: '/',

    map: {
        '*': {
            'css': '/Scripts/requirejs/css.min.js',
            'text': '/Scripts/requirejs/text.js'
        }
    },

    urlArgs: "ver=" + (new Date()).getTime(),

    paths: pbc.require.paths,

    shim: {

        bootstrap: ['jquery', 'css!/Scripts/bootstrap-3.3.7/css/bootstrap.min.css'],
        bootstrap_extend: ['css!/Contents/inspinia.css', 'css!/Scripts/font-awesome/css/font-awesome.css'],
        toastr: ["css!/Scripts/toastr/toastr.min.css"],
        qtip: ['css!/Scripts/qtip/jquery.qtip.min.css'],
        validate: ['/Scripts/jquery-validation/messages_cn.js', '/Scripts/jquery-validation/validator.js'],
        calendar: ['css!/Scripts/fullcalendar-3.0.1/fullcalendar.min.css'],
        codemirror: [
            //'/Scripts/codemirror-5.42.2/mode/javascript/javascript.js',
            'css!/Scripts/codemirror-5.42.2/lib/codemirror.css',
            'css!/Scripts/codemirror-5.42.2/theme/eclipse.css'
        ],
        ligerui: ['jquery', 'css!/Scripts/ligerUI/skins/Aqua/css/ligerui-all.css', 'css!/scripts/ligerUI/skins/ne/css/all.css'],
        fakeloader: ['jquery', 'css!/Scripts/fakeLoader/css/fakeLoader.css'],
        views_form: ['form', 'datepicker', 'validate'],
        views_list: ['form', 'datepicker'],
        views_calendar: ['calendar', 'datepicker'],
        views_kanban: ['datepicker'],
        views_template: ['datepicker'],
        views_report: ['chart'],
        views_parts_excel: ['webuploader'],

        wf: ['wfDesgin'],
        wfDesgin: ['css!/Contents/workflow/css/wf.css', 'jsPlumb', 'modelFilterBuilder'],
        jqueryTimepicker: ['css!/Scripts/jquery-ui/timepicker.css'],
        datepicker: ["jqueryTimepicker"],
        ueditor: {//注意：此处的依赖顺序不能颠倒
            deps: ['zeroClipboard', 'ueditorConfig'],
            exports: 'UE',
            init: function (ZeroClipboard) {
                //导出到全局变量，供ueditor使用
                window.ZeroClipboard = ZeroClipboard;
            }
        },
        pageTemplate: ["ueditor"],
        htmlEditor: ["ueditor"],

        tagsInput: ['css!/Scripts/tagsInput/jquery.tagsinput.css'],
        tagsEditor: ["tagsInput"],
        attributeEditor: ['css!/Scripts/editors/attributeEditor/attributeEditor.css', "tagsInput"],
        fileUploader: ['css!/Scripts/editors/file/fileUploader.css', "webuploader"],
        fileSelector: ['css!/Scripts/editors/file/fileSelector.css', "webuploader"],
        pictureSelector: ['css!/Scripts/editors/file/pictureSelector.css', "webuploader"],
        webuploader: ['css!/Scripts/webuploader/webuploader.css'],

        codeEdit: ["codemirror"],
        colorPicker: ['css!/Scripts/colorpicker/css/colorpicker.css'],
        colorPickerEditor: ["colorPicker"],
        linkBuilder: ["modelFilterCreator"],

        jqueryui: ["css!/Scripts/jquery-ui/themes/base/minified/jquery-ui.min.css"],


        home: [
           "/scripts/application/pbc.web.js",
            '/scripts/application/ligerui.expand.js',
            "jqueryui",
            "layer",
            "/Scripts/jquery.jqprint-0.3.js",
            "css!/Contents/application/cm.css",
            "css!/Contents/application/printtemplate.css",
            "css!/Contents/portal/css/style.css"
        ],

        home1: [
            "home",
            "css!/Contents/index1/style.css",
        ],


        home2: [
            "home",
            "css!/Contents/index2/style.css",
        ],

        emptypage: [
			"home"
        ]
    }
});



require([
    "jquery",
    "vue",
    "webuploader",
    "toastr",
    'moment',
    "ligerui",
    "qtip",
    "bootstrap",
    "json"
], function ($, vue, webuploader, toast, mom) {
    window.Vue = vue;

    window.toastr = toast;

    window.WebUploader = webuploader;

    window.moment = mom;
    require([
        "bootstrap_extend",
        "/scripts/application/common.js",

        "/scripts/application/pbc.js",
        "css!/Contents/application/pbc.css"
    ], function () {

        eventInit();

        $.ajax({
            type: 'post', cache: false, dataType: 'json',
            url: pbc.actions.userStatus,
            success: function (result) {
                pbc.hideLoading();
                if (!result || result.statusCode == "3") {
                    login();
                }
                else {
                    pbc.currentUser = result.data;

                    home(result.data);
                }
            }
        });
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/home/getaddins',
            success: function (addins) {
                if (addins && addins.length) {
                    var paths = {};

                    $(addins).each(function (i, addin) {
                        var name = "addin_" + addin;

                        paths[name] = '/scripts/application/addins/' + addin + '/index';
                    });

                    $.extend(pbc.require.paths, paths);

                    require.config({
                        paths: paths
                    });

                }
            }
        });

        //全局事件初始化设定
        function eventInit() {
            $(document).bind("click.freedesign", function (e) {
                try {
                    var obj = (e.target || e.srcElement);

                    var openpageId = $(obj).attr("data-openpage-id");

                    if (openpageId && $(obj).hasClass("link")) {

                        var gridrowId = $(obj).attr("data-gridrow-id");
                        var gridId = $(obj).attr("data-grid-id");

                        if (pbc.openpage_options && pbc.openpage_options[openpageId]) {
                            var op = $.extend(true, {}, pbc.openpage_options[openpageId]);
                            if (gridrowId && gridId) {
                                var row = liger.get(gridId).getRow(gridrowId);

                                if (op.urlBind && op.urlBind.filterData) {
                                    if (!op.urlBind.filterData.rules) {
                                        op.urlBind.filterData = pbc.createFilter(op.urlBind.filterData);
                                    }
                                    pbc.prevFilter(op.urlBind.filterData, row);
                                }
                                row.id = row.id || row.ID;

                                for (name in op) {
                                    if (typeof (op[name]) === "string" && op[name] && /#(.*?)+#/.test(op[name])) {
                                        op[name] = op[name].replace(/#(.*?)+#/g, function (word) {
                                            return row[word.replace(/#/g, '').replace('data.', '')] || "";
                                        });
                                    }
                                }
                            }

                            pbc.openPage(op);
                        }
                        return;
                    }

                    if (!$(obj).attr("data-url")) {
                        obj = $(obj).parent().get(0);
                    }
                    if (!$(obj).attr("data-url")) {
                        obj = $(obj).parent().get(0);
                    }

                    if ($(obj).attr("data-url") && $(obj).hasClass("link")) {
                        var target = $(obj).attr("data-target") || "tab";
                        var url = $(obj).attr("data-url");
                        var title = $(obj).attr("data-title") || $(obj).attr("data-text") || $(obj).text();
                        var tabid = $(obj).attr("data-tabid");

                        pbc.openPage({
                            url: url,
                            tabid: tabid,
                            text: title
                        }, target);

                    }
                }
                catch (e) {
                }
            });
        }

            function home(data) {
            require(["fakeloader"], function () {
                var jloader = $('<div class="fakeloader"></div>').appendTo('body');


                jloader.fakeLoader({
                    timeToHide: 99000,
                    bgColor: "#4a8bc2",
                    spinner: "spinner3"
                });
                var name = "home1";

                if (data.homeStyle == "s2") {
                    name = "home2";
                }
                if (pbc.getQueryStringByName("empty") == "Y" || window.isSingle === 'Y') {
                    name = "emptypage";
                }
                require([name], function (home) {
                    home.run(data);
                    jloader.fadeOut();
                    jloader.remove();
                });

            });
        }

        function login() {
            location.href = "/home/login";
        }


    });


});