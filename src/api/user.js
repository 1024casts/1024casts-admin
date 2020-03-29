import request from '@/plugin/axios'

/**
 * 获取用户列表
 * @param {object} params
 */
export function getUserList (params) {
  return request({
    url: '/users',
    method: 'get',
    params
  })
}
