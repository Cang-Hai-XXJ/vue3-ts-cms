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
import localCache from '@/utils/localCache'

const loginModules: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      menus: []
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
