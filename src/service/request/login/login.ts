import MYRequest from '../../index'
import { IAccount, ILoginRes } from './type'

enum LoginApi {
  AccountLogin = '/login',
  UserInfo = '/users/',
  Menus = '/role/'
}

export function accountLoginApi(account: IAccount) {
  return MYRequest.post<ILoginRes>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return MYRequest.get<any>({
    url: LoginApi.UserInfo + id,
    isShowLoading: false
  })
}
export function requestMenusByRoleId(id: number) {
  return MYRequest.get<any>({
    url: LoginApi.Menus + id + '/menu',
    isShowLoading: false
  })
}
