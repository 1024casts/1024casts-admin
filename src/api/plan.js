import request from '@/plugin/axios'

/**
 * 获取plan列表
 * @param {object} params
 */
export function getPlanList (params) {
  return request({
    url: '/plans',
    method: 'get',
    params
  })
}

export function addPlan (data) {
  data.course_id = data.courseId
  data.weight = parseInt(data.weight)
  return request({
    url: '/plans/' + data.courseId,
    method: 'post',
    data
  })
}

export function updatePlan (data) {
  data.weight = parseInt(data.weight)
  return request({
    url: '/plans/' + data.id,
    method: 'put',
    data
  })
}
