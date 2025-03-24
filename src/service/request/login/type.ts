export interface IAccount {
  name: string
  password: string
}

export interface ILoginRes {
  id: number
  token: string
  name: string
}
// 验证码
export interface GetCaptchaCodeRes {
  uuid: string
  image: string
}
// 用户短信登录
export interface SmsLoginParams {
  tel?: string
  authCode?: string
  wxInfoId?: string
}
export interface SmsLoginRes {
  jwtToken: {
    token: string
    issueTime: number
    expiredIn: number
    redirectUri: string
    bindToken: boolean
  }
  user: {
    id: number
    userOpenId: string
    userUnionId: string
    userRealName: string
    userPhone: string
    userEmail: string
    userNickName: string
    password: string
    userAvatarUrl: string
    userIntro: string
    userSex: boolean
    enabled: boolean
    expired: boolean
    locked: boolean
    createTime: Record<string, unknown>
    userAccountId: number
  }
  wxInfoId: string
  userAccount: {
    id: number
    userId: number
    userOpenId: string
    userBalance: number
    userMemberPoints: number
    createTime: Record<string, unknown>
    updateTime: Record<string, unknown>
  }
  memberArch: {
    id: number
    level: number
    levelTitle: string
    scoreGte: number
    scoreLt: number
    remark: string
    createTime: Record<string, unknown>
  }
}
// 参数接口
export interface CaptchaCheckParams {
  imageUuid?: string
  imageCode?: string
}

// 响应接口
export interface CaptchaCheckRes {
  uuid: string
  image: string
}
// 参数接口
export interface SendSmsParams {
  imageUuid?: string
  imageCode?: string
  tel?: string
}

// 响应接口
export interface SendSmsRes {
  message: string
  data: boolean
  code: number
  success: boolean
}

export interface GetWxLoginUrlRes {
  message: string
  data: string
  code: number
  success: boolean
}
export interface GetWxLoginStateRes {
  appId: string
  state: string
}

// 参数接口
export interface RegisterCheckParams {
  tel?: string
  authCode?: string
  wxInfoId?: string
  inviteCode?: string
}

// 响应接口
export interface RegisterCheckRes {
  message: string
  data: boolean
  code: number
  success: boolean
}

// 参数接口
export interface RegisterParams {
  tel?: string
  authCode?: string
  wxInfoId?: string
  inviteCode?: string
}

// 响应接口
export interface RegisterRes {
  id: number
  userOpenId: string
  userUnionId: string
  userRealName: string
  userPhone: string
  userEmail: string
  userNickName: string
  password: string
  userAvatarUrl: string
  userIntro: string
  userSex: boolean
  enabled: boolean
  expired: boolean
  locked: boolean
  createTime: Record<string, unknown>
  userAccountId: number
}

// 参数接口
export interface WxLoginParams {
  tel?: string
  authCode?: string
  wxInfoId?: string
}

// 响应接口
export interface WxLoginRes {
  jwtToken: {
    token: string
    issueTime: number
    expiredIn: number
    redirectUri: string
    bindToken: boolean
  }
  user: {
    id: number
    userOpenId: string
    userUnionId: string
    userRealName: string
    userPhone: string
    userEmail: string
    userNickName: string
    password: string
    userAvatarUrl: string
    userIntro: string
    userSex: boolean
    enabled: boolean
    expired: boolean
    locked: boolean
    createTime: Record<string, unknown>
    userAccountId: number
  }
  wxInfoId: string
  userAccount: {
    id: number
    userId: number
    userOpenId: string
    userBalance: number
    userMemberPoints: number
    createTime: Record<string, unknown>
    updateTime: Record<string, unknown>
  }
  memberArch: {
    id: number
    level: number
    levelTitle: string
    scoreGte: number
    scoreLt: number
    remark: string
    createTime: Record<string, unknown>
  }
}
