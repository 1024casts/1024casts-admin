import request from '@/api/upload/@/plugin/axios'

/**
 * 获取上传模块列表
 * @returns
 */
export function getUploadModule () {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'get.upload.module'
    }
  })
}

/**
 * 获取上传地址
 * @param {String} module
 * @returns
 */
export function getUploadUrl (module = undefined) {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'get.upload.url'
    },
    data: {
      module
    }
  })
}

/**
 * 获取上传Token
 * @param {String} module
 * @param {String} type
 * @returns
 */
export function getUploadToken (module = undefined, type = 'web') {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'get.upload.token'
    },
    data: {
      module,
      type
    }
  })
}

/**
 * 替换上传资源
 * @param {Number} storage_id
 * @returns
 */
export function replaceUploadItem (storage_id) {
  return request({
    url: '/v1/upload',
    method: 'post',
    params: {
      method: 'replace.upload.item'
    },
    data: {
      storage_id
    }
  })
}
