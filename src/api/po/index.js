import request from '@/utils/request'
export function getList(params) {
  return request({
    url: '/api/dispatch/purchase_order/',
    method: 'get',
    params
  })
}

export function getListMeta(params) {
  return request({
    url: '/api/dispatch/purchase_order/meta',
    method: 'get',
    params
  })
}
export function getDetail(id,params) {
  return request({
    url: `/api/dispatch/purchase_order/${id}/get_detail/`,
    method: 'get',
    params
  })
}

export function createPo(data) {
  return request({
    url: '/api/dispatch/purchase_order/',
    method: 'post',
    data
  })
}

//
export function getSource(params) {
  return request({
    url: '/api/base/product-flownode/get_source_node/',
    method: 'get',
    params
  })
}

export function getTarget(params) {
  return request({
    url: '/api/base/product-flownode/get_target_node/',
    method: 'get',
    params
  })
}
export function updatePo(data,id) {
  return request({
    url: `/api/dispatch/purchase_order/${id}/`,
    method: 'put',
    data
  })
}

export function updateState(data) {
  return request({
    url: '/api/dispatch/purchase_order/batch_update',
    method: 'post',
    data
  })
}

