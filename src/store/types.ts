import { ILoginState } from './login/types'

//由于vuex对ts的原生支持较差，比如使用root store 和 模块store 时，
//不能正确的取到模块的类型，我自己想出了3种方法来兼容

//1、利用接口可以合并的特性,缺点是login模块变成了可选属性,不符合语义
// export interface IRootState {
//   name: string
//   age: number
// }
// export interface IRootState {
//   //modules
//   login?: ILoginState
// }

export interface IModules {
  //modules
  login: ILoginState
}
export interface IRootState {
  name: string
  age: number
}

//2、 使用接口的多继承 解决vuex模块的类型缺失的问题
export interface IRootStateWithModules extends IModules, IRootState {}

//3、 使用交叉类型 解决vuex模块的类型缺失的问题
export type IRootStateWithModules1 = IModules & IRootState
