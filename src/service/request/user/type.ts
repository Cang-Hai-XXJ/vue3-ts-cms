// 参数接口
export interface GenPayQRParams {
  rechargeProductId?: number
  memo?: string
}

// 响应接口
export interface GenPayQRRes {
  qrCodeUrl: string
  outTradeNo: string
}
// 响应接口
export interface GetUserInfoRes {
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

// 响应接口
export interface GenInviteCodeRes {
  inviteCode: string
}

// 响应接口
export interface GetRechargeListRes {
  records: {
    id: number
    productName: string
    productUrl: string
    productDesc: string
    productTag: number
    productPrice: number
    productGift: number
    productGroupName: string
    productMemo: string
    productType: string
    productEnable: boolean
    createTime: Record<string, unknown>
    updateTime: Record<string, unknown>
  }[]
  total: number
  size: number
  current: number
  orders: {
    column: string
    asc: boolean
  }[]
  optimizeCountSql: boolean
  searchCount: boolean
  optimizeJoinOfCountSql: boolean
  maxLimit: number
  countId: string
  pages: number
}
