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
