import { default as request } from '../../index'
import { GetLocationsRes, GetLanguagesRes } from './type'

/**
 * 获取所有地区支持
 * @param {string} languageCode
 * @returns
 */
export function getLocations(languageCode: string): Promise<GetLocationsRes[]> {
  return request.get(`/v1/datahub/locations?languageCode=${languageCode}`)
}

/**
 * 获取所有语言支持
 * @param {string} locationCode
 * @returns
 */
export function getLanguages(locationCode: number): Promise<GetLanguagesRes[]> {
  return request.get(`/v1/datahub/languages?locationCode=${locationCode}`)
}
