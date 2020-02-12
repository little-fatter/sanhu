define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                sortName: "CustomerName",
                checkbox: false,
                columns: [{
                    name: "CustomerName",
                    width: 300,
                    display: "客户名",
                    type: "string"
                },
                {
                    name: "TotalArrears",
                    width: 200,
                    display: "总欠款",
                    algin: "right",
                    type: "number"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "CustomerID",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            search: {
                fields: [{
                    label: "客户名",
                    type: "text",
                    editor: {},
                    name: "CustomerName",
                    name_text: "客户名",
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
            filterFields: [{
                display: "客户ID",
                name: "CustomerID",
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
                display: "客户名",
                name: "CustomerName",
                editor: {
                    type: "string"
                },
                type: "string"
            }]
        },
        dataset: 'web/dataset?model=v_arrears&viewname=list'
    };
    exports.options.model = {
        name: 'v_arrears',
        title: '客户总欠款'
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