define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [
                      {
                          label: '应用标题',
                          name: 'AppName',
                          group: '基本设置',
                          type: 'text'
                      },
                      {
                          label: '数据删除模式',
                          name: 'DataDeleteMode',
                          group: '基本设置',
                          type: 'select',
                          editor: {
                              data: [
                                  { id: '', text: '默认（物理删除）' },
                                  { id: 'flag', text: '状态标识' }
                              ]
                          }
                      },
                      {
                          label: '寄货公司',
                          name: 'PostCompany',
                          group: '快递设置',
                          type: 'text'
                      },
                      {
                          label: '寄货人',
                          name: 'PostCharge',
                          group: '快递设置',
                          type: 'text'
                      },
                      {
                          label: '寄货电话',
                          name: 'PostPhone',
                          group: '快递设置',
                          type: 'text'
                      },
                      {
                          label: '寄货地址',
                          name: 'PostAddress',
                          group: '快递设置',
                          type: 'text'
                      },
                      {
                          label: '销售公司名',
                          name: 'SalesCompany',
                          group: '打印设置',
                          type: 'text'
                      }
                ]
            },
            common: {
                viewType: "form",
                saveCallbackType: "toView"
            },
            actions : {
                get: '/web/getSetting/',
                save: '/web/saveSetting/',
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_setting&viewname=form'
    };
    exports.options.model = {
        name: 'core_setting',
        title: '配置信息'
    };

    return exports;
});