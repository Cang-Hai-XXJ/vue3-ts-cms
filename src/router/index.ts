import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/localCache'
import { firstMenu } from '@/utils/map-menus'

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
      },
      {
        path: 'market',
        name: 'market',
        component: () => import('@/views/main/report/market/market.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'marketDetail/:id',
        name: 'marketDetail',
        component: () => import('@/views/main/report/market/marketDetail.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'user/:id',
        name: 'user',
        component: () => import('@/views/main/user/index.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'data/batchKeywords',
        name: 'batchKeywords',
        component: () => import('@/views/main/dataService/batchKeywords.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'data/relatedKeywords',
        name: 'relatedKeywords',
        component: () => import('@/views/main/dataService/relatedKeywords.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'data/rankingKeywords',
        name: 'rankingKeywords',
        component: () => import('@/views/main/dataService/rankingKeywords.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'data/populationAnalysis',
        name: 'populationAnalysis',
        component: () =>
          import('@/views/main/dataService/populationAnalysis.vue'),
        meta: {
          header: 'search'
        }
      },
      {
        path: 'data/rankingSearch',
        name: 'rankingSearch',
        component: () => import('@/views/main/dataService/rankingSearch.vue'),
        meta: {
          header: 'search'
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

router.beforeEach((to: any) => {
  // if (to.path !== '/login') {
  //   const token = localCache.getCache('token')
  //   if (!token) {
  //     return '/login'
  //   }
  // }
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
