define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Contactname",
                    display: "联系人名称",
                    type: "string"
                },
                {
                    name: "phone",
                    display: "电话",
                    type: "string"
                },
                {
                    name: "remark",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "联系人名称",
                name: "Contactname",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话",
                name: "phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Email",
                name: "Email",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CustomerID",
                name: "CustomerID",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=crm_customerContract&viewname=list'
    };
    exports.options.model = {
        name: 'crm_customerContract',
        title: '客户联系人'
    };

    exports.service = function service(page) {

        page.bind('beforeShowList',
        function(e) {
            var page = e.page,
            gridOptions = e.options;
            var p = page.options;
            p.common.openParm = function() {

                var mainData = p.bind.mainData;
                var bind = new pbc.base64().encode(JSON.stringify({
                    formData: {
                        Contactname: mainData.CustomerName,
                        phone: mainData.Telephone
                    },
                    formPostData: {
                        CustomerID: mainData.ID,

                        DD: pbc.getFormatDate(new Date(), 'yyyy-MM-dd hh:mm')
                    }
                }));
                var dd = pbc.getFormatDate(new Date(), 'yyyy-MM-dd hh:mm');

                return "bind=" + bind;

            };
        });

    };

    return exports;
});