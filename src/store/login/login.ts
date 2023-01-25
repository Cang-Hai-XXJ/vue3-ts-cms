import { Module } from 'vuex'

import { IRootState } from '../types'
import { ILoginState } from './types'

const loginModules: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    accountLoginAction(commit, payload: any) {
      console.log('accountLoginAction', payload)
    }
  }
}

export default loginModules
