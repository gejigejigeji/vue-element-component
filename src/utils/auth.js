import Cookies from 'js-cookie'
import store from '@/store'

const SignKey = 'scl-Sign'

export function getSign() {
  return Cookies.get(SignKey)
}

export function setSign(sign) {
  return Cookies.set(SignKey, sign)
}

export function removeSign() {
  return Cookies.remove(SignKey)
}

/**
 * 通过meta.auth判断是否与当前用户权限匹配
 * @param route
 */
export function hasPermission(route) {
  if (route.meta && route.meta.auth) {
    // return store.getters.pages.indexOf(route.meta.auth)>-1
    return true
  } else {
    return true
  }
}