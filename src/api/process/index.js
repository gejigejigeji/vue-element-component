import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/base/process/',
    method: 'get',
    params
  })
}

export function getListMeta(params) {
  return request({
    url: '/api/base/process/meta',
    method: 'get',
    params
  })
}

export function createProcess(data) {
  return request({
    url: '/api/base/process/',
    method: 'post',
    data
  })
}

export function updateProcess(data,id) {
  return request({
    url:`/api/base/process/${id}/`,
    method: 'post',
    data
  })
}


export function updateState(data) {
  return request({
    url:`/api/base/process/batch_update`,
    method: 'post',
    data
  })
}