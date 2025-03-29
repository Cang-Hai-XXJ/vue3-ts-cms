// 响应接口
export interface GetLocationsRes {
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
