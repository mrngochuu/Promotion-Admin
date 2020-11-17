import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'
// import { component } from 'vue/types/umd'

const options = {
  routes: [
    {
      path: '/login',
      name: 'admin',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: 'admin',
      component: TabsView,
      redirect: '/login',
      children: [
        // {
        //   path: 'dashboard',
        //   name: 'Dashboard',
        //   meta: {
        //     icon: 'dashboard'
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: 'workplace',
        //       name: 'workplace',
        //       meta: {
        //         page: {
        //           closable: false
        //         }
        //       },
        //       component: () => import('@/pages/dashboard/workplace'),
        //     },
        //     {
        //       path: 'analysis',
        //       name: 'analysis',
        //       component: () => import('@/pages/dashboard/analysis'),
        //     }
        //   ]
        // },
        {
          path: 'user',
          name: 'Manage user',
          meta: {
            icon: 'user',
          },
          component: () => import('@/pages/users/User'),
        },
        {
          path: 'request',
          name: 'Manage request',
          meta: {
            icon: 'form'
          },
          component: () => import('@/pages/requests/Request'),
        },
        {
          path: 'transaction',
          name: 'Manage transaction',
          meta: {
            icon: 'transaction'
          },
          component: () => import('@/pages/transactions/Transaction')
        }
      ]
    },
  ]
}

export default options
