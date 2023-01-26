import { createStore, useStore } from 'vuex'

import { IRootState, IRootStateWithModules } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xxj',
      age: 18
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLoginInfo')
}

// 自己封装useStore来解决缺少模块的类型
export function useStoreWithModules() {
  return useStore<IRootStateWithModules>()
}

export default store
