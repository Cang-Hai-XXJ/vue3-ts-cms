import { Module } from 'vuex'
import router from '@/router'

import { IRootState } from '../types'
import { ILoginState } from './types'
import { IAccount } from '@/service/request/login/type'
import {
  accountLoginApi,
  requestUserInfoById,
  requestMenusByRoleId
} from '@/service/request/login/login'
import { localCache } from '@/utils/localCache'
import { mapMenus2Routes } from '@/utils/map-menus'

const loginModules: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      menus: [
        {
          name: '报告',
          type: 2,
          id: 1,
          icon: 'Clock',
          path: '/main/index',
          sort: 1
        },
        // {
        //   name: '指数查询',
        //   type: 2,
        //   id: 2,
        //   icon: 'TrendCharts',
        //   path: '/main/queryIndex',
        //   sort: 1
        // },
        {
          name: '数据服务',
          type: 1,
          id: 12,
          icon: 'DataAnalysis',
          path: '/main/data',
          sort: 1,
          children: [
            {
              name: '批量关键词',
              type: 1,
              id: 11,
              path: '/main/data/batchKeywords'
            },
            {
              name: '关联关键词',
              type: 1,
              id: 12,
              path: '/main/data/relatedKeywords'
            },
            {
              name: '排名关键词',
              type: 1,
              id: 13,
              path: '/main/data/rankingKeywords'
            },
            {
              name: '产品排名查询',
              type: 1,
              id: 14,
              path: '/main/data/rankingSearch'
            },
            // {
            //   name: '谷歌趋势分析',
            //   type: 1,
            //   id: 16,
            //   path: '/main/data/ChromeAnalysis'
            // },
            {
              name: '人口分析',
              type: 1,
              id: 15,
              path: '/main/data/populationAnalysis'
            }
          ]
        },
        {
          name: '报告市场',
          type: 2,
          id: 6,
          icon: 'Document',
          path: '/main/market',
          sort: 1
        },
        {
          name: '工具',
          type: 2,
          id: 3,
          icon: 'Tools',
          path: '/analysis',
          sort: 2
        },
        {
          name: '设置',
          type: 3,
          id: 3,
          icon: 'Setting',
          path: '/setting',
          sort: -1
        },
        {
          name: '帮助中心',
          type: 3,
          id: 4,
          icon: 'QuestionFilled',
          path: '/help',
          sort: -2
        }
      ]
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeMenus(state, menus: any) {
      state.menus = menus
      //获取到菜单后动态加载路由
      const routes = mapMenus2Routes(menus)
      for (const route of routes) {
        router.addRoute('main', route)
      }
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      //1 登录，请求token保存
      const loginRes = await accountLoginApi(payload)
      const { id, token } = loginRes
      commit('changeToken', token)
      localCache.setCache('token', token)

      //2 获取用户信息
      const userInfoRes = await requestUserInfoById(id)
      commit('changeUserInfo', userInfoRes)
      localCache.setCache('userInfo', userInfoRes)

      //3 获取角色权限对应的菜单
      const menus = await requestMenusByRoleId(userInfoRes.role.id)
      // const menus = [
      //   {
      //     name: '报告',
      //     type: 2,
      //     path: ''
      //   }
      // ]
      commit('changeMenus', menus)
      localCache.setCache('menus', menus)

      //4 登录成功，跳到首页
      router.push('/main')
    },
    loadLocalLoginInfo({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const menus = localCache.getCache('menus')
      if (menus) {
        commit('changeMenus', menus)
      }
    }
  }
}

export default loginModules
