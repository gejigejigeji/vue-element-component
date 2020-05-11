import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/base/supplier/',
    method: 'get',
    params
  })
}

export function getListMeta(params) {
  return request({
    url: '/api/base/supplier/meta',
    method: 'get',
    params
  })
}
export function updateState(data) {
  return request({
    url: '/api/base/supplier/batch_update',
    method: 'post',
    data
  })
}
export function updateVendor(data,id) {
  return request({
    url: `/api/base/supplier/${id}`,
    method: 'put',
    data
  })
}
export function previoud({path}) {
  return request({
    url: `${path}`,
    method: 'get',
  })
}
export function next({path}) {
  return request({
    url: `${path}`,
    method: 'get',
  })
}

