import { default as request } from '../../index'
import {
  GetReportPageParams,
  GetReportPageRes,
  GetSubUserWordsRes,
  GetUserWordsRes,
  ReplyUserWordsParams,
  ReplyUserWordsRes,
  UserWordsParams,
  UserWordsRes,
  ViewDetailRes,
  ViewRes
} from './type'

/**
 * 分页查询报告
 * @param {string} pageNum
 * @param {string} pageSize
 * @param {object} params PlatformReportQueryRequest
 * @param {string} params.reportCategory 报告分类
 * @param {string} params.reportType 报告类型
 * @param {string} params.reportTag 报告标签
 * @param {object} params.publishTime 发布时间范围
 * @param {string} params.sort 排序设置,可用值:CREATE_TIME_ASC,CREATE_TIME_DESC,UPDATE_TIME_ASC,UPDATE_TIME_DESC,FOLLOW_COUNT_ASC,FOLLOW_COUNT_DESC,VIEW_COUNT_ASC,VIEW_COUNT_DESC,THUMB_UP_COUNT_ASC,THUMB_UP_COUNT_DESC,THUMB_DOWN_COUNT_ASC,THUMB_DOWN_COUNT_DESC
 * @returns
 */
export function getReportPage(
  pageNum: number,
  pageSize: number,
  params: GetReportPageParams
): Promise<GetReportPageRes> {
  return request.post(
    `/v1/users/report/page?pageNum=${pageNum}&pageSize=${pageSize}`,
    params
  )
}
/**
 * 查看报告详情
 * @param {string} reportId
 * @returns
 */
export function getReport(reportId: number | string): Promise<ViewDetailRes> {
  return request.get(`/v1/users/report/view?reportId=${reportId}`)
}

/**
 * 点赞报告
 * @param {string} reportId
 * @returns
 */
export function thumbUp(reportId: number | undefined): Promise<boolean> {
  return request.get(`/v1/users/report/thumb_up?reportId=${reportId}`)
}
/**
 * 点踩报告
 * @param {string} reportId
 * @returns
 */
export function thumbDown(reportId: number | undefined): Promise<boolean> {
  return request.get(`/v1/users/report/thumb_down?reportId=${reportId}`)
}
/**
 * 收藏关注报告
 * @param {string} reportId
 * @returns
 */
export function follow(reportId: number | undefined): Promise<boolean> {
  return request.get(`/v1/users/report/follow?reportId=${reportId}`)
}

/**
 * 查看一级评论
 * @param {string} pageNo
 * @param {string} pageSize
 * @param {string} reportId
 * @returns
 */
export function getUserWords(
  pageNo: number,
  pageSize: number,
  reportId: number
): Promise<GetUserWordsRes> {
  return request.get(
    `/v1/users/report/comment/show?pageNo=${pageNo}&pageSize=${pageSize}&reportId=${reportId}`
  )
}

/**
 * 查看子评论
 * @param {string} pageNo
 * @param {string} pageSize
 * @param {string} reportId
 * @param {string} parentUserWordsId
 * @returns
 */
export function getSubUserWords(
  pageNo: number,
  pageSize: number,
  reportId: number,
  parentUserWordsId: number
): Promise<GetSubUserWordsRes> {
  return request.get(
    `/v1/users/report/comment/sub_comment?pageNo=${pageNo}&pageSize=${pageSize}&reportId=${reportId}&parentUserWordsId=${parentUserWordsId}`
  )
}

/**
 * 评论报告
 * @param {object} params UserWordsRequest
 * @param {number} params.reportId 报告ID
 * @param {string} params.userWords 评论内容
 * @param {array} params.userImages 评论图片列表
 * @returns
 */
export function userWords(params: UserWordsParams): Promise<UserWordsRes> {
  return request.post(`/v1/users/report/comment`, params)
}

/**
 * 回复评论
 * @param {object} params ReplyUserWordsRequest
 * @param {number} params.reportId 报告ID
 * @param {string} params.userWords 评论内容
 * @param {array} params.userImages 评论图片列表
 * @param {number} params.parentId 父评论ID
 * @returns
 */
export function replyUserWords(
  params: ReplyUserWordsParams
): Promise<ReplyUserWordsRes> {
  return request.post(`/v1/users/report/reply_comment`, params)
}
