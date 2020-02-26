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
                    name: "Status",
                    display: " 状态 ",
                    type: "wfstatus",
                    name_text: " - 状态 - ",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "工作流状态",
                    editorType: ""
                },
                {
                    name: "finishUserName",
                    display: "处理人姓名",
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
        dataset: 'web/dataset?model=event_info_wf&viewname=list'
    };
    exports.options.model = {
        name: 'event_info_wf',
        title: '事件信息处理'
    };

    exports.service = function service(page) {

};

    return exports;
});