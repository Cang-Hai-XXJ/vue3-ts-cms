import { default as request } from '../../index'
import {
  AmazonBulkSearchVolumeLiveParams,
  AmazonBulkSearchVolumeLiveRes,
  AmazonProductRankOverviewLiveParams,
  AmazonProductRankOverviewLiveRes,
  AmazonRankedKeywordsLiveParams,
  AmazonRankedKeywordsLiveRes,
  AmazonRelatedKeywordsLiveParams,
  AmazonRelatedKeywordsLiveRes,
  DataforseoTrendsDemographyLiveParams,
  DataforseoTrendsDemographyLiveRes,
  GetLanguagesRes,
  GetLocationsRes
} from './type'

/**
 * 获取所有地区支持
 * @param {string} languageCode
 * @returns
 */
export function getLocations(
  languageCode?: string
): Promise<GetLocationsRes[]> {
  return request.get(`/v1/datahub/locations?languageCode=${languageCode}`)
}
/**
 * 获取所有语言支持
 * @param {string} locationCode
 * @returns
 */
export function getLanguages(
  locationCode?: string
): Promise<GetLanguagesRes[]> {
  return request.get(`/v1/datahub/languages?locationCode=${locationCode}`)
}
/**
 * 亚马逊批量关键字搜索
 * @param {object} params AmazonBulkSearchVolumeLiveRequest
 * @param {array} params.keywords 搜索关键词
 * @param {string} params.locationName 地域名称
 * @param {number} params.locationCode 地域编码
 * @param {string} params.languageName 语言名称
 * @param {string} params.languageCode 语言编码
 * @param {string} params.tag 标签
 * @param {object} params.additionalProperties 额外参数
 * @returns
 */
export function amazonBulkSearchVolumeLive(
  params: AmazonBulkSearchVolumeLiveParams[]
): Promise<AmazonBulkSearchVolumeLiveRes> {
  return request.post(`/v1/datahub/amazon_bulk_search_volume`, params)
}

/**
 * 亚马逊排名关键词
 * @param {object} params AmazonRankedKeywordsLiveRequest
 * @param {string} params.asin
 * @param {string} params.locationName
 * @param {number} params.locationCode
 * @param {string} params.languageName
 * @param {string} params.languageCode
 * @param {number} params.limit
 * @param {boolean} params.ignoreSynonyms 是否忽略同义词
 * @param {array} params.filters
 * @param {array} params.orderBy
 * @param {number} params.offset
 * @param {string} params.tag
 * @param {object} params.additionalProperties
 * @returns
 */
export function amazonRankedKeywordsLive(
  params: AmazonRankedKeywordsLiveParams
): Promise<AmazonRankedKeywordsLiveRes> {
  return request.post(`/v1/datahub/amazon_ranked_keywords`, params)
}

/**
 * 亚马逊关联关键词
 * @param {object} params AmazonRelatedKeywordsLiveRequest
 * @param {string} params.keyword
 * @param {string} params.locationName
 * @param {number} params.locationCode
 * @param {string} params.languageName
 * @param {string} params.languageCode
 * @param {number} params.depth
 * @param {boolean} params.includeSeedKeyword 是否包含种子关键词
 * @param {boolean} params.ignoreSynonyms
 * @param {number} params.limit
 * @param {number} params.offset
 * @param {string} params.tag
 * @param {object} params.additionalProperties
 * @returns
 */
export function amazonRelatedKeywordsLive(
  params: AmazonRelatedKeywordsLiveParams[]
): Promise<AmazonRelatedKeywordsLiveRes> {
  return request.post(`/v1/datahub/amazon_batch_search`, params)
}

/**
 * 搜索引擎 - 人口趋势 最多关键词5
 * @param {object} params TrendsDemographyLiveRequest
 * @param {array} params.keywords 关键词
 * @param {string} params.locationName 地域名称
 * @param {number} params.locationCode 地域编码
 * @param {string} params.type 类型,web/news/ecommerce,默认web
 * @param {string} params.dateFrom 开始日期
 * @param {string} params.dateTo 结束日期
 * @param {string} params.timeRange 时间范围
 * @param {string} params.tag 标签
 * @returns
 */
export function dataforseoTrendsDemographyLive(
  params: DataforseoTrendsDemographyLiveParams[]
): Promise<DataforseoTrendsDemographyLiveRes> {
  return request.post(
    `/v1/datahub/keywords_dataforseo_trends_demography_live`,
    params
  )
}

/**
 * 亚马逊产品比较，最多为1000
 * @param {object} params AmazonProductRankOverviewLiveRequest
 * @param {array} params.asins ASIN列表
 * @param {string} params.locationName 地域名称
 * @param {number} params.locationCode 地域编码
 * @param {string} params.languageName 语言名称
 * @param {string} params.languageCode 语言编码
 * @param {string} params.tag 标签
 * @param {object} params.additionalProperties 额外参数
 * @returns
 */
export function amazonProductRankOverviewLive(
  params: AmazonProductRankOverviewLiveParams[]
): Promise<AmazonProductRankOverviewLiveRes> {
  return request.post(`/v1/datahub/amazon_product_rank_overview`, params)
}
