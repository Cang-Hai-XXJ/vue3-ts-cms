export interface GetReportPageParams {
  /*报告分类 */
  reportCategory?: string

  /*报告类型 */
  reportType?: string

  /*报告标签 */
  reportTag?: string

  /*发布时间范围 */
  publishTime?: {
    /* */
    startTime?: string

    /* */
    endTime?: string
  }

  /*排序设置,可用值:CREATE_TIME_ASC,CREATE_TIME_DESC,UPDATE_TIME_ASC,UPDATE_TIME_DESC,FOLLOW_COUNT_ASC,FOLLOW_COUNT_DESC,VIEW_COUNT_ASC,VIEW_COUNT_DESC,THUMB_UP_COUNT_ASC,THUMB_UP_COUNT_DESC,THUMB_DOWN_COUNT_ASC,THUMB_DOWN_COUNT_DESC */
  sort?: string
}

// 响应接口
export interface GetReportPageRes {
  /* */

  /* */
  records: {
    /*平台 */
    platform: string

    /*报告分类 */
    reportCategory: string

    /*报告类型 */
    reportType: string

    /*报告摘要 */
    reportAbstract: string

    /*报告封面 */
    reportCover: string

    /*报告url */
    reportUrl: string

    /*报告标题 */
    reportTitle: string

    /*报告标签 */
    reportTag: string

    /*附加信息 */
    reportUserBehaviorSummaryResponse: {
      /*关注数 */
      follow: number

      /*点赞数 */
      thumbUp: number

      /*点踩数 */
      thumbDown: number

      /*浏览数 */
      view: number
    }

    /*创建时间 */
    createTime: string

    /*id */
    reportId: number
  }[]

  /* */
  total: number

  /* */
  size: number

  /* */
  current: number

  /* */
  orders: {
    /* */
    column: string

    /* */
    asc: boolean
  }[]

  /* */
  optimizeCountSql: string

  /* */
  searchCount: string

  /* */
  optimizeJoinOfCountSql: boolean

  /* */
  maxLimit: number

  /* */
  countId: string

  /* */
  pages: number
}
export interface ViewRes {
  /*平台 */
  platform: string

  /*报告分类 */
  reportCategory: string

  /*报告类型 */
  reportType: string

  /*报告摘要 */
  reportAbstract: string

  /*报告封面 */
  reportCover: string

  /*报告url */
  reportUrl: string

  /*报告标题 */
  reportTitle: string

  /*报告标签 */
  reportTag: string

  /*附加信息 */
  reportUserBehaviorSummaryResponse: {
    /*关注数 */
    follow: number

    /*点赞数 */
    thumbUp: number

    /*点踩数 */
    thumbDown: number

    /*浏览数 */
    view: number
  }

  /*创建时间 */
  createTime: string

  /*id */
  reportId: number
}
export interface ViewDetailRes {
  /* */

  /*平台 */
  platform: string

  /*报告分类 */
  reportCategory: string

  /*报告类型 */
  reportType: string

  /*报告摘要 */
  reportAbstract: string

  /*报告封面 */
  reportCover: string

  /*报告url */
  reportUrl: string

  /*报告标题 */
  reportTitle: string

  /*报告标签 */
  reportTag: string

  /*附加信息 */
  reportUserBehaviorSummaryResponse: {
    /*关注数 */
    follow: number

    /*点赞数 */
    thumbUp: number

    /*点踩数 */
    thumbDown: number

    /*浏览数 */
    view: number
  }

  /*创建时间 */
  createTime: string

  /*id */
  reportId: number
}

export interface GetSubUserWordsRes {
  /* */

  /* */
  records: {
    /*用户ID */
    userId: number

    /*报告ID */
    reportId: number

    /*用户留言 */
    userWords: string

    /*父评论ID */
    parentId: number

    /*用户图片 */
    userImages: Record<string, unknown>[]

    /*是否有子评论 */
    hasChild: boolean

    /*创建时间 */
    createTime: Record<string, unknown>

    /*更新时间 */
    updateTime: Record<string, unknown>

    /*子评论 */
    children: string

    /*评论ID */
    userWordsId: number
  }[]

  /* */
  total: number

  /* */
  size: number

  /* */
  current: number

  /* */
  orders: {
    /* */
    column: string

    /* */
    asc: boolean
  }[]

  /* */
  optimizeCountSql: string

  /* */
  searchCount: string

  /* */
  optimizeJoinOfCountSql: boolean

  /* */
  maxLimit: number

  /* */
  countId: string

  /* */
  pages: number
}

export interface UserWords {
  /*用户ID */
  userId: number

  /*报告ID */
  reportId: number

  /*用户留言 */
  userWords: string

  /*父评论ID */
  parentId: number

  /*用户图片 */
  userImages: string[]

  /*是否有子评论 */
  hasChild: boolean

  /*创建时间 */
  createTime: Record<string, unknown>

  /*更新时间 */
  updateTime: Record<string, unknown>

  /*子评论 */
  children: UserWords[]

  /*评论ID */
  userWordsId: number
}
// 响应接口
export interface GetUserWordsRes {
  /* */

  /* */
  records: UserWords[]

  /* */
  total: number

  /* */
  size: number

  /* */
  current: number

  /* */
  orders: {
    /* */
    column: string

    /* */
    asc: boolean
  }[]

  /* */
  optimizeCountSql: string

  /* */
  searchCount: string

  /* */
  optimizeJoinOfCountSql: boolean

  /* */
  maxLimit: number

  /* */
  countId: string

  /* */
  pages: number
}

// 参数接口
export interface UserWordsParams {
  /*报告ID */
  reportId?: number

  /*评论内容 */
  userWords?: string

  /*评论图片列表 */
  userImages?: string[]
}

// 响应接口
export type UserWordsRes = boolean
export type ReplyUserWordsRes = boolean
// 参数接口
export interface ReplyUserWordsParams {
  /*报告ID */
  reportId?: number

  /*评论内容 */
  userWords?: string

  /*评论图片列表 */
  userImages?: string[]

  /*父评论ID */
  parentId?: number
}
