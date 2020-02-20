define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "objId",
                    display: "主键ID",
                    type: "string"
                },
                {
                    name: "gldwOid",
                    display: "管理单位",
                    type: "string"
                },
                {
                    name: "evtCode",
                    display: "事件编码",
                    type: "string"
                },
                {
                    name: "evtTypeId",
                    display: "事件类型ID",
                    type: "string"
                },
                {
                    name: "evtFileId",
                    display: "事件照片",
                    type: "string"
                },
                {
                    name: "posFileId",
                    display: "位置照片",
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
                },
                {
                    name: "address",
                    display: "地址信息",
                    type: "string"
                },
                {
                    name: "remark",
                    display: "事件描述",
                    type: "string"
                },
                {
                    name: "evtState",
                    display: "事件状态",
                    type: "string"
                },
                {
                    name: "finishUserName",
                    display: "处理人姓名",
                    type: "string"
                }],
                title: "",
                url: "",
                usePager: 1,
                checkbox: 0,
                height: "100%",
                sortName: "",
                sortOrder: "",
                downViewEnabled: 0,
                downViewHeight: "",
                downViewReadonly: 0,
                hideOpColumn: 1,
                hideOpEditColumn: 0,
                hideOpDeleteColumn: 0,
                downViewName: "",
                downPageUrl: ""
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
                hideToolbar: 1,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "主键ID",
                name: "objId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "管理单位",
                name: "gldwOid",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件编码",
                name: "evtCode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件类型ID",
                name: "evtTypeId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件照片",
                name: "evtFileId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "位置照片",
                name: "posFileId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "x",
                name: "x1",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "y",
                name: "y1",
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
            },
            {
                display: "地址信息",
                name: "address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件描述",
                name: "remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件状态",
                name: "evtState",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处理人",
                name: "finishUserId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处理人姓名",
                name: "finishUserName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处理图片",
                name: "finishFileId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "上报照片url",
                name: "reportPhotoUrl",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "上报照片",
                name: "reportPhotoDto",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "整改照片url",
                name: "finishPhotoUrl",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "整改照片",
                name: "finishPhotoDto",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=event_info_tiny_view&viewname=list'
    };
    exports.options.model = {
        name: 'event_info_tiny_view',
        title: '事件信息简'
    };

    exports.service = function service(page) {

};

    return exports;
});