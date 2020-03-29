import request from '@/plugin/axios'

/**
 * 获取用户列表
 * @param {object} params
 */
export function getList (params) {
  return request({
    url: '/qiniu',
    method: 'get',
    params
  })
}
