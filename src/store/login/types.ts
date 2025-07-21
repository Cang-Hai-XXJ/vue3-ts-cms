export interface ILoginState {
  token: string
  userInfo: any
  menus: menu[]
}
interface menu {
  name: string
  type: number
  id: number
  path: string
  icon?: string
  sort?: number
  children?: menu[]
}
