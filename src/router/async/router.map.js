const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  root: {
    path: '/',
    name: 'login',
    redirect: '/login',
    component: view.tabs
  },
  workplace: {
    name: 'workplace',
    component: () => import('@/pages/dashboard/workplace')
  },
  analysis: {
    name: 'analysis',
    component: () => import('@/pages/dashboard/analysis')
  },
  form: {
    name: 'form',
    icon: 'form',
    component: view.page
  },
  basicForm: {
    path: 'basic',
    name: 'baisc',
    component: () => import('@/pages/form/basic')
  },
  stepForm: {
    path: 'step',
    name: 'step',
    component: () => import('@/pages/form/step')
  },
  advanceForm: {
    path: 'advance',
    name: 'advance',
    component: () => import('@/pages/form/advance')
  },
  list: {
    name: 'table',
    icon: 'table',
    component: view.page
  },
  queryList: {
    path: 'query',
    name: 'query',
    component: () => import('@/pages/list/QueryList')
  },
  primaryList: {
    path: 'primary',
    name: 'primary',
    component: () => import('@/pages/list/StandardList')
  },
  cardList: {
    path: 'card',
    name: 'card',
    component: () => import('@/pages/list/CardList')
  },
  searchList: {
    path: 'search',
    name: 'search',
    component: () => import('@/pages/list/search/SearchLayout')
  },
  article: {
    name: 'articleList',
    component: () => import('@/pages/list/search/ArticleList')
  },
  application: {
    name: 'applicationList',
    component: () => import('@/pages/list/search/ApplicationList')
  },
  project: {
    name: 'projectList',
    component: () => import('@/pages/list/search/ProjectList')
  },
  details: {
    name: 'profile',
    icon: 'profile',
    component: view.blank
  },
  basicDetails: {
    path: 'basic',
    name: 'basic',
    component: () => import('@/pages/detail/BasicDetail')
  },
  advanceDetails: {
    path: 'advance',
    name: 'advance',
    component: () => import('@/pages/detail/AdvancedDetail')
  },
  result: {
    name: 'check-circle-o',
    icon: 'check-circle-o',
    component: view.page
  },
  success: {
    name: 'success',
    component: () => import('@/pages/result/Success')
  },
  error: {
    name: 'error',
    component: () => import('@/pages/result/Error')
  },
  exception: {
    name: 'warning',
    icon: 'warning',
    component: view.blank
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  components: {
    name: 'appstore-o',
    icon: 'appstore-o',
    component: view.page
  },
  taskCard: {
    name: 'taskcard',
    component: () => import('@/pages/components/TaskCard')
  },
  palette: {
    name: 'palette',
    component: () => import('@/pages/components/Palette')
  },
  // user: {
  //   name: 'user',
  //   component: () => import('@/pages/users/User')
  // },
  // request: {
  //   name: 'request',
  //   component: () => import('@/pages/requests/Request')
  // },
  brand: {
    name: 'brand-list',
    component: () => import('@/pages/brands/BrandList')
  },
  transaction: {
    name: 'transaction',
    component: () => import('@/pages/transactions/Transaction')
  },
  // brandDetail: {
  //   path: '/brands/brand-detail/:brandId',
  //   name: 'brand-detail',
  //   component: () => import('@/pages/brands/BrandDetail')
  // }
}
export default routerMap

