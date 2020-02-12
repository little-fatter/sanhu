define(["text!./welcome.html"], function (html)
{ 
    return {
        cls: 'gray-bg',
        html: html,
        vue: {
            data: {
                sumincome: "40,886,200",
                btns: [
                {
                    clsCol: 'col-xs-4',
                    clsImg: 'img-purchase',
                    text: '采购'
                },
                {
                    clsCol: 'col-xs-2',
                    clsImg: 'img-sale',
                    text: '销售'
                },
                {
                    clsCol: 'col-xs-4',
                    clsImg: 'img-stored',
                    text: '库存'
                },
                {
                    clsCol: 'col-xs-2',
                    clsImg: 'img-finance',
                    text: '财务'
                },
                {
                    clsCol: 'col-xs-2',
                    clsImg: 'img-customer',
                    text: '客户管理'
                },
                {
                    clsCol: 'col-xs-2',
                    clsImg: 'img-clientAcountRecord',
                    text: '客户对账'
                },
                {
                    clsCol: 'col-xs-4',
                    clsImg: 'img-customerSaleReport',
                    text: '客户销售排名'
                },
                {
                    clsCol: 'col-xs-2',
                    clsImg: 'img-totalReport',
                    text: '经营汇总'
                },
                {
                    clsCol: 'col-xs-2',
                    clsImg: 'img-goods',
                    text: '商品管理'
                }

                ]
            }
        }
    };

});