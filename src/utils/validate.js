/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 正整数匹配*/
export function validateInt(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/
  return reg.test(str)
}
/* 数字匹配包括0*/
export function validateNum(str) {
  const reg = /^\d+$/
  return reg.test(str)
}
/* 最多两位小数 */
export function validPoint(str) {
  const reg = /^[0-9]+(?:.[0-9]{1,2})?$/
  return reg.test(str)
}
/* 最多四位小数 */
export function validPointF(str) {
  const reg = /^[0-9]+(?:.[0-9]{1,4})?$/
  return reg.test(str)
}
/* 匹配手机号或是座机号*/
export function valTels(str) {
  const reg = /^((0\d{2,3}-\d{7,8})|(0\d{2,3}-\d{7,8}-\d{2,5})|(1[34578]\d{9}))$/
  return reg.test(str)
}
/* 匹配纯空格*/
export function validateSpace(textval) {
  const urlregex = /^\s+$/gi
  return !urlregex.test(textval)
}
/**
 * 验证 email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
