import request from '@/utils/request'
import store from '@/store'
// 登陆
export function loginByUsername(data) {
  return request({
    url: '/api/users/user/login/',
    method: 'post',
    data
  })
}
// 权限路由信息
export function getUserInfo(data) {//todo
  return request({
    url: store.getters.baseUrl+'users/user/GetPermissions',
    method: 'post',
    data
  })
}
// 登出
export function logout(data) {
  return request({
    url: `api/users/user/logout`,
    method: 'post'
  })
}
// 重置密码
export function getForget(data) {//todo
  return request({
    url: store.getters.baseUrl+'users/user/ResetPassword',
    method: 'post',
    data
  })
}


