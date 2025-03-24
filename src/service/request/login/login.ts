import { default as request } from '../../index'
import {
  IAccount,
  ILoginRes,
  GetCaptchaCodeRes,
  SmsLoginParams,
  SmsLoginRes,
  CaptchaCheckParams,
  CaptchaCheckRes,
  SendSmsParams,
  SendSmsRes,
  GetWxLoginUrlRes,
  GetWxLoginStateRes,
  WxLoginRes,
  RegisterCheckParams,
  RegisterCheckRes,
  RegisterParams,
  RegisterRes,
  WxLoginParams
} from './type'

const redirectUrl = 'http://localhost:8080/#/main/index'
enum LoginApi {
  AccountLogin = '/login',
  UserInfo = '/users/',
  Menus = '/role/',
  CaptchaCode = '/captcha',
  // SmsLogin = '/sms_login?redirectUrl=' + redirectUrl,
  captcha_check = 'captcha_check',
  sms_register = 'sms_register'
}

export function accountLoginApi(account: IAccount) {
  return request.post<ILoginRes>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function requestUserInfoById(id: number) {
  return request.get<any>({
    url: LoginApi.UserInfo + id,
    isShowLoading: false
  })
}
export function requestMenusByRoleId(id: number) {
  return request.get<any>({
    url: LoginApi.Menus + id + '/menu',
    isShowLoading: false
  })
}
// /**
//  * 图片验证码
//  * @returns
//  */
// export function getCaptchaCode(): Promise<GetCaptchaCodeRes> {
//   return request.get<GetCaptchaCodeRes>({
//     url: LoginApi.CaptchaCode
//   })
// }

// /**
//  * 用户短信登录
//  * @param {string} redirectUrl
//  * @param {object} params 用户登录
//  * @param {string} params.tel 用户电话
//  * @param {string} params.authCode 验证码
//  * @param {string} params.wxInfoId 微信相关id
//  * @returns
//  */
// export function smsLogin(params: SmsLoginParams): Promise<SmsLoginRes> {
//   return request.get<SmsLoginRes>({
//     url: LoginApi.SmsLogin,
//     data: params
//   })
// }
// /**
//  * 图片验证码-校验
//  * @param {object} params ImageAuthCmd
//  * @param {string} params.imageUuid 验证码ID
//  * @param {string} params.imageCode 图片验证码
//  * @returns
//  */
// export function captchaCheck(
//   params: CaptchaCheckParams
// ): Promise<CaptchaCheckRes> {
//   return request.post({
//     url: LoginApi.captcha_check,
//     data: params
//   })
// }

// /**
//  * 发送短信验证码
//  * @param {object} params SendSmsCmd
//  * @param {string} params.imageUuid 验证码ID
//  * @param {string} params.imageCode 图片验证码
//  * @param {string} params.tel
//  * @returns
//  */
// export function sendSms(params: SendSmsParams): Promise<SendSmsRes> {
//   return request.post({
//     url: LoginApi.sms_register,
//     data: params
//   })
// }

/**
 * 获取微信登陆二维码地址
 * @param {string} redirectUrl
 * @returns
 */
export function getWxLoginUrl(redirectUrl: string): Promise<GetWxLoginUrlRes> {
  return request.get(`/v1/login/wx_login_url?redirectUrl=${redirectUrl}`)
}

/**
 * 获取微信登陆状态信息
 * @returns
 */
export function getWxLoginState(): Promise<GetWxLoginStateRes> {
  return request.get(`/v1/login/wx_login_state`)
}

/**
 * 图片验证码
 * @returns
 */
export function getCaptchaCode(): Promise<GetCaptchaCodeRes> {
  return request.get(`/v1/login/captcha`)
}

/**
 * 图片验证码-校验
 * @param {object} params ImageAuthCmd
 * @param {string} params.imageUuid 验证码ID
 * @param {string} params.imageCode 图片验证码
 * @returns
 */
export function captchaCheck(
  params: CaptchaCheckParams
): Promise<CaptchaCheckRes> {
  return request.post(`/v1/login/captcha_check`, params)
}

/**
 * 用户注册
 * @param {object} params 用户注册
 * @param {string} params.tel 用户电话
 * @param {string} params.authCode 验证码
 * @param {string} params.wxInfoId 微信相关id
 * @param {string} params.inviteCode 邀请码
 * @returns
 */
export function register(params: RegisterParams): Promise<RegisterRes> {
  return request.post(`/v1/login/register`, params)
}

/**
 * 用户注册-手机号是否存在
 * @param {object} params 用户注册
 * @param {string} params.tel 用户电话
 * @param {string} params.authCode 验证码
 * @param {string} params.wxInfoId 微信相关id
 * @param {string} params.inviteCode 邀请码
 * @returns
 */
export function registerCheck(
  params: RegisterCheckParams
): Promise<RegisterCheckRes> {
  return request.post(`/v1/login/register_check`, params)
}

/**
 * 用户短信登录
 * @param {string} redirectUrl
 * @param {object} params 用户登录
 * @param {string} params.tel 用户电话
 * @param {string} params.authCode 验证码
 * @param {string} params.wxInfoId 微信相关id
 * @returns
 */
export function smsLogin(
  redirectUrl: string,
  params: SmsLoginParams
): Promise<SmsLoginRes> {
  return request.post(`/v1/login/sms_login?redirectUrl=${redirectUrl}`, params)
}

/**
 * 发送短信验证码
 * @param {object} params SendSmsCmd
 * @param {string} params.imageUuid 验证码ID
 * @param {string} params.imageCode 图片验证码
 * @param {string} params.tel
 * @returns
 */
export function sendSms(params: SendSmsParams): Promise<SendSmsRes> {
  return request.post(`/v1/login/sms_register`, params)
}

/**
 * 微信绑定手机号登录
 * @param {string} redirectUrl
 * @param {object} params 用户登录
 * @param {string} params.tel 用户电话
 * @param {string} params.authCode 验证码
 * @param {string} params.wxInfoId 微信相关id
 * @returns
 */
export function wxLogin(
  redirectUrl: string,
  params: WxLoginParams
): Promise<WxLoginRes> {
  return request.post(`/v1/login/wx_login?redirectUrl=${redirectUrl}`, params)
}
