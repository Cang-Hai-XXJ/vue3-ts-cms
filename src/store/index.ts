import { createStore } from 'vuex'

import { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'xxj',
      age: 19
    }
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login
  }
})

store.state.name
export default store
