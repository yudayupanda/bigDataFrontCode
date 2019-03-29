import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/404', component: () => import('@/views/404'), hidden: true },
  /**
  {
    path: '/',
    component: Layout,
    redirect: '/example/table',
   //  redirect:'/importData/index',
    name: 'Tb',
    hidden: true,
    children: [{
     // path: 'table',
       path: 'index',
        name: 'Form',
    //  component: () => import('@/views/table/index')
      component: () => import('@/views/importData/index'),
    }]
  },
  {
    path: '/importData',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/importData/index'),
        meta: { title: '日志导入', icon: 'form' }
      }
    ]
  },
  {
    path: '/kpi',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Kpi',
        component: () => import('@/views/kpi/index'),
        meta: { title: 'KPI分析', icon: 'chart' }
      }
    ]
  },
  {
    path: '/preprocess',
    component: Layout,
    redirect: '/preprocess/logClean',
    name: 'preprocess',
    meta: { title: '数据预处理', icon: 'preprocess' },
    children: [
      {
        path: 'logClean',
        name: 'logClean',
        component: () => import('@/views/preprocess/logClean/index'),
        meta: { title: '日志清理', icon: 'clean' }
      },
      {
        path: 'userIdentification',
        name: 'userIdentification',
        component: () => import('@/views/preprocess/userIdentification/index'),
        meta: { title: '用户识别', icon: 'user' }
      },
      {
        path: 'sessionRecognition',
        name: 'sessionRecognition',
        component: () => import('@/views/preprocess/sessionRecognition/index'),
        meta: { title: '会话识别', icon: 'session' }
      },
      {
        path: 'affairRecognition',
        name: 'affairRecognition',
        component: () => import('@/views/preprocess/affairRecognition/index'),
        meta: { title: '事务识别', icon: 'affair' }
      }
    ]
  },
  {
    path: '/pattern',
    component: Layout,
    redirect: '/cluster',
    name: 'pattern',
    meta: { title: '模式发现', icon: 'discover' },
    children: [
      {
        path: '/cluster',
        component: Layout,
        name: 'cluster',

        children:[
          {
            path: 'pageCluster',
            name: 'pageCluster',
            component: () => import('@/views/patternDiscovery/cluster/index'),
            meta: { title: '聚类', icon: 'page' }
          },
        ],
      
      },
      {
        path: '/associationRule',
        component: Layout,
        name: 'associationRule',
        meta: { title: '关联规则', icon: 'cluster' },
        children:[
          {
            path: 'frequentItemset',
            name: 'frequentItemset',
            component: () => import('@/views/patternDiscovery/associationRule/frequentItemset/index'),
            meta: { title: '频繁项集', icon: 'rules' }
          },
          // {
          //   path: 'frequentItemset',
          //   name: 'frequentItemset',
          //   component: () => import('@/views/patternDiscovery/associationRule/associationRules/index'),
          //   meta: { title: '关联规则', icon: 'clean' }
          // }
        ],
      },
      
    ]
  },
  {
    hidden: true,
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'importData',
    meta: { title: '彩蛋', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'table',
        component: () => import('@/views/table/index'),
        meta: { title: '彩蛋1', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
  **/
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

