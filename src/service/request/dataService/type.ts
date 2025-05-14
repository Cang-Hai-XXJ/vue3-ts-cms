// 响应接口
export type GetLocationsRes = {
  locationCode: number
  locationName: string
  locationCodeParent: string
  countryIsoCode: string
  locationType: string
  availableSources: string
}

export interface GetLanguagesRes {
  countryIsoCode: string
  locationType: string
  availableSources: string
  languageName: string
  languageCode: string
}

// 参数接口
export interface AmazonBulkSearchVolumeLiveParams {
  keywords?: string[]
  locationName?: string
  locationCode?: string
  languageName?: string
  languageCode?: string
  tag?: string
  additionalProperties?: Record<string, unknown>
}

// 响应接口
export interface AmazonBulkSearchVolumeLiveRes {
  version: string
  statusCode: number
  statusMessage: string
  time: string
  cost: Record<string, unknown>
  tasksCount: number
  tasksError: number
  tasks: {
    id: string
    statusCode: number
    statusMessage: string
    time: string
    cost: Record<string, unknown>
    resultCount: number
    path: Record<string, unknown>[]
    data: Record<string, unknown>
    result: {
      seType: string
      locationCode: number
      languageCode: string
      totalCount: number
      itemsCount: number
      items: {
        seType: string
        keyword: string
        searchVolume: number
        additionalProperties: Record<string, unknown>
      }[]
      additionalProperties: Record<string, unknown>
    }[]
    additionalProperties: Record<string, unknown>
  }[]
  additionalProperties: Record<string, unknown>
}

export interface AmazonRankedKeywordsLiveParams {
  asin?: string
  locationName?: string
  locationCode?: number
  languageName?: string
  languageCode?: string
  limit?: number
  ignoreSynonyms?: boolean
  filters?: Record<string, unknown>[]
  orderBy?: Record<string, unknown>[]
  offset?: number
  tag?: string
  additionalProperties?: Record<string, unknown>
}

// 响应接口
export interface AmazonRankedKeywordsLiveRes {
  version: string
  statusCode: number
  statusMessage: string
  time: string
  cost: Record<string, unknown>
  tasksCount: number
  tasksError: number
  tasks: {
    id: string
    statusCode: number
    statusMessage: string
    time: string
    cost: Record<string, unknown>
    resultCount: number
    path: Record<string, unknown>[]
    data: Record<string, unknown>
    result: {
      seType: string
      asin: string
      locationCode: number
      languageCode: string
      totalCount: number
      itemsCount: number
      items: {
        seType: string
        keywordData: {
          seType: string
          keyword: string
          locationCode: number
          languageCode: string
          keywordInfo: {
            seType: string
            lastUpdatedTime: string
            competition: Record<string, unknown>
            competitionLevel: string
            cpc: Record<string, unknown>
            searchVolume: number
            lowTopOfPageBid: Record<string, unknown>
            highTopOfPageBid: Record<string, unknown>
            categories: Record<string, unknown>[]
            monthlySearches: {
              year: number
              month: number
              searchVolume: number
              additionalProperties: Record<string, unknown>
            }[]
            searchVolumeTrend: {
              monthly: number
              quarterly: number
              yearly: number
              additionalProperties: Record<string, unknown>
            }
            additionalProperties: Record<string, unknown>
          }
          keywordInfoNormalizedWithBing: {
            lastUpdatedTime: string
            searchVolume: number
            isNormalized: boolean
            monthlySearches: {
              year: number
              month: number
              searchVolume: number
              additionalProperties: Record<string, unknown>
            }[]
            additionalProperties: Record<string, unknown>
          }
          keywordInfoNormalizedWithClickstream: {
            lastUpdatedTime: string
            searchVolume: number
            isNormalized: boolean
            monthlySearches: {
              year: number
              month: number
              searchVolume: number
              additionalProperties: Record<string, unknown>
            }[]
            additionalProperties: Record<string, unknown>
          }
          clickstreamKeywordInfo: Record<string, unknown>
          keywordProperties: {
            seType: string
            coreKeyword: string
            synonymClusteringAlgorithm: string
            keywordDifficulty: number
            detectedLanguage: string
            isAnotherLanguage: boolean
            additionalProperties: Record<string, unknown>
          }
          impressionsInfo: {
            seType: string
            lastUpdatedTime: string
            bid: number
            matchType: string
            adPositionMin: Record<string, unknown>
            adPositionMax: Record<string, unknown>
            adPositionAverage: Record<string, unknown>
            cpcMin: Record<string, unknown>
            cpcMax: Record<string, unknown>
            cpcAverage: Record<string, unknown>
            dailyImpressionsMin: Record<string, unknown>
            dailyImpressionsMax: Record<string, unknown>
            dailyImpressionsAverage: Record<string, unknown>
            dailyClicksMin: Record<string, unknown>
            dailyClicksMax: Record<string, unknown>
            dailyClicksAverage: Record<string, unknown>
            dailyCostMin: Record<string, unknown>
            dailyCostMax: Record<string, unknown>
            dailyCostAverage: Record<string, unknown>
            additionalProperties: Record<string, unknown>
          }
          serpInfo: {
            seType: string
            checkUrl: string
            serpItemTypes: Record<string, unknown>[]
            seResultsCount: number
            lastUpdatedTime: string
            previousUpdatedTime: string
            additionalProperties: Record<string, unknown>
          }
          avgBacklinksInfo: {
            seType: string
            backlinks: Record<string, unknown>
            dofollow: Record<string, unknown>
            referringPages: Record<string, unknown>
            referringDomains: Record<string, unknown>
            referringMainDomains: Record<string, unknown>
            rank: Record<string, unknown>
            mainDomainRank: Record<string, unknown>
            lastUpdatedTime: string
            additionalProperties: Record<string, unknown>
          }
          searchIntentInfo: {
            seType: string
            mainIntent: string
            foreignIntent: Record<string, unknown>[]
            lastUpdatedTime: string
            additionalProperties: Record<string, unknown>
          }
          additionalProperties: Record<string, unknown>
        }
        rankedSerpElement: {
          seType: string
          serpItem: {
            type: string
            rankGroup: number
            rankAbsolute: number
            xpath: string
          }
          checkUrl: string
          serpItemTypes: Record<string, unknown>[]
          seResultsCount: number
          lastUpdatedTime: string
          previousUpdatedTime: string
          additionalProperties: Record<string, unknown>
        }
        additionalProperties: Record<string, unknown>
      }[]
      additionalProperties: Record<string, unknown>
    }[]
    additionalProperties: Record<string, unknown>
  }[]
  additionalProperties: Record<string, unknown>
}

// 参数接口
export interface AmazonRelatedKeywordsLiveParams {
  /* */
  keyword?: string

  /* */
  locationName?: string

  /* */
  locationCode?: number

  /* */
  languageName?: string

  /* */
  languageCode?: string

  /* */
  depth?: number

  /*是否包含种子关键词 */
  includeSeedKeyword?: boolean

  /* */
  ignoreSynonyms?: boolean

  /* */
  limit?: number

  /* */
  offset?: number

  /* */
  tag?: string

  /* */
  additionalProperties?: Record<string, unknown>
}

// 响应接口
export interface AmazonRelatedKeywordsLiveRes {
  /* */
  version: string

  /* */
  statusCode: number

  /* */
  statusMessage: string

  /* */
  time: string

  /* */
  cost: Record<string, unknown>

  /* */
  tasksCount: number

  /* */
  tasksError: number

  /* */
  tasks: {
    /* */
    id: string

    /* */
    statusCode: number

    /* */
    statusMessage: string

    /* */
    time: string

    /* */
    cost: Record<string, unknown>

    /* */
    resultCount: number

    /* */
    path: Record<string, unknown>[]

    /* */
    data: string

    /* */
    result: {
      /* */
      seType: string

      /*种子关键词 */
      seedKeyword: string

      /*种子关键词数据 */
      seedKeywordData: {
        /*搜索平台类型 */
        seType: string

        /*搜索关键词 */
        keyword: string

        /*地域编码 */
        locationCode: number

        /*语言编码 */
        languageCode: string

        /*关键词信息 */
        keywordInfo: {
          /*搜索平台类型 */
          seType: string

          /*最后更新时间 */
          lastUpdatedTime: string

          /*搜索量 */
          searchVolume: number

          /*额外参数 */
          additionalProperties: Record<string, unknown>
        }

        /*额外参数 */
        additionalProperties: Record<string, unknown>
      }

      /* */
      locationCode: number

      /* */
      languageCode: string

      /* */
      totalCount: number

      /* */
      itemsCount: number

      /* */
      items: {
        /* */
        seType: string

        /*关键词数据 */
        keywordData: {
          /*搜索平台类型 */
          seType: string

          /*搜索关键词 */
          keyword: string

          /*地域编码 */
          locationCode: number

          /*语言编码 */
          languageCode: string

          /*关键词信息 */
          keywordInfo: {
            /*搜索平台类型 */
            seType: string

            /*最后更新时间 */
            lastUpdatedTime: string

            /*搜索量 */
            searchVolume: number

            /*额外参数 */
            additionalProperties: Record<string, unknown>
          }

          /*额外参数 */
          additionalProperties: Record<string, unknown>
        }

        /*搜索深度 */
        depth: number

        /*相关关键词 */
        relatedKeywords: Record<string, unknown>[]

        /* */
        additionalProperties: Record<string, unknown>
      }[]

      /* */
      additionalProperties: Record<string, unknown>
    }[]

    /* */
    additionalProperties: Record<string, unknown>
  }[]

  /* */
  additionalProperties: Record<string, unknown>
}

// 参数接口
export interface DataforseoTrendsDemographyLiveParams {
  /*关键词 */
  keywords?: string[]

  /*地域名称 */
  locationName?: string

  /*地域编码 */
  locationCode?: number

  /*类型,web/news/ecommerce,默认web */
  type?: string

  /*开始日期 */
  dateFrom?: string

  /*结束日期 */
  dateTo?: string

  /*时间范围 */
  timeRange?: string

  /*标签 */
  tag?: string
}

// 响应接口
export interface DataforseoTrendsDemographyLiveRes {
  /* */
  version: string

  /* */
  statusCode: number

  /* */
  statusMessage: string

  /* */
  time: string

  /* */
  cost: Record<string, unknown>

  /* */
  tasksCount: number

  /* */
  tasksError: number

  /* */
  tasks: {
    /* */
    id: string

    /* */
    statusCode: number

    /* */
    statusMessage: string

    /* */
    time: string

    /* */
    cost: Record<string, unknown>

    /* */
    resultCount: number

    /* */
    path: Record<string, unknown>[]

    /* */
    data: string

    /* */
    result: {
      /* */
      keywords: Record<string, unknown>[]

      /* */
      type: string

      /* */
      locationCode: number

      /* */
      languageCode: string

      /* */
      datetime: string

      /* */
      itemsCount: number

      /* */
      items: {
        /*位置 */
        position: number

        /*类型 */
        type: string

        /*关键词列表 */
        keywords: string[]

        /*人口信息 */
        demography: {
          /*年龄 */
          age: {
            /*关键词 */
            keyword: string

            /* */
            values: {
              /* */
              type: string

              /* */
              value: number

              /* */
              additionalProperties: Record<string, unknown>
            }[]

            /* */
            additionalProperties: Record<string, unknown>
          }[]

          /*性别 */
          gender: {
            /*关键词 */
            keyword: string

            /* */
            values: {
              /* */
              type: string

              /* */
              value: number

              /* */
              additionalProperties: Record<string, unknown>
            }[]

            /* */
            additionalProperties: Record<string, unknown>
          }[]

          /*额外属性 */
          additionalProperties: Record<string, unknown>
        }

        /*人口比较 */
        demographyComparison: {
          /*年龄 */
          age: any

          /*性别 */
          gender: any

          /* */
          additionalProperties: Record<string, unknown>
        }

        /*额外属性 */
        additionalProperties: Record<string, unknown>
      }[]

      /* */
      additionalProperties: Record<string, unknown>
    }[]

    /* */
    additionalProperties: Record<string, unknown>
  }[]
}

// 参数接口
export interface AmazonProductRankOverviewLiveParams {
  /*ASIN列表 */
  asins?: string[]

  /*地域名称 */
  locationName?: string

  /*地域编码 */
  locationCode?: number

  /*语言名称 */
  languageName?: string

  /*语言编码 */
  languageCode?: string

  /*标签 */
  tag?: string

  /*额外参数 */
  additionalProperties?: Record<string, unknown>
}

// 响应接口
export interface AmazonProductRankOverviewLiveRes {
  /* */

  /* */
  /*版本 */
  version: string

  /*状态码 */
  statusCode: number

  /*状态信息 */
  statusMessage: string

  /*时间 */
  time: string

  /*成本花销 */
  cost: Record<string, unknown>

  /*任务数量 */
  tasksCount: number

  /*任务错误 */
  tasksError: number

  /*任务列表 */
  tasks: {
    /* */
    id: string

    /* */
    statusCode: number

    /* */
    statusMessage: string

    /* */
    time: string

    /* */
    cost: Record<string, unknown>

    /* */
    resultCount: number

    /* */
    path: Record<string, unknown>[]

    /* */
    data: string

    /* */
    result: {
      /*搜索平台类型 */
      seType: string

      /*地域编码 */
      locationCode: number

      /*语言编码 */
      languageCode: string

      /*总量 */
      totalCount: number

      /*数量 */
      itemsCount: number

      /*搜索明细 */
      items: {
        /*搜索平台类型 */
        seType: string

        /*ASIN */
        asin: string

        /*指标 */
        metrics: {
          /*amazon serp */
          amazonSerp: {
            /*位置第一位 */
            pos1: number

            /*位置第二至三位 */
            pos23: number

            /*位置第四至十位 */
            pos410: number

            /*位置第十一至一百位 */
            pos11100: number

            /*数量 */
            count: number

            /*搜索量 */
            searchVolume: number

            /*额外属性 */
            additionalProperties: Record<string, unknown>
          }

          /*amazon paid */
          amazonPaid: {
            /*位置第一位 */
            pos1: number

            /*位置第二至三位 */
            pos23: number

            /*位置第四至十位 */
            pos410: number

            /*位置第十一至一百位 */
            pos11100: number

            /*数量 */
            count: number

            /*搜索量 */
            searchVolume: number

            /*额外属性 */
            additionalProperties: Record<string, unknown>
          }

          /* */
          additionalProperties: Record<string, unknown>
        }

        /*额外属性 */
        additionalProperties: Record<string, unknown>
      }[]

      /*额外属性 */
      additionalProperties: Record<string, unknown>
    }[]

    /* */
    additionalProperties: Record<string, unknown>
  }[]

  /*额外属性 */
  additionalProperties: Record<string, unknown>
}
