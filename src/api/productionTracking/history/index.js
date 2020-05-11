import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/api/wip/wipdata-history/',
    method: 'get',
    params
  })
}

export function getListMeta(params) {
  return request({
    url: '/api/wip/wipdata-history/meta',
    method: 'get',
    params
  })
}


export function getDetail(id,params) {
  return request({
    url: `/api/wip/wipdata-history/${id}/`,
    method: 'get',
    params
  })
}

