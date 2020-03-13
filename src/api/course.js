import request from '@/plugin/axios'

export function getCourseList (params) {
  return request({
    url: '/courses',
    method: 'get',
    params
  })
}

export function addCourse (params) {
  return request({
    url: '/courses',
    method: 'post',
    params
  })
}

export function updateCourse (params) {
  return request({
    url: '/courses',
    method: 'put',
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
