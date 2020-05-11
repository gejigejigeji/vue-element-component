import request from '@/utils/request'
import store from '@/store'

// 列表页
export function apiList(data) {
  return request({
    url: store.getters.baseUrl+'Scm/Purchase/List',
    method: 'post',
    data
  })
}