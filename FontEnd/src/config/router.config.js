import { RouteView, BlankLayout } from '@/components/layouts'

/**
 *  配置路由信息
 *  其中meta包含：
 *  title：路由的描述信息,建议设置
 *  keepAlive:设置访问路由是否保持组件，功能参见Vue的keepAlive描述
 *  hiddenHeaderContent:设置是否需要隐藏页面头信息
*/

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BlankLayout,
    meta: { title: '首页' },
    redirect: '/data-manage/form/judgment-detail', // 临时定向开发页面
    children: [
      {
        path: 'mission',
        name: 'Mission',
        component: RouteView,
        redirect: '/mission/dealt',
        meta: { title: '我的任务' },
        children: [
          {
            path: 'dealt',
            name: 'Dealt',
            component: () => import('@/views/mymission/Index'),
            meta: { title: '待办任务' }
          },
          {
            path: 'done-task',
            name: 'DoneTask',
            component: () => import('@/views/mymission/doneTask'),
            meta: { title: '已办任务' }
          },
          {
            path: 'my-mission',
            name: 'MyMission',
            component: () => import('@/views/mymission/myMission'),
            meta: { title: '我发起的任务' }
          },
          {
            path: 'event-inspection',
            name: 'EventInspeion',
            component: () => import('@/views/mymission/eventInspection'),
            meta: { title: '事件巡查' }
          },
          {
            path: 'scene-investigation',
            name: 'SceneInvestigation',
            component: () => import('@/views/mymission/sceneInvestigation'),
            meta: { title: '现场勘查' }
          },
          {
            path: 'message-center',
            name: 'Messagecenter',
            component: () => import('@/views/mymission/messageCenter'),
            meta: { title: '消息中心' }
          }
        ]
      },

      // 文书管理
      {
        path: 'data-manage',
        name: 'dataManage',
        redirect: '/data-manage/case/case-list',
        component: RouteView,
        meta: { title: '文书管理', keepAlive: true },
        children: [
          // forms
          {
            path: 'form',
            redirect: '/data-manage/form/base-form',
            component: RouteView,
            meta: { title: '表单页' },
            children: [
              {
                path: 'base-form',
                name: 'Index',
                component: () => import('@/views/form/index'),
                meta: { title: '我的表单', keepAlive: true }
              },
              {
                path: 'form-details',
                name: 'FormDetails',
                component: () => import('@/views/form/formDetails'),
                meta: { title: '表单详情', keepAlive: false }
              },
              {
                path: 'form-edit',
                name: 'FormEdit',
                component: () => import('@/views/form/formEdit'),
                meta: { title: '编辑表单', keepAlive: false }
              },
              {
                path: 'form-add-list',
                name: 'FormAddList',
                component: () => import('@/views/form/formAddList'),
                meta: { title: '表单', keepAlive: true }
              },
              {
                path: 'form-add',
                name: 'FormAdd',
                component: () => import('@/views/form/formAdd'),
                meta: { title: '新建表单', keepAlive: false }
              },
              {
                path: 'form-print',
                name: 'FormPrint',
                component: () => import('@/views/form/formPrint'),
                meta: { title: '表单打印', keepAlive: false }
              },
              {
                path: 'form-approval',
                name: 'FormApproval',
                component: () => import('@/views/form/formAddroval'),
                meta: { title: '表单审批', keepAlive: false }
              },
              {
                path: 'close-person-report',
                name: 'ClosePersonReport',
                component: () => import('@/views/form/closePersonReport'),
                meta: { title: '结案报告(个人)', keepAlive: false }
              },
              {
                path: 'close-org-report',
                name: 'CloseOrgReport',
                component: () => import('@/views/form/closeOrgReport'),
                meta: { title: '结案报告（单位）', keepAlive: false }
              },
              {
                path: 'file-cover',
                name: 'FileCover',
                component: () => import('@/views/form/fileCover'),
                meta: { title: '卷宗封面', keepAlive: false }
              },
              {
                path: 'judgment-detail',
                name: 'judgmentDetail',
                component: () => import('@/views/form/judgmentDetail')
              }
            ]
          },
          // case 案件列表 案件查询
          {
            path: 'case',
            redirect: '/data-manage/case/case-list',
            component: RouteView,
            meta: { title: '案件档案' },
            children: [
              {
                path: 'case-list',
                name: 'caseList',
                component: () => import('@/views/case/index'),
                meta: { title: '案件档案管理', keepAlive: false }
              },
              {
                path: 'case-details',
                name: 'caseDetails',
                component: () => import('@/views/case/caseDetails'),
                meta: { title: '案件详情', keepAlive: false }
              },
              {
                path: 'new-case',
                name: 'newCase',
                component: () => import('@/views/case/newCase'),
                meta: { title: '新增案件', keepAlive: false }
              }
            ]
          },
          // 通告
          {
            path: 'notice',
            component: RouteView,
            redirect: '/data-manage/notice/test',
            children: [
              {
                path: 'notice-detail',
                name: 'noticeDetail',
                component: () => import('@/views/notice/noticeDetail')
              },
              {
                path: 'test',
                name: 'test',
                component: () => import('@/views/notice/test')
              }
            ]
          }
        ]
      },
      // 环境资源
      {
        path: 'environment',
        name: 'Environment',
        component: RouteView,
        redirect: '/environment/take-water-manage',
        meta: { titile: '环境资源' },
        children: [
          {
            path: 'take-water-manage',
            name: 'Takewatermanage',
            meta: { title: '取水许可证管理' },
            component: () => import(/* webpackChunkName: "fail" */ '@/views/takewatermanage/TakeWaterManage')
          },
          {
            path: 'take-water-allow-list',
            name: 'Takewaterallowlist',
            meta: { title: '取水许可证详情' },
            component: () => import(/* webpackChunkName: "fail" */ '@/views/takewatermanage/TakeWaterAllowList')
          },
          {
            path: 'boat-manage',
            name: 'Boatmanage',
            meta: { title: '船只管理' },
            component: () => import(/* webpackChunkName: "fail" */ '@/views/boatmanage/BoatManage')
          }
        ]
      },
      // 一张图
      {
        path: 'map',
        name: 'Map',
        component: RouteView,
        redirect: '/map/index',
        meta: { titile: '一张图' },
        children: [
          {
            path: 'index',
            name: 'Index',
            meta: { title: '一张图' },
            component: () => import(/* webpackChunkName: "fail" */ '@/views/mapV/mapV')
          }
        ]
      },
      // result
      {
        path: 'result',
        name: 'result',
        component: RouteView,
        redirect: '/result/success',
        meta: { title: '结果页' },
        children: [
          {
            path: 'success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true }
          },
          {
            path: 'fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true }
          }
        ]
      },

      // Exception
      {
        path: 'exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '异常页' },
        children: [
          {
            path: '403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403' }
          },
          {
            path: '404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404' }
          },
          {
            path: '500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500' }
          }
        ]
      },

      // workbench
      {
        path: 'workbench',
        name: 'Workbench',
        redirect: '/workbench/backlog',
        component: RouteView,
        meta: { title: '我的工作台' },
        children: [
          {
            path: 'backlog',
            name: 'Backlog',
            meta: { title: '待办事项' },
            component: () => import(/* webpackChunkName: "fail" */ '@/views/workbench/Backlog')
          }
        ]
      },

      // {
      //   path: 'dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/workplace',
      //   component: RouteView,
      //   meta: { title: '仪表盘', keepAlive: true },
      //   children: [
      //     {
      //       path: 'monitor',
      //       name: 'Monitor',
      //       component: () => import('@/views/dashboard/Monitor'),
      //       meta: { title: '监控页', keepAlive: true }
      //     },
      //     {
      //       path: 'workplace',
      //       name: 'Workplace',
      //       component: () => import('@/views/dashboard/Workplace'),
      //       meta: { title: '工作台', keepAlive: true }
      //     }
      //   ]
      // },
      // 待办事项

      // list
      {
        path: 'list',
        name: 'list',
        component: RouteView,
        redirect: '/list/query-list',
        meta: { title: '列表页' },
        children: [
          {
            path: 'query-list',
            name: 'QueryListWrapper',
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true }
          },
          {
            path: 'tree-list',
            name: 'TreeList',
            component: () => import('@/views/list/TreeList'),
            meta: { title: '树目录表格', keepAlive: true }
          },
          {
            path: 'edit-table',
            name: 'EditList',
            component: () => import('@/views/list/TableInnerEditList'),
            meta: { title: '内联编辑表格', keepAlive: true }
          },
          {
            path: 'basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true }
          },
          {
            path: 'card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true }
          },
          {
            path: 'search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true },
            children: [
              {
                path: 'article',
                name: 'SearchArticles',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（文章）' }
              },
              {
                path: 'project',
                name: 'SearchProjects',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（项目）' }
              },
              {
                path: 'application',
                name: 'SearchApplications',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（应用）' }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404'
  }

]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
    meta: { title: '登录页面' }
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "user" */ '@/views/Home'),
  //   meta: { title: '首页' }
  // },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
    meta: { title: '404页面' }
  }
]
