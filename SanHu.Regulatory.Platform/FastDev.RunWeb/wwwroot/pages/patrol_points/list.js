define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "UserId",
                    display: "执行人员ID",
                    type: "string"
                },
                {
                    name: "lng",
                    display: "百度坐标经度",
                    type: "string"
                },
                {
                    name: "lat",
                    display: "百度坐标纬度",
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
                display: "执行人员ID",
                name: "UserId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "百度坐标经度",
                name: "lng",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "百度坐标纬度",
                name: "lat",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=patrol_points&viewname=list'
    };
    exports.options.model = {
        name: 'patrol_points',
        title: '巡查轨迹点'
    };

    exports.service = function service(page) {

};

    return exports;
});