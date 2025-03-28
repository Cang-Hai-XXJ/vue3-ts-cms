import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/localCache'
import { firstMenu } from '@/utils/map-menus'
import { Header } from 'element-plus/es/components/table-v2/src/components'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/main/report/index/index.vue')
      },
      {
        path: 'generate',
        name: 'generate',
        component: () => import('@/views/main/report/generate/generate.vue')
      },
      {
        path: 'queryIndex',
        name: 'queryIndex',
        component: () => import('@/views/main/query/index/index.vue'),
        meta: {
          noHeader: true
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})

// router.beforeEach((to: any) => {
//   if (to.path !== '/login') {
//     const token = localCache.getCache('token')
//     if (!token) {
//       return '/login'
//     }
//   }
//   if (to.path === '/main') {
//     return firstMenu.url
//   }
// })
export default router
