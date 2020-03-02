/**
 * 配置演示菜单
 */
const menus = [
  {
    menuId: '1',
    menuUrl: '/dashboard',
    menuIcon: 'wap-home',
    menuName: '工作台',
    menuLevel: 0,
    parentId: '0',
    children: [
      {
        menuId: '1-1',
        menuUrl: '',
        menuIcon: './img/temp/1.png',
        menuName: '巡查记录',
        menuLevel: 1,
        parentId: '1',
        children: [
          {
            menuId: '1-1-1',
            menuUrl: 'eventCheckCreate',
            menuIcon: './img/forms/form1.png',
            menuName: '事件巡查',
            menuLevel: 2,
            parentId: '1-1'
          }
          // {
          //   menuId: '1-1-2',
          //   menuUrl: '/todo',
          //   menuIcon: './img/forms/form2.png',
          //   menuName: '巡查记录表',
          //   menuLevel: 2,
          //   parentId: '1-1'
          // }
        ]
      },
      {
        menuId: '1-2',
        menuUrl: '',
        menuIcon: './img/temp/2.png',
        menuName: '现场执法',
        menuLevel: 1,
        parentId: '1',
        children: [
          {
            menuId: '1-2-1',
            menuUrl: '/lawCheckCreate',
            menuIcon: './img/forms/form3.png',
            menuName: '现场勘查',
            menuLevel: 2,
            parentId: '1-2'
          },
          {
            menuId: '1-2-2',
            menuUrl: '/penalizeBookCreate',
            menuIcon: './img/forms/form4.png',
            menuName: '当场处罚决定书',
            menuLevel: 2,
            parentId: '1-2'
          }
        ]
      },
      {
        menuId: '1-3',
        menuUrl: '',
        menuIcon: './img/temp/2.png',
        menuName: '调查取证',
        menuLevel: 1,
        parentId: '1',
        children: [
          {
            menuId: '1-3-1',
            menuUrl: '/inquestPutdownCreate',
            menuIcon: './img/forms/form5.png',
            menuName: '勘验(检查)笔录',
            menuLevel: 2,
            parentId: '1-3'
          },
          {
            menuId: '1-3-2',
            menuUrl: '/askPutdownCreate',
            menuIcon: './img/forms/form6.png',
            menuName: '询问笔录',
            menuLevel: 2,
            parentId: '1-3'
          },
          {
            menuId: '1-3-3',
            menuUrl: '/inventoryCreate',
            menuIcon: './img/forms/form7.png',
            menuName: '物品清单',
            menuLevel: 2,
            parentId: '1-3'
          }
        ]
      },
      {
        menuId: '1-4',
        menuUrl: '',
        menuIcon: './img/temp/2.png',
        menuName: '受理案件',
        menuLevel: 1,
        parentId: '1',
        children: [
          {
            menuId: '1-4-1',
            menuUrl: '/caseCreate',
            menuIcon: './img/forms/form8.png',
            menuName: '案件创建表',
            menuLevel: 2,
            parentId: '1-4'
          },
          {
            menuId: '1-2-2',
            menuUrl: '',
            menuIcon: './img/forms/form9.png',
            menuName: '案件受理记录',
            menuLevel: 2,
            parentId: '1-4'
          }
        ]
      },
      {
        menuId: '1-6',
        menuUrl: '',
        menuIcon: './img/temp/2.png',
        menuName: '结案归档',
        menuLevel: 1,
        parentId: '1',
        children: [
          {
            menuId: '1-6-1',
            menuUrl: '/caseFinalReportCreate',
            menuIcon: './img/forms/form10.png',
            menuName: '结案报告',
            menuLevel: 2,
            parentId: '1-6'
          }
        ]
      }
    ]
  }
]

export default menus
