'use strict';
(function ($) {
    $.extend(pbc.web.view.prototype, {
        exportExcel: function () {
            /**
			 * @return {undefined}
			 */

            function dataHandler() {
                pbc.openFile({
                    url: pbc.toUrl("/web/exportexcel?rnd=") + (new Date).getTime(),
                    parms: {
                        templateId: cParts[0].ID,
                        filterCode: (new pbc.base64).encode(JSON.stringify(_.getCurrentCondition()))
                    }
                });
            }
            var _ = this;
            var options = this.options; /** @type {!Array} */
            var cParts = [];
            pbc.ajax({
                url: pbc.toUrl("/web/listdata/"),
                data: {
                    model: "core_exportTemplate",
                    filter: pbc.createFilter({
                        IsDefault: 1,
                        ModelName: options.model.name
                    })
                },
                success: function (e) {
                    if (e.statusCode == "2") {
                        pbc.tipsInTop(2, e.message);
                        return;
                    } else {
                        if (e.statusCode == "3") {
                            pbc.showError(e.message);
                            return;
                        }
                    } /** @type {!Object} */
                    cParts = e;
                    if (!cParts || !cParts.length) {
                        pbc.tipsInTop(2, "导出模板未定义！");
                    } else {
                        dataHandler();
                    }
                }
            });
        },
        importExcel: function () {
            /**
			 * @return {undefined}
			 */

            function initialize() {
                var me = $("<form style='margin:9px;'></form>");
                var flTinyMCE;
                var rejectingServer = $.ligerDialog.open({
                    target: me,
                    isHidden: true,
                    title: "选择导入文件",
                    top: 100,
                    width: 400,
                    height: "auto",
                    buttons: [{
                        text: "确定",
                        cls: "l-dialog-btn-highlight",
                        onclick: function () {
                            var $ = flTinyMCE.getEditor("file");
                            $.upload(function (canCreateDiscussions, msg) {
                                if (msg.statusCode == "2") {
                                    pbc.tips({
                                        type: 2,
                                        content: msg.message
                                    });
                                    return;
                                } else {
                                    if (msg.statusCode == "3") {
                                        pbc.showError(msg.message);
                                        return;
                                    }
                                }
                                var callback = msg.data.success;
                                var validationErrors = msg.data.errors;
                                if (callback) { /** @type {string} */
                                    var message = "成功得导入了" + callback + "条数据";
                                    if (validationErrors.length) { /** @type {string} */
                                        message = message + (",有" + validationErrors.length + "条数据导入失败");
                                    }
                                    pbc.showSuccess(message);
                                } else { /** @type {string} */
                                    message = "没有导入任何数据";
                                    if (validationErrors.length) { /** @type {string} */
                                        message = message + (",有" + validationErrors.length + "条数据导入失败");
                                    }
                                    pbc.tips({
                                        type: 2,
                                        content: message
                                    });
                                }
                                tmpCfg.reload();
                                rejectingServer.close();
                            });
                        }
                    }, {
                        text: "取消",
                        onclick: function () {
                            rejectingServer.close();
                        }
                    }]
                });
                pbc.web.loader(["fileUploader"], function () {
                    flTinyMCE = me.ligerForm({
                        labelWidth: "auto",
                        fields: [{
                            name: "file",
                            label: "选择excel文件",
                            hideLabel: true,
                            type: "fileUploader",
                            labelWidth: "auto",
                            editor: {
                                url: pbc.getAppUrl(pbc.toUrl("/web/ImportExcel/?templateId=") + cParts[0].ID),
                                imgWidth: 80,
                                imgHeight: 80,
                                model: "input",
                                extensions: "xls"
                            },
                            width: 190,
                            afterContent: '<li style="clear:both"><a class="downloadlink link" style="margin: 5px; display: block;" href="javascript:void()">下载模板文件</a></li>'
                        }]
                    });
                    $(".downloadlink", me).click(function () {
                        pbc.openFile({
                            url: pbc.toUrl("/web/ImportTemplate?rnd=") + (new Date).getTime(),
                            parms: {
                                templateId: cParts[0].ID
                            }
                        });
                    });
                });
            }
            var tmpCfg = this;
            var options = this.options; /** @type {!Array} */
            var cParts = [];
            pbc.ajax({
                url: pbc.toUrl("/web/listdata/"),
                data: {
                    model: "core_importTemplate",
                    filter: pbc.createFilter({
                        IsDefault: 1,
                        ModelName: options.model.name
                    })
                },
                success: function (e) {
                    if (e.statusCode == "2") {
                        pbc.tipsInTop(2, e.message);
                        return;
                    } else {
                        if (e.statusCode == "3") {
                            pbc.showError(e.message);
                            return;
                        }
                    } /** @type {!Object} */
                    cParts = e;
                    if (!cParts || !cParts.length) {
                        pbc.tipsInTop(2, "导入模板未定义！");
                    } else {
                        pbc.web.loader(["qtip", "json", "validate", "form", "uploadify"], function () {
                            initialize();
                        });
                    }
                }
            });
        }
    });
})(jQuery);