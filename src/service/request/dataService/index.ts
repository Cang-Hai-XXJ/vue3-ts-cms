import { default as request } from '../../index'
import {
  AmazonBulkSearchVolumeLiveParams,
  AmazonBulkSearchVolumeLiveRes,
  AmazonRankedKeywordsLiveParams,
  AmazonRankedKeywordsLiveRes,
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
