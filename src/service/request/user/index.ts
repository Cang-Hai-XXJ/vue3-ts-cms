import { default as request } from '../../index'
import {
  GenPayQRParams,
  GenPayQRRes,
  GetUserInfoRes,
  GenInviteCodeRes,
  GetRechargeListRes
} from './type'

/**
 * 生成付款二维码
 * @param {object} params RechargeApplyCmd
 * @param {number} params.rechargeProductId 充值项ID
 * @param {string} params.memo 备注
 * @returns
 */
export function getPayQR(params: GenPayQRParams): Promise<GenPayQRRes> {
  return request.post(`/v1/users/pay_qr`, params)
}

/**
 * 获取用户信息
 * @returns
 */
export function getUserInfo(): Promise<GetUserInfoRes> {
  return request.get(`/v1/users/user_info`)
}

/**
 * 用户生成邀请码
 * @returns
 */
export function genInviteCode(): Promise<GenInviteCodeRes> {
  return request.get(`/v1/users/invite_code`)
}

/**
 * 获取充值列表-分页
 * @param {string} pageNo
 * @param {string} pageSize
 * @returns
 */
export function getRechargeList(
  pageNo: number,
  pageSize: number
): Promise<GetRechargeListRes> {
  return request.get(
    `/v1/base/recharge_item/page?pageNo=${pageNo}&pageSize=${pageSize}`
  )
}
