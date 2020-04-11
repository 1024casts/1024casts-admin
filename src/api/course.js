import request from '@/plugin/axios'

/**
 * 获取课程列表
 * @param {object} params
 */
export function getCourseList (params) {
  return request({
    url: '/courses',
    method: 'get',
    params
  })
}

/**
 * 获取课程列表
 * @param {object} params
 */
export function getSectionList (params) {
  return request({
    url: '/sections/' + params.id,
    method: 'get'
  })
}

export function addSection (data) {
  data.course_id = data.courseId
  data.weight = parseInt(data.weight)
  return request({
    url: '/sections/' + data.courseId,
    method: 'post',
    data
  })
}

export function updateSection (data) {
  data.weight = parseInt(data.weight)
  return request({
    url: '/sections/' + data.id,
    method: 'put',
    data
  })
}

/**
 * 获取课程
 * @param {BigInt} course_id
 */
export function getCourseDetail (courseId) {
  return request({
    url: '/courses',
    method: 'get',
    params: {
      course_id: courseId
    }
  })
}

export function addCourse (data) {
  return request({
    url: '/courses',
    method: 'post',
    data
  })
}

export function updateCourse (data) {
  return request({
    url: '/courses/' + data.id,
    method: 'put',
    data
  })
}

export function updateCoursePublishStatus (data) {
  return request({
    url: '/courses/' + data.id + '/updatePublish',
    method: 'put',
    data
  })
}

/**
 * 获取视频列表
 * @param {object} params
 */
export function getVideoList (params) {
  return request({
    url: '/courses/' + params.id + '/videos',
    method: 'get'
  })
}

export function addVideo (data) {
  return request({
    url: '/videos',
    method: 'post',
    data
  })
}

export function updateVideo (data) {
  return request({
    url: '/videos/' + data.id,
    method: 'put',
    data
  })
}
