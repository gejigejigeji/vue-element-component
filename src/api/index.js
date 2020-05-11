import request from '@/utils/request'
import store from '@/store'
// 修改个人信息
export function personalHandle(data) {
  return request({
    url: store.getters.baseUrl+'Scm/User/ChangePassword',
    method: 'post',
    data
  })
}