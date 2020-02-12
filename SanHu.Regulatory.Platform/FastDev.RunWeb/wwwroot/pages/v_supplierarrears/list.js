define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                sortName: "SupplierName",
                checkbox: false,
                columns: [{
                    name: "SupplierName",
                    display: "供应商名",
                    type: "string",
                    name_text: "供应商名",
                    width: "300",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "TotalArrears",
                    display: "总欠款",
                    type: "curreny",
                    name_text: "总欠款",
                    width: "300",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "货币"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            filterFields: [{
                display: "供应商ID",
                name: "SupplierID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "总欠款",
                name: "TotalArrears",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "供应商名",
                name: "SupplierName",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            search: {
                fields: [{
                    label: "供应商名",
                    type: "text",
                    editor: {},
                    name: "SupplierName",
                    name_text: "供应商名",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "200"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            type: "list",
            addins: {}
        },
        dataset: 'web/dataset?model=v_supplierarrears&viewname=list'
    };
    exports.options.model = {
        name: 'v_supplierarrears',
        title: '供应商总欠款'
    };

    exports.service = function server(page) {
        var events = {};

        $.extend(events, {

            toolbarInit: function(e) {
                var page = e.page,
                viewType = e.viewType,
                toolbar = e.toolbar;
                var self = this;

                toolbar.items = [];

                //toolbar.items.push({
                //    text: '导出',
                //    id: 'exportreport'
                //});
                if (toolbar && toolbar.items && toolbar.items.length) {
                    toolbar.items[0].cls = "ne-btn-blue";
                }

                page.addEvent("exportreport",
                function() {
                    //ne.openFile({
                    //    url: pbc.toUrl('web/exportgrid?rnd=') + new Date().getTime(),
                    //    parms: {
                    //        modename: "v_arrears",
                    //        filterCode: new pbc.base64().encode(JSON.stringify(page.getCurrentCondition()))
                    //    }
                    //});
                    require(["grid_exportExcel"], function () {
                        if (self.grid && self.grid.exportExcel) {
                            self.grid.exportExcel();
                        }
                    });
                });

            },
            beforeShowList: function(e) {
                var page = e.page;
                var op = e.options;

                if (page.getQueryStringByName("searchbind")) {
                    op.delayLoad = true;
                    op.delayLoadData = true;
                }
            },
            afterShowSearch: function(e) {
                var page = e.page;
                var form = e.form;

                if (page.getQueryStringByName("searchbind")) {
                    var searchbind = page.getQueryStringByName("searchbind");
                    searchbind = JSON.parse(new pbc.base64().decode(searchbind));

                    if (searchbind) {
                        form.setData(searchbind);

                        setTimeout(function() {
                            var conditions = form.toConditions();
                            page.current.filterSearch = {
                                rules: conditions,
                                op: 'and'
                            };
                            page.list_search();
                        },
                        100);
                    }
                }
            }

        });
        for (var name in events) {
            var fn = events[name];
            if ($.isFunction(fn)) {
                page.bind(name, fn);
            }
        }

    };;

    return exports;
});