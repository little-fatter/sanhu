
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

    traceTime: function (str)
    {
        if (pbc.config.traceTime)
        {
            if (console && console.log)
            {
                var o = new Date();
                var timeStr = o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds() + "." + o.getMilliseconds();

                console.log((str || "") + " " + timeStr);
            }
        }
    },

    require: {
        paths: {
        	jquery: 'Scripts/jquery/jquery-1.10.2',
            jqueryui: 'Scripts/jquery-ui/ui/minified/jquery-ui.min',
            ligerui: 'scripts/ligerUI/js/ligerui.all',
            bootstrap: 'scripts/bootstrap-3.3.7/js/bootstrap.min', 
            bootstrap_extend: 'scripts/bootstrap/inspinia',
            toastr: 'scripts/toastr/toastr.min',
            qtip: 'Scripts/qtip/jquery.qtip.min',
            vue: 'scripts/vue.min',
            views_parts_excel: 'scripts/application/views/parts/excel',
            views_parts_buttons: 'scripts/application/views/parts/buttons',
            views_parts_toolbar: 'scripts/application/views/parts/toolbar',
  views_parts_tree: 'Scripts/application/views/parts/tree',
            views_list: 'scripts/application/views/list',
            views_form: 'scripts/application/views/form',
 
            views_calendar: 'Scripts/application/views/calendar',
            views_kanban: 'Scripts/application/views/kanban',
            views_template: 'Scripts/application/views/template',
            views_report: 'Scripts/application/views/report',
            form: 'Scripts/jquery.form',
            validate: 'Scripts/jquery-validation/jquery.validate.min',
            json: 'Scripts/json2',
            calendar: 'Scripts/fullcalendar-3.0.1/fullcalendar.min',
            codemirror: 'Scripts/codemirror-5.42.2/lib/codemirror',
            jsPlumb: 'Scripts/jsPlumb/jquery.jsPlumb-1.4.1-all-min',
            wf: 'Scripts/application/wf',
            wfDesgin: 'Scripts/application/wfDesgin',
            chart: 'Scripts/echarts/echarts-all',
            jqueryTimepicker: 'Scripts/jquery-ui/timepicker',
            webuploader: 'Scripts/webuploader/webuploader.min',
            layer: 'Scripts/layer/layer',
            codeMirror: 'Scripts/codemirror-5.42.2/lib/codemirror',
            colpick: 'Scripts/colpick/js/colpick',
            ueditor: 'Scripts/ueditor1_4_3/ueditor.all',
            tagsInput: 'Scripts/tagsInput/jquery.tagsinput',
            fakeloader: 'Scripts/fakeLoader/js/fakeLoader.min',
            moment: 'Scripts/fullcalendar-3.0.1/lib/moment.min',
            datepicker: 'Scripts/editors/datepicker/datepicker',
            percent: 'Scripts/editors/percent/percent',
            autoCode: 'Scripts/editors/autoCode/autoCode',
            numberbox: 'Scripts/editors/numberbox/numberbox',
            treeEditor: 'Scripts/editors/treeEditor/treeEditor',
            htmlSelect: 'Scripts/editors/htmlSelect/htmlSelect',
            select2: 'Scripts/editors/htmlSelect/htmlSelect',
            grid: 'Scripts/editors/grid/grid',
            pageTemplate: 'Scripts/editors/pageTemplate/pageTemplate',
            htmlEditor: 'Scripts/editors/htmlEditor/htmlEditor',
            yesno: 'Scripts/editors/yesno/yesno',
            image: 'Scripts/editors/file/image',
            tagsEditor: 'Scripts/editors/tagsEditor/tagsEditor',
            attributeEditor: 'Scripts/editors/attributeEditor/attributeEditor',
            fileUploader: 'Scripts/editors/file/fileUploader',
            fileSelector: 'Scripts/editors/file/fileSelector',
            pictureSelector: 'Scripts/editors/file/pictureSelector',
            selectionCreator: 'Scripts/editors/selectionCreator/selectionCreator',
            modelFilterBuilder: 'Scripts/editors/modelFilterBuilder/modelFilterBuilder',
            modelFilterCreator: 'Scripts/editors/modelFilterCreator/modelFilterCreator',
            selectTreeCreator: 'Scripts/editors/selectTreeCreator/selectTreeCreator',
            codeEdit: 'Scripts/editors/codeEdit/codeEdit',
            colorPicker: 'Scripts/editors/colorPicker/colorPicker',
            linkBuilder: 'Scripts/editors/linkBuilder/linkBuilder',
           
            zeroClipboard : 'Scripts/ueditor1_4_3/third-party/zeroclipboard/ZeroClipboard.min',

            home: "pages/application/index/common",
            
            home1: "pages/application/index1/index",
            home2: "pages/application/index2/index",

            emptypage: "pages/application/emptyPage/index",
        },

    }
};

requirejs.config({

	//baseUrl: '',

	map: {
		'*': {
			'css': 'scripts/requirejs/css.min',
			'text': 'scripts/requirejs/text'
		}
	},

	urlArgs: "ver=" + (new Date()).getTime(),

	paths: pbc.require.paths,

	shim: {

		bootstrap: ['jquery', 'css!Scripts/bootstrap-3.3.7/css/bootstrap.min.css'],
		bootstrap_extend: ['css!Contents/inspinia.css', 'css!Scripts/font-awesome/css/font-awesome.css'],
		toastr: ["css!scripts/toastr/toastr.min.css"],
		qtip: ['css!Scripts/qtip/jquery.qtip.min.css'],
		validate: ['Scripts/jquery-validation/messages_cn', 'Scripts/jquery-validation/validator'],
		calendar: ['css!Scripts/fullcalendar-3.0.1/fullcalendar.min.css'],
		codemirror: ['Scripts/codemirror-5.42.2/mode/javascript/javascript', 'css!Scripts/codemirror-5.42.2/lib/codemirror.css', 'css!Scripts/codemirror-5.42.2/theme/eclipse.css'],
		ligerui: ['jquery', 'css!scripts/ligerUI/skins/Aqua/css/ligerui-all.css', 'css!scripts/ligerUI/skins/ne/css/all.css'],
		fakeloader: ['jquery', 'css!Scripts/fakeLoader/css/fakeLoader.css'],
		views_form: ['form', 'datepicker', 'validate'],
		views_list: ['form', 'datepicker'],
		views_calendar: ['calendar', 'datepicker'],
		views_kanban: ['datepicker'],
		views_template: ['datepicker'],
		views_report: ['chart'],
		views_parts_excel: ['webuploader'],
	 
		wf: ['wfDesgin'],
		wfDesgin: ['css!Contents/workflow/css/wf.css', 'jsPlumb', 'modelFilterBuilder'],
		jqueryTimepicker: ['css!Scripts/jquery-ui/timepicker.css'],
		datepicker: ["jqueryTimepicker"],
		pageTemplate: ["ueditor"],
		htmlEditor: ["ueditor"],
		ueditor: ['Scripts/ueditor1_4_3/ueditor.config'],
		tagsInput: ['css!Scripts/tagsInput/jquery.tagsinput.css'],
		tagsEditor: ["tagsInput"],
		attributeEditor: ['css!Scripts/editors/attributeEditor/attributeEditor.css', "tagsInput"],
		fileUploader: ['css!Scripts/editors/file/fileUploader.css', "webuploader"],
		fileSelector: ['css!Scripts/editors/file/fileSelector.css', "webuploader"],
		pictureSelector: ['css!Scripts/editors/file/pictureSelector.css', "webuploader"],
		webuploader: ['css!Scripts/webuploader/webuploader.css'],
		codeMirror: ['css!Scripts/codemirror-5.42.2/lib/codemirror.css'],
		codeEdit: ["codeMirror"],
		colpick: ['css!Scripts/colpick/css/colpick.css'],
		colorPicker: ["colpick"],
		linkBuilder: ["modelFilterCreator"],

		jqueryui: ["css!Scripts/jquery-ui/themes/base/minified/jquery-ui.min.css"],


		home: [
           "scripts/application/ne.web.js",
            'scripts/application/ligerui.expand',
            "jqueryui",
            "layer",
            "Scripts/jquery.jqprint-0.3.js",
            "css!Contents/application/cm.css",
            "css!Contents/application/printtemplate.css",
            "css!Contents/portal/css/style.css"
		],

		home1: [
            "home",
            "css!Contents/index1/style.css",
		],


		home2: [
            "home",
            "css!Contents/index2/style.css",
		],

		emptypage: [
			"home"
		]
	}
});


require.config({
    paths: {
        "jquery2": ["http://libs.baidu.com/jquery/2.0.3/jquery"]
    }
});

require([
    "vue",
    "webuploader",
    "toastr",
    'moment',
    "zeroClipboard",
    "qtip",
    "json"
], function ( vue, webuploader, toast, mom, zeroClipboard)
{
	window.Vue = vue;

	window.toastr = toast;

	window.WebUploader = webuploader;

	window.moment = mom;

	window.ZeroClipboard = zeroClipboard;

	eventInit();

	//全局事件初始化设定
	function eventInit()
	{
		$(document).bind("click.freedesign", function (e)
		{
			var obj = (e.target || e.srcElement);

			if (!$(obj).attr("data-url"))
			{
				obj = $(obj).parent().get(0);
			}
			if (!$(obj).attr("data-url"))
			{
				obj = $(obj).parent().get(0);
			}

			if ($(obj).attr("data-openpage-id") && $(obj).hasClass("link"))
			{
				var openpageId = $(obj).attr("data-openpage-id");
				var gridrowId = $(obj).attr("data-gridrow-id");
				var gridId = $(obj).attr("data-grid-id");

				if (pbc.openpage_options && pbc.openpage_options[openpageId])
				{
					var op = pbc.openpage_options[openpageId];
					if (gridrowId && gridId)
					{
						var row = liger.get(gridId).getRow(gridrowId);
						if (op.urlBind && op.urlBind.filterData)
						{
							pbc.prevFilter(op.urlBind.filterData, row);
						}
						if (op.url && op.url.indexOf('#data.id#'))
						{
							op.url = op.url.replace('#data.id', row.ID);
						}
					}
					pbc.openPage(op);
				}
			}
			else if ($(obj).attr("data-url") && $(obj).hasClass("link"))
			{
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
		});
	}


});