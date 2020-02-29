import { BasicLayout, RouteView } from '@/components/layouts'
/**
 *  配置路由信息
 *  其中meta包含：
 *  title：路由的描述信息,建议设置
 *  keepAlive:设置访问路由是否保持组件，功能参见Vue的keepAlive描述
 *  pageTitle:设置页面头部显示名称，如果不传则其值等于title
 */

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Workplace.vue'),
        meta: {
          title: '工作台',
          pageTitle: '智慧三湖',
          keepAlive: false
        }
      },
      {
        path: '/todo',
        name: 'todo',
        query: { dd_orientation: 'landscape' },
        component: () => import('@/views/todo/TodoList.vue'),
        meta: {
          title: '待办事项',
          keepAlive: false
        }
      },
      {
        path: '/layform',
        name: 'layform',
        redirect: '/layforms',
        component: RouteView,
        children: [
          {
            path: '/layforms',
            name: 'layforms',
            component: () => import('@/views/lawform/LawformList.vue'),
            meta: {
              title: '执法表单',
              keepAlive: false
            }
          },
          {
            path: '/eventCheckCreate',
            name: 'eventCheckCreate',
            component: () => import('@/views/lawform/EventCheckCreate.vue'),
            meta: {
              title: '事件巡查',
              keepAlive: false
            }
          },
          {
            path: '/lawCheckCreate',
            name: 'lawCheckCreate',
            component: () => import('@/views/lawform/LawCheckCreate.vue'),
            meta: {
              title: '现场勘查',
              keepAlive: false
            }
          },
          {
            path: '/caseCreate',
            name: 'caseCreate',
            component: () => import('@/views/lawform/cases/CaseCreate.vue'),
            meta: {
              title: '创建案件',
              keepAlive: false
            }
          },
          {
            path: '/penalizeBookCreate',
            name: 'penalizeBookCreate',
            component: () => import('@/views/lawform/cases/PenalizeBookCreate.vue'),
            meta: {
              title: '当场处罚决定书',
              keepAlive: false
            }
          },
          {
            path: '/penalizeBookPreview',
            name: 'penalizeBookPreview',
            component: () => import('@/views/lawform/cases/PenalizeBookPreview.vue'),
            meta: {
              title: '预览处罚决定书',
              keepAlive: false
            }
          },
          {
            path: '/inventoryCreate',
            name: 'inventoryCreate',
            component: () => import('@/views/lawform/cases/InventoryCreate.vue'),
            meta: {
              title: '物品清单',
              keepAlive: false
            }
          },
          {
            path: '/inventoryView',
            name: 'inventoryView',
            component: () => import('@/views/lawform/cases/InventoryView.vue'),
            meta: {
              title: '物品清单明细',
              keepAlive: false
            }
          },
          {
            path: '/caseFinalReportCreate',
            name: 'caseFinalReportCreate',
            component: () => import('@/views/lawform/cases/CaseFinalReportCreate.vue'),
            meta: {
              title: '结案报告',
              keepAlive: true
            }
          },
          {
            path: '/inquestPutdownCreate',
            name: 'inquestPutdownCreate',
            component: () => import('@/views/lawform/cases/InquestPutdownCreate.vue'),
            meta: {
              title: '勘验(检查)笔录',
              keepAlive: false
            }
          },
          {
            path: '/askPutdownCreate',
            name: 'askPutdownCreate',
            component: () => import('@/views/lawform/cases/AskPutdownCreate.vue'),
            meta: {
              title: '询问笔录',
              keepAlive: false
            }
          },
          {
            path: '/askPutdownPreview',
            name: 'askPutdownPreview',
            component: () => import('@/views/lawform/cases/AskPutdownPreview.vue'),
            meta: {
              title: '询问笔录明细',
              keepAlive: false
            }
          }
        ]
      },
      // 详情
      {
        path: '/details',
        name: 'details',
        redirect: '/eventDetail',
        component: RouteView,
        children: [
          {
            path: '/eventDetail',
            name: 'eventDetail',
            component: () => import('@/views/details/EventDetail.vue'),
            meta: {
              title: '事件核查详情',
              keepAlive: false
            }
          },
          {
            path: '/submitForm',
            name: 'submitForm',
            component: () => import('@/views/details/SubmitForm.vue'),
            meta: {
              title: '我提交的表单',
              keepAlive: false
            }
          },
          {
            path: '/sceneInvestigationDetail',
            name: 'sceneInvestigationDetail',
            component: () => import('@/views/details/SceneInvestigationDetail.vue'),
            meta: {
              title: '现场勘察',
              keepAlive: false
            }
          },
          {
            path: '/CaseDetail',
            name: 'CaseDetail',
            component: () => import('@/views/details/CaseDetail.vue'),
            meta: {
              title: '案件详情',
              keepAlive: true
            }
          },
          {
            path: '/RecordOfInquest',
            name: 'RecordOfInquest',
            component: () => import('@/views/details/RecordOfInquest.vue'),
            meta: {
              title: '勘验(检查)笔录',
              keepAlive: false
            }
          },
          {
            path: '/ClosingReport',
            name: 'ClosingReport',
            component: () => import('@/views/details/ClosingReport.vue'),
            meta: {
              title: '结案报告',
              keepAlive: false
            }
          }
        ]
      },
      // 案件查询
      {
        path: '/caseQuery',
        name: 'caseQuery',
        redirect: '/caseQuery',
        component: RouteView,
        children: [
          {
            path: '/caseQuery',
            name: 'caseQuery',
            component: () => import('@/views/casequery/caseQuery.vue'),
            meta: {
              title: '案件查询',
              keepAlive: false
            }
          },
          {
            path: '/caseDetails',
            name: 'caseDetails',
            component: () => import('@/views/casequery/caseDetails.vue'),
            meta: {
              title: '案件详情',
              keepAlive: false
            }
          },
          {
            path: '/caseFlies',
            name: 'caseFlies',
            component: () => import('@/views/casequery/caseFlies.vue'),
            meta: {
              title: '案卷文件',
              keepAlive: false
            }
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
    path: '/404',
    name: '404',
    component: BasicLayout,
    redirect: '/404/index',
    meta: { title: '404页面' },
    children: [
      {
        path: '/404/index',
        name: '404index',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/NotFind'),
        meta: { title: '404页面' }
      }
    ]
  }
]