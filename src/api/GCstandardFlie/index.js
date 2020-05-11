import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/wip/format-fields/',
    method: 'get',
    params
  })
}
export function getListMeta(params) {
  return request({
    url: '/api/wip/format-fields/meta',
    method: 'get',
    params
  })
}

export function updateState(data) {
  return request({
    url: '/api/wip/format-fields/batch_update',
    method: 'post',
    data
  })
}
export function createGC(data) {
  return request({
    url: '/api/wip/format-fields/',
    method: 'post',
    data
  })
}
export function updateGC(data,id) {
  return request({
    url: `/api/wip/format-fields/${id}/`,
    method: 'put',
    data
  })
}