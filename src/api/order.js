import request from '@/plugin/axios'

/**
 * 获取订单列表
 * @param {object} params
 */
export function getOrderList (params) {
  return request({
    url: '/orders',
    method: 'get',
    params
  })
}
