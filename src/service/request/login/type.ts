export interface IAccount {
  name: string
  password: string
}

export interface ILoginRes {
  id: number
  token: string
  name: string
}
