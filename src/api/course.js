import request from '@/plugin/axios'

export function getCourseList (params) {
  return request({
    url: '/courses',
    method: 'get',
    params
  })
}

/**
 * 获取课程分类
 * @param {object} params
 */
export function getCourseCategoryList (params) {
  return request({
    url: '/courses',
    method: 'get',
    params
  })
}
